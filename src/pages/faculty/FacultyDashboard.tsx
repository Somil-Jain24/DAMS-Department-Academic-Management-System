import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import Whiteboard, { Note } from "@/components/whiteboard/Whiteboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  Calendar,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClass } from "@/contexts/ClassContext";
import { demoClasses } from "@/data/demoData";

const FacultyDashboard = () => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [selectedClassForNote, setSelectedClassForNote] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { setSelectedClass } = useClass();

  const handleNoteSelect = (note: Note) => {
    setEditingNote(note);
    setShowWhiteboard(true);
  };

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setShowWhiteboard(true);
  };

  const handleCreateClassNote = (classId: string) => {
    setSelectedClassForNote(classId);
    setEditingNote(undefined);
    setShowWhiteboard(true);
  };

  const handleClassSelect = (classId: string) => {
    const classData = demoClasses.find((c) => c.id === classId);
    if (classData) {
      setSelectedClass({
        id: classData.id,
        name: classData.name,
        department: classData.department,
        year: classData.year,
      });
      navigate(`/faculty/class/${classId}/attendance`);
    }
  };

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
    <DashboardLayout
      role="faculty"
      onNoteSelect={handleNoteSelect}
      onCreateNote={handleCreateNote}
    >
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
          <Button
            onClick={handleCreateNote}
            className="gap-2 w-full sm:w-auto"
          >
            <PlusCircle className="h-4 w-4" />
            Create Notes
          </Button>
        </motion.div>

        {/* Classes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
              <CardDescription>Click on a class to manage attendance, assignments, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {demoClasses.map((cls, index) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="space-y-4 h-full flex flex-col">
                      {/* Class Info */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{cls.name}</h3>
                            <p className="text-sm text-muted-foreground">{cls.department}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{cls.students} students</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCreateClassNote(cls.id)}
                          className="flex-1 h-8 text-xs"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Notes
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleClassSelect(cls.id)}
                          className="flex-1 h-8 text-xs"
                        >
                          View Class
                        </Button>
                      </div>
                    </div>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Whiteboard Sidebar */}
      <Whiteboard
        isOpen={showWhiteboard}
        onClose={() => {
          setShowWhiteboard(false);
          setEditingNote(undefined);
          setSelectedClassForNote(undefined);
        }}
        editingNote={editingNote}
        classId={selectedClassForNote}
        className={selectedClassForNote ? demoClasses.find(c => c.id === selectedClassForNote)?.name : undefined}
      />
    </DashboardLayout>
  );
};

export default FacultyDashboard;
