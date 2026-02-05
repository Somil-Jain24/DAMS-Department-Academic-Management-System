import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClassDashboardLayout from "@/components/layout/ClassDashboardLayout";
import { useClass } from "@/contexts/ClassContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  X,
  Clock,
  AlertTriangle,
  Save,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import {
  demoStudents,
  demoSubjects,
  demoAttendanceRecords,
  getAttendanceForDate,
  getLowAttendanceStudents,
  calculateAttendancePercentage,
  type AttendanceRecord,
} from "@/data/demoData";

const FacultyAttendance = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSubject, setSelectedSubject] = useState(demoSubjects[0].id);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(demoAttendanceRecords);
  const [attendance, setAttendance] = useState<Map<string, "present" | "absent" | "leave">>(new Map());
  const [hasChanges, setHasChanges] = useState(false);

  const dateString = selectedDate.toISOString().split("T")[0];

  // Load attendance for selected date and subject
  useMemo(() => {
    const existingAttendance = getAttendanceForDate(dateString, selectedSubject, attendanceRecords);
    setAttendance(new Map(existingAttendance));
    setHasChanges(false);
  }, [dateString, selectedSubject, attendanceRecords]);

  const lowAttendanceStudents = useMemo(
    () => getLowAttendanceStudents(attendanceRecords, 75),
    [attendanceRecords]
  );

  const markAttendance = (studentId: string, status: "present" | "absent" | "leave") => {
    const newAttendance = new Map(attendance);
    newAttendance.set(studentId, status);
    setAttendance(newAttendance);
    setHasChanges(true);
  };

  const markAllPresent = () => {
    const newAttendance = new Map<string, "present" | "absent" | "leave">();
    demoStudents.forEach((s) => newAttendance.set(s.id, "present"));
    setAttendance(newAttendance);
    setHasChanges(true);
  };

  const clearAll = () => {
    setAttendance(new Map());
    setHasChanges(true);
  };

  const saveAttendance = () => {
    // Update records
    const newRecords = attendanceRecords.filter(
      (r) => !(r.date === dateString && r.subject === selectedSubject)
    );

    attendance.forEach((status, studentId) => {
      newRecords.push({
        id: `att-${studentId}-${selectedSubject}-${dateString}`,
        studentId,
        date: dateString,
        status,
        subject: selectedSubject,
      });
    });

    setAttendanceRecords(newRecords);
    setHasChanges(false);

    toast({
      title: "Attendance Saved",
      description: `Attendance for ${selectedDate.toLocaleDateString()} has been saved successfully.`,
    });
  };

  const presentCount = Array.from(attendance.values()).filter((s) => s === "present").length;
  const absentCount = Array.from(attendance.values()).filter((s) => s === "absent").length;
  const leaveCount = Array.from(attendance.values()).filter((s) => s === "leave").length;

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground">Mark and manage student attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllPresent}>
              <UserCheck className="mr-2 h-4 w-4" />
              Mark All Present
            </Button>
            <Button variant="outline" onClick={clearAll}>
              <UserX className="mr-2 h-4 w-4" />
              Clear All
            </Button>
            <Button onClick={saveAttendance} disabled={!hasChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Calendar & Subject Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Date & Subject</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-xl border"
                  disabled={(date) => date > new Date() || date.getDay() === 0 || date.getDay() === 6}
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{presentCount}</div>
                    <div className="text-xs text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{absentCount}</div>
                    <div className="text-xs text-muted-foreground">Absent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{leaveCount}</div>
                    <div className="text-xs text-muted-foreground">Leave</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Low Attendance Alerts */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Low Attendance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowAttendanceStudents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No students below 75% attendance</p>
                  ) : (
                    lowAttendanceStudents.map(({ student, percentage }) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg bg-destructive/10 p-3"
                      >
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                        </div>
                        <Badge variant="destructive">{percentage}%</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Student List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Attendance - {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Overall %</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoStudents.map((student, index) => {
                      const status = attendance.get(student.id);
                      const overallPercentage = calculateAttendancePercentage(student.id, attendanceRecords);

                      return (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="group"
                        >
                          <TableCell className="font-medium">{student.rollNumber}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                overallPercentage >= 75
                                  ? "default"
                                  : overallPercentage >= 60
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {overallPercentage}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant={status === "present" ? "default" : "outline"}
                                className={status === "present" ? "bg-success hover:bg-success/90" : ""}
                                onClick={() => markAttendance(student.id, "present")}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant={status === "absent" ? "default" : "outline"}
                                className={status === "absent" ? "bg-destructive hover:bg-destructive/90" : ""}
                                onClick={() => markAttendance(student.id, "absent")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant={status === "leave" ? "default" : "outline"}
                                className={status === "leave" ? "bg-warning hover:bg-warning/90" : ""}
                                onClick={() => markAttendance(student.id, "leave")}
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyAttendance;
