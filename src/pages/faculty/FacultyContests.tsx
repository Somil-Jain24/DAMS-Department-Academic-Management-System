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
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  Trophy,
  Clock,
  Users,
  Play,
  Calendar,
  CheckCircle,
  Plus,
  Trash2,
  Medal,
} from "lucide-react";
import {
  demoContests,
  demoContestSubmissions,
  demoStudents,
  demoClasses,
  getContestLeaderboard,
  Contest,
  ContestProblem,
} from "@/data/demoData";

const FacultyContests = () => {
  const { toast } = useToast();
  const { classId } = useParams<{ classId?: string }>();
  const { selectedClass, setSelectedClass, isInClassContext } = useClass();

  // Set selected class from URL if not already set
  useEffect(() => {
    if (classId && !selectedClass) {
      const classData = demoClasses.find((c) => c.id === classId);
      if (classData) {
        setSelectedClass({
          id: classData.id,
          name: classData.name,
          department: classData.department,
          year: classData.year,
        });
      }
    }
  }, [classId, selectedClass, setSelectedClass]);
  const [contests, setContests] = useState(demoContests);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [newContest, setNewContest] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: 120,
    problems: [] as ContestProblem[],
  });

  const [newProblem, setNewProblem] = useState({
    title: "",
    description: "",
    difficulty: "easy" as "easy" | "medium" | "hard",
    points: 100,
  });

  const handleAddProblem = () => {
    if (!newProblem.title || !newProblem.description) {
      toast({ title: "Error", description: "Please fill problem details", variant: "destructive" });
      return;
    }

    const problem: ContestProblem = {
      id: `p${newContest.problems.length + 1}`,
      ...newProblem,
      testCases: [],
    };

    setNewContest({ ...newContest, problems: [...newContest.problems, problem] });
    setNewProblem({ title: "", description: "", difficulty: "easy", points: 100 });
  };

  const handleRemoveProblem = (index: number) => {
    setNewContest({
      ...newContest,
      problems: newContest.problems.filter((_, i) => i !== index),
    });
  };

  const handleCreateContest = () => {
    if (!newContest.title || !newContest.startDate || !newContest.endDate) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const contest: Contest = {
      id: `contest${contests.length + 1}`,
      ...newContest,
      class: "IT 3rd Year",
      status: new Date(newContest.startDate) > new Date() ? "upcoming" : "active",
    };

    setContests([contest, ...contests]);
    setCreateDialogOpen(false);
    setNewContest({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      duration: 120,
      problems: [],
    });
    toast({ title: "Success", description: "Contest created successfully" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "upcoming":
        return "secondary";
      case "ended":
        return "outline";
      default:
        return "outline";
    }
  };

  const getParticipantCount = (contestId: string) => {
    const uniqueStudents = new Set(
      demoContestSubmissions.filter((s) => s.contestId === contestId).map((s) => s.studentId)
    );
    return uniqueStudents.size;
  };

  const filteredContests = isInClassContext
    ? contests.filter((c) => c.class === selectedClass?.name)
    : contests;

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
            <h1 className="text-2xl font-bold lg:text-3xl">Contest Management</h1>
            <p className="mt-1 text-muted-foreground">Create and manage coding contests</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Contest
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Contest</DialogTitle>
                <DialogDescription>Set up a new coding contest for students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Contest Title</Label>
                  <Input
                    placeholder="e.g., DSA Weekly Challenge #6"
                    value={newContest.title}
                    onChange={(e) => setNewContest({ ...newContest, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Contest description and rules"
                    value={newContest.description}
                    onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="datetime-local"
                      value={newContest.startDate}
                      onChange={(e) => setNewContest({ ...newContest, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="datetime-local"
                      value={newContest.endDate}
                      onChange={(e) => setNewContest({ ...newContest, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={newContest.duration}
                      onChange={(e) => setNewContest({ ...newContest, duration: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Problems Section */}
                <div className="space-y-4 rounded-lg border p-4">
                  <h4 className="font-medium">Contest Problems</h4>

                  {/* Added Problems */}
                  {newContest.problems.length > 0 && (
                    <div className="space-y-2">
                      {newContest.problems.map((problem, index) => (
                        <div
                          key={problem.id}
                          className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                problem.difficulty === "easy"
                                  ? "secondary"
                                  : problem.difficulty === "medium"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {problem.difficulty}
                            </Badge>
                            <span className="font-medium">{problem.title}</span>
                            <span className="text-sm text-muted-foreground">{problem.points} pts</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveProblem(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Problem Form */}
                  <div className="space-y-3 rounded-lg border border-dashed p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Problem Title</Label>
                        <Input
                          placeholder="Problem name"
                          value={newProblem.title}
                          onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-sm">Difficulty</Label>
                          <Select
                            value={newProblem.difficulty}
                            onValueChange={(v: "easy" | "medium" | "hard") =>
                              setNewProblem({ ...newProblem, difficulty: v })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Points</Label>
                          <Input
                            type="number"
                            value={newProblem.points}
                            onChange={(e) =>
                              setNewProblem({ ...newProblem, points: parseInt(e.target.value) })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Problem Description</Label>
                      <Textarea
                        placeholder="Describe the problem..."
                        value={newProblem.description}
                        onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddProblem}>
                      <Plus className="mr-1 h-4 w-4" />
                      Add Problem
                    </Button>
                  </div>
                </div>

                <Button onClick={handleCreateContest} className="w-full">
                  Create Contest
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Contests Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Contests</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contests.map((contest, index) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-accent" />
                            {contest.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {contest.description}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(contest.status)}>{contest.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(contest.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {contest.duration} min
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {getParticipantCount(contest.id)} participants
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4" />
                            {contest.problems.length} problems
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => setSelectedContest(contest)}
                          >
                            <Medal className="mr-2 h-4 w-4" />
                            Leaderboard
                          </Button>
                          {contest.status === "upcoming" && (
                            <Button size="icon" variant="secondary">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {["active", "upcoming", "ended"].map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContests
                  .filter((c) => c.status === status)
                  .map((contest) => (
                    <Card key={contest.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{contest.title}</CardTitle>
                        <CardDescription>{contest.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => setSelectedContest(contest)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Leaderboard Dialog */}
        <Dialog open={!!selectedContest} onOpenChange={() => setSelectedContest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                {selectedContest?.title} - Leaderboard
              </DialogTitle>
              <DialogDescription>
                {selectedContest?.problems.length} problems | {selectedContest?.duration} minutes
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Problems Overview */}
              <div className="flex flex-wrap gap-2">
                {selectedContest?.problems.map((problem) => (
                  <Badge
                    key={problem.id}
                    variant={
                      problem.difficulty === "easy"
                        ? "secondary"
                        : problem.difficulty === "medium"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {problem.title} ({problem.points} pts)
                  </Badge>
                ))}
              </div>

              {/* Leaderboard */}
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 p-3 font-medium text-sm">
                  <span>Rank</span>
                  <span>Student</span>
                  <span className="text-center">Problems</span>
                  <span className="text-right">Score</span>
                </div>
                {selectedContest &&
                  getContestLeaderboard(selectedContest.id).map((entry, index) => (
                    <div
                      key={entry.student.id}
                      className={`grid grid-cols-4 gap-4 p-3 ${
                        index < 3 ? "bg-accent/5" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {index === 0 && <Medal className="h-4 w-4 text-yellow-500" />}
                        {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                        {index === 2 && <Medal className="h-4 w-4 text-amber-600" />}
                        #{index + 1}
                      </span>
                      <span className="font-medium">{entry.student.name}</span>
                      <span className="text-center">{entry.problemsSolved}</span>
                      <span className="text-right font-semibold text-primary">
                        {entry.totalScore}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutComponent>
  );
};

export default FacultyContests;
