import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, TrendingUp, BookOpen, Award } from "lucide-react";
import { demoSubjects } from "@/data/demoData";

const marksData = [
  {
    subjectId: "sub1",
    subjectName: "Data Structures & Algorithms",
    internalMarks: [
      { exam: "Mid Term 1", obtained: 22, total: 25, date: "2024-02-15" },
      { exam: "Mid Term 2", obtained: 20, total: 25, date: "2024-03-20" },
    ],
    assignments: { obtained: 18, total: 20 },
    lab: { obtained: 23, total: 25 },
    external: { obtained: 72, total: 100 },
    grade: "A",
    credits: 4,
  },
  {
    subjectId: "sub2",
    subjectName: "Database Management Systems",
    internalMarks: [
      { exam: "Mid Term 1", obtained: 20, total: 25, date: "2024-02-16" },
      { exam: "Mid Term 2", obtained: 21, total: 25, date: "2024-03-21" },
    ],
    assignments: { obtained: 17, total: 20 },
    lab: { obtained: 22, total: 25 },
    external: { obtained: 68, total: 100 },
    grade: "A",
    credits: 4,
  },
  {
    subjectId: "sub3",
    subjectName: "Operating Systems",
    internalMarks: [
      { exam: "Mid Term 1", obtained: 18, total: 25, date: "2024-02-17" },
      { exam: "Mid Term 2", obtained: 19, total: 25, date: "2024-03-22" },
    ],
    assignments: { obtained: 16, total: 20 },
    lab: { obtained: 20, total: 25 },
    external: { obtained: 65, total: 100 },
    grade: "B+",
    credits: 3,
  },
  {
    subjectId: "sub4",
    subjectName: "Computer Networks",
    internalMarks: [
      { exam: "Mid Term 1", obtained: 21, total: 25, date: "2024-02-18" },
      { exam: "Mid Term 2", obtained: 22, total: 25, date: "2024-03-23" },
    ],
    assignments: { obtained: 19, total: 20 },
    lab: { obtained: 24, total: 25 },
    external: { obtained: 78, total: 100 },
    grade: "A+",
    credits: 3,
  },
  {
    subjectId: "sub5",
    subjectName: "Software Engineering",
    internalMarks: [
      { exam: "Mid Term 1", obtained: 19, total: 25, date: "2024-02-19" },
      { exam: "Mid Term 2", obtained: 20, total: 25, date: "2024-03-24" },
    ],
    assignments: { obtained: 18, total: 20 },
    lab: null,
    external: { obtained: 70, total: 100 },
    grade: "A",
    credits: 3,
  },
];

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A+":
      return "bg-emerald-500";
    case "A":
      return "bg-green-500";
    case "B+":
      return "bg-blue-500";
    case "B":
      return "bg-sky-500";
    case "C+":
      return "bg-yellow-500";
    case "C":
      return "bg-orange-500";
    default:
      return "bg-red-500";
  }
};

const getGradePoints = (grade: string) => {
  switch (grade) {
    case "A+":
      return 10;
    case "A":
      return 9;
    case "B+":
      return 8;
    case "B":
      return 7;
    case "C+":
      return 6;
    case "C":
      return 5;
    default:
      return 4;
  }
};

const StudentMarks = () => {
  const totalCredits = marksData.reduce((sum, subject) => sum + subject.credits, 0);
  const totalGradePoints = marksData.reduce(
    (sum, subject) => sum + getGradePoints(subject.grade) * subject.credits,
    0
  );
  const cgpa = (totalGradePoints / totalCredits).toFixed(2);

  const calculateTotalPercentage = (subject: typeof marksData[0]) => {
    const internalTotal = subject.internalMarks.reduce((sum, m) => sum + m.obtained, 0);
    const internalMax = subject.internalMarks.reduce((sum, m) => sum + m.total, 0);
    const assignmentTotal = subject.assignments.obtained;
    const assignmentMax = subject.assignments.total;
    const labTotal = subject.lab?.obtained || 0;
    const labMax = subject.lab?.total || 0;
    const externalTotal = subject.external.obtained;
    const externalMax = subject.external.total;

    const totalObtained = internalTotal + assignmentTotal + labTotal + externalTotal;
    const totalMax = internalMax + assignmentMax + labMax + externalMax;

    return Math.round((totalObtained / totalMax) * 100);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Performance</h1>
          <p className="text-muted-foreground">View your marks and grades across all subjects</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cgpa}</div>
              <p className="text-xs text-muted-foreground">out of 10.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
              <p className="text-xs text-muted-foreground">this semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  marksData.reduce((sum, s) => sum + calculateTotalPercentage(s), 0) /
                    marksData.length
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">across all subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A+</div>
              <p className="text-xs text-muted-foreground">Computer Networks</p>
            </CardContent>
          </Card>
        </div>

        {/* Marks Details */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="internal">Internal Exams</TabsTrigger>
            <TabsTrigger value="external">External Exams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-center">Credits</TableHead>
                      <TableHead className="text-center">Internal</TableHead>
                      <TableHead className="text-center">Assignments</TableHead>
                      <TableHead className="text-center">Lab</TableHead>
                      <TableHead className="text-center">External</TableHead>
                      <TableHead className="text-center">Total %</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marksData.map((subject) => {
                      const internalTotal = subject.internalMarks.reduce(
                        (sum, m) => sum + m.obtained,
                        0
                      );
                      const internalMax = subject.internalMarks.reduce(
                        (sum, m) => sum + m.total,
                        0
                      );
                      return (
                        <TableRow key={subject.subjectId}>
                          <TableCell className="font-medium">{subject.subjectName}</TableCell>
                          <TableCell className="text-center">{subject.credits}</TableCell>
                          <TableCell className="text-center">
                            {internalTotal}/{internalMax}
                          </TableCell>
                          <TableCell className="text-center">
                            {subject.assignments.obtained}/{subject.assignments.total}
                          </TableCell>
                          <TableCell className="text-center">
                            {subject.lab ? `${subject.lab.obtained}/${subject.lab.total}` : "N/A"}
                          </TableCell>
                          <TableCell className="text-center">
                            {subject.external.obtained}/{subject.external.total}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={calculateTotalPercentage(subject)}
                                className="w-16 h-2"
                              />
                              <span className="text-sm">{calculateTotalPercentage(subject)}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={getGradeColor(subject.grade)}>
                              {subject.grade}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="internal" className="space-y-4">
            {marksData.map((subject) => (
              <Card key={subject.subjectId}>
                <CardHeader>
                  <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exam</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Marks Obtained</TableHead>
                        <TableHead className="text-center">Total Marks</TableHead>
                        <TableHead className="text-center">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.internalMarks.map((exam, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{exam.exam}</TableCell>
                          <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">{exam.obtained}</TableCell>
                          <TableCell className="text-center">{exam.total}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                (exam.obtained / exam.total) * 100 >= 80
                                  ? "default"
                                  : (exam.obtained / exam.total) * 100 >= 60
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {Math.round((exam.obtained / exam.total) * 100)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="external" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>External Examination Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-center">Marks Obtained</TableHead>
                      <TableHead className="text-center">Total Marks</TableHead>
                      <TableHead className="text-center">Percentage</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marksData.map((subject) => (
                      <TableRow key={subject.subjectId}>
                        <TableCell className="font-medium">{subject.subjectName}</TableCell>
                        <TableCell className="text-center">{subject.external.obtained}</TableCell>
                        <TableCell className="text-center">{subject.external.total}</TableCell>
                        <TableCell className="text-center">
                          <Progress
                            value={(subject.external.obtained / subject.external.total) * 100}
                            className="w-20 h-2"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentMarks;
