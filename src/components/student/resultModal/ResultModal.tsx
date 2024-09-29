import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { McqResultInterface } from '../../../interfaces/mcqResultInterface';

interface ResultModalProps {
  showModal: boolean;
  result: McqResultInterface | null;
  totalQuestions: number;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ showModal, result, totalQuestions, onClose }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Competition Result</h2>
            {result && (
              <div className="text-center">
                <p className="text-4xl font-bold mb-4 text-blue-600">
                  Your Score: {result.score}
                </p>
                <p className="text-lg">Total Questions: {totalQuestions}</p>
                <p className="text-lg mb-6">
                  Percentage: {((result.score / totalQuestions) * 100).toFixed(2)}%
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                >
                  {result.score / totalQuestions >= 0.7 ? (
                    <span className="text-4xl">🎉</span>
                  ) : (
                    <span className="text-6xl">👍</span>
                  )}
                </motion.div>
              </div>
            )}
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;