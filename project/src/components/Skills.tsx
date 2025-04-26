import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash, Code2, Terminal, Shield, Globe, Database, Server, Laptop, Cpu } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const Skills = () => {
  const { skills, addSkill, updateSkill, deleteSkill, isAdmin } = usePortfolioStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 75 });
  const [editingSkill, setEditingSkill] = useState<{ id: string; name: string; level: number }>({ 
    id: '', name: '', level: 0 
  });

  const getSkillIcon = (skillName: string) => {
    const skillIcons: { [key: string]: JSX.Element } = {
      'Java': <Code2 size={24} />,
      'Python': <Terminal size={24} />,
      'C': <Cpu size={24} />,
      'HTML/CSS': <Globe size={24} />,
      'Spring Boot': <Server size={24} />,
      'JavaScript': <Code2 size={24} />,
      'Cybersecurity': <Shield size={24} />,
      'React': <Code2 size={24} />,
      'Database': <Database size={24} />,
      'Full Stack': <Laptop size={24} />
    };

    return skillIcons[skillName] || <Code2 size={24} />;
  };

  const handleAddSkill = () => {
    addSkill(newSkill);
    setNewSkill({ name: '', level: 75 });
    setIsAddModalOpen(false);
  };

  const handleEditSkill = () => {
    updateSkill(editingSkill.id, { name: editingSkill.name, level: editingSkill.level });
    setIsEditModalOpen(false);
  };

  const handleEditButtonClick = (skill: { id: string; name: string; level: number }) => {
    setEditingSkill(skill);
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
    <section className="py-16 bg-gray-50 dark:bg-dark-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-900 dark:text-primary-400">
            Technical Skills
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            I've developed expertise in various technologies throughout my journey as a developer and cybersecurity enthusiast.
          </p>
          {isAdmin && (
            <Button 
              className="mt-4"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Add Skill
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
          {skills.map((skill) => (
            <motion.div key={skill.id} variants={item}>
              <Card hoverEffect className="h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-primary-600 dark:text-primary-400">
                      {getSkillIcon(skill.name)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {skill.name}
                    </h3>
                  </div>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditButtonClick(skill)}
                        className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200 dark:bg-primary-900 dark:text-primary-200">
                        Proficiency
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-200">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200 dark:bg-dark-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 dark:bg-primary-500"
                    ></motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Skill Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Skill">
        <div className="space-y-4">
          <Input
            label="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Proficiency Level: {newSkill.level}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill} disabled={!newSkill.name}>
              Add Skill
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Skill Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Skill">
        <div className="space-y-4">
          <Input
            label="Skill Name"
            value={editingSkill.name}
            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Proficiency Level: {editingSkill.level}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={editingSkill.level}
              onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSkill} disabled={!editingSkill.name}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};