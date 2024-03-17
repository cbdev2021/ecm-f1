import Drawer from './components/Drawer';
import Header from './components/Header';
import { useState } from 'react';
import ProductCatalog from './components/ProductCatalog'; // Importar el componente Products

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header onMenuClick={toggleDrawer} />
      <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => { }} />

      {/* Agregar el componente Products aquí */}
      <ProductCatalog />   
    </>
  );
}

export default App;
