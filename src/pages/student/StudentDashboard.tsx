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
                  const isExpanded = expandedSubject === subject.id;

                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card
                        className="cursor-pointer transition-all hover:shadow-lg"
                        onClick={() => handleSubjectClick(subject.id)}
                      >
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <Badge variant="outline" className="mb-2">{subject.code}</Badge>
                                <h3 className="font-semibold text-lg">{subject.name}</h3>
                              </div>
                              <BookOpen className="h-5 w-5 text-primary/60" />
                            </div>
                          </div>

                          {/* Subject Stats */}
                          <div className="grid grid-cols-3 gap-3 mb-4 text-center text-sm">
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

                          {/* Subject Options - Show when expanded */}
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-4 border-t space-y-2"
                            >
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateWithSubject("/student/attendance", subject.id);
                                }}
                              >
                                <Calendar className="h-4 w-4 mr-2" />
                                Attendance
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateWithSubject("/student/assignments", subject.id);
                                }}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Assignments
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateWithSubject("/student/labs", subject.id);
                                }}
                              >
                                <FlaskConical className="h-4 w-4 mr-2" />
                                Lab Sessions
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateWithSubject("/student/contests", subject.id);
                                }}
                              >
                                <Trophy className="h-4 w-4 mr-2" />
                                Contests
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateWithSubject("/student/marks", subject.id);
                                }}
                              >
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Marks & Progress
                              </Button>
                            </motion.div>
                          )}
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
