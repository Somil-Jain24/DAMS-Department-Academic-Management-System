import { motion } from "framer-motion";
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
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const StudentDashboard = () => {
  const courses = [
    { name: "Data Structures", code: "CS301", faculty: "Dr. Smith", progress: 75 },
    { name: "Database Systems", code: "CS302", faculty: "Prof. Johnson", progress: 60 },
    { name: "Computer Networks", code: "CS303", faculty: "Dr. Williams", progress: 85 },
    { name: "Software Engineering", code: "CS304", faculty: "Prof. Brown", progress: 45 },
  ];

  const upcomingDeadlines = [
    { title: "DSA Assignment 3", subject: "Data Structures", due: "2 days", type: "assignment" },
    { title: "DBMS Lab 5", subject: "Database Systems", due: "4 days", type: "lab" },
    { title: "CN Quiz 2", subject: "Computer Networks", due: "1 week", type: "quiz" },
  ];

  const announcements = [
    {
      title: "MST 2 Schedule Released",
      description: "Mid-semester test 2 will be held from Dec 20-24",
      time: "2 hours ago",
      priority: "high",
    },
    {
      title: "Hackathon Registration Open",
      description: "Register for the annual department hackathon",
      time: "1 day ago",
      priority: "medium",
    },
    {
      title: "Lab Hours Extended",
      description: "Computer lab now open till 8 PM on weekdays",
      time: "3 days ago",
      priority: "low",
    },
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

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest updates from your department</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/30"
                  >
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        announcement.priority === "high"
                          ? "bg-destructive/10 text-destructive"
                          : announcement.priority === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {announcement.priority === "high" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {announcement.description}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs text-muted-foreground">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
