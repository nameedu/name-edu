import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
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
}

interface NoticeAttachment {
  id: string;
  notice_id: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

interface NoticeFormValues {
  title: string;
  description: string;
  type: "urgent" | "normal";
  link?: string;
  files?: FileList;
}

const Notices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<NoticeFormValues>();

  const { data: notices, isLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Notice[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: NoticeFormValues) => {
      const { error } = await supabase
        .from('notices')
        .insert([values]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      setIsOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Notice created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create notice",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: NoticeFormValues & { id: string }) => {
      const { error } = await supabase
        .from('notices')
        .update(values)
        .eq('id', values.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      setIsOpen(false);
      setEditingNotice(null);
      form.reset();
      toast({
        title: "Success",
        description: "Notice updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update notice",
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('notices')
        .update({ is_active })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast({
        title: "Success",
        description: "Notice status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update notice status",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast({
        title: "Success",
        description: "Notice deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete notice",
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
      link: notice.link,
    });
    setIsOpen(true);
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Manage Notices</h1>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Notice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingNotice ? "Edit Notice" : "Add New Notice"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} />
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
                            <Input {...field} />
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
                    notice.is_active ? 'bg-white' : 'bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notice.title}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            notice.type === 'urgent'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-primary/10 text-primary'
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
                          Published: {format(new Date(notice.published_at), 'PPp')}
                        </span>
                        {notice.link && (
                          <Link
                            to={notice.link}
                            className="text-primary hover:underline"
                          >
                            View Link
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        onClick={() => deleteMutation.mutate(notice.id)}
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
