import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  PlusCircle,
} from "lucide-react";

const FacultyDashboard = () => {
  const classes = [
    { name: "IT 3rd Year A", subject: "Data Structures", students: 60, nextClass: "10:00 AM" },
    { name: "IT 3rd Year B", subject: "Data Structures", students: 58, nextClass: "11:30 AM" },
    { name: "DS 2nd Year A", subject: "Algorithms", students: 55, nextClass: "2:00 PM" },
  ];

  const pendingTasks = [
    { title: "Grade DSA Assignment 2", class: "IT 3rd Year A", count: 45, type: "grading" },
    { title: "Review Lab Submissions", class: "IT 3rd Year B", count: 32, type: "lab" },
    { title: "Prepare Quiz 3", class: "DS 2nd Year A", count: null, type: "quiz" },
  ];

  const attendanceAlerts = [
    { name: "Amit Kumar", class: "IT 3rd Year A", attendance: 68 },
    { name: "Priya Sharma", class: "IT 3rd Year B", attendance: 72 },
    { name: "Rahul Singh", class: "DS 2nd Year A", attendance: 70 },
  ];

  const recentActivity = [
    { action: "Marked attendance", class: "IT 3rd Year A", time: "30 mins ago" },
    { action: "Posted assignment", class: "IT 3rd Year B", time: "2 hours ago" },
    { action: "Graded 15 submissions", class: "DS 2nd Year A", time: "4 hours ago" },
    { action: "Created lab session", class: "IT 3rd Year A", time: "Yesterday" },
  ];

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Good Morning, Dr. Smith! ☀️</h1>
            <p className="mt-1 text-muted-foreground">
              You have 3 classes scheduled today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
            <Button variant="accent">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value="173"
            subtitle="Across 3 classes"
            icon={Users}
            color="info"
            delay={0}
          />
          <StatCard
            title="Pending Grading"
            value="77"
            subtitle="Submissions to review"
            icon={FileText}
            color="warning"
            delay={0.1}
          />
          <StatCard
            title="Avg Attendance"
            value="84%"
            subtitle="This month"
            icon={Calendar}
            color="success"
            delay={0.2}
          />
          <StatCard
            title="Labs Created"
            value="12"
            subtitle="This semester"
            icon={BookOpen}
            color="accent"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((cls, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{cls.name}</h4>
                          <Badge variant="secondary">{cls.subject}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {cls.students} students
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">Next Class</p>
                          <p className="text-lg font-bold text-success">{cls.nextClass}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="rounded-lg border-l-4 border-warning bg-warning/5 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.class}</p>
                        </div>
                        {task.count && (
                          <Badge variant="secondary">{task.count}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Attendance Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Low Attendance Alerts
                </CardTitle>
                <CardDescription>Students below 75% attendance threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceAlerts.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border bg-destructive/5 p-3"
                    >
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.class}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20">
                          <p className="text-right text-sm font-medium text-destructive">
                            {student.attendance}%
                          </p>
                          <Progress value={student.attendance} className="h-2 bg-destructive/20" />
                        </div>
                        <Button size="sm" variant="outline">
                          Notify
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.class}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
