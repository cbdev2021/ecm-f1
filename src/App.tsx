import Drawer from './components/Drawer';
import Header from './components/Header';
import { useState } from 'react';


function App() {
  const [count, setCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  return (
    <>
      <Header onMenuClick={toggleDrawer} />
      <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => { }} />

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
