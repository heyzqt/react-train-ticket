import React, { Component, useState } from "react";

function App(props) {
  const [count, setCount] = useState(10);

  return (
    <div>
      count = {count}
    </div>
  );
}

export default App;
