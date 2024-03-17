import Drawer from './components/Drawer';
import Header from './components/Header';
import { useState } from 'react';
import ProductCatalog from './components/ProductCatalog'; // Importar el componente Products
import Footer from './components/Footer';

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
        
      <Footer />
    </>
  );
}

export default App;
