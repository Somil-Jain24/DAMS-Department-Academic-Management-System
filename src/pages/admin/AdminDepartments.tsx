import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users, BookOpen, GraduationCap, Building } from "lucide-react";
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headOfDepartment: string;
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  establishedYear: number;
}

const demoDepartments: Department[] = [
  { id: "1", name: "Computer Science", code: "CS", description: "Department of Computer Science and Engineering", headOfDepartment: "Dr. Robert Wilson", totalStudents: 450, totalFaculty: 25, totalCourses: 42, establishedYear: 1985 },
  { id: "2", name: "Electronics", code: "ECE", description: "Department of Electronics and Communication Engineering", headOfDepartment: "Prof. Sarah Johnson", totalStudents: 380, totalFaculty: 22, totalCourses: 38, establishedYear: 1982 },
  { id: "3", name: "Mechanical", code: "ME", description: "Department of Mechanical Engineering", headOfDepartment: "Dr. James Miller", totalStudents: 320, totalFaculty: 20, totalCourses: 35, establishedYear: 1975 },
  { id: "4", name: "Civil", code: "CE", description: "Department of Civil Engineering", headOfDepartment: "Prof. Mary Brown", totalStudents: 280, totalFaculty: 18, totalCourses: 32, establishedYear: 1970 },
  { id: "5", name: "Mathematics", code: "MATH", description: "Department of Mathematics and Statistics", headOfDepartment: "Dr. Lisa Chen", totalStudents: 150, totalFaculty: 15, totalCourses: 28, establishedYear: 1965 },
  { id: "6", name: "Physics", code: "PHY", description: "Department of Physics", headOfDepartment: "Prof. David Lee", totalStudents: 120, totalFaculty: 12, totalCourses: 24, establishedYear: 1965 },
];

const AdminDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>(demoDepartments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    description: "",
    headOfDepartment: "",
  });

  const handleAddDepartment = () => {
    const department: Department = {
      id: Date.now().toString(),
      ...newDepartment,
      totalStudents: 0,
      totalFaculty: 0,
      totalCourses: 0,
      establishedYear: new Date().getFullYear(),
    };
    setDepartments([...departments, department]);
    setNewDepartment({ name: "", code: "", description: "", headOfDepartment: "" });
    setIsAddDialogOpen(false);
    toast.success("Department added successfully");
  };

  const deleteDepartment = (deptId: string) => {
    setDepartments(departments.filter((dept) => dept.id !== deptId));
    toast.success("Department deleted successfully");
  };

  const totalStudents = departments.reduce((sum, d) => sum + d.totalStudents, 0);
  const totalFaculty = departments.reduce((sum, d) => sum + d.totalFaculty, 0);
  const totalCourses = departments.reduce((sum, d) => sum + d.totalCourses, 0);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Departments</h1>
            <p className="text-muted-foreground">Manage academic departments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new academic department</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Department Name</Label>
                  <Input
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department Code</Label>
                  <Input
                    value={newDepartment.code}
                    onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                    placeholder="e.g., CS"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                    placeholder="Department description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Head of Department</Label>
                  <Input
                    value={newDepartment.headOfDepartment}
                    onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDepartment}>Add Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{departments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalStudents.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Faculty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalFaculty}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalCourses}</p>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {dept.name}
                      <Badge variant="outline">{dept.code}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">{dept.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteDepartment(dept.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Head of Department:</span>
                    <p className="font-medium">{dept.headOfDepartment}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{dept.totalStudents}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{dept.totalFaculty}</p>
                      <p className="text-xs text-muted-foreground">Faculty</p>
                    </div>
                    <div className="p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{dept.totalCourses}</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Established: {dept.establishedYear}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDepartments;
