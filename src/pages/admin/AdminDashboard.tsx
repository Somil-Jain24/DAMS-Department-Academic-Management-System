import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  BookOpen,
  Trophy,
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  Settings,
  UserPlus,
  FileText,
  Activity,
} from "lucide-react";

const AdminDashboard = () => {
  const departments = [
    { name: "Information Technology", students: 320, faculty: 25, classes: 6 },
    { name: "Data Science", students: 180, faculty: 15, classes: 3 },
  ];

  const topPerformers = [
    { name: "Ananya Gupta", class: "IT 3rd Year A", gpa: 9.8, badge: "Gold" },
    { name: "Rohan Verma", class: "DS 3rd Year", gpa: 9.6, badge: "Silver" },
    { name: "Sneha Patel", class: "IT 2nd Year B", gpa: 9.5, badge: "Bronze" },
  ];

  const recentActions = [
    { action: "New faculty added", user: "Dr. Mehta", time: "2 hours ago", type: "user" },
    { action: "Academic calendar updated", user: "Admin", time: "4 hours ago", type: "calendar" },
    { action: "Bulk students imported", user: "Admin", time: "Yesterday", type: "import" },
    { action: "System backup completed", user: "System", time: "Yesterday", type: "system" },
  ];

  const systemHealth = [
    { metric: "Server Uptime", value: "99.9%", status: "healthy" },
    { metric: "Database Status", value: "Online", status: "healthy" },
    { metric: "Storage Used", value: "45%", status: "warning" },
    { metric: "Active Sessions", value: "234", status: "healthy" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Admin Dashboard 🎛️</h1>
            <p className="mt-1 text-muted-foreground">
              Complete system overview and management.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="accent">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value="500+"
            subtitle="Across all classes"
            icon={GraduationCap}
            color="info"
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Faculty Members"
            value="40"
            subtitle="IT & DS departments"
            icon={Users}
            color="success"
            delay={0.1}
          />
          <StatCard
            title="Active Classes"
            value="9"
            subtitle="2nd, 3rd, Final Year"
            icon={BookOpen}
            color="accent"
            delay={0.2}
          />
          <StatCard
            title="Achievements"
            value="156"
            subtitle="This semester"
            icon={Trophy}
            color="warning"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Department Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Department Overview</CardTitle>
                  <CardDescription>IT & DS department statistics</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-semibold">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {dept.classes} classes active
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-info">{dept.students}</p>
                            <p className="text-xs text-muted-foreground">Students</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-success">{dept.faculty}</p>
                            <p className="text-xs text-muted-foreground">Faculty</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-success" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="text-sm text-muted-foreground">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.value}</span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            item.status === "healthy" ? "bg-success" : "bg-warning"
                          }`}
                        />
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
          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Top Performers
                </CardTitle>
                <CardDescription>This month's academic achievers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                            student.badge === "Gold"
                              ? "bg-amber-100 text-amber-600"
                              : student.badge === "Silver"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{student.gpa}</p>
                        <Badge
                          variant="secondary"
                          className={
                            student.badge === "Gold"
                              ? "bg-amber-100 text-amber-700"
                              : student.badge === "Silver"
                              ? "bg-slate-100 text-slate-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {student.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>Recent system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div
                        className={`rounded-lg p-2 ${
                          action.type === "user"
                            ? "bg-info/10 text-info"
                            : action.type === "calendar"
                            ? "bg-success/10 text-success"
                            : action.type === "import"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {action.type === "user" ? (
                          <UserPlus className="h-4 w-4" />
                        ) : action.type === "calendar" ? (
                          <Calendar className="h-4 w-4" />
                        ) : action.type === "import" ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          <Settings className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{action.action}</p>
                        <p className="text-sm text-muted-foreground">by {action.user}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{action.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Academic Calendar Updates</h3>
                <p className="mt-1 text-primary-foreground/80">
                  MST 2 schedules need to be finalized. Review and publish the calendar.
                </p>
              </div>
              <Button variant="hero" size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                Update Calendar
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
