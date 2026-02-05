import { useMemo, useState } from "react";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useSubject } from "@/contexts/SubjectContext";
import {
  currentStudent,
  demoSubjects,
  demoAttendanceRecords,
  calculateAttendancePercentage,
} from "@/data/demoData";

const StudentAttendance = () => {
  const { selectedSubject } = useSubject();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");

  useEffect(() => {
    // If a subject is selected from context, use it as the default filter
    if (selectedSubject) {
      setSelectedSubjectFilter(selectedSubject.id);
    }
  }, [selectedSubject]);

  // Calculate overall attendance
  const overallAttendance = useMemo(() => {
    return calculateAttendancePercentage(currentStudent.id, demoAttendanceRecords);
  }, []);

  // Calculate subject-wise attendance
  const subjectAttendance = useMemo(() => {
    return demoSubjects.map((subject) => ({
      subject,
      percentage: calculateAttendancePercentage(
        currentStudent.id,
        demoAttendanceRecords,
        subject.id
      ),
    }));
  }, []);

  // Get attendance records for display
  const filteredRecords = useMemo(() => {
    return demoAttendanceRecords
      .filter(
        (r) =>
          r.studentId === currentStudent.id &&
          (selectedSubjectFilter === "all" || r.subject === selectedSubjectFilter)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);
  }, [selectedSubjectFilter]);

  // Pie chart data
  const pieData = useMemo(() => {
    const records = demoAttendanceRecords.filter(
      (r) =>
        r.studentId === currentStudent.id &&
        (selectedSubject === "all" || r.subject === selectedSubject)
    );
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const leave = records.filter((r) => r.status === "leave").length;

    return [
      { name: "Present", value: present, color: "hsl(var(--success))" },
      { name: "Absent", value: absent, color: "hsl(var(--destructive))" },
      { name: "Leave", value: leave, color: "hsl(var(--warning))" },
    ];
  }, [selectedSubject]);

  // Bar chart data for subject-wise
  const barData = subjectAttendance.map((sa) => ({
    name: sa.subject.code,
    attendance: sa.percentage,
    fill: sa.percentage >= 75 ? "hsl(var(--success))" : sa.percentage >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))",
  }));

  const isLowAttendance = overallAttendance < 75;
  const attendanceNeeded = isLowAttendance ? Math.ceil((75 * 30 - overallAttendance * 30 / 100) / (100 - 75)) : 0;

  const getSubjectName = (subjectId: string) => {
    return demoSubjects.find((s) => s.id === subjectId)?.name || subjectId;
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Attendance Tracker</h1>
          <p className="text-muted-foreground">
            Monitor your attendance across all subjects
          </p>
        </div>

        {/* Low Attendance Alert */}
        {isLowAttendance && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Low Attendance Warning!</AlertTitle>
              <AlertDescription>
                Your attendance is below the required 75% threshold. You need to
                attend approximately {attendanceNeeded} more consecutive classes
                to reach the minimum requirement.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Overall Attendance
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        overallAttendance >= 75
                          ? "text-success"
                          : overallAttendance >= 60
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {overallAttendance}%
                    </p>
                  </div>
                  {overallAttendance >= 75 ? (
                    <TrendingUp className="h-8 w-8 text-success" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-destructive" />
                  )}
                </div>
                <Progress
                  value={overallAttendance}
                  className="mt-3 h-2"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Classes Attended</p>
                    <p className="text-3xl font-bold">
                      {pieData[0].value}
                    </p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Classes Missed</p>
                    <p className="text-3xl font-bold text-destructive">
                      {pieData[1].value}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">On Leave</p>
                    <p className="text-3xl font-bold text-warning">
                      {pieData[2].value}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-6">
                  {pieData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bar Chart - Subject-wise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Attendance"]}
                      />
                      <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span>≥75%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-warning" />
                    <span>60-74%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                    <span>&lt;60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Subject Cards */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {subjectAttendance.map(({ subject, percentage }, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  percentage < 75 ? "border-destructive/50" : ""
                }`}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground">
                      {subject.code}
                    </p>
                    <p className="text-sm font-semibold">{subject.name}</p>
                    <p
                      className={`mt-2 text-2xl font-bold ${
                        percentage >= 75
                          ? "text-success"
                          : percentage >= 60
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {percentage}%
                    </p>
                    <Progress value={percentage} className="mt-2 h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Records */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Attendance History</CardTitle>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {demoSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.code} - {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <TableCell>
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{getSubjectName(record.subject)}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          record.status === "present"
                            ? "default"
                            : record.status === "absent"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          record.status === "present"
                            ? "bg-success"
                            : record.status === "leave"
                            ? "bg-warning"
                            : ""
                        }
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
