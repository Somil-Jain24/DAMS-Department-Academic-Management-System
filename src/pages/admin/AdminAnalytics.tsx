import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Users, GraduationCap, BookOpen, Award } from "lucide-react";

const enrollmentData = [
  { month: "Jan", students: 1200, faculty: 85 },
  { month: "Feb", students: 1250, faculty: 87 },
  { month: "Mar", students: 1300, faculty: 88 },
  { month: "Apr", students: 1350, faculty: 90 },
  { month: "May", students: 1380, faculty: 90 },
  { month: "Jun", students: 1400, faculty: 92 },
];

const departmentPerformance = [
  { name: "Computer Science", avgGrade: 85, attendance: 92, submissions: 95 },
  { name: "Electronics", avgGrade: 82, attendance: 88, submissions: 90 },
  { name: "Mechanical", avgGrade: 78, attendance: 85, submissions: 88 },
  { name: "Civil", avgGrade: 80, attendance: 87, submissions: 85 },
  { name: "Mathematics", avgGrade: 88, attendance: 90, submissions: 92 },
];

const courseDistribution = [
  { name: "Engineering", value: 45 },
  { name: "Sciences", value: 25 },
  { name: "Arts", value: 15 },
  { name: "Commerce", value: 15 },
];

const gradeDistribution = [
  { grade: "A+", count: 120 },
  { grade: "A", count: 280 },
  { grade: "B+", count: 350 },
  { grade: "B", count: 420 },
  { grade: "C+", count: 250 },
  { grade: "C", count: 180 },
  { grade: "D", count: 80 },
  { grade: "F", count: 20 },
];

const attendanceTrend = [
  { week: "Week 1", attendance: 92 },
  { week: "Week 2", attendance: 89 },
  { week: "Week 3", attendance: 91 },
  { week: "Week 4", attendance: 88 },
  { week: "Week 5", attendance: 90 },
  { week: "Week 6", attendance: 93 },
  { week: "Week 7", attendance: 87 },
  { week: "Week 8", attendance: 91 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"];

const AdminAnalytics = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Institution-wide performance metrics</p>
          </div>
          <Select defaultValue="semester">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,700</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                +12% from last semester
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Graduation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">94.5%</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                +2.3% from last year
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">156</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                +8 new courses
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4" />
                Avg. Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">82.6%</p>
              <div className="flex items-center gap-1 text-sm text-red-600">
                <TrendingDown className="h-4 w-4" />
                -1.2% from last semester
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                  <CardDescription>Student and faculty growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="students" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} name="Students" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Distribution</CardTitle>
                  <CardDescription>Students by field of study</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={courseDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {courseDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Weekly attendance percentage across all departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Comparison</CardTitle>
                <CardDescription>Average grades, attendance, and submission rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="avgGrade" name="Avg Grade" fill="hsl(var(--primary))" />
                    <Bar dataKey="attendance" name="Attendance" fill="hsl(var(--secondary))" />
                    <Bar dataKey="submissions" name="Submissions" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Number of students by grade category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
