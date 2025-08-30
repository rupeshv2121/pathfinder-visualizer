import { motion } from 'framer-motion';
import React, { useState } from 'react';

const CellEditor = ({ isOpen, onClose, onSave, initialValue, position }) => {
    const [value, setValue] = useState(initialValue === Infinity ? '∞' : initialValue.toString());
    const [error, setError] = useState('');

    const handleSave = () => {
        let parsedValue;

        if (value === '∞' || value.toLowerCase() === 'infinity') {
            parsedValue = Infinity;
        } else {
            parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) {
                setError('Please enter a valid number or ∞');
                return;
            }
        }

        onSave(parsedValue);
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-lg p-6 w-80"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Edit Cell ({position.row}, {position.col})
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cell Value:
                        </label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                setError('');
                            }}
                            onKeyPress={handleKeyPress}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter value or ∞"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <div className="text-sm text-gray-600">
                        <div className="font-medium mb-1">Examples:</div>
                        <div>• Numbers: 5, -2, 0.5</div>
                        <div>• Obstacles: ∞, infinity</div>
                        <div>• Negative values reduce total</div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CellEditor;
