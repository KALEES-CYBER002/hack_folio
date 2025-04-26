import { useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Award, Code, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const AdminPage = () => {
  const navigate = useNavigate();
  const { isAdmin, toggleAdmin } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<string>('profile');

  const handleSaveAll = () => {
    toast.success('All changes saved successfully');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
            <p className="mb-6 text-gray-600">
              You need to enable admin mode to access this page.
            </p>
            <div className="space-y-4">
              <Button onClick={toggleAdmin} fullWidth>
                Enable Admin Mode
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} fullWidth>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <BookOpen size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-300">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft size={18} className="mr-2" />
            Back to Portfolio
          </Button>
          <Button onClick={handleSaveAll}>
            <Save size={18} className="mr-2" />
            Save All Changes
          </Button>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 bg-primary-700 text-white">
            <h1 className="text-2xl font-bold">Portfolio Admin</h1>
            <p className="text-primary-200">Manage your portfolio content</p>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 flex items-center font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-primary-700 dark:text-primary-400 border-b-2 border-primary-700 dark:border-primary-400'
                    : 'text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This is the admin dashboard for your portfolio. Use the tabs above to navigate between different sections.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Changes made here will be reflected on your portfolio in real-time. You can:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Update your profile information</li>
                  <li>Manage your skills</li>
                  <li>Add, edit, or remove projects</li>
                  <li>Manage your certifications</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Go back to your portfolio to see how visitors will view your content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};