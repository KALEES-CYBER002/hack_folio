import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: '#', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Mail size={20} />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Kaleeswaran S</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                A passionate cybersecurity student, developer, and artist with expertise in various technologies and a focus on security.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-primary-200">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Certifications
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-primary-200">Contact</h4>
              <address className="not-italic text-gray-300">
                <p className="mb-2">Chennai, Tamil Nadu</p>
                <p className="mb-2">India</p>
                <a 
                  href="mailto:kaleeswaran@example.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  kaleeswaran@example.com
                </a>
              </address>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Kaleeswaran S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};