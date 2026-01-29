import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  BookOpen,
  Award,
  Plus,
  X,
  Edit2,
  Check,
  ChevronDown,
  Download,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

interface StudentProfile {
  name: string;
  enrollment: string;
  email: string;
  course: string;
  semester: string;
  cgpa: number;
  credits: number;
  subjects: string[];
  skills: string[];
  projects: Array<{ id: string; title: string; description: string }>;
  certificates: Array<{ id: string; name: string; issuer: string }>;
}

const ProfilePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["basic", "academic", "skills"])
  );

  const [profile, setProfile] = useState<StudentProfile>({
    name: "John Doe",
    enrollment: "U-1234567",
    email: "john.doe@university.edu",
    course: "Computer Science",
    semester: "5",
    cgpa: 8.5,
    credits: 85,
    subjects: ["Data Structures", "Database Systems", "Computer Networks"],
    skills: ["Python", "JavaScript", "React", "SQL"],
    projects: [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "Built with React and Node.js",
      },
      {
        id: "2",
        title: "Chat Application",
        description: "Real-time messaging with WebSocket",
      },
    ],
    certificates: [
      { id: "1", name: "AWS Cloud Practitioner", issuer: "Amazon" },
      { id: "2", name: "Google IT Automation", issuer: "Google" },
    ],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    issuer: "",
  });

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections);
    if (newSections.has(section)) {
      newSections.delete(section);
    } else {
      newSections.add(section);
    }
    setExpandedSections(newSections);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    if (newProject.title.trim()) {
      setProfile({
        ...profile,
        projects: [
          ...profile.projects,
          { id: Date.now().toString(), ...newProject },
        ],
      });
      setNewProject({ title: "", description: "" });
    }
  };

  const removeProject = (id: string) => {
    setProfile({
      ...profile,
      projects: profile.projects.filter((p) => p.id !== id),
    });
  };

  const addCertificate = () => {
    if (newCertificate.name.trim()) {
      setProfile({
        ...profile,
        certificates: [
          ...profile.certificates,
          { id: Date.now().toString(), ...newCertificate },
        ],
      });
      setNewCertificate({ name: "", issuer: "" });
    }
  };

  const removeCertificate = (id: string) => {
    setProfile({
      ...profile,
      certificates: profile.certificates.filter((c) => c.id !== id),
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
        <span className="hidden sm:inline">{profile.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Profile Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-hidden rounded-l-xl border-l bg-background shadow-lg"
            >
              <ScrollArea className="h-full">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b bg-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Profile</h3>
                    <p className="text-xs text-muted-foreground">
                      Manage your student portfolio
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4 p-4">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-4 rounded-xl bg-muted p-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <User className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{profile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {profile.enrollment}
                      </p>
                    </div>
                  </div>

                  {/* Basic Details Section */}
                  <Card>
                    <CardHeader
                      className="cursor-pointer py-3"
                      onClick={() => toggleSection("basic")}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Basic Details
                        </CardTitle>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSections.has("basic") && "rotate-180"
                          )}
                        />
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections.has("basic") && (
                        <CardContent className="space-y-3 pt-0">
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                              Name
                            </label>
                            <Input
                              value={profile.name}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  name: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                              Email
                            </label>
                            <Input
                              value={profile.email}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  email: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                              Course
                            </label>
                            <Input
                              value={profile.course}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  course: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-muted-foreground">
                                Enrollment
                              </label>
                              <Input
                                value={profile.enrollment}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    enrollment: e.target.value,
                                  })
                                }
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-muted-foreground">
                                Semester
                              </label>
                              <Input
                                value={profile.semester}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    semester: e.target.value,
                                  })
                                }
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Academic Details Section */}
                  <Card>
                    <CardHeader
                      className="cursor-pointer py-3"
                      onClick={() => toggleSection("academic")}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Academic Details
                        </CardTitle>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSections.has("academic") && "rotate-180"
                          )}
                        />
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections.has("academic") && (
                        <CardContent className="space-y-3 pt-0">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1 rounded-lg bg-muted p-3">
                              <label className="text-xs font-medium text-muted-foreground">
                                CGPA
                              </label>
                              <div className="text-lg font-bold">
                                {profile.cgpa}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Out of 10
                              </p>
                            </div>
                            <div className="space-y-1 rounded-lg bg-muted p-3">
                              <label className="text-xs font-medium text-muted-foreground">
                                Credits
                              </label>
                              <div className="text-lg font-bold">
                                {profile.credits}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Earned
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              Current Subjects
                            </label>
                            <div className="space-y-1">
                              {profile.subjects.map((subject, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between rounded-lg bg-muted p-2"
                                >
                                  <span className="text-sm">{subject}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Skills Section */}
                  <Card>
                    <CardHeader
                      className="cursor-pointer py-3"
                      onClick={() => toggleSection("skills")}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Skills
                        </CardTitle>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSections.has("skills") && "rotate-180"
                          )}
                        />
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections.has("skills") && (
                        <CardContent className="space-y-3 pt-0">
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="cursor-pointer hover:bg-muted"
                                onClick={() => removeSkill(idx)}
                              >
                                {skill}
                                <X className="ml-1 h-3 w-3" />
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add new skill"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") addSkill();
                              }}
                              className="text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={addSkill}
                              className="shrink-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Projects Section */}
                  <Card>
                    <CardHeader
                      className="cursor-pointer py-3"
                      onClick={() => toggleSection("projects")}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Projects
                        </CardTitle>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSections.has("projects") && "rotate-180"
                          )}
                        />
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections.has("projects") && (
                        <CardContent className="space-y-3 pt-0">
                          <div className="space-y-2">
                            {profile.projects.map((project) => (
                              <div
                                key={project.id}
                                className="rounded-lg border p-3"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm">
                                      {project.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {project.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0"
                                    onClick={() => removeProject(project.id)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <Input
                              placeholder="Project title"
                              value={newProject.title}
                              onChange={(e) =>
                                setNewProject({
                                  ...newProject,
                                  title: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                            <Textarea
                              placeholder="Project description"
                              value={newProject.description}
                              onChange={(e) =>
                                setNewProject({
                                  ...newProject,
                                  description: e.target.value,
                                })
                              }
                              className="text-sm min-h-20"
                            />
                            <Button
                              size="sm"
                              onClick={addProject}
                              className="w-full"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Project
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Certificates Section */}
                  <Card>
                    <CardHeader
                      className="cursor-pointer py-3"
                      onClick={() => toggleSection("certificates")}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Certificates
                        </CardTitle>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSections.has("certificates") && "rotate-180"
                          )}
                        />
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections.has("certificates") && (
                        <CardContent className="space-y-3 pt-0">
                          <div className="space-y-2">
                            {profile.certificates.map((cert) => (
                              <div
                                key={cert.id}
                                className="rounded-lg border p-3 flex items-center justify-between"
                              >
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm">
                                    {cert.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {cert.issuer}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0"
                                  onClick={() => removeCertificate(cert.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <Input
                              placeholder="Certificate name"
                              value={newCertificate.name}
                              onChange={(e) =>
                                setNewCertificate({
                                  ...newCertificate,
                                  name: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                            <Input
                              placeholder="Issuer"
                              value={newCertificate.issuer}
                              onChange={(e) =>
                                setNewCertificate({
                                  ...newCertificate,
                                  issuer: e.target.value,
                                })
                              }
                              className="text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={addCertificate}
                              className="w-full"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Certificate
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Resume Builder Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => setShowResumeBuilder(true)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Generate Resume
                  </Button>
                </div>
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Builder Modal */}
      {showResumeBuilder && (
        <ResumeBuilder
          profile={profile}
          onClose={() => setShowResumeBuilder(false)}
        />
      )}
    </>
  );
};

export default ProfilePanel;
