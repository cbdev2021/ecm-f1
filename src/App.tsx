import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Cambiar el tipo de selectedProduct a cualquier objeto de producto

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);


  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleCategorySelectCart = (category: string) => {
    setCategoryFilter(category);
    setCartOpen(false);
  };


  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
    setDrawerOpen(false);
  };

  const handleProductSelect = (product: any) => { // Cambiar el tipo de producto a cualquier objeto de producto
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };
  

  return (
    <>
      <Header onMenuClick={toggleDrawer} onCartClick={toggleCart} />
      <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => {}} handleCategorySelect={handleCategorySelect} />
      {/* <Cart open={cartOpen} onClose={toggleCart} onOpen={() => {}} handleCategorySelect={handleCategorySelectCart} > */}
      {/* <Cart open={cartOpen} onClose={toggleCart} onOpen={() => {}} handleCategorySelect={handleCategorySelectCart} /> */}
      <Cart open={cartOpen} onClose={toggleCart} onOpen={() => {}} handleCategorySelect={handleCategorySelectCart} cartItems={cartItems} />


      <Routes>
        <Route path="/" element={<Navigate to="/product-catalog" />} />
        <Route path="/product-catalog" element={<ProductCatalog onSelectProduct={handleProductSelect} categoryFilter={categoryFilter} />} />
        {/* <Route path="/product-detail/:productId" element={<ProductDetail product={selectedProduct} onBack={handleBackClick} />} /> */}
        <Route path="/product-detail/:productId" element={<ProductDetail product={selectedProduct} onBack={handleBackClick}  onAddToCart={addToCart} />} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;



// // App.tsx
// import  { useState } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import Drawer from './components/Drawer';
// import Header from './components/Header';
// import ProductCatalog from './components/ProductCatalog';
// import Footer from './components/Footer';
// import ProductPage from './components/ProductPage';

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleCategorySelect = (category: string) => {
//     setCategoryFilter(category);
//     setDrawerOpen(false);
//   };

//   const handleProductSelect = (productId: string) => {
//     setSelectedProduct(productId);
//   };



//   return (
//     <>
//       <Header onMenuClick={toggleDrawer} />
//       <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => {}} handleCategorySelect={handleCategorySelect} />

//       <Routes>
//         <Route path="/" element={<Navigate to="/product-catalog" />} />
//         <Route path="/product-catalog" element={<ProductCatalog categoryFilter={categoryFilter} onSelectProduct={handleProductSelect} />} />
//         {/* Usamos una ruta dinámica para el detalle del producto */}
//         <Route path="/product-detail/:productId" element={<ProductPage />} />
//       </Routes>

//       {/* Cuando se selecciona un producto, navegamos al detalle del producto */}
//       {selectedProduct && <Navigate to={`/product-detail/${selectedProduct}`} replace />}
      
//       <Footer />
//     </>
//   );
// }

// export default App;






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
