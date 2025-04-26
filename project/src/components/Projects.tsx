import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash, Recycle, Hotel, Globe, Database, Server, Code2, Laptop } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';

export const Projects = () => {
  const { projects, addProject, updateProject, deleteProject, isAdmin } = usePortfolioStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    technologies: [] as string[] 
  });
  const [techInput, setTechInput] = useState('');
  const [editingProject, setEditingProject] = useState({ 
    id: '', 
    title: '', 
    description: '', 
    technologies: [] as string[] 
  });
  const [editTechInput, setEditTechInput] = useState('');

  const getProjectIcon = (title: string) => {
    const projectIcons: { [key: string]: JSX.Element } = {
      'Real-Time Waste Management System': <Recycle size={24} />,
      'Hotel Management System': <Hotel size={24} />,
      'Personal Portfolio': <Globe size={24} />,
      'Database Project': <Database size={24} />,
      'Server Application': <Server size={24} />,
      'Web Application': <Code2 size={24} />,
      'Full Stack Project': <Laptop size={24} />
    };

    const defaultIcon = <Code2 size={24} />;
    return Object.entries(projectIcons).find(([key]) => 
      title.toLowerCase().includes(key.toLowerCase()))?.[1] || defaultIcon;
  };

  const handleAddTech = () => {
    if (techInput.trim() && !newProject.technologies.includes(techInput.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((t) => t !== tech),
    });
  };

  const handleAddEditTech = () => {
    if (editTechInput.trim() && !editingProject.technologies.includes(editTechInput.trim())) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, editTechInput.trim()],
      });
      setEditTechInput('');
    }
  };

  const handleRemoveEditTech = (tech: string) => {
    setEditingProject({
      ...editingProject,
      technologies: editingProject.technologies.filter((t) => t !== tech),
    });
  };

  const handleAddProject = () => {
    addProject(newProject);
    setNewProject({ title: '', description: '', technologies: [] });
    setIsAddModalOpen(false);
  };

  const handleEditProject = () => {
    updateProject(editingProject.id, {
      title: editingProject.title,
      description: editingProject.description,
      technologies: editingProject.technologies,
    });
    setIsEditModalOpen(false);
  };

  const handleEditButtonClick = (project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
  }) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-16 bg-white dark:bg-dark-400">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-900 dark:text-primary-400">
            Projects
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are some of the projects I've worked on that showcase my skills and experience.
          </p>
          {isAdmin && (
            <Button 
              className="mt-4"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Add Project
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card hoverEffect className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-primary-600 dark:text-primary-400">
                        {getProjectIcon(project.title)}
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditButtonClick(project)}
                          className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                </CardContent>
                
                <CardFooter className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Project">
        <div className="space-y-4">
          <Input
            label="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            fullWidth
          />
          <TextArea
            label="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={4}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Technologies Used
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology..."
                className="flex-grow"
              />
              <Button onClick={handleAddTech} type="button">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 flex items-center"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProject}
              disabled={!newProject.title || !newProject.description}
            >
              Add Project
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Project Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Project">
        <div className="space-y-4">
          <Input
            label="Project Title"
            value={editingProject.title}
            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
            fullWidth
          />
          <TextArea
            label="Project Description"
            value={editingProject.description}
            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
            rows={4}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Technologies Used
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={editTechInput}
                onChange={(e) => setEditTechInput(e.target.value)}
                placeholder="Add technology..."
                className="flex-grow"
              />
              <Button onClick={handleAddEditTech} type="button">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {editingProject.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 flex items-center"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveEditTech(tech)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditProject}
              disabled={!editingProject.title || !editingProject.description}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};