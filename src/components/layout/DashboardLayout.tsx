import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  BookOpen,
  BarChart3,
  Users,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ClipboardList,
  Code,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import NotesSection, { Note } from "@/components/notes/NotesSection";
import { useScope } from "@/contexts/ScopeContext";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "faculty" | "admin";
  onNoteSelect?: (note: Note) => void;
  onCreateNote?: () => void;
}

const DashboardLayout = ({ children, role, onNoteSelect, onCreateNote }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isInScope } = useScope();

  // If in a scoped context (class/subject), hide global sidebar and just render children
  if (isInScope) {
    return <>{children}</>;
  }

  const studentNav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
    { icon: Calendar, label: "Attendance", href: "/student/attendance" },
    { icon: Code, label: "Contests", href: "/student/contests" },
    { icon: Award, label: "Marks", href: "/student/marks" },
  ];

  const facultyNav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/faculty" },
  ];

  const adminNav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BookOpen, label: "Departments", href: "/admin/departments" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: ClipboardList, label: "Audit Logs", href: "/admin/audit-logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const navItems = role === "student" ? studentNav : role === "faculty" ? facultyNav : adminNav;

  const roleLabels = {
    student: "Student Portal",
    faculty: "Faculty Dashboard",
    admin: "Admin Panel",
  };

  const roleColors = {
    student: "text-info",
    faculty: "text-success",
    admin: "text-accent",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <button
            onClick={() => {
              const dashboardMap = {
                student: "/student",
                faculty: "/faculty",
                admin: "/admin",
              };
              navigate(dashboardMap[role]);
            }}
            className="flex items-center gap-3 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold"
              >
                DAMS
              </motion.div>
            )}
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Role Badge */}
        {sidebarOpen && (
          <div className="border-b border-sidebar-border p-4">
            <div className={cn("text-sm font-medium", roleColors[role])}>
              {roleLabels[role]}
            </div>
          </div>
        )}

        {/* Navigation */}
        {role === "faculty" ? (
          <NotesSection
            onNoteSelect={onNoteSelect || (() => {})}
            onCreateNew={onCreateNote || (() => {})}
            sidebarOpen={sidebarOpen}
          />
        ) : (
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Logout */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              !sidebarOpen && "justify-center px-0"
            )}
            onClick={() => navigate("/")}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 flex-col border-r bg-sidebar text-sidebar-foreground lg:hidden flex"
            >
              <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
                    <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
                  </div>
                  <span className="font-bold">DAMS</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.href}>
                        <NavLink
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-sidebar-border p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  onClick={() => navigate("/")}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", sidebarOpen ? "lg:pl-64" : "lg:pl-20")}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card/95 px-4 backdrop-blur-sm lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-full rounded-xl border bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <NotificationDropdown />

            {/* User Profile Button */}
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => navigate("/student/profile")}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
