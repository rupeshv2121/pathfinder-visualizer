import { motion } from 'framer-motion';
import React from 'react';

const MovingAgent = ({
    currentPosition,
    targetPosition,
    isMoving,
    direction,
    cellSize,
    gridRows,
    gridCols
}) => {
    if (!currentPosition) return null;

    // Calculate position based on grid coordinates
    const getPosition = (row, col) => {
        const cellWidth = cellSize === 'w-24 h-24' ? 96 :
            cellSize === 'w-20 h-20' ? 80 :
                cellSize === 'w-16 h-16' ? 64 : 56;
        const gap = 8; // gap-2 = 8px

        const x = col * (cellWidth + gap);
        const y = row * (cellWidth + gap);

        return { x, y };
    };

    const position = getPosition(currentPosition.row, currentPosition.col);
    const targetPos = getPosition(targetPosition.row, targetPosition.col);

    // Agent emoji based on direction
    const getAgentEmoji = () => {
        if (!direction) return '🤖';

        switch (direction) {
            case 'up': return '🤖⬆️';
            case 'down': return '🤖⬇️';
            case 'left': return '🤖⬅️';
            case 'right': return '🤖➡️';
            default: return '🤖';
        }
    };

    // Movement animation variants
    const movementVariants = {
        initial: {
            scale: 1,
            rotate: 0
        },
        moving: {
            scale: [1, 1.1, 1],
            rotate: direction === 'left' ? -5 : direction === 'right' ? 5 : 0,
            transition: {
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse"
            }
        },
        arrived: {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 0.5,
                repeat: 2
            }
        }
    };

    return (
        <div
            className="absolute pointer-events-none z-10"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: cellSize === 'w-24 h-24' ? '96px' :
                    cellSize === 'w-20 h-20' ? '80px' :
                        cellSize === 'w-16 h-16' ? '64px' : '56px',
                height: cellSize === 'w-24 h-24' ? '96px' :
                    cellSize === 'w-20 h-20' ? '80px' :
                        cellSize === 'w-16 h-16' ? '64px' : '56px'
            }}
        >
            <motion.div
                className="flex items-center justify-center w-full h-full"
                variants={movementVariants}
                initial="initial"
                animate={isMoving ? 'moving' : currentPosition.row === targetPosition.row && currentPosition.col === targetPosition.col ? 'arrived' : 'initial'}
                transition={{ duration: 0.3 }}
            >
                <div className="text-2xl drop-shadow-lg">
                    {getAgentEmoji()}
                </div>
            </motion.div>

            {/* Movement trail effect */}
            {isMoving && (
                <motion.div
                    className="absolute inset-0 bg-blue-200 rounded-lg opacity-30"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
    );
};

export default MovingAgent;
