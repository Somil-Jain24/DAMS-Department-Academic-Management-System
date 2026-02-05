import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  Play,
  Target,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSubject } from "@/contexts/SubjectContext";
import {
  currentStudent,
  demoLabSessions,
  demoLabSubmissions,
  getSubjectName,
  LabSession,
  LabSubmission,
} from "@/data/demoData";
import LabEnvironmentNew from "@/components/lab/LabEnvironmentNew";
import LabReviewMode from "@/components/lab/LabReviewMode";

const StudentLabs = () => {
  const { toast } = useToast();
  const { selectedSubject } = useSubject();
  const [selectedLab, setSelectedLab] = useState<LabSession | null>(null);
  const [reviewingLab, setReviewingLab] = useState<{
    lab: LabSession;
    submission: LabSubmission;
  } | null>(null);

  // Filter labs based on selected subject
  const filteredLabs = selectedSubject
    ? demoLabSessions.filter(lab => lab.subjectId === selectedSubject.id)
    : demoLabSessions;

  const getSubmission = (labId: string): LabSubmission | undefined => {
    return demoLabSubmissions.find(
      (sub) => sub.labSessionId === labId && sub.studentId === currentStudent.id
    );
  };

  const pendingLabs = filteredLabs.filter((lab) => {
    const sub = getSubmission(lab.id);
    return !sub || sub.status === "pending";
  });

  const completedLabs = filteredLabs.filter((lab) => {
    const sub = getSubmission(lab.id);
    return sub && sub.status !== "pending";
  });

  const handleStartLab = (lab: LabSession) => {
    setSelectedLab(lab);
  };

  const handleSubmitLab = (answers: Record<string, { theory: string; code: string; language: string }>) => {
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
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto">
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
                        <Button onClick={() => handleStartLab(lab)}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Lab
                        </Button>
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
                    <Card key={lab.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{lab.title}</h3>
                              <p className="text-sm text-muted-foreground">{getSubjectName(lab.subjectId)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {submission?.marks && (
                              <span className="text-lg font-semibold text-green-600">{submission.marks}%</span>
                            )}
                            {getStatusBadge(submission?.status || "")}
                            {submission && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setReviewingLab({ lab, submission })
                                }
                              >
                                View
                              </Button>
                            )}
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

        {/* Lab Environment Modal */}
        {selectedLab && (
          <LabEnvironmentNew
            lab={selectedLab}
            onClose={() => setSelectedLab(null)}
            onSubmit={handleSubmitLab}
          />
        )}

        {/* Lab Review Modal */}
        {reviewingLab && (
          <LabReviewMode
            lab={reviewingLab.lab}
            submission={reviewingLab.submission}
            onClose={() => setReviewingLab(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentLabs;
