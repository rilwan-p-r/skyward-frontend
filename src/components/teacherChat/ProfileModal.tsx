import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentInterface } from '../../interfaces/studentInterface';
import { TeacherInterface } from '../../interfaces/teacherInterface';


interface ProfileModalProps {
    selectedProfile: StudentInterface | TeacherInterface | null;
    setSelectedProfile: (profile: StudentInterface | TeacherInterface | null) => void;
    renderOnlineIndicator: (userId: string) => JSX.Element;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
    selectedProfile,
    setSelectedProfile,
    renderOnlineIndicator
}) => {
    if (!selectedProfile) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
                onClick={() => setSelectedProfile(null)}
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.img
                        src={selectedProfile.imageUrl}
                        alt={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                    {renderOnlineIndicator(selectedProfile._id)}
                    <h3 className="text-2xl font-bold text-center mb-2 text-black">{`${selectedProfile.firstName} ${selectedProfile.lastName}`}</h3>
                    <p className="text-center text-gray-600 mb-4">{selectedProfile.email}</p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
                        onClick={() => setSelectedProfile(null)}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProfileModal;