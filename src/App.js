import React, { useState, createContext, useContext } from "react";

const CountContext = createContext();

const Foo = () => {
  return (
    <CountContext.Consumer>{(count) => <h1>{count}</h1>}</CountContext.Consumer>
  );
};

class Bar extends React.Component {
  static contextType = CountContext;
  render() {
    let value = this.context;
    return <h1>{value}</h1>;
  }
}

const Count = () => {
  const value = useContext(CountContext);
  return <h1>{value}</h1>;
};

function App(props) {
  const [count, setCount] = useState(10);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      count = {count}
      <button onClick={handleClick}>click me + 1</button>
      <CountContext.Provider value={count}>
        <Foo></Foo>
        <Bar></Bar>
        <Count></Count>
      </CountContext.Provider>
    </div>
  );
}

export default App;
