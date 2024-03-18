import Drawer from './components/Drawer';
import Header from './components/Header';
import { useState } from 'react';
import ProductCatalog from './components/ProductCatalog'; // Importa el componente ProductCatalog
import Footer from './components/Footer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All'); // Agrega estado para la categoría seleccionada

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category); // Actualiza la categoría seleccionada
    setDrawerOpen(false); // Cierra el Drawer después de seleccionar una categoría
  };

  return (
    <>
      <Header onMenuClick={toggleDrawer} />
      <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => {}} handleCategorySelect={handleCategorySelect} /> {/* Pasa la función de selección de categoría */}
      <ProductCatalog categoryFilter={categoryFilter} /> {/* Pasa la categoría seleccionada como prop al componente ProductCatalog */}
      <Footer />
    </>
  );
}

export default App;


// import Drawer from './components/Drawer';
// import Header from './components/Header';
// import { useState } from 'react';
// import ProductCatalog from './components/ProductCatalog'; // Importar el componente Products
// import Footer from './components/Footer';

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <>
//       <Header onMenuClick={toggleDrawer} />
//       <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => { }} />

//       {/* Agregar el componente Products aquí */}
//       <ProductCatalog /> 
        
//       <Footer />
//     </>
//   );
// }

// export default App;
