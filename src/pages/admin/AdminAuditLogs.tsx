import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Filter, Clock, User, Activity, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: "success" | "warning" | "error";
}

const demoAuditLogs: AuditLog[] = [
  { id: "1", timestamp: "2024-01-15 14:32:15", user: "Dr. Robert Wilson", userRole: "faculty", action: "CREATE", resource: "Assignment", details: "Created new assignment 'Data Structures Lab 5'", ipAddress: "192.168.1.105", status: "success" },
  { id: "2", timestamp: "2024-01-15 14:28:42", user: "Admin User", userRole: "admin", action: "UPDATE", resource: "User", details: "Updated user permissions for John Doe", ipAddress: "192.168.1.100", status: "success" },
  { id: "3", timestamp: "2024-01-15 14:15:33", user: "Jane Smith", userRole: "student", action: "SUBMIT", resource: "Assignment", details: "Submitted assignment for 'Algorithm Analysis'", ipAddress: "192.168.1.150", status: "success" },
  { id: "4", timestamp: "2024-01-15 14:10:05", user: "Unknown", userRole: "guest", action: "LOGIN_FAILED", resource: "Auth", details: "Failed login attempt with invalid credentials", ipAddress: "203.45.67.89", status: "error" },
  { id: "5", timestamp: "2024-01-15 13:55:20", user: "Prof. Sarah Johnson", userRole: "faculty", action: "DELETE", resource: "Lab Session", details: "Deleted lab session 'Intro to Circuits Lab 2'", ipAddress: "192.168.1.110", status: "warning" },
  { id: "6", timestamp: "2024-01-15 13:45:12", user: "Mike Brown", userRole: "student", action: "VIEW", resource: "Grades", details: "Viewed semester grades report", ipAddress: "192.168.1.155", status: "success" },
  { id: "7", timestamp: "2024-01-15 13:30:45", user: "Admin User", userRole: "admin", action: "CREATE", resource: "Department", details: "Created new department 'Data Science'", ipAddress: "192.168.1.100", status: "success" },
  { id: "8", timestamp: "2024-01-15 13:22:18", user: "Dr. Lisa Chen", userRole: "faculty", action: "UPDATE", resource: "Course", details: "Updated course syllabus for 'Organic Chemistry'", ipAddress: "192.168.1.112", status: "success" },
  { id: "9", timestamp: "2024-01-15 13:10:30", user: "System", userRole: "system", action: "BACKUP", resource: "Database", details: "Automated daily backup completed", ipAddress: "localhost", status: "success" },
  { id: "10", timestamp: "2024-01-15 12:55:22", user: "Alex Turner", userRole: "student", action: "ENROLL", resource: "Course", details: "Enrolled in 'Advanced Physics'", ipAddress: "192.168.1.160", status: "success" },
];

const AdminAuditLogs = () => {
  const [logs] = useState<AuditLog[]>(demoAuditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "CREATE": return "default";
      case "UPDATE": return "secondary";
      case "DELETE": return "destructive";
      case "LOGIN_FAILED": return "destructive";
      default: return "outline";
    }
  };

  const uniqueActions = [...new Set(logs.map(log => log.action))];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Audit Logs</h1>
            <p className="text-muted-foreground">Track all system activities and changes</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{logs.length}</p>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Successful
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{logs.filter(l => l.status === "success").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{logs.filter(l => l.status === "warning").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{logs.filter(l => l.status === "error").length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Detailed log of all system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead className="max-w-xs">Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{getStatusIcon(log.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{log.user}</p>
                            <p className="text-xs text-muted-foreground">{log.userRole}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="max-w-xs truncate" title={log.details}>
                        {log.details}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAuditLogs;
