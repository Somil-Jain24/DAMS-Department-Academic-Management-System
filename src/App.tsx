import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClassProvider } from "./contexts/ClassContext";
import { SubjectProvider } from "./contexts/SubjectContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentLabs from "./pages/student/StudentLabs";
import StudentContests from "./pages/student/StudentContests";
import StudentMarks from "./pages/student/StudentMarks";
import StudentProfile from "./pages/student/StudentProfile";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyAttendance from "./pages/faculty/FacultyAttendance";
import FacultyAssignments from "./pages/faculty/FacultyAssignments";
import FacultyLabs from "./pages/faculty/FacultyLabs";
import FacultyContests from "./pages/faculty/FacultyContests";
import FacultyAnalytics from "./pages/faculty/FacultyAnalytics";
import FacultyStudents from "./pages/faculty/FacultyStudents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClassProvider>
          <SubjectProvider>
            <Routes>
            <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/labs" element={<StudentLabs />} />
          <Route path="/student/contests" element={<StudentContests />} />
          <Route path="/student/marks" element={<StudentMarks />} />
          {/* Faculty Routes */}
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/faculty/assignments" element={<FacultyAssignments />} />
          <Route path="/faculty/labs" element={<FacultyLabs />} />
          <Route path="/faculty/contests" element={<FacultyContests />} />
          <Route path="/faculty/analytics" element={<FacultyAnalytics />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/departments" element={<AdminDepartments />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
            {/* Class-Scoped Routes */}
            <Route path="/faculty/class/:classId/attendance" element={<FacultyAttendance />} />
            <Route path="/faculty/class/:classId/assignments" element={<FacultyAssignments />} />
            <Route path="/faculty/class/:classId/labs" element={<FacultyLabs />} />
            <Route path="/faculty/class/:classId/contests" element={<FacultyContests />} />
            <Route path="/faculty/class/:classId/analytics" element={<FacultyAnalytics />} />
            <Route path="/faculty/class/:classId/students" element={<FacultyStudents />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </SubjectProvider>
        </ClassProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
