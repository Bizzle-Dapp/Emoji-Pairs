import React, { useState, useEffect } from 'react';
import './App.css';
import { DifficultySelect } from './Components/DifficultySelect';
import { Game } from './Components/Game';

enum Difficulty {
  None,
  Easy,
  Medium,
  Hard
}

function App() {
  
  let spinningBannerOptions = ['🤩', '🤯', '🥳', '🤠', '🤪', '😴', '👻', '👽', '👾', '🤖', '💎', '🧜‍♂️', '🧙‍♂️', '🎵', '🎻', '🍊', '🍇', '🍰']

  const randomBanner = (symbolArray:Array<String>) => {
    let bannerSelection = symbolArray[Math.floor(Math.random() * symbolArray.length)];
    return bannerSelection;
  }

  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>(Difficulty.None);

  // useEffect(() => {
  //   console.log(`Difficulty Set To: ${difficultyLevel}`)
  // },[difficultyLevel]);

  return (
    <>
    <div className="App"> 
      {/* App Header */}
      <div className="App-header">
        <div className="App-logo">{randomBanner(spinningBannerOptions)}</div>
      </div>
      <div className="App-body">
        {difficultyLevel < 1 &&
            <DifficultySelect selectedDifficulty={difficultyLevel} setDifficultyLevel={setDifficultyLevel}/>
        }
        {difficultyLevel > 0 &&
            <Game selectedDifficulty={difficultyLevel} setDifficultyLevel={setDifficultyLevel} />

        }
      </div>
    </div>
    
    </>
  );
}

export default App;
