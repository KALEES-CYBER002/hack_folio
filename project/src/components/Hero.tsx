import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Input, TextArea } from './ui/Input';
import { Button } from './ui/Button';

export const Hero = () => {
  const { userInfo, updateUserInfo, isAdmin } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleEdit = () => {
    setEditedInfo(userInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserInfo(editedInfo);
    setIsEditing(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800 text-white">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-500 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-secondary-500 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={item} className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-accent-500 to-secondary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">{userInfo.name.charAt(0)}</span>
            </div>
          </motion.div>
          
          <motion.h1 variants={item} className="text-4xl sm:text-5xl font-bold mb-4">
            Hey, I'm {userInfo.name.split(' ')[0]} 👋
          </motion.h1>
          
          <motion.h2 variants={item} className="text-xl sm:text-2xl text-primary-200 mb-6">
            {userInfo.title}
          </motion.h2>
          
          <motion.p variants={item} className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            {userInfo.bio}
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent-600 hover:bg-accent-700"
              onClick={() => window.open(`mailto:${userInfo.email}`, '_blank')}
            >
              Contact Me
            </Button>
            
            {isAdmin && (
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={handleEdit}
              >
                <Edit className="mr-2" size={18} />
                Edit Info
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Personal Information">
        <div className="space-y-4">
          <Input
            label="Name"
            value={editedInfo.name}
            onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
            fullWidth
          />
          <Input
            label="Title"
            value={editedInfo.title}
            onChange={(e) => setEditedInfo({ ...editedInfo, title: e.target.value })}
            fullWidth
          />
          <TextArea
            label="Bio"
            value={editedInfo.bio}
            onChange={(e) => setEditedInfo({ ...editedInfo, bio: e.target.value })}
            rows={4}
            fullWidth
          />
          <Input
            label="Email"
            type="email"
            value={editedInfo.email}
            onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
            fullWidth
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};