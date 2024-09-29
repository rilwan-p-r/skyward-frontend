import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { BatchWithCourseInterface } from '../../interfaces/BatchWithCourse';


const BatchList = (props: any) => {
    const {
        batches,
        selectedBatch,
        setSelectedBatch,
        batchListOpen,
        toggleBatchList,
        isMobile,
    } = props;
    return (
        <AnimatePresence>
            {(batchListOpen || !isMobile) && (
                <motion.div
                    initial={isMobile ? { x: '-100%' } : { x: 0 }}
                    animate={{ x: 0 }}
                    exit={isMobile ? { x: '-100%' } : { x: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`${isMobile ? 'fixed inset-y-0 left-0 z-20' : ''} w-64 bg-gray-100 overflow-y-auto`}
                >
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-bold">Batches</h2>
                        {isMobile && (
                            <button onClick={toggleBatchList} className="text-gray-600">
                                <FaChevronLeft />
                            </button>
                        )}
                    </div>
                    {batches.map((batch:BatchWithCourseInterface) => (
                        <motion.div
                            key={batch._id}
                            whileHover={{ backgroundColor: "#e5e7eb" }}
                            className={`p-4 cursor-pointer ${selectedBatch?._id === batch._id ? 'bg-blue-200' : ''}`}
                            onClick={() => {
                                setSelectedBatch(batch);
                                if (isMobile) toggleBatchList();
                            }}
                        >
                            <h3 className="font-semibold">{batch.batch}</h3>
                            <p className="text-sm text-gray-600">{batch.course.course}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BatchList;