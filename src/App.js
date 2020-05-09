import React, { Component, useState, createContext, useContext } from "react";

const CountContext = createContext();

//第一种从context中拿到count的方法
class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

//第二种方法：在class组件中，使用contextTypes获取context
class Bar extends Component {
  static contextType = CountContext;
  render() {
    const count = this.context;
    return <h1>{count}</h1>
  }
}

//第三种方法：在函数组件中使用useContext获取context
function Counter(props) {
  const count = useContext(CountContext);
  return <h1>{count}</h1>
}

function App(props) {
  const [count, setCount] = useState(10);

  const handleClick = () => {
    setCount(count+1);
  }

  return (
    <div>
      count = {count}
      <button type="button" onClick={handleClick}>click me</button>
      <CountContext.Provider value={count}>
        <Foo></Foo>
        <Bar></Bar>
        <Counter></Counter>
      </CountContext.Provider>
    </div>
  );
}

export default App;
