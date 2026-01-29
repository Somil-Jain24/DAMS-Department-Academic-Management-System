import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy,
  Clock,
  CheckCircle2,
  Code,
  Play,
  Target,
  Medal,
  Timer,
  AlertCircle,
  XCircle,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  currentStudent,
  demoContests,
  demoContestSubmissions,
  getContestLeaderboard,
  Contest,
  ContestProblem,
} from "@/data/demoData";

const StudentContests = () => {
  const { toast } = useToast();
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ContestProblem | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeContests = demoContests.filter((c) => c.status === "active");
  const upcomingContests = demoContests.filter((c) => c.status === "upcoming");
  const endedContests = demoContests.filter((c) => c.status === "ended");

  const getMySubmission = (contestId: string, problemId: string) => {
    return demoContestSubmissions.find(
      (s) => s.contestId === contestId && s.problemId === problemId && s.studentId === currentStudent.id
    );
  };

  const getMyTotalScore = (contestId: string) => {
    const submissions = demoContestSubmissions.filter(
      (s) => s.contestId === contestId && s.studentId === currentStudent.id
    );
    return submissions.reduce((acc, s) => acc + s.score, 0);
  };

  const handleSubmit = () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please write your code before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCode("");
      setSelectedProblem(null);
      toast({
        title: "Solution Submitted!",
        description: "Your solution is being evaluated.",
      });
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "partial":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "wrong":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const ContestCard = ({ contest }: { contest: Contest }) => {
    const isActive = contest.status === "active";
    const isUpcoming = contest.status === "upcoming";
    const myScore = getMyTotalScore(contest.id);
    const maxScore = contest.problems.reduce((acc, p) => acc + p.points, 0);
    const leaderboard = getContestLeaderboard(contest.id);
    const myRank = leaderboard.findIndex((l) => l.student.id === currentStudent.id) + 1;

    return (
      <Card className={`${isActive ? "border-green-500/50 bg-green-50/50 dark:bg-green-900/10" : ""}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${isActive ? "bg-green-100 dark:bg-green-900/30" : isUpcoming ? "bg-blue-100 dark:bg-blue-900/20" : "bg-muted"}`}>
                <Trophy className={`h-5 w-5 ${isActive ? "text-green-600" : isUpcoming ? "text-blue-600" : "text-muted-foreground"}`} />
              </div>
              <div>
                <h3 className="font-semibold">{contest.title}</h3>
                <p className="text-sm text-muted-foreground">{contest.description}</p>
              </div>
            </div>
            <Badge className={isActive ? "bg-green-500" : isUpcoming ? "bg-blue-500" : "bg-muted-foreground"}>
              {contest.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">{contest.problems.length}</p>
              <p className="text-xs text-muted-foreground">Problems</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">{contest.duration}min</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
            {!isUpcoming && (
              <>
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold">{myScore}/{maxScore}</p>
                  <p className="text-xs text-muted-foreground">Your Score</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold">{myRank > 0 ? `#${myRank}` : "-"}</p>
                  <p className="text-xs text-muted-foreground">Your Rank</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {isUpcoming ? (
                <span>Starts: {new Date(contest.startDate).toLocaleString()}</span>
              ) : (
                <span>Ends: {new Date(contest.endDate).toLocaleString()}</span>
              )}
            </div>
            {isActive && (
              <Button onClick={() => setSelectedContest(contest)}>
                <Play className="h-4 w-4 mr-2" />
                Participate
              </Button>
            )}
            {contest.status === "ended" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Medal className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{contest.title} - Leaderboard</DialogTitle>
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right">Problems Solved</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.slice(0, 10).map((entry, idx) => (
                        <TableRow key={entry.student.id} className={entry.student.id === currentStudent.id ? "bg-primary/5" : ""}>
                          <TableCell className="font-medium">
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                          </TableCell>
                          <TableCell>
                            {entry.student.name}
                            {entry.student.id === currentStudent.id && <Badge className="ml-2" variant="outline">You</Badge>}
                          </TableCell>
                          <TableCell className="text-right font-semibold">{entry.totalScore}</TableCell>
                          <TableCell className="text-right">{entry.problemsSolved}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout role="student">
        {selectedContest ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedContest(null); setSelectedProblem(null); }}>
                ← Back to Contests
              </Button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">{selectedContest.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    {selectedContest.duration} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {selectedContest.problems.length} problems
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{getMyTotalScore(selectedContest.id)}</p>
                <p className="text-sm text-muted-foreground">Your Score</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Problems List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Problems</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {selectedContest.problems.map((problem, idx) => {
                      const submission = getMySubmission(selectedContest.id, problem.id);
                      return (
                        <button
                          key={problem.id}
                          onClick={() => setSelectedProblem(problem)}
                          className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                            selectedProblem?.id === problem.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground">{idx + 1}</span>
                              <div>
                                <p className="font-medium">{problem.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={getDifficultyColor(problem.difficulty)} variant="secondary">
                                    {problem.difficulty}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{problem.points} pts</span>
                                </div>
                              </div>
                            </div>
                            {submission && getStatusIcon(submission.status)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Problem Detail & Code Editor */}
              <Card className="lg:col-span-2">
                {selectedProblem ? (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{selectedProblem.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                              {selectedProblem.difficulty}
                            </Badge>
                            <span>{selectedProblem.points} points</span>
                          </CardDescription>
                        </div>
                        {getMySubmission(selectedContest.id, selectedProblem.id) && (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(getMySubmission(selectedContest.id, selectedProblem.id)!.status)}
                            <span className="text-sm font-medium">
                              {getMySubmission(selectedContest.id, selectedProblem.id)!.score} pts
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{selectedProblem.description}</p>
                      </div>

                      {selectedProblem.testCases.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <div className="space-y-2">
                            {selectedProblem.testCases.map((tc, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg text-sm font-mono">
                                <div>
                                  <span className="text-xs text-muted-foreground block mb-1">Input:</span>
                                  {tc.input}
                                </div>
                                <div>
                                  <span className="text-xs text-muted-foreground block mb-1">Output:</span>
                                  {tc.output}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Your Solution</h4>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="cpp">C++</SelectItem>
                              <SelectItem value="java">Java</SelectItem>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Textarea
                          placeholder={`# Write your ${language} solution here...`}
                          className="font-mono min-h-[200px]"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Solution"}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-12 text-center">
                    <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Select a Problem</h3>
                    <p className="text-muted-foreground">Choose a problem from the list to start coding.</p>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Coding Contests</h1>
              <p className="text-muted-foreground mt-1">Participate in contests and compete with peers</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeContests.length}</p>
                    <p className="text-xs text-muted-foreground">Active Contests</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{upcomingContests.length}</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <Medal className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {demoContestSubmissions
                        .filter((s) => s.studentId === currentStudent.id)
                        .reduce((acc, s) => acc + s.score, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active" className="gap-2">
                  <Play className="h-4 w-4" />
                  Active ({activeContests.length})
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Upcoming ({upcomingContests.length})
                </TabsTrigger>
                <TabsTrigger value="ended" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Ended ({endedContests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                {activeContests.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">No Active Contests</h3>
                      <p className="text-muted-foreground">Check back later for new contests.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {activeContests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingContests.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">No Upcoming Contests</h3>
                      <p className="text-muted-foreground">New contests will be announced soon.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {upcomingContests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ended" className="mt-6">
                {endedContests.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Medal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">No Past Contests</h3>
                      <p className="text-muted-foreground">Completed contests will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {endedContests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
    </DashboardLayout>
  );
};

export default StudentContests;
