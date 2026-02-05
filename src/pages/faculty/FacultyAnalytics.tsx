import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClassDashboardLayout from "@/components/layout/ClassDashboardLayout";
import { useClass } from "@/contexts/ClassContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  BookOpen,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react";
import {
  demoStudents,
  demoSubjects,
  demoAttendanceRecords,
  demoAssignments,
  demoAssignmentSubmissions,
  demoLabSessions,
  demoLabSubmissions,
  demoContests,
  demoContestSubmissions,
  calculateAttendancePercentage,
  getLowAttendanceStudents,
  getSubjectName,
} from "@/data/demoData";

const FacultyAnalytics = () => {
  const { selectedClass, isInClassContext } = useClass();

  // Filter students by class if in class context
  const filteredStudents = isInClassContext
    ? demoStudents.filter((s) => s.class === selectedClass?.name)
    : demoStudents;

  // Attendance Analytics
  const attendanceBySubject = demoSubjects.map((subject) => {
    const subjectRecords = demoAttendanceRecords.filter((r) => r.subject === subject.id);
    const presentCount = subjectRecords.filter((r) => r.status === "present").length;
    const percentage = subjectRecords.length > 0 ? Math.round((presentCount / subjectRecords.length) * 100) : 0;
    return { name: subject.code, attendance: percentage };
  });

  const lowAttendanceStudents = getLowAttendanceStudents(demoAttendanceRecords);

  // Assignment Analytics
  const assignmentStats = {
    total: demoAssignments.length,
    totalSubmissions: demoAssignmentSubmissions.filter((s) => s.status !== "pending").length,
    graded: demoAssignmentSubmissions.filter((s) => s.status === "graded").length,
    late: demoAssignmentSubmissions.filter((s) => s.status === "late").length,
  };

  const assignmentSubmissionRate = demoAssignments.map((assignment) => {
    const subs = demoAssignmentSubmissions.filter((s) => s.assignmentId === assignment.id);
    const submitted = subs.filter((s) => s.status !== "pending").length;
    return {
      name: assignment.title.substring(0, 15) + "...",
      submitted: Math.round((submitted / demoStudents.length) * 100),
    };
  });

  // Lab Analytics
  const labCompletionData = demoLabSessions.map((lab) => {
    const subs = demoLabSubmissions.filter((s) => s.labSessionId === lab.id);
    const completed = subs.filter((s) => s.status !== "pending").length;
    return {
      name: lab.title.substring(0, 12) + "...",
      completed: Math.round((completed / demoStudents.length) * 100),
    };
  });

  // Contest Analytics
  const contestParticipation = demoContests.map((contest) => {
    const participants = new Set(
      demoContestSubmissions.filter((s) => s.contestId === contest.id).map((s) => s.studentId)
    );
    return {
      name: contest.title.substring(0, 15) + "...",
      participants: participants.size,
    };
  });

  // Performance Distribution
  const performanceDistribution = [
    { name: "Excellent (>85%)", value: demoStudents.filter((s) => s.gpa >= 8.5).length, color: "hsl(var(--success))" },
    { name: "Good (70-85%)", value: demoStudents.filter((s) => s.gpa >= 7 && s.gpa < 8.5).length, color: "hsl(var(--info))" },
    { name: "Average (50-70%)", value: demoStudents.filter((s) => s.gpa >= 5 && s.gpa < 7).length, color: "hsl(var(--warning))" },
    { name: "Below Avg (<50%)", value: demoStudents.filter((s) => s.gpa < 5).length, color: "hsl(var(--destructive))" },
  ];

  // Weekly Trend Data (mock)
  const weeklyTrend = [
    { week: "Week 1", attendance: 82, submissions: 75 },
    { week: "Week 2", attendance: 85, submissions: 80 },
    { week: "Week 3", attendance: 78, submissions: 70 },
    { week: "Week 4", attendance: 88, submissions: 85 },
  ];

  const LayoutComponent = isInClassContext ? ClassDashboardLayout : DashboardLayout;
  const layoutProps = isInClassContext ? {} : { role: "faculty" as const };

  return (
    <LayoutComponent {...layoutProps}>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold lg:text-3xl">Analytics Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Comprehensive insights into student performance</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold text-info">{demoStudents.length}</p>
                  </div>
                  <Users className="h-10 w-10 text-info/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-3xl font-bold text-success">84%</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-success/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low Attendance</p>
                    <p className="text-3xl font-bold text-warning">{lowAttendanceStudents.length}</p>
                  </div>
                  <AlertTriangle className="h-10 w-10 text-warning/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Contests</p>
                    <p className="text-3xl font-bold text-accent">
                      {demoContests.filter((c) => c.status === "active").length}
                    </p>
                  </div>
                  <Trophy className="h-10 w-10 text-accent/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <Tabs defaultValue="attendance">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-4 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Subject-wise Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceBySubject}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      />
                      <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Low Attendance Students
                  </CardTitle>
                  <CardDescription>Students below 75% attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowAttendanceStudents.slice(0, 5).map((entry) => (
                      <div key={entry.student.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{entry.student.name}</span>
                          <span className="text-destructive font-semibold">{entry.percentage}%</span>
                        </div>
                        <Progress value={entry.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="submissions"
                      stroke="hsl(var(--success))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="mt-4 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Submission Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={assignmentSubmissionRate} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      />
                      <Bar dataKey="submitted" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${value}`}
                      >
                        {performanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="labs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lab Completion Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={labCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="completed" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contests" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Contest Participation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contestParticipation}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="participants" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutComponent>
  );
};

export default FacultyAnalytics;
