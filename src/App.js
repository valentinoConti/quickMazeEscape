import React, {useState} from 'react';
import './App.css';
import Menu from './screens/Menu';
import Play from './screens/Play';

const App = () => {
  const [screen, setScreen] = useState('menu');
  const [levelNumber, setLevelNumber] = useState(1);
  const [randomKey, setRandom] = useState(Math.random());
  const nextLevel = (which) => {
    setRandom(Math.random());
    setLevelNumber(which);
  }

  return (
    <>
      {screen === 'menu' && <Menu setScreen={setScreen} />}
      {screen === 'play' && (
        <Play
          setScreen={setScreen}
          levelNumber={levelNumber}
          setLevelNumber={nextLevel}
          key={`level-${levelNumber}-${randomKey}`}
        />
      )}
    </>
  );
};

export default App;
