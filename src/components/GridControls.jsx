import { motion } from 'framer-motion';
import React, { useState } from 'react';

const GridControls = ({ gridRows, gridCols, onGridSizeChange, simulationState }) => {
    const gridSizeOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
    const [customRows, setCustomRows] = useState(gridRows);
    const [customCols, setCustomCols] = useState(gridCols);

    // Update custom sizes when grid size changes externally
    React.useEffect(() => {
        setCustomRows(gridRows);
        setCustomCols(gridCols);
    }, [gridRows, gridCols]);

    const handleCustomSizeSubmit = () => {
        if (customRows >= 2 && customRows <= 20 && customCols >= 2 && customCols <= 20) {
            onGridSizeChange(customRows, customCols);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCustomSizeSubmit();
        }
    };

    const createSquareGrid = (size) => {
        onGridSizeChange(size, size);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Grid Configurations
            </h2>

            <div className="grid grid-cols-1  gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Grid: {gridRows} × {gridCols}
                            {gridRows !== gridCols && (
                                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                    Rectangular
                                </span>
                            )}
                        </label>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Common Square Grids:</label>
                                <div className="flex flex-wrap gap-2">
                                    {gridSizeOptions.map((size) => (
                                        <motion.button
                                            key={size}
                                            className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${size === gridRows && size === gridCols
                                                ? 'bg-yellow-400 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            onClick={() => createSquareGrid(size)}
                                            disabled={simulationState !== 'idle'}
                                            whileHover={{ scale: simulationState === 'idle' ? 1.05 : 1 }}
                                            whileTap={{ scale: simulationState === 'idle' ? 0.95 : 1 }}
                                        >
                                            {size}×{size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Common Rectangular Grids:</label>
                                <div className="flex flex-wrap gap-2">
                                    {[[3, 4], [4, 3], [3, 5], [5, 3], [4, 6], [6, 4], [5, 8], [8, 5], [6, 10], [10, 6]].map(([rows, cols]) => (
                                        <motion.button
                                            key={`${rows}-${cols}`}
                                            className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${rows === gridRows && cols === gridCols
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            onClick={() => onGridSizeChange(rows, cols)}
                                            disabled={simulationState !== 'idle'}
                                            whileHover={{ scale: simulationState === 'idle' ? 1.05 : 1 }}
                                            whileTap={{ scale: simulationState === 'idle' ? 0.95 : 1 }}
                                        >
                                            {rows}×{cols}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* Custom Grid Size Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Grid Size
                        </label>
                        <div className="grid grid-cols-12 items-center gap-2 mb-2">
                            <div className='col-span-4'>
                                <label className="block text-xs text-gray-600 mb-1">Rows</label>
                                <input
                                    type="number"
                                    min="2"
                                    max="20"
                                    value={customRows}
                                    onChange={(e) => setCustomRows(parseInt(e.target.value) || 2)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Rows"
                                    disabled={simulationState !== 'idle'}
                                />
                            </div>
                            <div className='col-span-4'>
                                <label className="block text-xs text-gray-600 mb-1">Columns</label>
                                <input
                                    type="number"
                                    min="2"
                                    max="20"
                                    value={customCols}
                                    onChange={(e) => setCustomCols(parseInt(e.target.value) || 2)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Columns"
                                    disabled={simulationState !== 'idle'}
                                />
                            </div>

                            <div className=" col-span-4 mt-4">
                                <motion.button
                                    className="w-full flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                    onClick={handleCustomSizeSubmit}
                                    disabled={simulationState !== 'idle' || customRows < 2 || customRows > 20 || customCols < 2 || customCols > 20}
                                    whileHover={{ scale: simulationState === 'idle' && customRows >= 2 && customRows <= 20 && customCols >= 2 && customCols <= 20 ? 1.05 : 1 }}
                                    whileTap={{ scale: simulationState === 'idle' && customRows >= 2 && customRows <= 20 && customCols >= 2 && customCols <= 20 ? 0.95 : 1 }}
                                >
                                    Set {customRows}×{customCols}
                                </motion.button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Create rectangular grids with different row and column counts.
                            Perfect for simulating real-world scenarios like mazes, buildings, or custom layouts.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {simulationState !== 'idle' && (
                        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                            ⚠️ Grid editing is disabled during simulation. Reset to modify the grid.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GridControls;
