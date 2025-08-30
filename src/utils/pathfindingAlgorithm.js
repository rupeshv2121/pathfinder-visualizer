/**
 * Queue implementation for BFS algorithm
 */
class Queue {
  constructor(size) {
    this.front = -1;
    this.rear = -1;
    this.size = size;
    this.arr = new Array(size);
  }

  push(node) {
    if (this.rear === this.size - 1) {
      return;
    }
    if (this.front === -1) {
      this.front = this.rear = 0;
    } else {
      this.rear++;
    }
    this.arr[this.rear] = node;
  }

  pop() {
    if (this.front === -1) {
      return;
    }
    if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front++;
    }
  }

  top() {
    if (this.front === -1) {
      return { x: -1, y: -1, step: -1, val: -1 };
    }
    return this.arr[this.front];
  }

  isEmpty() {
    return this.front === -1;
  }

  toArray() {
    if (this.front === -1) return [];
    const result = [];
    for (let i = this.front; i <= this.rear; i++) {
      result.push(this.arr[i]);
    }
    return result;
  }
}

/**
 * Find the best path using optimized BFS algorithm
 * @param {number[][]} arr - The grid matrix
 * @returns {Array} Array of simulation steps
 */
export function findBestPath(arr) {
  const row = arr.length;
  const col = arr[0].length;
  const steps = [];

  const moves = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  const parent = Array(row).fill(null).map(() =>
    Array(col).fill(null).map(() => ({ u: -1, v: -1 }))
  );

  const dp = Array(row).fill(null).map(() =>
    Array(col).fill(null).map(() => ({ minStep: Infinity, maxVal: -Infinity }))
  );

  const q = new Queue(100);
  dp[row - 1][col - 1] = { minStep: 0, maxVal: arr[row - 1][col - 1] };
  q.push({ x: row - 1, y: col - 1, step: 0, val: arr[row - 1][col - 1] });

  // Initialize cell states
  let cellStates = Array(row).fill(null).map(() =>
    Array(col).fill(null).map(() => ({ visited: false, current: false, path: false }))
  );

  // Mark start position as visited
  cellStates[row - 1][col - 1] = { visited: true, current: false, path: false };

  // Add initial step
  steps.push({
    cellStates: JSON.parse(JSON.stringify(cellStates)),
    queue: q.toArray(),
    stats: { minSteps: 0, maxVal: arr[row - 1][col - 1] }
  });

  let targetReached = false;

  while (!q.isEmpty() && !targetReached) {
    const curr = q.top();
    q.pop();

    // Check if we've reached the target (0,0)
    if (curr.x === 0 && curr.y === 0) {
      targetReached = true;

      // Mark target as current for visualization
      cellStates[curr.x][curr.y] = { visited: true, current: true, path: false };

      // Add step showing target reached
      steps.push({
        cellStates: JSON.parse(JSON.stringify(cellStates)),
        queue: q.toArray(),
        currentCell: { x: curr.x, y: curr.y },
        targetReached: true,
        stats: {
          minSteps: dp[0][0].minStep,
          maxVal: dp[0][0].maxVal
        }
      });

      break; // Exit immediately when target is reached
    }

    // Mark current cell as being processed
    cellStates[curr.x][curr.y] = { visited: true, current: true, path: false };

    // Add step showing current cell being processed
    steps.push({
      cellStates: JSON.parse(JSON.stringify(cellStates)),
      queue: q.toArray(),
      currentCell: { x: curr.x, y: curr.y },
      stats: {
        minSteps: dp[0][0].minStep === Infinity ? 0 : dp[0][0].minStep,
        maxVal: dp[0][0].maxVal === -Infinity ? 0 : dp[0][0].maxVal
      }
    });

    // Mark current cell as visited (no longer current)
    cellStates[curr.x][curr.y] = { visited: true, current: false, path: false };

    for (let i = 0; i < 4; i++) {
      const newRow = curr.x + moves[i][0];
      const newCol = curr.y + moves[i][1];

      if (newRow < 0 || newRow >= row || newCol < 0 || newCol >= col) {
        continue;
      }

      if (arr[newRow][newCol] === Infinity) {
        continue;
      }

      // Skip if cell has already been processed with better or equal path
      if (dp[newRow][newCol].minStep !== Infinity) {
        const newStep = curr.step + 1;
        const newVal = curr.val + arr[newRow][newCol];

        // Only update if we found a better path
        if (newStep < dp[newRow][newCol].minStep ||
          (newStep === dp[newRow][newCol].minStep && newVal > dp[newRow][newCol].maxVal)) {

          dp[newRow][newCol].minStep = newStep;
          dp[newRow][newCol].maxVal = newVal;
          parent[newRow][newCol] = { u: curr.x, v: curr.y };

          // Only add to queue if we haven't processed this cell yet
          if (!cellStates[newRow][newCol].visited) {
            q.push({ x: newRow, y: newCol, step: newStep, val: newVal });

            // Mark new cell as visited
            cellStates[newRow][newCol] = { visited: true, current: false, path: false };
          }
        }
      } else {
        // First time visiting this cell
        const newStep = curr.step + 1;
        const newVal = curr.val + arr[newRow][newCol];

        dp[newRow][newCol].minStep = newStep;
        dp[newRow][newCol].maxVal = newVal;
        parent[newRow][newCol] = { u: curr.x, v: curr.y };

        q.push({ x: newRow, y: newCol, step: newStep, val: newVal });

        // Mark new cell as visited
        cellStates[newRow][newCol] = { visited: true, current: false, path: false };
      }
    }
  }

  // Reconstruct path
  const px = [];
  const py = [];
  let len = 0;

  let x = 0, y = 0;
  while (x !== -1 && y !== -1) {
    px[len] = x;
    py[len] = y;
    len++;
    const p = parent[x][y];
    x = p.u;
    y = p.v;
  }

  // Mark path cells
  for (let i = len - 1; i >= 0; i--) {
    cellStates[px[i]][py[i]] = { visited: true, current: false, path: true };
  }

  // Add final step with path
  steps.push({
    cellStates: JSON.parse(JSON.stringify(cellStates)),
    queue: [],
    pathFound: true,
    stats: {
      minSteps: dp[0][0].minStep === Infinity ? 0 : dp[0][0].minStep,
      maxVal: dp[0][0].maxVal === -Infinity ? 0 : dp[0][0].maxVal
    }
  });

  return steps;
}
