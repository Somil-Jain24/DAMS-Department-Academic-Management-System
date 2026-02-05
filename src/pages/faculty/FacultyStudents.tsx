import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClassDashboardLayout from "@/components/layout/ClassDashboardLayout";
import { useClass } from "@/contexts/ClassContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import {
  demoStudents,
  demoAttendanceRecords,
  demoAssignmentSubmissions,
  demoLabSubmissions,
  demoContestSubmissions,
  demoAssignments,
  demoLabSessions,
  demoContests,
  demoSubjects,
  demoClasses,
  calculateAttendancePercentage,
  Student,
} from "@/data/demoData";

const FacultyStudents = () => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const classFilteredStudents = isInClassContext
    ? demoStudents.filter((s) => s.class === selectedClass?.name)
    : demoStudents;

  const filteredStudents = classFilteredStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentStats = (studentId: string) => {
    const attendance = calculateAttendancePercentage(studentId, demoAttendanceRecords);
    const assignmentsSub = demoAssignmentSubmissions.filter(
      (s) => s.studentId === studentId && s.status !== "pending"
    ).length;
    const labsCompleted = demoLabSubmissions.filter(
      (s) => s.studentId === studentId && s.status !== "pending"
    ).length;
    const contestsParticipated = new Set(
      demoContestSubmissions.filter((s) => s.studentId === studentId).map((s) => s.contestId)
    ).size;

    return { attendance, assignmentsSub, labsCompleted, contestsParticipated };
  };

  const getDetailedStats = (studentId: string) => {
    // Attendance by subject
    const attendanceBySubject = demoSubjects.map((subject) => ({
      subject: subject.name,
      percentage: calculateAttendancePercentage(studentId, demoAttendanceRecords, subject.id),
    }));

    // Assignment grades
    const assignmentGrades = demoAssignmentSubmissions
      .filter((s) => s.studentId === studentId && s.marks !== undefined)
      .map((s) => {
        const assignment = demoAssignments.find((a) => a.id === s.assignmentId);
        return {
          title: assignment?.title || "Unknown",
          marks: s.marks!,
          maxMarks: assignment?.maxMarks || 100,
        };
      });

    // Lab grades
    const labGrades = demoLabSubmissions
      .filter((s) => s.studentId === studentId && s.marks !== undefined)
      .map((s) => {
        const lab = demoLabSessions.find((l) => l.id === s.labSessionId);
        return {
          title: lab?.title || "Unknown",
          marks: s.marks!,
        };
      });

    // Contest scores
    const contestScores = demoContests.map((contest) => {
      const subs = demoContestSubmissions.filter(
        (s) => s.contestId === contest.id && s.studentId === studentId
      );
      const totalScore = subs.reduce((acc, s) => acc + s.score, 0);
      return {
        title: contest.title,
        score: totalScore,
        problemsSolved: subs.filter((s) => s.status === "accepted").length,
      };
    });

    return { attendanceBySubject, assignmentGrades, labGrades, contestScores };
  };

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
          <h1 className="text-2xl font-bold lg:text-3xl">Student Directory</h1>
          <p className="mt-1 text-muted-foreground">View and monitor student performance</p>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, roll number, or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student, index) => {
            const stats = getStudentStats(student.id);
            const isLowAttendance = stats.attendance < 75;

            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    isLowAttendance ? "border-destructive/50" : ""
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{student.name}</h3>
                          {isLowAttendance && (
                            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">{student.class}</Badge>
                          <Badge variant="secondary">GPA: {student.gpa}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Attendance</p>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={stats.attendance}
                            className={`h-2 flex-1 ${
                              isLowAttendance ? "bg-destructive/20" : ""
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              isLowAttendance ? "text-destructive" : "text-success"
                            }`}
                          >
                            {stats.attendance}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Assignments</p>
                        <p className="font-medium">
                          {stats.assignmentsSub}/{demoAssignments.length}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Labs</p>
                        <p className="font-medium">
                          {stats.labsCompleted}/{demoLabSessions.length}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Contests</p>
                        <p className="font-medium">{stats.contestsParticipated}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Student Detail Dialog */}
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {selectedStudent?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span>{selectedStudent?.name}</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    {selectedStudent?.rollNumber}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>

            {selectedStudent && (
              <div className="space-y-6 mt-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.class} - Section {selectedStudent.section}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>GPA: {selectedStudent.gpa}</span>
                  </div>
                </div>

                {/* Detailed Stats */}
                <Tabs defaultValue="attendance">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="labs">Labs</TabsTrigger>
                    <TabsTrigger value="contests">Contests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="attendance" className="mt-4 space-y-4">
                    {getDetailedStats(selectedStudent.id).attendanceBySubject.map((item) => (
                      <div key={item.subject} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.subject}</span>
                          <span
                            className={
                              item.percentage < 75 ? "text-destructive" : "text-success"
                            }
                          >
                            {item.percentage}%
                          </span>
                        </div>
                        <Progress
                          value={item.percentage}
                          className={`h-2 ${item.percentage < 75 ? "bg-destructive/20" : ""}`}
                        />
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="assignments" className="mt-4 space-y-3">
                    {getDetailedStats(selectedStudent.id).assignmentGrades.length > 0 ? (
                      getDetailedStats(selectedStudent.id).assignmentGrades.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <Badge variant="secondary">
                            {item.marks}/{item.maxMarks}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        No graded assignments yet
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="labs" className="mt-4 space-y-3">
                    {getDetailedStats(selectedStudent.id).labGrades.length > 0 ? (
                      getDetailedStats(selectedStudent.id).labGrades.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <Badge variant="secondary">{item.marks}/100</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        No graded labs yet
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="contests" className="mt-4 space-y-3">
                    {getDetailedStats(selectedStudent.id).contestScores.filter(
                      (c) => c.score > 0
                    ).length > 0 ? (
                      getDetailedStats(selectedStudent.id)
                        .contestScores.filter((c) => c.score > 0)
                        .map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-accent" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.problemsSolved} solved</Badge>
                              <Badge variant="secondary">{item.score} pts</Badge>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        No contest participation yet
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </LayoutComponent>
  );
};

export default FacultyStudents;
