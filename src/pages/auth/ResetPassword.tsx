
import { useState } from "react";
import { Mail, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Card className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Reset Password"}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link to="/auth" className="text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <AlertCircle className="mx-auto h-12 w-12 text-primary" />
                <p className="text-gray-600">
                  Please check your email for password reset instructions.
                </p>
                <Link to="/auth">
                  <Button variant="outline" className="mt-4">
                    Return to Login
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
