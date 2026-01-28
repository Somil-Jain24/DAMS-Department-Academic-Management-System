import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Trophy,
  FlaskConical,
  GraduationCap,
  Clock,
  CheckCircle2,
  User,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Play,
  Target,
} from "lucide-react";
import {
  currentStudent,
  demoLabSessions,
  demoLabSubmissions,
  getSubjectName,
  LabSession,
  LabSubmission,
} from "@/data/demoData";
import LabEnvironment from "@/components/lab/LabEnvironment";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student" },
  { label: "Attendance", icon: Calendar, path: "/student/attendance" },
  { label: "Assignments", icon: ClipboardList, path: "/student/assignments" },
  { label: "Lab Sessions", icon: FlaskConical, path: "/student/labs" },
  { label: "Contests", icon: Trophy, path: "/student/contests" },
];

const StudentLabs = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedLab, setSelectedLab] = useState<LabSession | null>(null);

  const getSubmission = (labId: string): LabSubmission | undefined => {
    return demoLabSubmissions.find(
      (sub) => sub.labSessionId === labId && sub.studentId === currentStudent.id
    );
  };

  const pendingLabs = demoLabSessions.filter((lab) => {
    const sub = getSubmission(lab.id);
    return !sub || sub.status === "pending";
  });

  const completedLabs = demoLabSessions.filter((lab) => {
    const sub = getSubmission(lab.id);
    return sub && sub.status !== "pending";
  });

  const handleStartLab = (lab: LabSession) => {
    setSelectedLab(lab);
  };

  const handleSubmitLab = (answers: Record<string, { answer: string; code: string; language: string }>) => {
    setSelectedLab(null);
    toast({
      title: "Lab Submitted!",
      description: "Your lab work has been submitted successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-500">Graded</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Student Portal</h2>
              <p className="text-xs text-muted-foreground">Academic Management</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentStudent.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentStudent.rollNumber}</p>
            </div>
          </div>
          <Link to="/login">
            <Button variant="outline" size="sm" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Lab Sessions</h1>
            <p className="text-muted-foreground mt-1">Complete lab exercises and submit your work</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{demoLabSessions.length}</p>
                  <p className="text-xs text-muted-foreground">Total Labs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingLabs.length}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedLabs.length}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingLabs.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed ({completedLabs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              {pendingLabs.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold">All labs completed!</h3>
                    <p className="text-muted-foreground">Great work on finishing all lab sessions.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {pendingLabs.map((lab) => (
                    <Card key={lab.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                              <FlaskConical className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{lab.title}</h3>
                              <p className="text-sm text-muted-foreground">{getSubjectName(lab.subjectId)}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{lab.questions.length} questions</Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{lab.objectives}</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Dialog open={selectedLab?.id === lab.id} onOpenChange={(open) => !open && setSelectedLab(null)}>
                            <DialogTrigger asChild>
                              <Button onClick={() => handleStartLab(lab)}>
                                <Play className="h-4 w-4 mr-2" />
                                Start Lab
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{lab.title}</DialogTitle>
                                <DialogDescription>{getSubjectName(lab.subjectId)}</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                {/* Theory Section */}
                                <div className="p-4 bg-muted rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="h-4 w-4" />
                                    <h4 className="font-medium">Theory</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{lab.theory}</p>
                                </div>

                                {/* Questions */}
                                <div className="space-y-4">
                                  <h4 className="font-medium">Questions</h4>
                                  <Accordion type="single" collapsible defaultValue="q0">
                                    {lab.questions.map((q, idx) => (
                                      <AccordionItem key={q.id} value={`q${idx}`}>
                                        <AccordionTrigger>
                                          <span className="text-left">
                                            Q{idx + 1}. {q.question}
                                          </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                          <div>
                                            <label className="text-sm font-medium mb-2 block">Your Answer</label>
                                            <Textarea
                                              placeholder="Explain your approach..."
                                              value={answers[q.id]?.answer || ""}
                                              onChange={(e) => setAnswers((prev) => ({
                                                ...prev,
                                                [q.id]: { ...prev[q.id], answer: e.target.value },
                                              }))}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                              <Code className="h-4 w-4" />
                                              Code
                                            </label>
                                            <Textarea
                                              placeholder="// Write your code here..."
                                              className="font-mono min-h-[150px]"
                                              value={answers[q.id]?.code || ""}
                                              onChange={(e) => setAnswers((prev) => ({
                                                ...prev,
                                                [q.id]: { ...prev[q.id], code: e.target.value },
                                              }))}
                                            />
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>

                                <div className="flex justify-end gap-2 pt-4 border-t">
                                  <Button variant="outline" onClick={() => setSelectedLab(null)}>Cancel</Button>
                                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Lab"}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {completedLabs.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FlaskConical className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No completed labs</h3>
                    <p className="text-muted-foreground">Start working on your pending labs.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {completedLabs.map((lab) => {
                    const submission = getSubmission(lab.id);
                    return (
                      <Card key={lab.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{lab.title}</h3>
                                <p className="text-sm text-muted-foreground">{getSubjectName(lab.subjectId)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {submission?.marks && (
                                <span className="text-lg font-semibold text-green-600">{submission.marks}%</span>
                              )}
                              {getStatusBadge(submission?.status || "")}
                            </div>
                          </div>
                          {submission?.feedback && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <p className="text-sm"><span className="font-medium">Feedback:</span> {submission.feedback}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StudentLabs;
