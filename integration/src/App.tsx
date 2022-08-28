import useAnimatedState from '../../src/index';
import './App.css';

function App() {
  const {
    isVisible,
    toggle,
    ref
  } = useAnimatedState(true, {
    visible: { opacity: 1, transform: 'scale(1)' },
    hidden: { opacity: 0, transform: 'scale(0.5)' }
  }, {
    duration: 1350,
    easing: 'ease-in-out',
    fill: 'both'
  });

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
