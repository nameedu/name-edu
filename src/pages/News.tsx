
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Image as ImageIcon, 
  AlertCircle,
  ExternalLink
} from "lucide-react";
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

const News = () => {
  const { data: notices, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select(`
          *,
          attachments:notice_attachments(*)
        `)
        .eq("is_active", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as Notice[];
    },
  });

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">News & Updates</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Stay informed with the latest announcements and updates
          </p>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-neutral-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {notices?.map((notice) => (
                <Card key={notice.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            <Link 
                              to={`/news/${notice.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {notice.title}
                            </Link>
                          </h3>
                          {notice.type === "urgent" && (
                            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                          {notice.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span>
                            {format(new Date(notice.published_at!), "PPp")}
                          </span>
                          {notice.link && (
                            <a
                              href={notice.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              External Link
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <span className="text-xs text-neutral-500">
                          Attachments:
                        </span>
                        {notice.attachments.map((attachment) => (
                          <a
                            key={attachment.id}
                            href={supabase.storage
                              .from("notice-attachments")
                              .getPublicUrl(attachment.file_path).data.publicUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-neutral-50 rounded inline-flex items-center gap-2"
                            title={attachment.file_path.split("/").pop()}
                          >
                            {attachment.file_type.startsWith("image/") ? (
                              <ImageIcon className="w-4 h-4 text-neutral-500" />
                            ) : (
                              <FileText className="w-4 h-4 text-neutral-500" />
                            )}
                            <span className="text-xs text-neutral-600">
                              {attachment.file_path.split("/").pop()?.slice(0, 20)}
                              {(attachment.file_path.split("/").pop()?.length || 0) > 20 ? "..." : ""}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default News;
