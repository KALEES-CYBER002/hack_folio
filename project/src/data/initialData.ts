import { UserInfo, Skill, Project, Certification } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const userInfo: UserInfo = {
  name: "Kaleeswaran S",
  title: "Cybersecurity Student, Developer & Artist",
  bio: "I specialize in vulnerability analysis, real-world security challenges, full-stack development, and I enjoy documenting my journey through art and AI.",
  email: "kaleeswaran@example.com"
};

export const skills: Skill[] = [
  { id: uuidv4(), name: "Java", level: 85 },
  { id: uuidv4(), name: "Python", level: 80 },
  { id: uuidv4(), name: "C", level: 75 },
  { id: uuidv4(), name: "HTML/CSS", level: 90 },
  { id: uuidv4(), name: "Spring Boot", level: 70 },
  { id: uuidv4(), name: "JavaScript", level: 85 },
  { id: uuidv4(), name: "Cybersecurity", level: 80 },
  { id: uuidv4(), name: "React", level: 75 }
];

export const projects: Project[] = [
  {
    id: uuidv4(),
    title: "Real-Time Waste Management System",
    description: "Built a full-stack web app to monitor and analyze waste management with real-time updates.",
    technologies: ["Java", "Spring Boot", "MySQL", "React"]
  },
  {
    id: uuidv4(),
    title: "Hotel Management System",
    description: "Java-based backend and frontend integration with MySQL for hotel bookings and menu handling.",
    technologies: ["Java", "MySQL", "Swing"]
  },
  {
    id: uuidv4(),
    title: "Personal Portfolio",
    description: "This animated and responsive website showcasing all my skills, experience, and projects.",
    technologies: ["React", "TypeScript", "Tailwind CSS"]
  }
];

export const certifications: Certification[] = [
  {
    id: uuidv4(),
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2024-03-15",
    credentialId: "ECC12345",
    url: "https://example.com/cert/ceh"
  },
  {
    id: uuidv4(),
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2023-10-20",
    credentialId: "COMP98765",
    url: "https://example.com/cert/security"
  }
];