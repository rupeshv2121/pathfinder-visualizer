import { motion } from 'framer-motion';
import { useState } from 'react';
import CellEditor from './CellEditor';
import MovingAgent from './MovingAgent';

const Grid = ({
  grid,
  cellStates,
  currentStep,
  onCellChange,
  simulationState,
  agentPosition,
  agentDirection,
  isAgentMoving
}) => {
  const [editingCell, setEditingCell] = useState(null);

  const getCellColor = (value, cellState) => {
    if (value === Infinity) {
      return 'bg-gray-800 text-white'; // Obstacle
    }

    if (cellState.path) {
      return 'bg-green-500 text-white'; // Final path
    }

    if (cellState.current) {
      return 'bg-yellow-400 text-black'; // Currently being processed
    }

    // if (cellState.visited) {
    //   return 'bg-blue-300 text-black'; // Visited
    // }

    return 'bg-white text-black border-gray-300'; // Default
  };

  const getCellValue = (value) => {
    if (value === Infinity) {
      return '∞';
    }
    return value.toString();
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (simulationState !== 'idle') return;

    const currentValue = grid[rowIndex][colIndex];
    let newValue;

    if (currentValue === Infinity) {
      newValue = 0;
    } else if (currentValue === 0) {
      newValue = 1;
    } else if (currentValue === 1) {
      newValue = -1;
    } else if (currentValue === -1) {
      newValue = Infinity;
    } else {
      newValue = currentValue + 1;
    }

    // Don't allow editing the end position (target)
    if (rowIndex === 0 && colIndex === 0) {
      return;
    }

    onCellChange(rowIndex, colIndex, newValue);
  };

  const handleCellDoubleClick = (rowIndex, colIndex) => {
    if (simulationState !== 'idle') return;

    // Don't allow editing the end position (target)
    if (rowIndex === 0 && colIndex === 0) {
      return;
    }

    setEditingCell({ row: rowIndex, col: colIndex, value: grid[rowIndex][colIndex] });
  };

  const handleCellEdit = (newValue) => {
    if (editingCell) {
      onCellChange(editingCell.row, editingCell.col, newValue);
      setEditingCell(null);
    }
  };

  const getCellSize = () => {
    const maxDimension = Math.max(grid.length, grid[0]?.length || 0);
    if (maxDimension <= 4) return 'w-24 h-24';
    if (maxDimension <= 6) return 'w-20 h-20';
    if (maxDimension <= 8) return 'w-16 h-16';
    return 'w-14 h-14';
  };

  const cellSize = getCellSize();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Grid Visualization
      </h2>

      {/* Grid Container with relative positioning for agent */}
      <div className="relative flex justify-center">
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}>
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const cellState = cellStates[rowIndex][colIndex];
              const isEndPosition = (rowIndex === 0 && colIndex === 0);

              return (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    ${cellSize} border-2 rounded-lg flex items-center justify-center font-bold cursor-pointer
                    ${getCellColor(value, cellState)}
                    ${isEndPosition ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
                    transition-all duration-300
                  `}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (rowIndex * grid.length + colIndex) * 0.05 }}
                  whileHover={{ scale: isEndPosition ? 1 : 1.05 }}
                  whileTap={{ scale: isEndPosition ? 1 : 0.95 }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                >
                  <span className="text-center">
                    <div className={`${Math.max(grid.length, grid[0]?.length || 0) <= 6 ? 'text-xl' : 'text-lg'}`}>
                      {getCellValue(value)}
                    </div>
                    <div className={`${Math.max(grid.length, grid[0]?.length || 0) <= 6 ? 'text-xs' : 'text-xs'} mt-1 opacity-75`}>
                      ({rowIndex},{colIndex})
                    </div>
                  </span>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Moving Agent Overlay */}
        <MovingAgent
          currentPosition={agentPosition}
          targetPosition={{ row: 0, col: 0 }} // Target is always (0,0)
          isMoving={isAgentMoving}
          direction={agentDirection}
          cellSize={cellSize}
          gridRows={grid.length}
          gridCols={grid[0]?.length || 0}
        />
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Path</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
            <span>Obstacle</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-200 rounded flex items-center justify-center">
              <span className="text-xs">🤖</span>
            </div>
            <span>Agent</span>
          </div>
        </div>

        {/* Algorithm Status */}
        {simulationState === 'running' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Algorithm Status:</span>
              <span className="ml-2">Exploring optimal path to target (0,0)...</span>
            </div>
          </div>
        )}

        {simulationState === 'completed' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm text-green-800">
              <span className="font-medium">✓ Target Reached!</span>
              <span className="ml-2">Algorithm stopped immediately upon reaching (0,0)</span>
            </div>
          </div>
        )}

        <div className="text-sm text-left text-gray-600 mt-10">
          <div className="font-medium mb-2">Grid Editing:</div>
          <div className="space-y-1">
            <div>• <strong>Click</strong> to cycle through values: 0 → 1 → -1 → ∞</div>
            <div>• <strong>Double-click</strong> to enter custom values</div>
            <div>• Only the target position (0,0) cannot be edited</div>
          </div>
        </div>
      </div>

      <CellEditor
        isOpen={editingCell !== null}
        onClose={() => setEditingCell(null)}
        onSave={handleCellEdit}
        initialValue={editingCell?.value || 0}
        position={editingCell || { row: 0, col: 0 }}
      />
    </div>
  );
};

export default Grid;
