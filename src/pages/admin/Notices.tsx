import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Eye, PlusCircle, FileText, Image } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { uploadFile, getFileUrl, deleteFile } from '@/integrations/supabase/storage';
import FileUploadZone from '@/components/FileUploadZone';

type Notice = {
  id: string;
  title: string;
  description: string;
  type: 'normal' | 'urgent';
  created_at: string;
  published_at: string;
  link?: string;
  is_active?: boolean;
};

type NoticeAttachment = {
  id: string;
  notice_id: string;
  file_path: string;
  file_type: string;
  created_at: string;
};

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<Notice>({
    id: '',
    title: '',
    description: '',
    type: 'normal',
    created_at: '',
    published_at: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noticeAttachments, setNoticeAttachments] = useState<Record<string, NoticeAttachment[]>>({});

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      setNotices(data || []);
      
      const noticeIds = data?.map(notice => notice.id) || [];
      if (noticeIds.length > 0) {
        const { data: attachments, error: attachmentsError } = await supabase
          .from('notice_attachments')
          .select('*')
          .in('notice_id', noticeIds);
          
        if (attachmentsError) throw attachmentsError;
        
        const attachmentsByNoticeId: Record<string, NoticeAttachment[]> = {};
        attachments?.forEach(attachment => {
          if (!attachmentsByNoticeId[attachment.notice_id]) {
            attachmentsByNoticeId[attachment.notice_id] = [];
          }
          attachmentsByNoticeId[attachment.notice_id].push(attachment);
        });
        
        setNoticeAttachments(attachmentsByNoticeId);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      type: 'normal',
      created_at: '',
      published_at: '',
    });
    setSelectedFiles([]);
    setIsEditMode(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = async (notice: Notice) => {
    setFormData(notice);
    setIsEditMode(true);
    
    if (!noticeAttachments[notice.id]) {
      const { data, error } = await supabase
        .from('notice_attachments')
        .select('*')
        .eq('notice_id', notice.id);
        
      if (!error && data) {
        setNoticeAttachments({
          ...noticeAttachments,
          [notice.id]: data
        });
      }
    }
    
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      type: value as 'normal' | 'urgent',
    });
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      const attachments = noticeAttachments[id] || [];
      for (const attachment of attachments) {
        await deleteFile(attachment.file_path);
      }
      
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Notice deleted successfully');
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('Failed to delete notice');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { title, description, type, link } = formData;
      
      if (!title || !description) {
        toast.error('Title and description are required');
        return;
      }
      
      let noticeId = formData.id;
      
      if (isEditMode) {
        const { error } = await supabase
          .from('notices')
          .update({
            title,
            description,
            type,
            link,
            updated_at: new Date().toISOString(),
          })
          .eq('id', noticeId);
          
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('notices')
          .insert({
            title,
            description,
            type,
            link,
          })
          .select();
          
        if (error) throw error;
        noticeId = data[0].id;
      }
      
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const { filePath, error: uploadError } = await uploadFile(file);
          if (uploadError) throw uploadError;
          
          if (filePath) {
            const { error: attachmentError } = await supabase
              .from('notice_attachments')
              .insert({
                notice_id: noticeId,
                file_path: filePath,
                file_type: file.type,
              });
              
            if (attachmentError) throw attachmentError;
          }
        }
      }
      
      toast.success(`Notice ${isEditMode ? 'updated' : 'created'} successfully`);
      handleDialogClose();
      fetchNotices();
    } catch (error) {
      console.error('Error saving notice:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} notice`);
    }
  };

  const getAttachmentIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewAttachment = (filePath: string) => {
    const url = getFileUrl(filePath);
    window.open(url, '_blank');
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Notices</h1>
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Notice
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No notices found. Click 'Add New Notice' to create one.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-card rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{notice.title}</h3>
                      {notice.type === 'urgent' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgent</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Published: {formatDate(notice.published_at)}
                    </p>
                    <p className="text-sm mb-4">{notice.description}</p>
                    
                    {noticeAttachments[notice.id] && noticeAttachments[notice.id].length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {noticeAttachments[notice.id].map((attachment) => (
                            <Button 
                              key={attachment.id}
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1 text-xs"
                              onClick={() => handleViewAttachment(attachment.file_path)}
                            >
                              {getAttachmentIcon(attachment.file_type)}
                              <span className="truncate max-w-[100px]">
                                {attachment.file_path.split('-').pop()}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {notice.link && (
                      <Link 
                        to={notice.link.startsWith('http') ? notice.link : `https://${notice.link}`} 
                        target="_blank" 
                        className="text-primary text-sm hover:underline"
                      >
                        View External Link
                      </Link>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(notice)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the notice
                            and all its attachments.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteNotice(notice.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Notice' : 'Add New Notice'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Make changes to the existing notice.' 
                  : 'Fill in the details to create a new notice.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={handleSelectChange}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select notice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">External Link (Optional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={formData.link || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Attachments</Label>
                  <FileUploadZone
                    onFilesSelected={handleFilesSelected}
                    selectedFiles={selectedFiles}
                    onRemoveFile={handleRemoveFile}
                    maxFiles={3}
                  />
                </div>
                
                {isEditMode && noticeAttachments[formData.id] && noticeAttachments[formData.id].length > 0 && (
                  <div className="grid gap-2">
                    <Label>Existing Attachments</Label>
                    <div className="flex flex-wrap gap-2 p-2 bg-secondary/50 rounded-md">
                      {noticeAttachments[formData.id].map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-background rounded-md">
                          {getAttachmentIcon(attachment.file_type)}
                          <span className="text-sm truncate max-w-[200px]">
                            {attachment.file_path.split('-').pop()}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleViewAttachment(attachment.file_path)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? 'Update Notice' : 'Create Notice'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Notices;
