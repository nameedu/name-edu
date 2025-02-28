import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Upload,
  FileText,
  Image as ImageIcon,
  Eye
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

interface Notice {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "normal";
  link?: string | null;
  published_at: string | null;
  created_at: string | null;
  created_by: string | null;
  is_active: boolean | null;
  attachments?: NoticeAttachment[];
}

interface NoticeAttachment {
  id: string;
  notice_id: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

const noticeFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["urgent", "normal"]),
  link: z.string().optional(),
  files: z.any().optional(),
});

type NoticeFormValues = z.infer<typeof noticeFormSchema>;

const Notices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [selectedNotices, setSelectedNotices] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      type: "normal",
    },
  });

  const { data: notices, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select(`
          *,
          attachments:notice_attachments(*)
        `)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as Notice[];
    },
  });

  const uploadFiles = async (files: FileList, noticeId: string) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${noticeId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("notice-attachments")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: attachmentError } = await supabase
        .from("notice_attachments")
        .insert({
          notice_id: noticeId,
          file_path: filePath,
          file_type: file.type,
        });

      if (attachmentError) throw attachmentError;
    });

    await Promise.all(uploadPromises);
  };

  const createMutation = useMutation({
    mutationFn: async (values: NoticeFormValues) => {
      const { files, ...noticeData } = values;
      
      const { data, error } = await supabase
        .from("notices")
        .insert({
          ...noticeData,
          published_at: new Date().toISOString(),
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      if (files && files.length > 0) {
        await uploadFiles(files, data.id);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      setIsOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Notice created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: NoticeFormValues & { id: string }) => {
      const { files, id, ...noticeData } = values;

      const { error } = await supabase
        .from("notices")
        .update(noticeData)
        .eq("id", id);

      if (error) throw error;

      if (files && files.length > 0) {
        await uploadFiles(files, id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      setIsOpen(false);
      setEditingNotice(null);
      form.reset();
      toast({
        title: "Success",
        description: "Notice updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("notices")
        .update({ is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "Success",
        description: "Notice status updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { data: attachments } = await supabase
        .from("notice_attachments")
        .select("file_path")
        .in("notice_id", ids);

      if (attachments?.length) {
        const filePaths = attachments.map((a) => a.file_path);
        await supabase.storage.from("notice-attachments").remove(filePaths);
      }

      const { error } = await supabase
        .from("notices")
        .delete()
        .in("id", ids);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      setSelectedNotices([]);
      toast({
        title: "Success",
        description: "Notices deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: NoticeFormValues) => {
    if (editingNotice) {
      updateMutation.mutate({ ...values, id: editingNotice.id });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    form.reset({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      link: notice.link || undefined,
    });
    setIsOpen(true);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedNotices((prev) =>
      prev.includes(id)
        ? prev.filter((noticeId) => noticeId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedNotices.length === 0) return;
    deleteNoticeMutation.mutate(selectedNotices);
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Manage Notices</h1>
            <div className="flex items-center gap-4">
              {selectedNotices.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedNotices.length})
                </Button>
              )}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Notice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingNotice ? "Edit Notice" : "Add New Notice"}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select notice type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} type="url" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="files"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Attachments (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        {editingNotice ? "Update Notice" : "Create Notice"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {notices?.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-4 rounded-lg border ${
                    notice.is_active ? "bg-white" : "bg-neutral-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedNotices.includes(notice.id)}
                        onCheckedChange={() => handleToggleSelect(notice.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notice.title}</h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              notice.type === "urgent"
                                ? "bg-red-100 text-red-600"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {notice.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">
                          {notice.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span>
                            Published:{" "}
                            {format(new Date(notice.published_at!), "PPp")}
                          </span>
                          {notice.link && (
                            <a
                              href={notice.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              View Link
                            </a>
                          )}
                        </div>
                        {notice.attachments && notice.attachments.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-neutral-500">
                              Attachments:
                            </span>
                            {notice.attachments.map((attachment) => (
                              <a
                                key={attachment.id}
                                href={
                                  supabase.storage
                                    .from("notice-attachments")
                                    .getPublicUrl(attachment.file_path).data
                                    .publicUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 hover:bg-neutral-100 rounded"
                                title={attachment.file_path.split("/").pop()}
                              >
                                {attachment.file_type.startsWith("image/") ? (
                                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                                ) : (
                                  <FileText className="w-4 h-4 text-neutral-500" />
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/news/${notice.id}`)}
                      >
                        <Eye className="w-4 h-4 text-neutral-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toggleActiveMutation.mutate({
                            id: notice.id,
                            is_active: !notice.is_active,
                          })
                        }
                      >
                        {notice.is_active ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-neutral-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(notice)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNoticeMutation.mutate([notice.id])}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default Notices;
