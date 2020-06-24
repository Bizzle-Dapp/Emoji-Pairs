import React from 'react';
import '../App.css';

enum Difficulty {
    None,
    Easy,
    Medium,
    Hard
  }

export interface DifficultySelectProps {
    gameStarted?: boolean,
    selectedDifficulty: Difficulty,
    setDifficultyLevel: Function,
}

export const DifficultySelect: React.FC<DifficultySelectProps> = (props) => {

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