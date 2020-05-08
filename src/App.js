import React, { useState, createContext, Component } from 'react';

const BatteryContext = createContext(50); //50 default value
const OnlineContext = createContext();


class Battery extends Component {
  static contextType = BatteryContext;
  
  render() {
    const battery = this.context;
    return (
      <h1>Battery: {battery}</h1>
    )
  }
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
