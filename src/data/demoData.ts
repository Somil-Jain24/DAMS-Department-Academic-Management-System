// Demo data for the attendance management system

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  class: string;
  section: string;
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

// Demo students
export const demoStudents: Student[] = [
  { id: "s1", name: "Aarav Sharma", rollNumber: "IT2021001", email: "aarav@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s2", name: "Priya Patel", rollNumber: "IT2021002", email: "priya@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s3", name: "Rohan Gupta", rollNumber: "IT2021003", email: "rohan@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s4", name: "Ananya Singh", rollNumber: "IT2021004", email: "ananya@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s5", name: "Vikram Reddy", rollNumber: "IT2021005", email: "vikram@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s6", name: "Neha Verma", rollNumber: "IT2021006", email: "neha@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s7", name: "Arjun Kumar", rollNumber: "IT2021007", email: "arjun@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s8", name: "Kavya Iyer", rollNumber: "IT2021008", email: "kavya@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s9", name: "Rahul Joshi", rollNumber: "IT2021009", email: "rahul@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s10", name: "Sneha Agarwal", rollNumber: "IT2021010", email: "sneha@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s11", name: "Aditya Mishra", rollNumber: "IT2021011", email: "aditya@aitr.edu", class: "IT 3rd Year", section: "A" },
  { id: "s12", name: "Pooja Saxena", rollNumber: "IT2021012", email: "pooja@aitr.edu", class: "IT 3rd Year", section: "A" },
];

// Demo subjects
export const demoSubjects: Subject[] = [
  { id: "sub1", name: "Data Structures", code: "CS301" },
  { id: "sub2", name: "Operating Systems", code: "CS302" },
  { id: "sub3", name: "Database Management", code: "CS303" },
  { id: "sub4", name: "Computer Networks", code: "CS304" },
  { id: "sub5", name: "Web Development", code: "CS305" },
];

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

// Current student (for student view)
export const currentStudent = demoStudents[0];
