import React, { useState } from 'react';
import './App.css';
import Menu from './screens/Menu';
import Play from './screens/Play';
import Controls from './screens/Controls';
import Win from './screens/Win';

/**
 * @name App
 * @description Quick Maze Escape main App screen. Responsible of the screens management and all the app flux.
 * 
 * @author Valentino Conti
 */
const App = () => {
  const [screen, setScreen] = useState('menu');
  const [levelNumber, setLevelNumber] = useState(1);
  const [score, setScore] = useState(0);

  const [randomKey, setRandom] = useState(Math.random());
  const nextLevel = (which) => {
    setLevelNumber(which);
    setRandom(Math.random());
  }

  return (
    <>
      {screen === 'menu' && <Menu setScreen={setScreen} />}
      {screen === 'controls' && <Controls setScreen={setScreen} />}
      {screen === 'play' && (
        <Play
          setScreen={setScreen}
          levelNumber={levelNumber}
          setLevelNumber={nextLevel}
          setScore={setScore}
          score={score}
          key={`level-${levelNumber}-${randomKey}`}
        />
      )}
      {screen === 'win' && <Win setScreen={setScreen} score={score} setScore={setScore} />}
    </>
  );
};

export default App;
