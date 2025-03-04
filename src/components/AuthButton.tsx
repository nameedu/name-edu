
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButton = () => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("student");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        const role = await getUserRole(data.session.user.id);
        setUserRole(role);
      }
      
      setLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          const role = await getUserRole(newSession.user.id);
          setUserRole(role);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return 'student'; // Default role
    }

    return data?.role || 'student';
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDashboardClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/portal');
    }
  };

  if (loading) {
    return (
      <Button disabled className="bg-primary hover:bg-primary-hover text-white">
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }

  if (!session) {
    return (
      <Button 
        className="bg-primary hover:bg-primary-hover text-white" 
        onClick={() => navigate('/auth')}
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-primary-hover text-white">
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Signed in as</p>
          <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDashboardClick}>
          {userRole === 'admin' ? (
            <>
              <UserCog className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </>
          ) : (
            <>
              <User className="mr-2 h-4 w-4" />
              <span>Student Dashboard</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
