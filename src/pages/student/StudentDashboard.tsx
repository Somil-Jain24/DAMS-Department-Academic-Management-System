import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  TrendingUp,
  Trophy,
  ArrowRight,
  Calendar,
  FileText,
} from "lucide-react";
import { demoSubjects, currentStudent, demoAssignments, demoLabSessions, demoContests } from "@/data/demoData";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const getSubjectStats = (subjectId: string) => {
    const assignments = demoAssignments.filter(a => a.subjectId === subjectId).length;
    const labs = demoLabSessions.filter(l => l.subjectId === subjectId).length;
    const contests = demoContests.filter(c => c.subjectId === subjectId).length;
    return { assignments, labs, contests };
  };

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
        <div className="grid gap-6">
          {/* Subjects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h2 className="text-xl font-bold mb-4">Your Subjects</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {demoSubjects.map((subject, index) => {
                  const stats = getSubjectStats(subject.id);

                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card
                        className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                        onClick={() => navigate(`/student/subject/${subject.id}`)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-2">{subject.code}</Badge>
                              <h3 className="font-semibold text-lg">{subject.name}</h3>
                            </div>
                            <BookOpen className="h-5 w-5 text-primary/60 flex-shrink-0 ml-2" />
                          </div>

                          {/* Subject Stats */}
                          <div className="grid grid-cols-3 gap-3 text-center text-sm">
                            <div>
                              <p className="text-2xl font-bold text-blue-500">{stats.assignments}</p>
                              <p className="text-xs text-muted-foreground">Assignments</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-purple-500">{stats.labs}</p>
                              <p className="text-xs text-muted-foreground">Labs</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-orange-500">{stats.contests}</p>
                              <p className="text-xs text-muted-foreground">Contests</p>
                            </div>
                          </div>

                          {/* Click to open hint */}
                          <div className="mt-4 pt-4 border-t flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            Click to open <ArrowRight className="h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
