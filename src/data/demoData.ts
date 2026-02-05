// Demo data for the academic management system

export interface ClassRecord {
  id: string;
  name: string;
  department: string;
  year: number;
  students: number;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  class: string;
  section: string;
  gpa: number;
  phone: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "leave";
  subject: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dueDate: string;
  maxMarks: number;
  createdAt: string;
  class: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content: string;
  marks?: number;
  feedback?: string;
  status: "submitted" | "late" | "graded" | "pending";
}

export interface LabSession {
  id: string;
  title: string;
  subjectId: string;
  objectives: string;
  theory: string;
  questions: LabQuestion[];
  createdAt: string;
  class: string;
}

export interface LabQuestion {
  id: string;
  question: string;
  description?: string;
  constraints?: string;
  examples?: { input: string; output: string }[];
  testCases?: { input: string; output: string; isHidden?: boolean }[];
  expectedOutput?: string;
}

export interface LabSubmission {
  id: string;
  labSessionId: string;
  studentId: string;
  submittedAt: string;
  answers: { questionId: string; answer: string; code?: string; language?: string }[];
  marks?: number;
  feedback?: string;
  status: "completed" | "pending" | "graded";
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number; // in minutes
  problems: ContestProblem[];
  class: string;
  subjectId: string;
  status: "upcoming" | "active" | "ended";
}

export interface ContestProblem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  testCases: { input: string; output: string }[];
}

export interface ContestSubmission {
  id: string;
  contestId: string;
  problemId: string;
  studentId: string;
  submittedAt: string;
  code: string;
  language: string;
  status: "accepted" | "wrong" | "partial" | "pending";
  score: number;
}

// Demo Classes
export const demoClasses: ClassRecord[] = [
  { id: "IT1_2ND", name: "IT-1 2nd Year", department: "Information Technology", year: 2, students: 45 },
  { id: "IT2_2ND", name: "IT-2 2nd Year", department: "Information Technology", year: 2, students: 48 },
  { id: "IT1_3RD", name: "IT-1 3rd Year", department: "Information Technology", year: 3, students: 50 },
  { id: "IT2_3RD", name: "IT-2 3rd Year", department: "Information Technology", year: 3, students: 52 },
  { id: "IT1_FINAL", name: "IT-1 Final Year", department: "Information Technology", year: 4, students: 43 },
  { id: "IT2_FINAL", name: "IT-2 Final Year", department: "Information Technology", year: 4, students: 47 },
  { id: "DS_2ND", name: "DS 2nd Year", department: "Data Science", year: 2, students: 40 },
  { id: "DS_3RD", name: "DS 3rd Year", department: "Data Science", year: 3, students: 48 },
  { id: "DS_FINAL", name: "DS Final Year", department: "Data Science", year: 4, students: 42 },
];

// Demo students
export const demoStudents: Student[] = [
  { id: "s1", name: "Aarav Sharma", rollNumber: "IT2021001", email: "aarav@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 8.5, phone: "9876543210" },
  { id: "s2", name: "Priya Patel", rollNumber: "IT2021002", email: "priya@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 9.2, phone: "9876543211" },
  { id: "s3", name: "Rohan Gupta", rollNumber: "IT2021003", email: "rohan@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 7.8, phone: "9876543212" },
  { id: "s4", name: "Ananya Singh", rollNumber: "IT2021004", email: "ananya@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 8.9, phone: "9876543213" },
  { id: "s5", name: "Vikram Reddy", rollNumber: "IT2021005", email: "vikram@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 6.5, phone: "9876543214" },
  { id: "s6", name: "Neha Verma", rollNumber: "IT2021006", email: "neha@aitr.edu", class: "IT-1 2nd Year", section: "A", gpa: 8.1, phone: "9876543215" },
  { id: "s7", name: "Arjun Kumar", rollNumber: "IT2021007", email: "arjun@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 7.5, phone: "9876543216" },
  { id: "s8", name: "Kavya Iyer", rollNumber: "IT2021008", email: "kavya@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 9.0, phone: "9876543217" },
  { id: "s9", name: "Rahul Joshi", rollNumber: "IT2021009", email: "rahul@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 6.8, phone: "9876543218" },
  { id: "s10", name: "Sneha Agarwal", rollNumber: "IT2021010", email: "sneha@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 8.7, phone: "9876543219" },
  { id: "s11", name: "Aditya Mishra", rollNumber: "IT2021011", email: "aditya@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 7.2, phone: "9876543220" },
  { id: "s12", name: "Pooja Saxena", rollNumber: "IT2021012", email: "pooja@aitr.edu", class: "IT-1 3rd Year", section: "A", gpa: 8.3, phone: "9876543221" },
];

// Demo subjects - Single Class (IT-6th Sem) with 4 subjects
export const demoSubjects: Subject[] = [
  { id: "IT601", name: "Computer Graphics and Multimedia", code: "IT-601" },
  { id: "IT602", name: "Wireless and Mobile Computing", code: "IT-602" },
  { id: "IT603B", name: "Data Mining", code: "IT-603(B)" },
  { id: "IT604B", name: "Software Engineering", code: "IT-604(B)" },
];

// Demo Assignments
export const demoAssignments: Assignment[] = [
  {
    id: "asg1",
    title: "3D Model Rendering",
    description: "Create a 3D model renderer using OpenGL. Implement lighting, shading, and texture mapping.",
    subjectId: "IT601",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 100,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
  {
    id: "asg2",
    title: "Mobile App Security Implementation",
    description: "Develop a secure Android application with encryption and authentication mechanisms.",
    subjectId: "IT602",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 100,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
  {
    id: "asg3",
    title: "Data Clustering Algorithm",
    description: "Implement K-means and hierarchical clustering algorithms. Compare results on different datasets.",
    subjectId: "IT603B",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 50,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
  {
    id: "asg4",
    title: "Software Design Document",
    description: "Create a comprehensive SDD for an e-commerce system. Include UML diagrams and design patterns.",
    subjectId: "IT604B",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 75,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
];

// Current student (for student view)
export const currentStudent = demoStudents[0];

// Generate assignment submissions
const generateAssignmentSubmissions = (): AssignmentSubmission[] => {
  const submissions: AssignmentSubmission[] = [];
  
  demoAssignments.forEach((assignment) => {
    demoStudents.forEach((student) => {
      const rand = Math.random();
      const isSubmitted = rand > 0.15;
      const dueDate = new Date(assignment.dueDate);
      const now = new Date();
      
      if (isSubmitted) {
        const isLate = rand > 0.7 && dueDate < now;
        const isGraded = rand > 0.4 && dueDate < now;
        
        submissions.push({
          id: `sub-${assignment.id}-${student.id}`,
          assignmentId: assignment.id,
          studentId: student.id,
          submittedAt: new Date(dueDate.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
          content: `Solution for ${assignment.title} by ${student.name}`,
          marks: isGraded ? Math.floor(Math.random() * 30 + 70) : undefined,
          feedback: isGraded ? "Good work! Consider optimizing your solution." : undefined,
          status: isGraded ? "graded" : isLate ? "late" : "submitted",
        });
      } else if (dueDate < now) {
        submissions.push({
          id: `sub-${assignment.id}-${student.id}`,
          assignmentId: assignment.id,
          studentId: student.id,
          submittedAt: "",
          content: "",
          status: "pending",
        });
      }
    });
  });
  
  return submissions;
};

export const demoAssignmentSubmissions = generateAssignmentSubmissions();

// Demo Lab Sessions
export const demoLabSessions: LabSession[] = [
  {
    id: "lab1",
    title: "Texture Mapping in Graphics",
    subjectId: "IT601",
    objectives: "Understand and implement texture mapping techniques",
    theory: "Texture mapping is a technique for adding detail to 3D models by applying 2D images (textures) onto 3D surfaces.",
    questions: [
      {
        id: "q1",
        question: "UV Coordinate Mapping",
        description: "Implement a function to map UV coordinates to a 3D model surface.",
        constraints: "UV values must be normalized between 0 and 1.",
        examples: [
          { input: "vertex = (1,1,1), uv = (0.5,0.5)", output: "Texture coord applied" },
          { input: "vertex = (0,0,0), uv = (0,0)", output: "Corner texture applied" },
        ],
        testCases: [
          { input: "1,1,1|0.5,0.5", output: "success", isHidden: false },
          { input: "0,0,0|0,0", output: "success", isHidden: false },
          { input: "2,2,2|1,1", output: "success", isHidden: true },
        ],
      },
      {
        id: "q2",
        question: "Blending Textures",
        description: "Implement alpha blending for overlapping textures.",
        constraints: "Alpha values between 0.0 (transparent) and 1.0 (opaque).",
        examples: [
          { input: "texture1, texture2, alpha = 0.5", output: "Blended texture" },
        ],
        testCases: [
          { input: "tex1|tex2|0.5", output: "blended", isHidden: false },
          { input: "tex1|tex2|0.2", output: "blended", isHidden: false },
          { input: "tex1|tex2|0.8", output: "blended", isHidden: true },
        ],
      },
      {
        id: "q3",
        question: "MipMap Generation",
        description: "Implement mipmap generation for texture optimization.",
        constraints: "Generate mipmaps down to 1x1 pixel.",
        examples: [
          { input: "texture 512x512", output: "Mipmaps generated" },
        ],
        testCases: [
          { input: "512", output: "256,128,64,32,16,8,4,2,1", isHidden: false },
          { input: "256", output: "128,64,32,16,8,4,2,1", isHidden: false },
          { input: "1024", output: "512,256,128,64,32,16,8,4,2,1", isHidden: true },
        ],
      },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
  {
    id: "lab2",
    title: "Mobile Network Communication",
    subjectId: "IT602",
    objectives: "Implement mobile network protocols and communication patterns",
    theory: "Mobile communication involves understanding wireless protocols, network topology, and efficient data transmission.",
    questions: [
      {
        id: "q1",
        question: "Implement WiFi Connection Handler",
        description: "Create a handler for WiFi connection management.",
        constraints: "Support both 2.4GHz and 5GHz bands.",
        examples: [
          { input: "connect to SSID", output: "WiFi connected" },
        ],
        testCases: [
          { input: "ssid:MyWiFi|band:2.4", output: "connected", isHidden: false },
          { input: "ssid:MyWiFi|band:5", output: "connected", isHidden: false },
          { input: "ssid:Test|band:2.4", output: "connected", isHidden: true },
        ],
      },
      {
        id: "q2",
        question: "Bluetooth Pairing Protocol",
        description: "Implement secure Bluetooth pairing between devices.",
        constraints: "Follow Bluetooth 5.0 specifications.",
        examples: [
          { input: "device1, device2", output: "Pairing initiated" },
        ],
        testCases: [
          { input: "dev1|dev2", output: "paired", isHidden: false },
          { input: "dev2|dev3", output: "paired", isHidden: false },
          { input: "dev1|dev4", output: "paired", isHidden: true },
        ],
      },
      {
        id: "q3",
        question: "4G/5G Signal Strength Analysis",
        description: "Analyze and display mobile signal strength metrics.",
        constraints: "RSRP values from -140 to -44 dBm.",
        examples: [
          { input: "RSRP = -100 dBm", output: "Good signal" },
        ],
        testCases: [
          { input: "-100", output: "good", isHidden: false },
          { input: "-120", output: "fair", isHidden: false },
          { input: "-50", output: "excellent", isHidden: true },
        ],
      },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
  {
    id: "lab3",
    title: "Data Clustering Implementation",
    subjectId: "IT603B",
    objectives: "Practice implementing data mining clustering algorithms",
    theory: "Clustering algorithms group similar data points together. Common algorithms include K-means, hierarchical clustering, and DBSCAN.",
    questions: [
      {
        id: "q1",
        question: "K-means Clustering",
        description: "Implement the K-means clustering algorithm.",
        constraints: "Number of clusters K is provided. Use Euclidean distance.",
        examples: [
          { input: "data = [[1,2],[1,4],[1,0]], K=2", output: "Clusters formed" },
        ],
        testCases: [
          { input: "points:5|clusters:2", output: "clustered", isHidden: false },
          { input: "points:10|clusters:3", output: "clustered", isHidden: false },
          { input: "points:8|clusters:2", output: "clustered", isHidden: true },
        ],
      },
      {
        id: "q2",
        question: "Hierarchical Clustering",
        description: "Implement agglomerative hierarchical clustering.",
        constraints: "Use single-linkage distance metric.",
        examples: [
          { input: "data points", output: "Dendrogram generated" },
        ],
        testCases: [
          { input: "points:5", output: "dendrogram", isHidden: false },
          { input: "points:8", output: "dendrogram", isHidden: false },
          { input: "points:10", output: "dendrogram", isHidden: true },
        ],
      },
      {
        id: "q3",
        question: "Silhouette Coefficient Calculation",
        description: "Calculate silhouette coefficient for clustering quality evaluation.",
        constraints: "Score range from -1 to 1.",
        examples: [
          { input: "clusters formed", output: "Silhouette score: 0.85" },
        ],
        testCases: [
          { input: "cluster1|cluster2", output: "0.75", isHidden: false },
          { input: "cluster1|cluster2|cluster3", output: "0.82", isHidden: false },
          { input: "cluster1", output: "0.95", isHidden: true },
        ],
      },
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT-1 6th Sem",
  },
];

// Generate lab submissions
const generateLabSubmissions = (): LabSubmission[] => {
  const submissions: LabSubmission[] = [];

  demoLabSessions.forEach((lab, labIdx) => {
    demoStudents.forEach((student) => {
      // First lab is always pending for current student (to test new interface)
      if (student.id === currentStudent.id && labIdx === 0) {
        submissions.push({
          id: `labsub-${lab.id}-${student.id}`,
          labSessionId: lab.id,
          studentId: student.id,
          submittedAt: "",
          answers: [],
          status: "pending",
        });
      } else {
        const rand = Math.random();
        const isCompleted = rand > 0.2;

        if (isCompleted) {
          const isGraded = rand > 0.5;
          submissions.push({
            id: `labsub-${lab.id}-${student.id}`,
            labSessionId: lab.id,
            studentId: student.id,
            submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            answers: lab.questions.map((q, qIdx) => ({
              questionId: q.id,
              answer: `The problem asks us to ${q.question.toLowerCase()}. I will approach this by analyzing the input format first, understanding the constraints, and then implementing a solution that handles all edge cases mentioned in the examples.`,
              code: `# Solution for ${q.question}\ndef solve(input_data):\n    # Parse input\n    # Implement logic\n    result = process(input_data)\n    return result\n\nif __name__ == "__main__":\n    result = solve(input())\n    print(result)`,
              language: "python",
            })),
            marks: isGraded ? Math.floor(Math.random() * 20 + 80) : undefined,
            feedback: isGraded ? "Good attempt! Your approach is sound. Consider optimizing edge case handling." : undefined,
            status: isGraded ? "graded" : "completed",
          });
        } else {
          submissions.push({
            id: `labsub-${lab.id}-${student.id}`,
            labSessionId: lab.id,
            studentId: student.id,
            submittedAt: "",
            answers: [],
            status: "pending",
          });
        }
      }
    });
  });

  return submissions;
};

export const demoLabSubmissions = generateLabSubmissions();

// Demo Contests
export const demoContests: Contest[] = [
  {
    id: "contest1",
    title: "DSA Weekly Challenge #5",
    description: "Test your data structures and algorithms skills with challenging problems.",
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 120,
    class: "IT-1 2nd Year",
    status: "active",
    problems: [
      {
        id: "p1",
        title: "Two Sum",
        description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        difficulty: "easy",
        points: 100,
        testCases: [
          { input: "[2,7,11,15], target=9", output: "[0,1]" },
          { input: "[3,2,4], target=6", output: "[1,2]" },
        ],
      },
      {
        id: "p2",
        title: "Longest Substring",
        description: "Find the length of the longest substring without repeating characters.",
        difficulty: "medium",
        points: 200,
        testCases: [
          { input: "abcabcbb", output: "3" },
          { input: "bbbbb", output: "1" },
        ],
      },
      {
        id: "p3",
        title: "Median of Two Sorted Arrays",
        description: "Find the median of two sorted arrays. The overall run time complexity should be O(log(m+n)).",
        difficulty: "hard",
        points: 300,
        testCases: [
          { input: "[1,3], [2]", output: "2.0" },
          { input: "[1,2], [3,4]", output: "2.5" },
        ],
      },
    ],
  },
  {
    id: "contest2",
    title: "Code Sprint: Web Dev",
    description: "Build creative solutions using web technologies.",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 180,
    class: "IT-1 2nd Year",
    status: "upcoming",
    problems: [],
  },
  {
    id: "contest3",
    title: "Algorithm Masters #3",
    description: "Advanced algorithmic challenges for competitive programmers.",
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 150,
    class: "IT-1 3rd Year",
    status: "ended",
    problems: [
      {
        id: "p1",
        title: "Graph Traversal",
        description: "Implement BFS and DFS for a given graph.",
        difficulty: "medium",
        points: 150,
        testCases: [],
      },
    ],
  },
];

// Generate contest submissions
const generateContestSubmissions = (): ContestSubmission[] => {
  const submissions: ContestSubmission[] = [];
  
  demoContests.forEach((contest) => {
    if (contest.status !== "upcoming") {
      contest.problems.forEach((problem) => {
        demoStudents.forEach((student) => {
          const rand = Math.random();
          if (rand > 0.3) {
            const statusRand = Math.random();
            submissions.push({
              id: `csub-${contest.id}-${problem.id}-${student.id}`,
              contestId: contest.id,
              problemId: problem.id,
              studentId: student.id,
              submittedAt: new Date(new Date(contest.startDate).getTime() + Math.random() * contest.duration * 60 * 1000).toISOString(),
              code: `// Solution for ${problem.title}`,
              language: "python",
              status: statusRand > 0.6 ? "accepted" : statusRand > 0.3 ? "partial" : "wrong",
              score: statusRand > 0.6 ? problem.points : statusRand > 0.3 ? Math.floor(problem.points * 0.5) : 0,
            });
          }
        });
      });
    }
  });
  
  return submissions;
};

export const demoContestSubmissions = generateContestSubmissions();

// Generate demo attendance records for past 30 days
const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  demoStudents.forEach((student) => {
    demoSubjects.forEach((subject) => {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Random attendance with some bias
        const rand = Math.random();
        let status: "present" | "absent" | "leave";
        
        // Make some students have lower attendance
        if (student.id === "s5" || student.id === "s9") {
          status = rand < 0.4 ? "present" : rand < 0.85 ? "absent" : "leave";
        } else if (student.id === "s3" || student.id === "s11") {
          status = rand < 0.6 ? "present" : rand < 0.9 ? "absent" : "leave";
        } else {
          status = rand < 0.85 ? "present" : rand < 0.95 ? "absent" : "leave";
        }
        
        records.push({
          id: `att-${student.id}-${subject.id}-${date.toISOString().split('T')[0]}`,
          studentId: student.id,
          date: date.toISOString().split('T')[0],
          status,
          subject: subject.id,
        });
      }
    });
  });
  
  return records;
};

export const demoAttendanceRecords = generateAttendanceRecords();

// Calculate attendance percentage for a student
export const calculateAttendancePercentage = (
  studentId: string,
  records: AttendanceRecord[],
  subjectId?: string
): number => {
  const studentRecords = records.filter(
    (r) => r.studentId === studentId && (!subjectId || r.subject === subjectId)
  );
  
  if (studentRecords.length === 0) return 0;
  
  const presentCount = studentRecords.filter((r) => r.status === "present").length;
  return Math.round((presentCount / studentRecords.length) * 100);
};

// Get students with low attendance (below threshold)
export const getLowAttendanceStudents = (
  records: AttendanceRecord[],
  threshold: number = 75
): { student: Student; percentage: number }[] => {
  return demoStudents
    .map((student) => ({
      student,
      percentage: calculateAttendancePercentage(student.id, records),
    }))
    .filter((s) => s.percentage < threshold)
    .sort((a, b) => a.percentage - b.percentage);
};

// Get attendance for specific date
export const getAttendanceForDate = (
  date: string,
  subjectId: string,
  records: AttendanceRecord[]
): Map<string, "present" | "absent" | "leave"> => {
  const dayRecords = records.filter(
    (r) => r.date === date && r.subject === subjectId
  );
  
  const attendanceMap = new Map<string, "present" | "absent" | "leave">();
  dayRecords.forEach((r) => attendanceMap.set(r.studentId, r.status));
  
  return attendanceMap;
};

// Get leaderboard for a contest
export const getContestLeaderboard = (contestId: string): { student: Student; totalScore: number; problemsSolved: number }[] => {
  const contestSubs = demoContestSubmissions.filter((s) => s.contestId === contestId);
  const studentScores = new Map<string, { score: number; solved: number }>();
  
  contestSubs.forEach((sub) => {
    const current = studentScores.get(sub.studentId) || { score: 0, solved: 0 };
    if (sub.status === "accepted") {
      current.score += sub.score;
      current.solved += 1;
    } else if (sub.status === "partial") {
      current.score += sub.score;
    }
    studentScores.set(sub.studentId, current);
  });
  
  return Array.from(studentScores.entries())
    .map(([studentId, data]) => ({
      student: demoStudents.find((s) => s.id === studentId)!,
      totalScore: data.score,
      problemsSolved: data.solved,
    }))
    .filter((entry) => entry.student)
    .sort((a, b) => b.totalScore - a.totalScore);
};

// Helper to get subject name
export const getSubjectName = (subjectId: string): string => {
  return demoSubjects.find((s) => s.id === subjectId)?.name || "Unknown";
};

// Helper to get student name
export const getStudentName = (studentId: string): string => {
  return demoStudents.find((s) => s.id === studentId)?.name || "Unknown";
};
