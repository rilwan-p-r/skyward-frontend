import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, } from 'lucide-react';

import { getMCQCompetition } from '../../api/admin/getMCQCompetition';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebarItems';

interface MCQCompetition {
  _id: string;
  competitionTitle: string;
  competitionSummary: string;
  timeLimit: number;
  endDate: string;
  createdAt: string;
}

const AdminMCQCompetitionList: React.FC = () => {
  const [competitions, setCompetitions] = useState<MCQCompetition[]>([]);
  const [showSummary, setShowSummary] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getMCQCompetition();
        setCompetitions(response);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);

  const handleCreateNew = () => {
    navigate('/admin/AddMCQCompetition');
  };

  const toggleSummary = (id: string) => {
    setShowSummary(showSummary === id ? null : id);
  };

  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">MCQ Competitions</h1>
          <button
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateNew}
          >
            Create New
          </button>
        </div>
        <div className="space-y-4">
          {competitions.map((competition) => (
            <div 
              key={competition._id} 
              className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => toggleSummary(competition._id)}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="font-bold">{competition.competitionTitle}</h3>
                  <p className="text-gray-500 text-sm">
                    Created: {new Date(competition.createdAt).toLocaleDateString()} | End Date:{' '}
                    {new Date(competition.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={`transition-transform duration-300 ${
                  showSummary === competition._id ? 'rotate-180' : ''
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              <AnimatePresence>
                {showSummary === competition._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <p>{competition.competitionSummary}</p>
                      <div className="mt-4 flex justify-between">
                        <div>
                          Time Limit: {competition.timeLimit} minutes
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMCQCompetitionList;