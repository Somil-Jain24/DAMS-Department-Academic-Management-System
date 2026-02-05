import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  BookOpen,
  Trophy,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  ClipboardList,
  FlaskConical,
  Target,
} from "lucide-react";
import { useSubject } from "@/contexts/SubjectContext";
import { demoSubjects, currentStudent, demoAssignments, demoLabSessions, demoContests } from "@/data/demoData";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { setSelectedSubject, selectedSubject } = useSubject();
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const handleSubjectClick = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
    const subject = demoSubjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  const navigateWithSubject = (path: string, subjectId: string) => {
    const subject = demoSubjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
    navigate(path);
  };

  const getSubjectStats = (subjectId: string) => {
    const assignments = demoAssignments.filter(a => a.subjectId === subjectId).length;
    const labs = demoLabSessions.filter(l => l.subjectId === subjectId).length;
    const contests = demoContests.filter(c => c.subjectId === subjectId).length;
    return { assignments, labs, contests };
  };

  const upcomingDeadlines = [
    { title: "DSA Assignment 3", subject: "Data Structures", due: "2 days", type: "assignment" },
    { title: "DBMS Lab 5", subject: "Database Systems", due: "4 days", type: "lab" },
    { title: "CN Quiz 2", subject: "Computer Networks", due: "1 week", type: "quiz" },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold lg:text-3xl">Welcome back, John! 👋</h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your academics today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance"
            value="87%"
            subtitle="This semester"
            icon={Calendar}
            color="success"
            trend={{ value: 2, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Current GPA"
            value="8.5"
            subtitle="Out of 10"
            icon={TrendingUp}
            color="info"
            delay={0.1}
          />
          <StatCard
            title="Assignments"
            value="12/15"
            subtitle="Submitted"
            icon={FileText}
            color="accent"
            delay={0.2}
          />
          <StatCard
            title="Lab Progress"
            value="8/10"
            subtitle="Labs completed"
            icon={BookOpen}
            color="warning"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Current semester courses and progress</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{course.name}</h4>
                          <Badge variant="secondary">{course.code}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{course.faculty}</p>
                      </div>
                      <div className="w-32 space-y-1 text-right">
                        <p className="text-sm font-medium">{course.progress}%</p>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border-l-4 border-warning bg-warning/5 p-3"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subject}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {item.due}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Ready for the Coding Contest?</h3>
                <p className="mt-1 text-primary-foreground/80">
                  The weekly coding challenge starts in 2 hours. Don't miss out!
                </p>
              </div>
              <Button variant="hero" size="lg">
                <Trophy className="mr-2 h-5 w-5" />
                Join Contest
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
