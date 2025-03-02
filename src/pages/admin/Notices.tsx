
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Edit,
  Trash,
  Bell,
  BellRing,
  BellOff,
  CalendarClock,
  Link as LinkIcon,
} from "lucide-react";

type Notice = {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "normal";
  published_at: string;
  is_active: boolean;
  link?: string;
  created_at: string;
};

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"urgent" | "normal">("normal");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tab, setTab] = useState("all");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();
  }, [tab]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (tab === "active") {
        query = query.eq("is_active", true);
      } else if (tab === "inactive") {
        query = query.eq("is_active", false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setNotices(data as Notice[]);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast({
        title: "Error",
        description: "Failed to fetch notices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast({
        title: "Missing fields",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingId) {
        // Update existing notice
        const { error } = await supabase
          .from("notices")
          .update({
            title,
            description,
            type,
            link: link || null,
            is_active: isActive,
          })
          .eq("id", editingId);

        if (error) throw error;

        toast({
          title: "Notice updated",
          description: "The notice has been updated successfully",
        });
      } else {
        // Create new notice
        const { error } = await supabase.from("notices").insert({
          title,
          description,
          type,
          link: link || null,
          is_active: isActive,
        });

        if (error) throw error;

        toast({
          title: "Notice created",
          description: "The notice has been created successfully",
        });
      }

      // Reset form and refresh notices
      resetForm();
      fetchNotices();
    } catch (error) {
      console.error("Error saving notice:", error);
      toast({
        title: "Error",
        description: "Failed to save notice",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (notice: Notice) => {
    setTitle(notice.title);
    setDescription(notice.description);
    setType(notice.type);
    setLink(notice.link || "");
    setIsActive(notice.is_active);
    setEditingId(notice.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const { error } = await supabase.from("notices").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Notice deleted",
        description: "The notice has been deleted successfully",
      });

      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast({
        title: "Error",
        description: "Failed to delete notice",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("normal");
    setLink("");
    setIsActive(true);
    setEditingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Notices</h1>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All Notices</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all"></TabsContent>
          <TabsContent value="active"></TabsContent>
          <TabsContent value="inactive"></TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {notices.length} Notice{notices.length !== 1 && "s"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : notices.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No notices found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <Card key={notice.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              {notice.type === "urgent" ? (
                                <BellRing className="h-5 w-5 text-red-500 mr-2" />
                              ) : (
                                <Bell className="h-5 w-5 text-blue-500 mr-2" />
                              )}
                              <h3 className="font-semibold">{notice.title}</h3>
                            </div>
                            <div
                              className={`px-2 py-1 text-xs rounded-full ${
                                notice.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {notice.is_active ? "Active" : "Inactive"}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {notice.description}
                          </p>

                          <div className="flex flex-wrap gap-y-2 text-xs text-gray-500 mb-4">
                            <div className="flex items-center mr-4">
                              <CalendarClock className="h-3 w-3 mr-1" />
                              {formatDate(notice.created_at)}
                            </div>
                            {notice.link && (
                              <div className="flex items-center">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                <a
                                  href={notice.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  Link
                                </a>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(notice)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(notice.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingId ? "Edit Notice" : "Add New Notice"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Notice title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Notice details"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Link (Optional)</Label>
                    <Input
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer ${
                          type === "normal"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100"
                        }`}
                        onClick={() => setType("normal")}
                      >
                        <Bell className="h-4 w-4" />
                        <span>Normal</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer ${
                          type === "urgent"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100"
                        }`}
                        onClick={() => setType("urgent")}
                      >
                        <BellRing className="h-4 w-4" />
                        <span>Urgent</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="active" className="cursor-pointer">
                      {isActive ? (
                        <span className="flex items-center text-green-600">
                          <Bell className="h-4 w-4 mr-1" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500">
                          <BellOff className="h-4 w-4 mr-1" />
                          Inactive
                        </span>
                      )}
                    </Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    {editingId && (
                      <Button type="button" variant="ghost" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit">
                      {editingId ? (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Notice
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Notice
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
