import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit, Trash, Award, Calendar, ExternalLink, Shield, Code2, Database, Server, Laptop } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';

export const Certifications = () => {
  const { certifications, addCertification, updateCertification, deleteCertification, isAdmin } = usePortfolioStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCertification, setNewCertification] = useState({ 
    title: '', 
    issuer: '', 
    date: '', 
    credentialId: '', 
    url: '' 
  });
  const [editingCertification, setEditingCertification] = useState({ 
    id: '', 
    title: '', 
    issuer: '', 
    date: '', 
    credentialId: '', 
    url: '' 
  });

  const getCertificationIcon = (title: string) => {
    const certIcons: { [key: string]: JSX.Element } = {
      'Ethical Hacker': <Shield size={24} />,
      'Security+': <Shield size={24} />,
      'Full Stack': <Laptop size={24} />,
      'Web Development': <Code2 size={24} />,
      'Database': <Database size={24} />,
      'Cloud': <Server size={24} />
    };

    const defaultIcon = <Award size={24} />;
    return Object.entries(certIcons).find(([key]) => 
      title.toLowerCase().includes(key.toLowerCase()))?.[1] || defaultIcon;
  };

  const handleAddCertification = () => {
    addCertification(newCertification);
    setNewCertification({ title: '', issuer: '', date: '', credentialId: '', url: '' });
    setIsAddModalOpen(false);
  };

  const handleEditCertification = () => {
    updateCertification(editingCertification.id, {
      title: editingCertification.title,
      issuer: editingCertification.issuer,
      date: editingCertification.date,
      credentialId: editingCertification.credentialId,
      url: editingCertification.url,
    });
    setIsEditModalOpen(false);
  };

  const handleEditButtonClick = (certification: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
  }) => {
    setEditingCertification({
      id: certification.id,
      title: certification.title,
      issuer: certification.issuer,
      date: certification.date,
      credentialId: certification.credentialId || '',
      url: certification.url || '',
    });
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
            Certifications
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Professional certifications that validate my skills and knowledge in various domains.
          </p>
          {isAdmin && (
            <Button 
              className="mt-4"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Add Certification
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {certifications.map((certification) => (
            <motion.div key={certification.id} variants={item}>
              <Card hoverEffect className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-primary-600 dark:text-primary-400">
                        {getCertificationIcon(certification.title)}
                      </div>
                      <CardTitle>{certification.title}</CardTitle>
                    </div>
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditButtonClick(certification)}
                          className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteCertification(certification.id)}
                          className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>{formatDate(certification.date)}</span>
                  </div>
                  <p className="text-primary-700 dark:text-primary-300 font-medium">{certification.issuer}</p>
                  {certification.credentialId && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                      Credential ID: {certification.credentialId}
                    </p>
                  )}
                </CardContent>
                
                {certification.url && (
                  <CardFooter>
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Certificate
                    </a>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Certification Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Certification">
        <div className="space-y-4">
          <Input
            label="Certification Title"
            value={newCertification.title}
            onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
            fullWidth
          />
          <Input
            label="Issuing Organization"
            value={newCertification.issuer}
            onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
            fullWidth
          />
          <Input
            label="Date Issued"
            type="date"
            value={newCertification.date}
            onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
            fullWidth
          />
          <Input
            label="Credential ID (Optional)"
            value={newCertification.credentialId}
            onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
            fullWidth
          />
          <Input
            label="Certificate URL (Optional)"
            value={newCertification.url}
            onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
            fullWidth
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCertification}
              disabled={!newCertification.title || !new
Certification.issuer || !newCertification.date}
            >
              Add Certification
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Certification Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Certification">
        <div className="space-y-4">
          <Input
            label="Certification Title"
            value={editingCertification.title}
            onChange={(e) => setEditingCertification({ ...editingCertification, title: e.target.value })}
            fullWidth
          />
          <Input
            label="Issuing Organization"
            value={editingCertification.issuer}
            onChange={(e) => setEditingCertification({ ...editingCertification, issuer: e.target.value })}
            fullWidth
          />
          <Input
            label="Date Issued"
            type="date"
            value={editingCertification.date}
            onChange={(e) => setEditingCertification({ ...editingCertification, date: e.target.value })}
            fullWidth
          />
          <Input
            label="Credential ID (Optional)"
            value={editingCertification.credentialId}
            onChange={(e) => setEditingCertification({ ...editingCertification, credentialId: e.target.value })}
            fullWidth
          />
          <Input
            label="Certificate URL (Optional)"
            value={editingCertification.url}
            onChange={(e) => setEditingCertification({ ...editingCertification, url: e.target.value })}
            fullWidth
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditCertification}
              disabled={!editingCertification.title || !editingCertification.issuer || !editingCertification.date}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};