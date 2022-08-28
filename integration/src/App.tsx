import { useRef } from 'react';
import useAnimatedState from '../../src/index';
import './App.css';

function App() {
  const {
    isVisible,
    toggle,
    ref
  } = useAnimatedState(true);

  return (
    <div className="App">
      <div className="container">
      <button onClick={toggle}>Toggle element</button>
        {isVisible ? <div ref={ref} className="box">Hello!</div> : null}
      </div>
    </div>
  );
}

export default App;
