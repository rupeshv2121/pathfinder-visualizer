/**
 * @typedef {'idle' | 'running' | 'completed' | 'paused'} SimulationState
 */

/**
 * @typedef {Object} CellState
 * @property {boolean} visited
 * @property {boolean} current
 * @property {boolean} path
 */

/**
 * @typedef {Object} QueueNode
 * @property {number} x
 * @property {number} y
 * @property {number} step
 * @property {number} val
 */

/**
 * @typedef {Object} PathNode
 * @property {number} u
 * @property {number} v
 */

/**
 * @typedef {Object} Node
 * @property {number} minStep
 * @property {number} maxVal
 */

/**
 * @typedef {Object} SimulationStep
 * @property {CellState[][]} cellStates
 * @property {QueueNode[]} queue
 * @property {Object} [stats]
 * @property {number} [stats.minSteps]
 * @property {number} [stats.maxVal]
 * @property {Object} [currentCell]
 * @property {number} [currentCell.x]
 * @property {number} [currentCell.y]
 * @property {Array<{x: number, y: number}>} [visitedCells]
 */

// Export the types for use in other files
export { };

