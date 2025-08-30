# BFS Pathfinding Visualizer

A React-based visualization tool that demonstrates the execution of a BFS (Breadth-First Search) pathfinding algorithm step by step. The algorithm finds the shortest path from the top-left corner (0,0) to the bottom-right corner (2,2) while maximizing the total value collected along the path.

## Features

- **Interactive 3x3 Grid**: Visual representation of the pathfinding matrix
- **Step-by-Step Animation**: Watch the BFS algorithm explore cells one by one
- **Real-time Queue Visualization**: See the BFS queue update as cells are processed
- **Path Reconstruction**: Visualize the final optimal path
- **Statistics Panel**: Track minimum steps and maximum value collected
- **Customizable Speed**: Control animation timing with a speed slider
- **Responsive Design**: Works on desktop and mobile devices

## Algorithm Details

The algorithm implements a modified BFS that:
1. Starts from the bottom-right corner (2,2)
2. Explores all possible paths to the top-left corner (0,0)
3. Finds the path with minimum steps
4. Among paths with equal steps, chooses the one with maximum value
5. Handles obstacles (represented as ∞) and negative values

## Grid Values

- **5, 1, ∞**: Top row (∞ represents an obstacle)
- **∞, -2, 4**: Middle row
- **3, 2, 1**: Bottom row

## How to Use

1. **Start Simulation**: Click the "Start Simulation" button to begin
2. **Auto-play**: The simulation runs automatically at the selected speed
3. **Manual Control**: Use "Next Step" to advance manually
4. **Speed Control**: Adjust the animation speed using the slider
5. **Reset**: Use "Reset" to clear the board and start over

## Color Coding

- **White**: Unvisited cells
- **Blue**: Visited cells
- **Yellow**: Currently being processed
- **Green**: Final optimal path
- **Gray**: Obstacles (∞)

## Technical Implementation

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Custom BFS implementation** with step-by-step tracking
- **Responsive grid layout** with CSS Grid

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd pathfinder-visualizer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Grid.tsx              # 3x3 grid visualization
│   ├── QueueVisualizer.tsx   # BFS queue display
│   ├── StatsPanel.tsx        # Algorithm statistics
│   └── Controls.tsx          # Simulation controls
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── pathfindingAlgorithm.ts # BFS algorithm implementation
├── App.tsx                   # Main application component
└── index.tsx                 # Application entry point
```

## Algorithm Complexity

- **Time Complexity**: O(V + E) where V is the number of cells and E is the number of edges
- **Space Complexity**: O(V) for the queue and visited cells tracking
- **Grid Size**: Fixed 3x3 grid for demonstration purposes

## Future Enhancements

- Support for larger grid sizes
- Multiple algorithm implementations (DFS, A*, Dijkstra)
- Custom grid input
- Export/import grid configurations
- Performance metrics and comparisons

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the visualizer.

## License

This project is open source and available under the MIT License.

