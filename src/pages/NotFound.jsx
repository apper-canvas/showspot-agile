import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const TicketOffIcon = getIcon('TicketOff');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="p-6 rounded-full bg-surface-100 dark:bg-surface-800">
            <TicketOffIcon size={64} className="text-secondary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-surface-50">
          Page Not Found
        </h1>
        
        <p className="text-xl text-surface-600 dark:text-surface-300 mb-8">
          The show you're looking for doesn't seem to be playing here.
        </p>
        
        <div className="inline-flex gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            <HomeIcon size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 text-center md:text-left">
          <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 className="font-semibold text-lg mb-2">Browse Popular Events</h3>
            <p className="text-surface-500 mb-4">Discover trending shows and events.</p>
            <Link to="/" className="text-primary hover:text-primary-dark font-medium">
              Explore Events →
            </Link>
          </div>
          
          <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 className="font-semibold text-lg mb-2">Need Assistance?</h3>
            <p className="text-surface-500 mb-4">Our support team is ready to help.</p>
            <Link to="/" className="text-primary hover:text-primary-dark font-medium">
              Contact Support →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}