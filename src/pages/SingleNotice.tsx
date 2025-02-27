import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
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

const SingleNotice = () => {
  const { id } = useParams<{ id: string }>();

  const { data: notice, isLoading, error } = useQuery({
    queryKey: ["notice", id],
    queryFn: async () => {
      if (!id) throw new Error("Notice ID is required");
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Notice;
    },
  });

  const { data: attachments } = useQuery({
    queryKey: ["notice-attachments", id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from("notice_attachments")
        .select("*")
        .eq("notice_id", id);

      if (error) throw error;
      return data as NoticeAttachment[];
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-red-500">
          Error: {error.message}
        </div>
      </Layout>
    );
  }

  if (!notice) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          Notice not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Link to="/news" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Notices
            </Link>
            <span className="text-sm text-muted-foreground">
              Published: {format(new Date(notice.published_at || ''), "PPp")}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{notice.title}</h1>
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border ${
              notice.type === "urgent"
                ? "bg-red-100 text-red-800 border-red-500"
                : "bg-primary/10 text-primary border-primary"
            }`}
          >
            {notice.type}
          </div>
          <p className="text-gray-700">{notice.description}</p>
          {notice.link && (
            <Button variant="link" asChild>
              <Link to={notice.link} target="_blank" rel="noopener noreferrer">
                View Link
              </Link>
            </Button>
          )}

          {attachments && attachments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Attachments</h3>
              <div className="grid gap-4">
                {attachments.map((attachment) => {
                  const isImage =
                    attachment.file_type.startsWith("image/");
                  return (
                    <a
                      key={attachment.id}
                      href={attachment.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:underline"
                    >
                      {isImage ? (
                        <ImageIcon className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-500" />
                      )}
                      <span>{attachment.file_path.split('/').pop()}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default SingleNotice;
