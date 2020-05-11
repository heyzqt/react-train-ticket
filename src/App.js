import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useRef
} from "react";

function useAnmialStatus(anmialName) {
  return 'anmial ' + anmialName + '  begin to run';
}

function App(props) {
  const msg = useAnmialStatus('DOG');
  console.log(msg);
  return <div></div>;
}

export default App;
