import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';

interface ProductCatalogProps {
  onSelectProduct: (product: any) => void; // Cambiar el tipo de onSelectProduct a cualquier objeto de producto
  categoryFilter: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct, categoryFilter }) => {
  const navigate = useNavigate();
  const { data: products, error, isLoading } = useGetAllProductsQuery(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      if (categoryFilter === 'All') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product: { category: string }) => product.category === categoryFilter);
        setFilteredProducts(filtered);
      }
    }
  }, [categoryFilter, products]);

  const handleProductClick = (product: any) => { // Cambiar el tipo de producto a cualquier objeto de producto
    onSelectProduct(product);
    navigate(`/product-detail/${product.id}`);
  };

  const logProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    if ('status' in error) {
      return <p>Error: {error.status}</p>;
    }
    if ('data' in error) {
      return <p>Error: {String(error.data)}</p>;
    }
  }

  return (
    <Grid container spacing={2} className="grid-container">
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <div className="product" style={{ cursor: 'pointer' }} onClick={() => {handleProductClick(product); logProductClick(product.id);}}>
            <div className="image-container">
              <img src={product.image} className="product-image" alt="Product" />
            </div>
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCatalog;





// import React, { useState, useEffect, Key } from 'react';
// import { Grid } from '@mui/material';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';
// import ProductDetail from './ProductDetail'; // Importa el componente ProductDetail

// interface ProductCatalogProps {
//   categoryFilter: string;
// }

// const ProductCatalog: React.FC<ProductCatalogProps> = ({ categoryFilter }) => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery(null);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

//   useEffect(() => {
//     if (products) {
//       if (categoryFilter === 'All') {
//         setFilteredProducts(products);
//       } else {
//         const filtered = products.filter((product: { category: string }) => product.category === categoryFilter);
//         setFilteredProducts(filtered);
//       }
//     }
//   }, [categoryFilter, products]);

//   const handleClick = (product: any) => {
//     setSelectedProduct(product); // Establece el producto seleccionado al hacer clic
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) {
//     if ('status' in error) {
//       return <p>Error: {error.status}</p>;
//     }
//     if ('data' in error) {
//       return <p>Error: {String(error.data)}</p>;
//     }
//   }

//   return (
//     <>
//       {/* Renderiza ProductDetail si hay un producto seleccionado */}
//       {selectedProduct && <ProductDetail product={selectedProduct} />}
//       <Grid container spacing={2} className="grid-container">
//         {filteredProducts.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rating: { rate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//             {/* Agrega onClick y pasa el producto al manejador de eventos */}
//             <div className="product" style={{ cursor: 'pointer' }} onClick={() => handleClick(product)}>
//               <div className="image-container">
//                 <img src={product.image} className="product-image" alt="Product" />
//               </div>
//               <div className="product-details">
//                 <h2>{product.title}</h2>
//                 <p>Price: ${product.price}</p>
//                 <p>Category: {product.category}</p>
//                 <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//               </div>
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default ProductCatalog;


// import React, { useState, useEffect, Key } from 'react';
// import { Grid } from '@mui/material';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';

// interface ProductCatalogProps {
//   categoryFilter: string; 
// }

// const ProductCatalog: React.FC<ProductCatalogProps> = ({ categoryFilter }) => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery(null);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (products) {
//       if (categoryFilter === 'All') {
//         setFilteredProducts(products);
//       } else {
//         const filtered = products.filter((product: { category: string }) => product.category === categoryFilter);
//         setFilteredProducts(filtered);
//       }
//     }
//   }, [categoryFilter, products]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) {
//     if ('status' in error) {
//       return <p>Error: {error.status}</p>;
//     }
//     if ('data' in error) {
//       return <p>Error: {String(error.data)}</p>;
//     }
//   }

//   return (
//     <Grid container spacing={2} className="grid-container">
//       {filteredProducts.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rating: { rate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
//         <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//           <div className="product">
//             <div className="image-container">
//               <img src={product.image} className="product-image" alt="Product" />
//             </div>
//             <div className="product-details">
//               <h2>{product.title}</h2>
//               <p>Price: ${product.price}</p>
//               <p>Category: {product.category}</p>
//               <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//             </div>
//           </div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductCatalog;


// import React, { useState, useEffect, Key } from 'react';
// import { Grid } from '@mui/material';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';
// import Drawer from './Drawer'; // Importa el componente Drawer

// const ProductCatalog = () => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery(null);
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false); // Agrega estado para controlar la apertura/cierre del Drawer

//   useEffect(() => {
//     if (products) {
//       if (categoryFilter === 'All') {
//         setFilteredProducts(products);
//       } else {
//         const filtered = products.filter((product: { category: string }) => product.category === categoryFilter);
//         setFilteredProducts(filtered);
//       }
//     }
//   }, [categoryFilter, products]);

//   const handleCategorySelect = (category: string) => {
//     setCategoryFilter(category); // Actualiza la categoría seleccionada
//     setDrawerOpen(false); // Cierra el Drawer después de seleccionar una categoría
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) {
//     if ('status' in error) {
//       return <p>Error: {error.status}</p>;
//     }
//     if ('data' in error) {
//       return <p>Error: {String(error.data)}</p>;
//     }
//   }

//   return (
//     <>
//       <Drawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         onOpen={() => setDrawerOpen(true)}
//         handleCategorySelect={handleCategorySelect} // Pasa la función de selección de categoría al Drawer
//       />
//       <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//         <option value="All">All Categories</option>
//         <option value="Home">Home</option>
//         <option value="electronics">Electronics</option>
//         <option value="jewelery">Jewelry</option>
//         <option value="men's clothing">Men's Clothing</option>
//         <option value="women's clothing">Women's Clothing</option>
//       </select>
//       <Grid container spacing={2} className="grid-container">
//         {filteredProducts.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; rating: { rate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <div className="product">
//               <div className="image-container">
//                 <img src={product.image} className="product-image" alt="Product" />
//               </div>
//               <div className="product-details">
//                 <h2>{product.title}</h2>
//                 <p>Price: ${product.price}</p>
//                 <p>Category: {product.category}</p>
//                 <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//               </div>
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default ProductCatalog;


// import  { useState, useEffect, Key } from 'react';
// import { Grid } from '@mui/material';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';

// const ProductCatalog = () => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery(null);
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {


//     if (products) {
//       if (categoryFilter === 'All') {
//         setFilteredProducts(products);
//       } else {
//         const filtered = products.filter((product: { category: string; }) => product.category === categoryFilter);
//         setFilteredProducts(filtered);
//       }
//     }
//   }, [categoryFilter, products]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) {
//     if ('status' in error) {
//       return <p>Error: {error.status}</p>;
//     }
//     if ('data' in error) {
//       return <p>Error: {String(error.data)}</p>;
//     }
//   }

//   return (
//     <>
//       <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//         <option value="All">All Categories</option>
//         <option value="Home">Home</option>
//         <option value="electronics">Electronics</option>
//         <option value="jewelery">Jewelry</option>
//         <option value="men's clothing">Men's Clothing</option>
//         <option value="women's clothing">Women's Clothing</option>
//       </select>
//       <Grid container spacing={2} className="grid-container">
//         {filteredProducts.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rating: { rate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <div className="product">

//               <div className="image-container">
//                 <img src={product.image} className="product-image" />
//               </div>
//               <div className="product-details">
//                 <h2>{product.title}</h2>
//                 <p>Price: ${product.price}</p>
//                 <p>Category: {product.category}</p>
//                 <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//               </div>
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default ProductCatalog;



// import { Grid } from '@mui/material'; // Importamos Grid de Material-UI
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';

// const ProductCatalog = () => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery(null);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) {
//     if ('status' in error) {
//       return <p>Error: {error.status}</p>;
//     }
//     if ('data' in error) {
//       return <p>Error: {String(error.data)}</p>;
//     }
//   }

//   return (
//     <Grid container spacing={2} className="grid-container">
//       {products.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rating: { rate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
//         <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//           <div className="product">
//             <div className="image-container">
//               <img src={product.image} className="product-image" />
//             </div>
//             <div className="product-details">
//               <h2>{product.title}</h2>
//               <p>Price: ${product.price}</p>
//               <p>Category: {product.category}</p>
//               <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//             </div>
//           </div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductCatalog;
