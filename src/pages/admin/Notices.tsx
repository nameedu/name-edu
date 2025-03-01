
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const Notices = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState<any>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"normal" | "urgent">("normal");
  const [isActive, setIsActive] = useState(true);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notices
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  // Add notice mutation
  const addNoticeMutation = useMutation({
    mutationFn: async (newNotice: {
      title: string;
      description: string;
      link?: string;
      type: "normal" | "urgent";
      is_active: boolean;
    }) => {
      const { data, error } = await supabase.from("notices").insert([newNotice]);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      resetForm();
      setIsAddDialogOpen(false);
      toast({
        title: "Notice Created",
        description: "The notice has been successfully added.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create notice.",
      });
    },
  });

  // Update notice mutation
  const updateNoticeMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        title: string;
        description: string;
        link?: string;
        type: "normal" | "urgent";
        is_active: boolean;
      };
    }) => {
      const { data, error } = await supabase
        .from("notices")
        .update(updates)
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      resetForm();
      setIsEditDialogOpen(false);
      toast({
        title: "Notice Updated",
        description: "The notice has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update notice.",
      });
    },
  });

  // Toggle notice active status
  const toggleNoticeMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data, error } = await supabase
        .from("notices")
        .update({ is_active: isActive })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "Notice Status Changed",
        description: "The notice status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update notice status.",
      });
    },
  });

  // Delete notice mutation
  const deleteNoticeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notices").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Notice Deleted",
        description: "The notice has been permanently removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete notice.",
      });
    },
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title and description are required.",
      });
      return;
    }
    
    const newNotice = {
      title,
      description,
      link: link || undefined,
      type,
      is_active: isActive,
    };
    
    addNoticeMutation.mutate(newNotice);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentNotice) return;
    
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title and description are required.",
      });
      return;
    }
    
    const updates = {
      title,
      description,
      link: link || undefined,
      type,
      is_active: isActive,
    };
    
    updateNoticeMutation.mutate({ id: currentNotice.id, updates });
  };

  const openEditDialog = (notice: any) => {
    setCurrentNotice(notice);
    setTitle(notice.title);
    setDescription(notice.description);
    setLink(notice.link || "");
    setType(notice.type);
    setIsActive(notice.is_active);
    setIsEditDialogOpen(true);
  };

  const confirmDelete = (notice: any) => {
    setCurrentNotice(notice);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    toggleNoticeMutation.mutate({ id, isActive: !currentStatus });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setType("normal");
    setIsActive(true);
    setCurrentNotice(null);
  };

  const handleAddDialogChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) resetForm();
  };

  const handleEditDialogChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) resetForm();
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Manage Notices</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={handleAddDialogChange}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Notice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <form onSubmit={handleAddSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Notice</DialogTitle>
                  <DialogDescription>
                    Create a new notice to display on the dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter notice title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter notice details"
                      className="h-24"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="link">Link (Optional)</Label>
                    <Input
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Enter related link"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Notice Type</Label>
                    <Select
                      value={type}
                      onValueChange={(value: "normal" | "urgent") => setType(value)}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select notice type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={addNoticeMutation.isPending}
                  >
                    {addNoticeMutation.isPending ? "Saving..." : "Save Notice"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : notices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No notices found. Create your first notice by clicking "Add Notice".
                  </TableCell>
                </TableRow>
              ) : (
                notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      {notice.title}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notice.type === "urgent"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {notice.type === "urgent" ? "Urgent" : "Normal"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notice.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {notice.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {notice.created_at &&
                        formatDistanceToNow(new Date(notice.created_at), {
                          addSuffix: true,
                        })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(notice.id, notice.is_active)}
                        >
                          {notice.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(notice)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => confirmDelete(notice)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Notice Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
          <DialogContent className="sm:max-w-[550px]">
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Notice</DialogTitle>
                <DialogDescription>
                  Make changes to the existing notice.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-24"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-link">Link (Optional)</Label>
                  <Input
                    id="edit-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Notice Type</Label>
                  <Select
                    value={type}
                    onValueChange={(value: "normal" | "urgent") => setType(value)}
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={updateNoticeMutation.isPending}
                >
                  {updateNoticeMutation.isPending
                    ? "Updating..."
                    : "Update Notice"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
            if (!open) setCurrentNotice(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this notice? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (currentNotice) deleteNoticeMutation.mutate(currentNotice.id);
                }}
                disabled={deleteNoticeMutation.isPending}
              >
                {deleteNoticeMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Notices;
