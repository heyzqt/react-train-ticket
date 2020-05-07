import React, { useState, createContext } from 'react';
import './App.css';

const BatteryContext = createContext(50); //50 default value
const OnlineContext = createContext();

function Battery() {
  return (
    <BatteryContext.Consumer>
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>Battery: {battery} Online: {String(online)}</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  )
}

function Middle() {
  return <Battery></Battery>
}

function App() {
  const [battery, setBattery] = useState(30);
  const [online, setOnline] = useState(false);

  return (
    <BatteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
        <div className="App">
          <Middle/>
          <button type="button" onClick={() => setBattery(battery + 1)}>change value</button>
          <button type="button" onClick={() => setOnline(!online)}>switch online</button>
        </div>
      </OnlineContext.Provider>
    </BatteryContext.Provider>
  );
}

export default App;
