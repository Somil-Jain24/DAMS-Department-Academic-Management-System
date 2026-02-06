import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSubject } from "@/contexts/SubjectContext";
import { useScope } from "@/contexts/ScopeContext";
import { demoSubjects } from "@/data/demoData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Calendar,
  FileText,
  FlaskConical,
  Trophy,
  BarChart3,
  GraduationCap,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const StudentSubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedSubject } = useSubject();
  const { setScope } = useScope();

  // Find subject data
  const subject = demoSubjects.find((s) => s.id === subjectId);

  const navItems: NavItem[] = [
    { icon: Calendar, label: "Attendance", path: "attendance" },
    { icon: FileText, label: "Assignments", path: "assignments" },
    { icon: FlaskConical, label: "Lab Sessions", path: "labs" },
    { icon: Trophy, label: "Contests", path: "contests" },
    { icon: BarChart3, label: "Marks & Progress", path: "marks" },
  ];

  useEffect(() => {
    if (subject) {
      setSelectedSubject(subject);
      // Set scope to subject mode - this will hide global sidebar
      setScope({ type: "subject", id: subjectId });
    }

    // Cleanup: reset scope when leaving subject page
    return () => {
      setScope({ type: null, id: null });
    };
  }, [subject, subjectId, setSelectedSubject, setScope]);

  // Redirect to attendance by default when landing on subject page
  useEffect(() => {
    if (location.pathname === `/student/subject/${subjectId}`) {
      navigate(`/student/subject/${subjectId}/attendance`, { replace: true });
    }
  }, [subjectId, location.pathname, navigate]);

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-lg font-semibold mb-4">Subject not found</p>
          <Button onClick={() => navigate("/student")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - LEFT ALIGNED like faculty class pages */}
      <div className="border-b bg-card">
        <div className="flex items-center gap-4 px-6 py-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/student")}
            className="h-10 w-10 shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{subject.code}</h1>
            <p className="text-muted-foreground">{subject.name}</p>
          </div>
        </div>
      </div>

      {/* Subject Layout with Sidebar */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar Navigation - Orange theme matching global sidebar */}
        <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-y-auto flex flex-col">
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const itemPath = `/student/subject/${subjectId}/${item.path}`;
              const isActive = location.pathname === itemPath;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(itemPath)}
                  className={cn(
                    "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectPage;
