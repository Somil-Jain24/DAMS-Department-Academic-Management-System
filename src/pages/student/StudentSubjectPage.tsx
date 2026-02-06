import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useSubject } from "@/contexts/SubjectContext";
import { useScope } from "@/contexts/ScopeContext";
import { demoSubjects } from "@/data/demoData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  FlaskConical,
  Trophy,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

const StudentSubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { setSelectedSubject } = useSubject();
  const { setScope } = useScope();

  // Find subject data
  const subject = demoSubjects.find((s) => s.id === subjectId);

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
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/student")}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{subject.code}</h1>
              <p className="text-muted-foreground">{subject.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Layout with Sidebar */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r bg-card p-4 overflow-y-auto">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                navigate(`/student/subject/${subjectId}/attendance`)
              }
            >
              <Calendar className="h-4 w-4 mr-2" />
              Attendance
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                navigate(`/student/subject/${subjectId}/assignments`)
              }
            >
              <FileText className="h-4 w-4 mr-2" />
              Assignments
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate(`/student/subject/${subjectId}/labs`)}
            >
              <FlaskConical className="h-4 w-4 mr-2" />
              Lab Sessions
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                navigate(`/student/subject/${subjectId}/contests`)
              }
            >
              <Trophy className="h-4 w-4 mr-2" />
              Contests
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate(`/student/subject/${subjectId}/marks`)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Marks & Progress
            </Button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectPage;
