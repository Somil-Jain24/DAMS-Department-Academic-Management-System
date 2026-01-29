import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  BookOpen,
  Award,
  Plus,
  X,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import html2pdf from "html2pdf.js";

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
  achievements: Array<{ id: string; title: string; description: string }>;
  internships: Array<{ id: string; company: string; position: string; duration: string }>;
  tools: string[];
}

const StudentProfile = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["basic", "academic"])
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
    achievements: [
      {
        id: "1",
        title: "Dean's List",
        description: "Achieved in Semester 4",
      },
    ],
    internships: [
      {
        id: "1",
        company: "Tech Corp",
        position: "Software Developer Intern",
        duration: "Jan 2024 - Jun 2024",
      },
    ],
    tools: ["Git", "Docker", "AWS", "Node.js", "MongoDB"],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [newCertificate, setNewCertificate] = useState({ name: "", issuer: "" });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
  });
  const [newInternship, setNewInternship] = useState({
    company: "",
    position: "",
    duration: "",
  });
  const [newTool, setNewTool] = useState("");

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections);
    if (newSections.has(section)) {
      newSections.delete(section);
    } else {
      newSections.add(section);
    }
    setExpandedSections(newSections);
  };

  // Skills
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

  // Projects
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

  // Certificates
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

  // Achievements
  const addAchievement = () => {
    if (newAchievement.title.trim()) {
      setProfile({
        ...profile,
        achievements: [
          ...profile.achievements,
          { id: Date.now().toString(), ...newAchievement },
        ],
      });
      setNewAchievement({ title: "", description: "" });
    }
  };

  const removeAchievement = (id: string) => {
    setProfile({
      ...profile,
      achievements: profile.achievements.filter((a) => a.id !== id),
    });
  };

  // Internships
  const addInternship = () => {
    if (newInternship.company.trim()) {
      setProfile({
        ...profile,
        internships: [
          ...profile.internships,
          { id: Date.now().toString(), ...newInternship },
        ],
      });
      setNewInternship({ company: "", position: "", duration: "" });
    }
  };

  const removeInternship = (id: string) => {
    setProfile({
      ...profile,
      internships: profile.internships.filter((i) => i.id !== id),
    });
  };

  // Tools
  const addTool = () => {
    if (newTool.trim()) {
      setProfile({
        ...profile,
        tools: [...profile.tools, newTool],
      });
      setNewTool("");
    }
  };

  const removeTool = (index: number) => {
    setProfile({
      ...profile,
      tools: profile.tools.filter((_, i) => i !== index),
    });
  };

  // Generate Resume - Instant Download
  const generateResume = () => {
    const resumeContent = `
      <div style="font-family: Arial, sans-serif; max-width: 8.5in; height: 11in; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-bottom: 2px solid #000; margin-bottom: 15px; padding-bottom: 15px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">${profile.name}</h1>
          <div style="margin-top: 8px; font-size: 12px; display: flex; gap: 20px;">
            <span><strong>Enrollment:</strong> ${profile.enrollment}</span>
            <span><strong>Email:</strong> ${profile.email}</span>
          </div>
        </div>

        <section style="margin-bottom: 15px;">
          <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">EDUCATION</h2>
          <div>
            <div style="font-weight: bold; font-size: 12px;">${profile.course}</div>
            <div style="font-size: 11px; margin-top: 5px;">
              <div><strong>Semester:</strong> ${profile.semester}</div>
              <div><strong>CGPA:</strong> ${profile.cgpa} / 10</div>
              <div><strong>Credits Earned:</strong> ${profile.credits}</div>
            </div>
          </div>
        </section>

        ${profile.subjects.length > 0 ? `
          <section style="margin-bottom: 15px;">
            <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">CURRENT SUBJECTS</h2>
            <ul style="margin: 0; padding-left: 20px; font-size: 11px;">
              ${profile.subjects.map((s) => `<li>${s}</li>`).join("")}
            </ul>
          </section>
        ` : ""}

        ${profile.skills.length > 0 ? `
          <section style="margin-bottom: 15px;">
            <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">SKILLS</h2>
            <div style="font-size: 11px;">
              ${profile.skills.map((skill) => `<span style="display: inline-block; background-color: #f0f0f0; padding: 4px 8px; margin: 2px; border-radius: 3px;">${skill}</span>`).join("")}
            </div>
          </section>
        ` : ""}

        ${profile.projects.length > 0 ? `
          <section style="margin-bottom: 15px;">
            <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">PROJECTS</h2>
            <div style="font-size: 11px;">
              ${profile.projects
                .map(
                  (p) => `
                <div style="margin-bottom: 8px;">
                  <div style="font-weight: bold;">${p.title}</div>
                  <div>${p.description}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </section>
        ` : ""}

        ${profile.certificates.length > 0 ? `
          <section style="margin-bottom: 15px;">
            <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">CERTIFICATIONS</h2>
            <ul style="margin: 0; padding-left: 20px; font-size: 11px;">
              ${profile.certificates
                .map(
                  (c) => `<li><strong>${c.name}</strong> - ${c.issuer}</li>`
                )
                .join("")}
            </ul>
          </section>
        ` : ""}

        ${profile.tools.length > 0 ? `
          <section style="margin-bottom: 15px;">
            <h2 style="font-size: 14px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">TOOLS & TECHNOLOGIES</h2>
            <div style="font-size: 11px;">
              ${profile.tools.map((tool) => `<span style="display: inline-block; background-color: #f0f0f0; padding: 4px 8px; margin: 2px; border-radius: 3px;">${tool}</span>`).join("")}
            </div>
          </section>
        ` : ""}
      </div>
    `;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    const element = document.createElement("div");
    element.innerHTML = resumeContent;
    html2pdf().set(options).from(element).save();
  };

  const SectionHeader = ({
    icon: Icon,
    title,
    section,
  }: {
    icon: React.ElementType;
    title: string;
    section: string;
  }) => (
    <CardHeader
      className="cursor-pointer py-3"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </div>
    </CardHeader>
  );

  return (
    <DashboardLayout role="student">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your academic profile and portfolio
          </p>
        </div>

        {/* Profile Info Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-12 w-12" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.enrollment}</p>
                <p className="text-sm mt-2">{profile.course} • Semester {profile.semester}</p>
              </div>
              <Button
                size="lg"
                className="gap-2"
                onClick={generateResume}
              >
                <Download className="h-5 w-5" />
                Generate Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Details (READ-ONLY) */}
        <Card className="mb-6">
          <SectionHeader icon={User} title="Basic Details" section="basic" />
          <AnimatePresence>
            {expandedSections.has("basic") && (
              <CardContent className="space-y-3 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Name
                    </label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{profile.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Enrollment Number
                    </label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">
                      {profile.enrollment}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-sm mt-1 p-2 bg-muted rounded">{profile.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Course / Branch
                    </label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">
                      {profile.course}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Semester
                    </label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">
                      {profile.semester}
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>

        {/* Academic Details (READ-ONLY) */}
        <Card className="mb-6">
          <SectionHeader icon={BookOpen} title="Academic Details" section="academic" />
          <AnimatePresence>
            {expandedSections.has("academic") && (
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <label className="text-xs font-medium text-muted-foreground">
                      CGPA
                    </label>
                    <div className="text-2xl font-bold mt-2">{profile.cgpa}</div>
                    <p className="text-xs text-muted-foreground mt-1">Out of 10</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <label className="text-xs font-medium text-muted-foreground">
                      Credits Earned
                    </label>
                    <div className="text-2xl font-bold mt-2">{profile.credits}</div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Current Subjects
                  </label>
                  <div className="mt-2 space-y-2">
                    {profile.subjects.map((subject, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-muted rounded text-sm"
                      >
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>

        {/* Skills (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader icon={Award} title="Skills" section="skills" />
          <AnimatePresence>
            {expandedSections.has("skills") && (
              <CardContent className="space-y-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
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
                  />
                  <Button size="sm" onClick={addSkill} className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>

        {/* Projects (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader icon={FileText} title="Projects" section="projects" />
          <AnimatePresence>
            {expandedSections.has("projects") && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  {profile.projects.map((project) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 flex items-start justify-between gap-2"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(project.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Input
                    placeholder="Project title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
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
                    className="min-h-20"
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

        {/* Certificates (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader icon={Award} title="Certificates" section="certificates" />
          <AnimatePresence>
            {expandedSections.has("certificates") && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  {profile.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCertificate(cert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Input
                    placeholder="Certificate name"
                    value={newCertificate.name}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, name: e.target.value })
                    }
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

        {/* Achievements (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader icon={GraduationCap} title="Achievements" section="achievements" />
          <AnimatePresence>
            {expandedSections.has("achievements") && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  {profile.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="border rounded-lg p-4 flex items-start justify-between gap-2"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(achievement.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Input
                    placeholder="Achievement title"
                    value={newAchievement.title}
                    onChange={(e) =>
                      setNewAchievement({
                        ...newAchievement,
                        title: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Achievement description"
                    value={newAchievement.description}
                    onChange={(e) =>
                      setNewAchievement({
                        ...newAchievement,
                        description: e.target.value,
                      })
                    }
                    className="min-h-20"
                  />
                  <Button
                    size="sm"
                    onClick={addAchievement}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>

        {/* Internships (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader icon={Briefcase} title="Internships" section="internships" />
          <AnimatePresence>
            {expandedSections.has("internships") && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  {profile.internships.map((internship) => (
                    <div
                      key={internship.id}
                      className="border rounded-lg p-4 flex items-start justify-between gap-2"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{internship.position}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {internship.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {internship.duration}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInternship(internship.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Input
                    placeholder="Company"
                    value={newInternship.company}
                    onChange={(e) =>
                      setNewInternship({
                        ...newInternship,
                        company: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Position"
                    value={newInternship.position}
                    onChange={(e) =>
                      setNewInternship({
                        ...newInternship,
                        position: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Duration (e.g., Jan 2024 - Jun 2024)"
                    value={newInternship.duration}
                    onChange={(e) =>
                      setNewInternship({
                        ...newInternship,
                        duration: e.target.value,
                      })
                    }
                  />
                  <Button
                    size="sm"
                    onClick={addInternship}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Internship
                  </Button>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>

        {/* Tools & Technologies (EDITABLE) */}
        <Card className="mb-6">
          <SectionHeader
            icon={Award}
            title="Tools & Technologies"
            section="tools"
          />
          <AnimatePresence>
            {expandedSections.has("tools") && (
              <CardContent className="space-y-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {profile.tools.map((tool, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTool(idx)}
                    >
                      {tool}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new tool/technology"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addTool();
                    }}
                  />
                  <Button size="sm" onClick={addTool} className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
