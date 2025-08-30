import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';

const VictoryPopup = ({ isOpen, onClose, stats, totalSteps }) => {
    useEffect(() => {
        if (!isOpen) return; // ✅ check inside effect, not outside

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null; // ✅ safe to return after hooks

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                    initial={{ scale: 0.5, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.5, y: 50, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with confetti effect */}
                    <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 text-center overflow-hidden">
                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: [
                                    "linear-gradient(45deg, #fbbf24, #f59e0b, #ef4444)",
                                    "linear-gradient(45deg, #ef4444, #fbbf24, #f59e0b)",
                                    "linear-gradient(45deg, #f59e0b, #ef4444, #fbbf24)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Floating confetti elements */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-2xl opacity-60"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${10 + (i % 2) * 20}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            >
                                {['🎉', '✨', '🎊', '🌟', '💫', '🎈'][i]}
                            </motion.div>
                        ))}

                        {/* Winner Logo */}
                        <motion.div
                            className="relative z-10"
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 10, scale: 1 }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <div className="text-6xl mb-2">🏆</div>
                            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                                VICTORY!
                            </h1>
                            <p className="text-white/90 text-lg">Path Found Successfully!</p>
                        </motion.div>
                    </div>

                    {/* Stats Content */}
                    <div className="p-6 space-y-6">
                        {/* Total Moves */}
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl text-center"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-4xl font-bold mb-1">{stats.minSteps}</div>
                            <div className="text-lg opacity-90">Total Moves</div>
                            <div className="text-sm opacity-75">Optimal Path Length</div>
                        </motion.div>

                        {/* Total Values */}
                        <motion.div
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="text-4xl font-bold mb-1">{stats.maxVal}</div>
                            <div className="text-lg opacity-90">Total Gifts Collected</div>
                            <div className="text-sm opacity-75">Maximum Value Achieved</div>
                        </motion.div>

                        {/* Algorithm Performance */}
                        <motion.div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl text-center"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="text-2xl font-bold mb-1">{totalSteps}</div>
                            <div className="text-lg opacity-90">Algorithm Steps</div>
                            <div className="text-sm opacity-75">Total Exploration Steps</div>
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="text-2xl mb-2">🎉</div>
                            <p className="text-gray-700 font-semibold">
                                Congratulations! You've found the optimal path with the most gifts!
                            </p>
                        </motion.div>

                        {/* Performance Rating */}
                        <motion.div
                            className="text-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.0 }}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-lg">Performance Rating:</span>
                                <motion.div
                                    className="text-2xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    {stats.minSteps <= 4 ? '🥇' : stats.minSteps <= 6 ? '🥈' : '🥉'}
                                </motion.div>
                                <span className="text-sm text-gray-600">
                                    {stats.minSteps <= 4 ? 'Excellent!' : stats.minSteps <= 6 ? 'Good!' : 'Keep trying!'}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 pt-0">
                        <motion.button
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg relative overflow-hidden"
                            onClick={onClose}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Animated background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                            />
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                <span>Continue Exploring!</span>
                                <motion.span
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    🚀
                                </motion.span>
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VictoryPopup;
