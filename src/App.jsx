import React, { useCallback, useEffect, useState } from 'react';
import Chatbot from './components/Chatbot';
import Controls from './components/Controls';
import Grid from './components/Grid';
import GridControls from './components/GridControls';
import QueueVisualizer from './components/QueueVisualizer';
import StatsPanel from './components/StatsPanel';
import VictoryPopup from './components/VictoryPopup';
import { findBestPath } from './utils/pathfindingAlgorithm';

const App = () => {
  const [simulationState, setSimulationState] = useState('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [gridRows, setGridRows] = useState(3);
  const [gridCols, setGridCols] = useState(3);
  const [grid, setGrid] = useState([
    [5, 1, Infinity],
    [Infinity, -2, 4],
    [3, 2, 1]
  ]);
  const [cellStates, setCellStates] = useState([
    [{ visited: false, current: false, path: false }, { visited: false, current: false, path: false }, { visited: false, current: false, path: false }],
    [{ visited: false, current: false, path: false }, { visited: false, current: false, path: false }, { visited: false, current: false, path: false }],
    [{ visited: false, current: false, path: false }, { visited: false, current: false, path: false }, { visited: false, current: false, path: false }]
  ]);
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ minSteps: 0, maxVal: 0 });
  const [animationSpeed, setAnimationSpeed] = useState(1500);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);

  // Agent movement state
  const [agentPosition, setAgentPosition] = useState({ row: gridRows - 1, col: gridCols - 1 });
  const [agentDirection, setAgentDirection] = useState(null);
  const [isAgentMoving, setIsAgentMoving] = useState(false);

  const startSimulation = () => {
    setSimulationState('running');
    setCurrentStep(0);

    // Reset agent position to start
    setAgentPosition({ row: gridRows - 1, col: gridCols - 1 });
    setAgentDirection(null);
    setIsAgentMoving(false);

    // Reset grid states
    const newCellStates = grid.map(row =>
      row.map(() => ({ visited: false, current: false, path: false }))
    );
    setCellStates(newCellStates);

    // Run the algorithm and get steps
    const steps = findBestPath(grid);
    setSimulationSteps(steps);
    setQueue(steps[0]?.queue || []);
  };

  const nextStep = useCallback(() => {
    if (currentStep < simulationSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);

      const step = simulationSteps[nextStepIndex];
      if (step) {
        setCellStates(step.cellStates);
        setQueue(step.queue || []);
        if (step.stats) {
          setStats(step.stats);
        }

        // Move agent based on current cell being processed
        if (step.currentCell) {
          const newPosition = { row: step.currentCell.x, col: step.currentCell.y };

          // Calculate direction for agent movement
          let direction = null;
          if (newPosition.row < agentPosition.row) direction = 'up';
          else if (newPosition.row > agentPosition.row) direction = 'down';
          else if (newPosition.col < agentPosition.col) direction = 'left';
          else if (newPosition.col > agentPosition.col) direction = 'right';

          setAgentDirection(direction);
          setIsAgentMoving(true);

          // Animate agent movement
          setTimeout(() => {
            setAgentPosition(newPosition);
            setIsAgentMoving(false);
          }, 300);
        }
      }
    } else {
      setSimulationState('completed');
      setShowVictoryPopup(true);

      // Move agent to final target position
      setAgentPosition({ row: 0, col: 0 });
      setAgentDirection(null);
      setIsAgentMoving(false);
    }
  }, [currentStep, simulationSteps, agentPosition]);

  const resetSimulation = () => {
    setSimulationState('idle');
    setCurrentStep(0);
    setCellStates(grid.map(row =>
      row.map(() => ({ visited: false, current: false, path: false }))
    ));
    setQueue([]);
    setStats({ minSteps: 0, maxVal: 0 });
    setSimulationSteps([]);
    setShowVictoryPopup(false);

    // Reset agent position
    setAgentPosition({ row: gridRows - 1, col: gridCols - 1 });
    setAgentDirection(null);
    setIsAgentMoving(false);
  };

  const changeGridSize = (newRows, newCols) => {
    if (newRows < 2 || newRows > 20 || newCols < 2 || newCols > 20) return; // Limit grid size

    setGridRows(newRows);
    setGridCols(newCols);
    setSimulationState('idle');
    setCurrentStep(0);

    // Create new grid with default values
    const newGrid = Array(newRows).fill(null).map(() =>
      Array(newCols).fill(null).map(() => Math.floor(Math.random() * 5) + 1)
    );

    // Set start and end positions
    newGrid[newRows - 1][newCols - 1] = 1; // Start position (bottom-right)
    newGrid[0][0] = 0; // End position (top-left)

    // Add some obstacles for larger grids
    const totalCells = newRows * newCols;
    if (totalCells > 25) {
      const obstacleCount = Math.floor(totalCells * 0.15); // 15% of cells as obstacles
      for (let i = 0; i < obstacleCount; i++) {
        const row = Math.floor(Math.random() * newRows);
        const col = Math.floor(Math.random() * newCols);
        if ((row !== 0 || col !== 0) && (row !== newRows - 1 || col !== newCols - 1)) {
          newGrid[row][col] = Infinity;
        }
      }
    }

    setGrid(newGrid);

    // Reset cell states
    const newCellStates = Array(newRows).fill(null).map(() =>
      Array(newCols).fill(null).map(() => ({ visited: false, current: false, path: false }))
    );
    setCellStates(newCellStates);

    // Reset other states
    setQueue([]);
    setStats({ minSteps: 0, maxVal: 0 });
    setSimulationSteps([]);
  };

  const updateGridCell = (rowIndex, colIndex, value) => {
    if (simulationState !== 'idle') return; // Only allow editing when idle

    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  };

  useEffect(() => {
    if (simulationState === 'running') {
      const interval = setInterval(() => {
        if (currentStep < simulationSteps.length - 1) {
          nextStep();
        } else {
          clearInterval(interval);
          setSimulationState('completed');
          setShowVictoryPopup(true);
        }
      }, animationSpeed);

      return () => clearInterval(interval);
    }
  }, [simulationState, currentStep, animationSpeed, simulationSteps.length, nextStep]);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className=" mx-auto">
        <div className='bg-gradient-to-r to-yellow-100 from-red-200 rounded-lg shadow-lg '>
          <h1 className="text-4xl font-bold text-center text-gray-800  text-transparent bg-clip-text bg-gradient-to-r to-yellow-300 from-red-500 pt-4 pb-8 font- mb-4">
            PATH FINDER
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[90%] mx-auto">
          {/* Main Grid Section */}
          <div className="lg:col-span-2">
            <GridControls
              gridRows={gridRows}
              gridCols={gridCols}
              onGridSizeChange={changeGridSize}
              simulationState={simulationState}
            />
            <Grid
              grid={grid}
              cellStates={cellStates}
              currentStep={currentStep}
              onCellChange={updateGridCell}
              simulationState={simulationState}
              agentPosition={agentPosition}
              agentDirection={agentDirection}
              isAgentMoving={isAgentMoving}
            />
            <Controls
              simulationState={simulationState}
              onStart={startSimulation}
              onNext={nextStep}
              onReset={resetSimulation}
              animationSpeed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
              currentStep={currentStep}
              totalSteps={simulationSteps.length}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StatsPanel stats={stats} />
            <QueueVisualizer queue={queue} />
          </div>
        </div>
      </div>

      {/* Victory Popup */}
      <VictoryPopup
        isOpen={showVictoryPopup}
        onClose={() => setShowVictoryPopup(false)}
        stats={stats}
        totalSteps={simulationSteps.length}
      />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;
