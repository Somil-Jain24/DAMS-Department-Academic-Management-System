import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Download, Printer } from "lucide-react";

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

interface ResumeBuilderProps {
  profile: StudentProfile;
  onClose: () => void;
}

const ResumeBuilder = ({ profile, onClose }: ResumeBuilderProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (!resumeRef.current) return;

    const options = {
      margin: 10,
      filename: `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    html2pdf().set(options).from(resumeRef.current).save();
  };

  const printResume = () => {
    if (!resumeRef.current) return;
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Resume</title><style>body { font-family: Arial; margin: 20px; }</style></head><body>"
      );
      printWindow.document.write(resumeRef.current.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-background shadow-xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b bg-card p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Resume Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={printResume}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              size="sm"
              onClick={downloadPDF}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)] bg-white p-8">
          <div
            ref={resumeRef}
            className="mx-auto max-w-2xl space-y-6 text-gray-800"
          >
            {/* Header */}
            <div className="border-b-2 border-gray-900 pb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Enrollment:</span>{" "}
                  {profile.enrollment}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {profile.email}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                EDUCATION
              </h2>
              <div className="mt-3 space-y-2">
                <div className="font-semibold text-gray-900">
                  {profile.course}
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Semester:</span>{" "}
                    {profile.semester}
                  </div>
                  <div>
                    <span className="font-semibold">CGPA:</span> {profile.cgpa}{" "}
                    / 10
                  </div>
                  <div>
                    <span className="font-semibold">Credits Earned:</span>{" "}
                    {profile.credits}
                  </div>
                </div>
              </div>
            </section>

            {/* Current Subjects */}
            {profile.subjects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                  CURRENT SUBJECTS
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
                  {profile.subjects.map((subject, idx) => (
                    <li key={idx} className="text-gray-700">
                      {subject}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills Section */}
            {profile.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                  SKILLS
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {profile.projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                  PROJECTS
                </h2>
                <div className="mt-3 space-y-3">
                  {profile.projects.map((project) => (
                    <div key={project.id}>
                      <div className="font-semibold text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-700">
                        {project.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates Section */}
            {profile.certificates.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
                  CERTIFICATIONS
                </h2>
                <ul className="mt-3 space-y-2">
                  {profile.certificates.map((cert) => (
                    <li key={cert.id} className="text-sm text-gray-700">
                      <span className="font-semibold">{cert.name}</span>
                      <span className="text-gray-600"> - {cert.issuer}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeBuilder;
