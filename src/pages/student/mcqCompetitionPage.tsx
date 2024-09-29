import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MCQCompetitionInterface, MCQQuestion } from '../../interfaces/mcqCompetitoinInterface';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { RootState } from '../../redux/store/store';
import { startMCQCompetition } from '../../api/student/startMCQCompetition';
import { submitMCQCompetition } from '../../api/student/submitMCQCompetition';
import { McqResultInterface } from '../../interfaces/mcqResultInterface';
import ResultModal from '../../components/student/resultModal/ResultModal';

interface MCQCompetitionPageProps {
  mcqCompetition: MCQCompetitionInterface;
}

const MCQCompetitionPage: React.FC<MCQCompetitionPageProps> = ({ mcqCompetition }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(mcqCompetition.timeLimit * 60);
  const [competitionStarted, setCompetitionStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [competitionEnded, setCompetitionEnded] = useState(false);
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);
  const initializationRef = useRef(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState<McqResultInterface | null>(null);

  // Define the handleBeforeUnload and handlePopState functions
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handlePopState = (e: PopStateEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', window.location.href);
    message.warning('You cannot go back during an active competition.');
  };

  const initializeCompetition = useCallback(async () => {
    if (!mcqCompetition._id || !studentInfo?._id || competitionStarted || initializationRef.current) {
      return;
    }

    initializationRef.current = true;

    try {
      const response =await startMCQCompetition(studentInfo._id, mcqCompetition._id);
      console.log(response);
      setCompetitionStarted(true);
    } catch (error) {
      console.error('Failed to initialize competition:', error);
      message.error('Failed to start the competition. Please try again.');
      navigate('/student/');
    }
  }, [mcqCompetition._id, studentInfo?._id, navigate, competitionStarted]);

  useEffect(() => {
    initializeCompetition();

    if (competitionStarted && !competitionEnded) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [initializeCompetition, competitionStarted, competitionEnded]);

  useEffect(() => {
    if (!competitionStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [competitionStarted]);

  const cleanupEventListeners = useCallback(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('popstate', handlePopState);
  }, []);
  
// handle submit-----------------------------------------
const handleSubmit = useCallback(async () => {
  if (!mcqCompetition._id || !studentInfo?._id || isSubmitting) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await submitMCQCompetition(studentInfo._id, mcqCompetition._id, answers);
    console.log(response);

    setResult(response);
    setShowResultModal(true);
    setCompetitionEnded(true);

    cleanupEventListeners();
  } catch (error) {
    console.error('Failed to submit competition:', error);
    message.error('Failed to submit the competition. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}, [mcqCompetition._id, studentInfo, answers, isSubmitting, cleanupEventListeners]);

const handleCloseModal = useCallback(() => {
  setShowResultModal(false);

  cleanupEventListeners();

  setTimeout(() => {
    navigate('/student/', { replace: true });
  }, 300);
}, [navigate, cleanupEventListeners]);


  useEffect(() => {
    if (timeLeft === 0 && competitionStarted && !isSubmitting) {
      handleSubmit();
    }
  }, [timeLeft, handleSubmit, competitionStarted, isSubmitting]);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mcqCompetition.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentQuestion: MCQQuestion = mcqCompetition.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">{mcqCompetition.competitionTitle}</h1>
          <p className="mt-1">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1} of {mcqCompetition.questions.length}</h2>
          <p className="text-lg mb-6">{currentQuestion.question}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border ${answers[currentQuestion._id] === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-100'
                  }`}
                onClick={() => handleAnswer(currentQuestion._id, index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < mcqCompetition.questions.length - 1 ? (
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>

      <ResultModal
        showModal={showResultModal}
        result={result}
        totalQuestions={mcqCompetition.questions.length}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MCQCompetitionPage;
