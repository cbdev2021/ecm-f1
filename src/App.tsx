import Drawer from './components/Drawer';
import Header from './components/Header';
import { useState } from 'react';
import Products from './components/Product'; // Importar el componente Products



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

      {/* Agregar el componente Products aquí */}
      <Products />   

     
    </>
  );
}

export default App;
