import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock, Calendar, CheckCircle, Award, CheckSquare } from 'lucide-react';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { getMCQCompetitionList } from '../../api/student/getMCQCompetitionList';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { MCQCompetitionInterface } from '../../interfaces/mcqCompetitoinInterface';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import MCQCompetitionPage from './mcqCompetitionPage';
import { checkCompetitionAttendance } from '../../api/student/checkCompetitionAttendance ';

interface ExtendedMCQCompetitionInterface extends MCQCompetitionInterface {
  attempted?: boolean;
  score?: number;
  submittedDate?: string;
}

const MCQCompetitionListStudent: React.FC = () => {
  const [competitions, setCompetitions] = useState<ExtendedMCQCompetitionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<MCQCompetitionInterface | null>(null);
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        const response = await getMCQCompetitionList(studentInfo._id);
        
        const extendedCompetitions = await Promise.all(
          response.map(async (comp:MCQCompetitionInterface) => {
            if (studentInfo?._id) {
              const attemptInfo = await checkCompetitionAttendance(studentInfo._id, comp._id);
              return {
                ...comp,
                attempted: attemptInfo.attempted,
                score: attemptInfo.score,
                submittedDate: attemptInfo.submittedDate,
              };
            }
            return comp;
          })
        );
        setCompetitions(extendedCompetitions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch competitions. Please try again later.');
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [studentInfo?._id]);

  const handleStartCompetition = (competition: ExtendedMCQCompetitionInterface) => {
    if (competition.attempted) {
      message.info('You have already completed this competition.');
    } else {
      setSelectedCompetition(competition);
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) {
    return <div className="text-center py-10">Loading competitions...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (selectedCompetition) {
    return <MCQCompetitionPage mcqCompetition={selectedCompetition} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex items-center md:hidden bg-white shadow-sm">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="text-gray-600"
          >
            <FaBars className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">MCQ Competitions</h2>
            {competitions.length === 0 ? (
              <p className="text-center py-10 text-gray-600">No competitions available at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competitions.map((competition) => (
                  <div key={competition._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{competition.competitionTitle}</h3>
                      <p className="text-gray-600 mb-4">{competition.competitionSummary}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{competition.timeLimit} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Ends: {format(new Date(competition.endDate), 'PPP')}</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>{competition.questions.length} Questions</span>
                        </div>
                        {competition.attempted && (
                          <>
                            <div className="flex items-center text-green-600">
                              <CheckSquare className="w-4 h-4 mr-2" />
                              <span>Completed</span>
                            </div>
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-2" />
                              <span>Score: {competition.score}/{competition.questions.length}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>Submitted: {format(new Date(competition.submittedDate!), 'PPP')}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="px-6 pb-6 mt-auto">
                      <button 
                        className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          competition.attempted
                            ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-700 focus:ring-black'
                        }`}
                        onClick={() => handleStartCompetition(competition)}
                        disabled={competition.attempted}
                      >
                        {competition.attempted ? 'Completed' : 'Start Competition'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQCompetitionListStudent;