import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClassDashboardLayout from "@/components/layout/ClassDashboardLayout";
import { useClass } from "@/contexts/ClassContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Eye,
  MessageSquare,
} from "lucide-react";
import {
  demoAssignments,
  demoAssignmentSubmissions,
  demoStudents,
  demoSubjects,
  getSubjectName,
  getStudentName,
  Assignment,
  AssignmentSubmission,
} from "@/data/demoData";

const FacultyAssignments = () => {
  const { toast } = useToast();
  const { selectedClass, isInClassContext } = useClass();
  const [assignments, setAssignments] = useState(demoAssignments);
  const [submissions, setSubmissions] = useState(demoAssignmentSubmissions);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subjectId: "",
    dueDate: "",
    maxMarks: 100,
  });

  const [gradeData, setGradeData] = useState({
    marks: 0,
    feedback: "",
  });

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.subjectId || !newAssignment.dueDate) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const assignment: Assignment = {
      id: `asg${assignments.length + 1}`,
      ...newAssignment,
      createdAt: new Date().toISOString(),
      class: "IT 3rd Year",
    };

    setAssignments([assignment, ...assignments]);
    setCreateDialogOpen(false);
    setNewAssignment({ title: "", description: "", subjectId: "", dueDate: "", maxMarks: 100 });
    toast({ title: "Success", description: "Assignment created successfully" });
  };

  const handleGradeSubmission = () => {
    if (!selectedSubmission) return;

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission.id
          ? { ...sub, marks: gradeData.marks, feedback: gradeData.feedback, status: "graded" as const }
          : sub
      )
    );

    setGradeDialogOpen(false);
    setSelectedSubmission(null);
    setGradeData({ marks: 0, feedback: "" });
    toast({ title: "Success", description: "Submission graded successfully" });
  };

  const getSubmissionsForAssignment = (assignmentId: string) => {
    return submissions.filter((s) => s.assignmentId === assignmentId);
  };

  const getSubmissionStats = (assignmentId: string) => {
    const subs = getSubmissionsForAssignment(assignmentId);
    const submitted = subs.filter((s) => s.status !== "pending").length;
    const graded = subs.filter((s) => s.status === "graded").length;
    const late = subs.filter((s) => s.status === "late").length;
    return { submitted, graded, late, total: demoStudents.length };
  };

  const classFilteredAssignments = isInClassContext
    ? assignments.filter((a) => a.class === selectedClass?.name)
    : assignments;

  const filteredAssignments = classFilteredAssignments.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSubjectName(a.subjectId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LayoutComponent = isInClassContext ? ClassDashboardLayout : DashboardLayout;
  const layoutProps = isInClassContext ? {} : { role: "faculty" as const };

  return (
    <LayoutComponent {...layoutProps}>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Assignment Management</h1>
            <p className="mt-1 text-muted-foreground">Create and grade student assignments</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Add a new assignment for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Assignment title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Detailed description of the assignment"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Subject</Label>
                    <Select
                      value={newAssignment.subjectId}
                      onValueChange={(v) => setNewAssignment({ ...newAssignment, subjectId: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {demoSubjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Max Marks</Label>
                    <Input
                      type="number"
                      value={newAssignment.maxMarks}
                      onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="datetime-local"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreateAssignment} className="w-full">
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Assignments List */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past Due</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            {filteredAssignments.map((assignment, index) => {
              const stats = getSubmissionStats(assignment.id);
              const isPastDue = new Date(assignment.dueDate) < new Date();

              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">{assignment.title}</h3>
                            <Badge variant={isPastDue ? "destructive" : "secondary"}>
                              {isPastDue ? "Past Due" : "Active"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {assignment.description}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Badge variant="outline">{getSubjectName(assignment.subjectId)}</Badge>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                            <span>Max: {assignment.maxMarks} marks</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 lg:items-end">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span>{stats.submitted}/{stats.total} submitted</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-info" />
                              <span>{stats.graded} graded</span>
                            </div>
                            {stats.late > 0 && (
                              <div className="flex items-center gap-1">
                                <AlertTriangle className="h-4 w-4 text-warning" />
                                <span>{stats.late} late</span>
                              </div>
                            )}
                          </div>
                          <Progress value={(stats.graded / stats.total) * 100} className="w-48 h-2" />
                          <Button
                            size="sm"
                            onClick={() => setSelectedAssignment(assignment)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          <TabsContent value="active" className="mt-4 space-y-4">
            {filteredAssignments
              .filter((a) => new Date(a.dueDate) >= new Date())
              .map((assignment) => {
                const stats = getSubmissionStats(assignment.id);
                return (
                  <Card key={assignment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => setSelectedAssignment(assignment)}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          <TabsContent value="past" className="mt-4 space-y-4">
            {filteredAssignments
              .filter((a) => new Date(a.dueDate) < new Date())
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" onClick={() => setSelectedAssignment(assignment)}>
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {/* Submissions View Dialog */}
        <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedAssignment?.title} - Submissions</DialogTitle>
              <DialogDescription>
                {getSubjectName(selectedAssignment?.subjectId || "")} | Max Marks: {selectedAssignment?.maxMarks}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {selectedAssignment &&
                getSubmissionsForAssignment(selectedAssignment.id).map((submission) => {
                  const student = demoStudents.find((s) => s.id === submission.studentId);
                  return (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {student?.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student?.name}</p>
                          <p className="text-sm text-muted-foreground">{student?.rollNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            submission.status === "graded"
                              ? "default"
                              : submission.status === "submitted"
                              ? "secondary"
                              : submission.status === "late"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {submission.status}
                        </Badge>
                        {submission.marks !== undefined && (
                          <span className="font-semibold">
                            {submission.marks}/{selectedAssignment.maxMarks}
                          </span>
                        )}
                        {submission.status !== "pending" && submission.status !== "graded" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setGradeData({ marks: submission.marks || 0, feedback: submission.feedback || "" });
                              setGradeDialogOpen(true);
                            }}
                          >
                            Grade
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </DialogContent>
        </Dialog>

        {/* Grade Dialog */}
        <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grade Submission</DialogTitle>
              <DialogDescription>
                {getStudentName(selectedSubmission?.studentId || "")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Submission Content</Label>
                <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm">
                  {selectedSubmission?.content || "No content submitted"}
                </div>
              </div>
              <div>
                <Label>Marks (Max: {selectedAssignment?.maxMarks})</Label>
                <Input
                  type="number"
                  max={selectedAssignment?.maxMarks}
                  value={gradeData.marks}
                  onChange={(e) => setGradeData({ ...gradeData, marks: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label>Feedback</Label>
                <Textarea
                  placeholder="Provide feedback for the student"
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                  rows={3}
                />
              </div>
              <Button onClick={handleGradeSubmission} className="w-full">
                Submit Grade
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutComponent>
  );
};

export default FacultyAssignments;
