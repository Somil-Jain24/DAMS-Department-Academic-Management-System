import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Upload,
  AlertTriangle,
  FileText,
  Star,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  currentStudent,
  demoAssignments,
  demoAssignmentSubmissions,
  getSubjectName,
  Assignment,
  AssignmentSubmission,
} from "@/data/demoData";

const StudentAssignments = () => {
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSubmission = (assignmentId: string): AssignmentSubmission | undefined => {
    return demoAssignmentSubmissions.find(
      (sub) => sub.assignmentId === assignmentId && sub.studentId === currentStudent.id
    );
  };

  const pendingAssignments = demoAssignments.filter((asg) => {
    const sub = getSubmission(asg.id);
    return !sub || sub.status === "pending";
  });

  const submittedAssignments = demoAssignments.filter((asg) => {
    const sub = getSubmission(asg.id);
    return sub && sub.status !== "pending";
  });

  const handleSubmit = () => {
    if (!submissionContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter your submission content",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionContent("");
      setSelectedAssignment(null);
      toast({
        title: "Assignment Submitted!",
        description: "Your assignment has been submitted successfully.",
      });
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-500">Graded</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case "late":
        return <Badge variant="destructive">Late</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const AssignmentCard = ({ assignment, submission }: { assignment: Assignment; submission?: AssignmentSubmission }) => {
    const dueDate = new Date(assignment.dueDate);
    const isOverdue = dueDate < new Date();
    const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">{getSubjectName(assignment.subjectId)}</p>
              </div>
            </div>
            {submission ? getStatusBadge(submission.status) : (
              <Badge variant={isOverdue ? "destructive" : "outline"}>
                {isOverdue ? "Overdue" : `${daysLeft}d left`}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{assignment.description}</p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Due: {dueDate.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {assignment.maxMarks} marks
              </span>
            </div>

            {submission && submission.status === "graded" ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">{submission.marks}/{assignment.maxMarks}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">View Feedback</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assignment Feedback</DialogTitle>
                      <DialogDescription>{assignment.title}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Score</h4>
                        <div className="text-2xl font-bold text-green-600">{submission.marks}/{assignment.maxMarks}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Feedback</h4>
                        <p className="text-muted-foreground">{submission.feedback || "No feedback provided."}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Your Submission</h4>
                        <div className="p-3 bg-muted rounded-lg text-sm">{submission.content}</div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : !submission || submission.status === "pending" ? (
              <Dialog open={selectedAssignment?.id === assignment.id} onOpenChange={(open) => !open && setSelectedAssignment(null)}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setSelectedAssignment(assignment)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Submit Assignment</DialogTitle>
                    <DialogDescription>{assignment.title}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Instructions</h4>
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Submission</label>
                      <Textarea
                        placeholder="Enter your solution or paste your code here..."
                        className="min-h-[200px] font-mono"
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setSelectedAssignment(null)}>Cancel</Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Assignment"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <span className="text-sm text-muted-foreground">Awaiting grade</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-1">View and submit your assignments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{demoAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{submittedAssignments.filter((a) => getSubmission(a.id)?.status !== "graded").length}</p>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{submittedAssignments.filter((a) => getSubmission(a.id)?.status === "graded").length}</p>
                <p className="text-xs text-muted-foreground">Graded</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold">All caught up!</h3>
                  <p className="text-muted-foreground">You have no pending assignments.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    submission={getSubmission(assignment.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="mt-6">
            {submittedAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-lg font-semibold">No submissions yet</h3>
                  <p className="text-muted-foreground">Start submitting your assignments.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {submittedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    submission={getSubmission(assignment.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;
