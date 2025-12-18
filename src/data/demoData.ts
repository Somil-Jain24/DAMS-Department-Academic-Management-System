// Demo data for the academic management system

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
  expectedOutput?: string;
}

export interface LabSubmission {
  id: string;
  labSessionId: string;
  studentId: string;
  submittedAt: string;
  answers: { questionId: string; answer: string; code?: string }[];
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

// Demo students
export const demoStudents: Student[] = [
  { id: "s1", name: "Aarav Sharma", rollNumber: "IT2021001", email: "aarav@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 8.5, phone: "9876543210" },
  { id: "s2", name: "Priya Patel", rollNumber: "IT2021002", email: "priya@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 9.2, phone: "9876543211" },
  { id: "s3", name: "Rohan Gupta", rollNumber: "IT2021003", email: "rohan@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 7.8, phone: "9876543212" },
  { id: "s4", name: "Ananya Singh", rollNumber: "IT2021004", email: "ananya@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 8.9, phone: "9876543213" },
  { id: "s5", name: "Vikram Reddy", rollNumber: "IT2021005", email: "vikram@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 6.5, phone: "9876543214" },
  { id: "s6", name: "Neha Verma", rollNumber: "IT2021006", email: "neha@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 8.1, phone: "9876543215" },
  { id: "s7", name: "Arjun Kumar", rollNumber: "IT2021007", email: "arjun@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 7.5, phone: "9876543216" },
  { id: "s8", name: "Kavya Iyer", rollNumber: "IT2021008", email: "kavya@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 9.0, phone: "9876543217" },
  { id: "s9", name: "Rahul Joshi", rollNumber: "IT2021009", email: "rahul@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 6.8, phone: "9876543218" },
  { id: "s10", name: "Sneha Agarwal", rollNumber: "IT2021010", email: "sneha@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 8.7, phone: "9876543219" },
  { id: "s11", name: "Aditya Mishra", rollNumber: "IT2021011", email: "aditya@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 7.2, phone: "9876543220" },
  { id: "s12", name: "Pooja Saxena", rollNumber: "IT2021012", email: "pooja@aitr.edu", class: "IT 3rd Year", section: "A", gpa: 8.3, phone: "9876543221" },
];

// Demo subjects
export const demoSubjects: Subject[] = [
  { id: "sub1", name: "Data Structures", code: "CS301" },
  { id: "sub2", name: "Operating Systems", code: "CS302" },
  { id: "sub3", name: "Database Management", code: "CS303" },
  { id: "sub4", name: "Computer Networks", code: "CS304" },
  { id: "sub5", name: "Web Development", code: "CS305" },
];

// Demo Assignments
export const demoAssignments: Assignment[] = [
  {
    id: "asg1",
    title: "Implement Binary Search Tree",
    description: "Implement a BST with insert, delete, and search operations. Include traversal methods (inorder, preorder, postorder).",
    subjectId: "sub1",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 100,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
  {
    id: "asg2",
    title: "Process Scheduling Simulation",
    description: "Create a simulation of Round Robin and Priority scheduling algorithms. Compare their performance metrics.",
    subjectId: "sub2",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 100,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
  {
    id: "asg3",
    title: "Database Normalization",
    description: "Normalize the given database schema to 3NF. Document all functional dependencies.",
    subjectId: "sub3",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 50,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
  {
    id: "asg4",
    title: "TCP/IP Protocol Analysis",
    description: "Analyze packet captures using Wireshark and document the TCP handshake process.",
    subjectId: "sub4",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxMarks: 75,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
];

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
    title: "Linked List Implementation",
    subjectId: "sub1",
    objectives: "Understand and implement singly linked list operations",
    theory: "A linked list is a linear data structure where elements are stored in nodes, each containing data and a reference to the next node.",
    questions: [
      { id: "q1", question: "Implement a function to insert a node at the beginning of a linked list" },
      { id: "q2", question: "Implement a function to delete a node by value" },
      { id: "q3", question: "Implement a function to reverse the linked list" },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
  {
    id: "lab2",
    title: "Stack and Queue Operations",
    subjectId: "sub1",
    objectives: "Implement stack and queue using arrays and linked lists",
    theory: "Stack follows LIFO (Last In First Out) while Queue follows FIFO (First In First Out) principle.",
    questions: [
      { id: "q1", question: "Implement a stack using an array with push and pop operations" },
      { id: "q2", question: "Implement a queue using linked list" },
      { id: "q3", question: "Implement a function to check balanced parentheses using stack" },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
  {
    id: "lab3",
    title: "SQL Queries Practice",
    subjectId: "sub3",
    objectives: "Practice complex SQL queries including joins and subqueries",
    theory: "SQL (Structured Query Language) is used to manage and manipulate relational databases.",
    questions: [
      { id: "q1", question: "Write a query to find employees earning more than their managers" },
      { id: "q2", question: "Write a query using INNER JOIN to get student grades with subject names" },
      { id: "q3", question: "Write a query to find the second highest salary" },
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    class: "IT 3rd Year",
  },
];

// Generate lab submissions
const generateLabSubmissions = (): LabSubmission[] => {
  const submissions: LabSubmission[] = [];
  
  demoLabSessions.forEach((lab) => {
    demoStudents.forEach((student) => {
      const rand = Math.random();
      const isCompleted = rand > 0.2;
      
      if (isCompleted) {
        const isGraded = rand > 0.5;
        submissions.push({
          id: `labsub-${lab.id}-${student.id}`,
          labSessionId: lab.id,
          studentId: student.id,
          submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          answers: lab.questions.map((q) => ({
            questionId: q.id,
            answer: `Answer for question ${q.id}`,
            code: `// Code solution for ${q.question}`,
          })),
          marks: isGraded ? Math.floor(Math.random() * 20 + 80) : undefined,
          feedback: isGraded ? "Well done!" : undefined,
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
    class: "IT 3rd Year",
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
    class: "IT 3rd Year",
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
    class: "IT 3rd Year",
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

// Current student (for student view)
export const currentStudent = demoStudents[0];

// Helper to get subject name
export const getSubjectName = (subjectId: string): string => {
  return demoSubjects.find((s) => s.id === subjectId)?.name || "Unknown";
};

// Helper to get student name
export const getStudentName = (studentId: string): string => {
  return demoStudents.find((s) => s.id === studentId)?.name || "Unknown";
};
