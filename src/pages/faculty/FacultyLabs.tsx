import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";
import {
  demoLabSessions,
  demoLabSubmissions,
  demoStudents,
  demoSubjects,
  getSubjectName,
  LabSession,
  LabQuestion,
} from "@/data/demoData";

const FacultyLabs = () => {
  const { toast } = useToast();
  const [labSessions, setLabSessions] = useState(demoLabSessions);
  const [submissions, setSubmissions] = useState(demoLabSubmissions);
  const [selectedLab, setSelectedLab] = useState<LabSession | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newLab, setNewLab] = useState({
    title: "",
    subjectId: "",
    objectives: "",
    theory: "",
    questions: [{ id: "q1", question: "" }] as LabQuestion[],
  });

  const handleAddQuestion = () => {
    setNewLab({
      ...newLab,
      questions: [
        ...newLab.questions,
        { id: `q${newLab.questions.length + 1}`, question: "" },
      ],
    });
  };

  const handleRemoveQuestion = (index: number) => {
    if (newLab.questions.length > 1) {
      setNewLab({
        ...newLab,
        questions: newLab.questions.filter((_, i) => i !== index),
      });
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...newLab.questions];
    updated[index] = { ...updated[index], question: value };
    setNewLab({ ...newLab, questions: updated });
  };

  const handleCreateLab = () => {
    if (!newLab.title || !newLab.subjectId || newLab.questions.some((q) => !q.question)) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const lab: LabSession = {
      id: `lab${labSessions.length + 1}`,
      ...newLab,
      createdAt: new Date().toISOString(),
      class: "IT 3rd Year",
    };

    setLabSessions([lab, ...labSessions]);
    setCreateDialogOpen(false);
    setNewLab({
      title: "",
      subjectId: "",
      objectives: "",
      theory: "",
      questions: [{ id: "q1", question: "" }],
    });
    toast({ title: "Success", description: "Lab session created successfully" });
  };

  const getLabStats = (labId: string) => {
    const subs = submissions.filter((s) => s.labSessionId === labId);
    const completed = subs.filter((s) => s.status !== "pending").length;
    const graded = subs.filter((s) => s.status === "graded").length;
    return { completed, graded, total: demoStudents.length };
  };

  const handleGradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId
          ? { ...sub, marks, feedback, status: "graded" as const }
          : sub
      )
    );
    toast({ title: "Success", description: "Lab graded successfully" });
  };

  const filteredLabs = labSessions.filter(
    (lab) =>
      lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSubjectName(lab.subjectId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Lab Sessions</h1>
            <p className="mt-1 text-muted-foreground">Create and manage lab manuals</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Lab Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lab Session</DialogTitle>
                <DialogDescription>Design a new lab manual with questions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Lab Title</Label>
                    <Input
                      placeholder="e.g., Linked List Implementation"
                      value={newLab.title}
                      onChange={(e) => setNewLab({ ...newLab, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select
                      value={newLab.subjectId}
                      onValueChange={(v) => setNewLab({ ...newLab, subjectId: v })}
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
                </div>
                <div>
                  <Label>Objectives</Label>
                  <Textarea
                    placeholder="Learning objectives for this lab"
                    value={newLab.objectives}
                    onChange={(e) => setNewLab({ ...newLab, objectives: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Theory / Background</Label>
                  <Textarea
                    placeholder="Theoretical background for the lab"
                    value={newLab.theory}
                    onChange={(e) => setNewLab({ ...newLab, theory: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Questions</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddQuestion}>
                      <Plus className="mr-1 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {newLab.questions.map((q, index) => (
                      <div key={q.id} className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder={`Question ${index + 1}`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                          />
                        </div>
                        {newLab.questions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveQuestion(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreateLab} className="w-full">
                  Create Lab Session
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lab sessions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lab Sessions Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab, index) => {
            const stats = getLabStats(lab.id);
            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {lab.title}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{getSubjectName(lab.subjectId)}</Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {lab.objectives}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{lab.questions.length} questions</span>
                        <span>•</span>
                        <span>{new Date(lab.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-success" />
                            {stats.completed}/{stats.total} completed
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-info" />
                            {stats.graded} graded
                          </span>
                        </div>
                        <Progress value={(stats.completed / stats.total) * 100} className="h-2" />
                      </div>

                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setSelectedLab(lab)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Submissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Lab Submissions Dialog */}
        <Dialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLab?.title}</DialogTitle>
              <DialogDescription>
                {getSubjectName(selectedLab?.subjectId || "")} | {selectedLab?.questions.length} questions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-medium mb-2">Objectives</h4>
                <p className="text-sm text-muted-foreground">{selectedLab?.objectives}</p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Student Submissions</h4>
                <div className="space-y-3">
                  {selectedLab &&
                    submissions
                      .filter((s) => s.labSessionId === selectedLab.id)
                      .map((submission) => {
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
                                    : submission.status === "completed"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {submission.status}
                              </Badge>
                              {submission.marks !== undefined && (
                                <span className="font-semibold">{submission.marks}/100</span>
                              )}
                              {submission.status === "completed" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleGradeSubmission(submission.id, 85, "Good work!")}
                                >
                                  Grade
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default FacultyLabs;
