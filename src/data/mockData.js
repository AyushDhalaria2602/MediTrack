// ---------------------------------------------------------------------------
// Mock data layer. In a real app this JSON would come from a backend API.
// Keeping it here as plain JS objects/arrays lets us practice:
//   - arrays of objects
//   - loops / array methods (map, filter, find, reduce)
//   - JSON-shaped data
// ---------------------------------------------------------------------------

export const patients = [
  {
    id: "p-1001",
    name: "Amrit Kaur",
    age: 34,
    gender: "Female",
    ward: "Cardiology",
    status: "stable",
    admitted: "2026-08-02",
    doctor: "Dr. Neha Sharma",
    vitals: { heartRate: 78, bp: "118/76", temp: 98.4, spo2: 98 },
    notes: "Recovering well after angioplasty. Follow-up scan scheduled.",
  },
  {
    id: "p-1002",
    name: "Baldev Singh",
    age: 61,
    gender: "Male",
    ward: "ICU",
    status: "critical",
    admitted: "2026-08-14",
    doctor: "Dr. Rohit Mehta",
    vitals: { heartRate: 112, bp: "148/95", temp: 101.2, spo2: 91 },
    notes: "Under close observation. Ventilator support on standby.",
  },
  {
    id: "p-1003",
    name: "Simran Gill",
    age: 8,
    gender: "Female",
    ward: "Pediatrics",
    status: "attention",
    admitted: "2026-08-15",
    doctor: "Dr. Priya Kapoor",
    vitals: { heartRate: 96, bp: "100/64", temp: 99.8, spo2: 97 },
    notes: "Mild fever, responding to medication.",
  },
  {
    id: "p-1004",
    name: "Ranjit Brar",
    age: 45,
    gender: "Male",
    ward: "Orthopedics",
    status: "stable",
    admitted: "2026-08-10",
    doctor: "Dr. Karan Malhotra",
    vitals: { heartRate: 72, bp: "122/80", temp: 98.6, spo2: 99 },
    notes: "Post-surgery recovery from fracture fixation, physiotherapy started.",
  },
  {
    id: "p-1005",
    name: "Harleen Kaur",
    age: 29,
    gender: "Female",
    ward: "Maternity",
    status: "stable",
    admitted: "2026-08-16",
    doctor: "Dr. Neha Sharma",
    vitals: { heartRate: 84, bp: "116/74", temp: 98.2, spo2: 98 },
    notes: "Delivered a healthy baby girl. Mother and child stable.",
  },
  {
    id: "p-1006",
    name: "Manpreet Singh",
    age: 52,
    gender: "Male",
    ward: "ICU",
    status: "critical",
    admitted: "2026-08-13",
    doctor: "Dr. Rohit Mehta",
    vitals: { heartRate: 128, bp: "160/100", temp: 102.1, spo2: 89 },
    notes: "Post cardiac arrest, being monitored around the clock.",
  },
  {
    id: "p-1007",
    name: "Ekta Sandhu",
    age: 19,
    gender: "Female",
    ward: "General",
    status: "attention",
    admitted: "2026-08-15",
    doctor: "Dr. Priya Kapoor",
    vitals: { heartRate: 90, bp: "110/70", temp: 100.4, spo2: 96 },
    notes: "Dengue under evaluation, platelet count being tracked.",
  },
];

// Appointment dates are generated relative to "today" (whenever the app is
// actually opened) instead of hardcoded, so the "Today" highlight on the
// Appointments page and the Dashboard's upcoming list always stay accurate.
const addDays = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const appointments = [
  { id: "a-1", patientId: "p-1001", doctor: "Dr. Neha Sharma", date: addDays(0), time: "09:30", type: "Follow-up" },
  { id: "a-2", patientId: "p-1004", doctor: "Dr. Karan Malhotra", date: addDays(0), time: "11:00", type: "Physiotherapy" },
  { id: "a-3", patientId: "p-1005", doctor: "Dr. Neha Sharma", date: addDays(1), time: "10:15", type: "Postnatal Checkup" },
  { id: "a-4", patientId: "p-1007", doctor: "Dr. Priya Kapoor", date: addDays(2), time: "16:45", type: "Lab Review" },
  { id: "a-5", patientId: "p-1003", doctor: "Dr. Priya Kapoor", date: addDays(3), time: "13:00", type: "Pediatric Review" },
];

export const wards = ["Cardiology", "ICU", "Pediatrics", "Orthopedics", "Maternity", "General"];

// A tiny "authorized users" table for the login demo.
// (Never do plaintext passwords like this in a real product!)
export const staff = [
  { username: "admin", password: "admin123", name: "Admin User", role: "Administrator" },
  { username: "nurse", password: "nurse123", name: "Jasleen Kaur", role: "Head Nurse" },
];
