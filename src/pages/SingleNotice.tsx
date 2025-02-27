
import { useParams } from "react-router-dom";
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
  attachments?: NoticeAttachment[];
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

  const { data: notice, isLoading } = useQuery({
    queryKey: ["notice", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select(`
          *,
          attachments:notice_attachments(*)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Notice;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-neutral-200 rounded"></div>
            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
            <div className="h-32 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!notice) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Notice not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-bold">{notice.title}</h1>
            {notice.type === "urgent" && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-sm rounded-full">
                Urgent
              </span>
            )}
          </div>

          <div className="text-sm text-neutral-500 mb-6">
            Published on {format(new Date(notice.published_at!), "PPpp")}
          </div>

          <div className="prose max-w-none mb-8">
            <p className="whitespace-pre-wrap">{notice.description}</p>
          </div>

          {notice.attachments && notice.attachments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Attachments</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notice.attachments.map((attachment) => {
                  const isImage = attachment.file_type.startsWith("image/");
                  const url = supabase.storage
                    .from("notice-attachments")
                    .getPublicUrl(attachment.file_path).data.publicUrl;

                  return (
                    <a
                      key={attachment.id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-neutral-50 transition-colors"
                    >
                      {isImage ? (
                        <ImageIcon className="w-5 h-5 text-neutral-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-neutral-500" />
                      )}
                      <span className="text-sm truncate">
                        {attachment.file_path.split("/").pop()}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {notice.link && (
            <div className="mt-6">
              <Button asChild>
                <a href={notice.link} target="_blank" rel="noopener noreferrer">
                  View External Link
                </a>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default SingleNotice;
