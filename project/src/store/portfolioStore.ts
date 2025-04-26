import { create } from 'zustand';
import { UserInfo, Skill, Project, Certification } from '../types';
import { userInfo, skills, projects, certifications } from '../data/initialData';
import { v4 as uuidv4 } from 'uuid';

interface PortfolioState {
  userInfo: UserInfo;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  isAdmin: boolean;
  
  // User info actions
  updateUserInfo: (info: Partial<UserInfo>) => void;
  
  // Skills actions
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Projects actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Certifications actions
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  
  // Admin actions
  toggleAdmin: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  userInfo,
  skills,
  projects,
  certifications,
  isAdmin: false,
  
  // User info actions
  updateUserInfo: (info) => 
    set((state) => ({ userInfo: { ...state.userInfo, ...info } })),
  
  // Skills actions
  addSkill: (skill) => 
    set((state) => ({ 
      skills: [...state.skills, { id: uuidv4(), ...skill }] 
    })),
  
  updateSkill: (id, updatedSkill) => 
    set((state) => ({ 
      skills: state.skills.map(skill => 
        skill.id === id ? { ...skill, ...updatedSkill } : skill
      ) 
    })),
  
  deleteSkill: (id) => 
    set((state) => ({ 
      skills: state.skills.filter(skill => skill.id !== id) 
    })),
  
  // Projects actions
  addProject: (project) => 
    set((state) => ({ 
      projects: [...state.projects, { id: uuidv4(), ...project }] 
    })),
  
  updateProject: (id, updatedProject) => 
    set((state) => ({ 
      projects: state.projects.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      ) 
    })),
  
  deleteProject: (id) => 
    set((state) => ({ 
      projects: state.projects.filter(project => project.id !== id) 
    })),
  
  // Certifications actions
  addCertification: (certification) => 
    set((state) => ({ 
      certifications: [...state.certifications, { id: uuidv4(), ...certification }] 
    })),
  
  updateCertification: (id, updatedCertification) => 
    set((state) => ({ 
      certifications: state.certifications.map(certification => 
        certification.id === id ? { ...certification, ...updatedCertification } : certification
      ) 
    })),
  
  deleteCertification: (id) => 
    set((state) => ({ 
      certifications: state.certifications.filter(certification => certification.id !== id) 
    })),
  
  // Admin actions
  toggleAdmin: () => 
    set((state) => ({ isAdmin: !state.isAdmin })),
}));