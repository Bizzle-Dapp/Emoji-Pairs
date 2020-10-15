import React from 'react';
import '../App.css';
import { Difficulty } from './Game';

// enum Difficulty {
//     None,
//     Easy,
//     Medium,
//     Hard
//   }

export interface DifficultySelectProps {
    gameStarted?: boolean,
    selectedDifficulty: Difficulty,
    setDifficultyLevel(difficulty: Difficulty): void,
}

export const DifficultySelect: React.FC<DifficultySelectProps> = (props: DifficultySelectProps) => {

    return(
        <>
        <div>
            <button className="Button" onClick={() => props.setDifficultyLevel(Difficulty.Easy)}>Easy</button>
            <button className="Button" onClick={() => props.setDifficultyLevel(Difficulty.Medium)}>Medium</button>
            <button className="Button" onClick={() => props.setDifficultyLevel(Difficulty.Hard)}>Hard</button>
        </div>
        </>
    )
}