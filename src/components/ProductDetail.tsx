import React, { FunctionComponent, useRef, useState } from 'react';
import { Typography, Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  onAddToCart: (product: any) => void; // Add this prop
}

const ProductDetail: FunctionComponent<ProductDetailProps> = ({ product, onAddToCart }) => {
  const zoomRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [mouseInside, setMouseInside] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseInside) {
      const img = zoomRef.current?.querySelector('img');
      if (!img) return;

      const rect = zoomRef.current?.getBoundingClientRect();
      const offsetX = e.clientX - rect!.left;
      const offsetY = e.clientY - rect!.top;
      const percentX = offsetX / rect!.width;
      const percentY = offsetY / rect!.height;

      img.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`;

      if (!isZoomed) {
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(2.5)';
        setIsZoomed(true);
      }
    }
  };

  const handleMouseEnter = () => {
    setMouseInside(true);
  };

  const handleMouseLeave = () => {
    setMouseInside(false);
    if (isZoomed) {
      const img = zoomRef.current?.querySelector('img');
      if (img) {
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(1)';
        setIsZoomed(false);
      }
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.title} to cart`);
    const updatedProduct = { ...product, quantity: quantity };  
    onAddToCart(updatedProduct);  
  };

  if (!product) {
    return (
      <div className="contenedor" style={{ display: 'flex' }}>
        <div className="mitad-izquierda" style={{ flex: '1' }}>
          <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
            No se ha seleccionado ningún producto.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: 0 }}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Link to="/product-catalog" style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{ marginLeft: '20px', marginBottom: '20px', float: 'left' }}>Back</Button>
        </Link>
        <div
          ref={zoomRef}
          className="zoom-container"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.image}
            alt="Product"
            className="zoom-img"
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              padding: '15px',
              display: 'block',
              margin: 'auto',
            }}
          />
        </div>       
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} style={{ backgroundColor: '#e0e0e0' }}>
        <div style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
          <div>
            <hr />
            <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>{product.title}</span>
            </Typography>
            <hr />

            <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Price: ${product.price}</span>
            </Typography>
            <hr />

            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Category:</span> {product.category}
            </Typography>
            <hr />

            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Description:</span> {product.description}
            </Typography>
            <hr />

            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Rating:</span> {product.rating.rate} ({product.rating.count} reviews)
            </Typography>
            <hr />
            <div>
                <TextField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    variant="outlined"
                    style={{ margin: '10px 0', width: '100px' }}
                  />
 
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ margin: '10px 0' }}
                  >
                    Add to Cart
                  </Button>
              </div>

          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;



// import React, { FunctionComponent, useRef, useState } from 'react';
// import { Typography, Button, Grid, TextField } from '@mui/material';
// import { Link } from 'react-router-dom';

// interface ProductDetailProps {
//   product: any;
//   onBack: () => void;
//   onAddToCart: (product: any) => void; // Add this prop
// }

// const ProductDetail: FunctionComponent<ProductDetailProps> = ({ product, onAddToCart }) => {
//   const zoomRef = useRef<HTMLDivElement>(null);
//   const [isZoomed, setIsZoomed] = useState<boolean>(false);
//   const [mouseInside, setMouseInside] = useState<boolean>(false);
//   const [quantity, setQuantity] = useState<number>(1);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (mouseInside) {
//       const img = zoomRef.current?.querySelector('img');
//       if (!img) return;

//       const rect = zoomRef.current?.getBoundingClientRect();
//       const offsetX = e.clientX - rect!.left;
//       const offsetY = e.clientY - rect!.top;
//       const percentX = offsetX / rect!.width;
//       const percentY = offsetY / rect!.height;

//       img.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`;

//       if (!isZoomed) {
//         img.style.transition = 'transform 0.5s ease';
//         img.style.transform = 'scale(2.5)';
//         setIsZoomed(true);
//       }
//     }
//   };

//   const handleMouseEnter = () => {
//     setMouseInside(true);
//   };

//   const handleMouseLeave = () => {
//     setMouseInside(false);
//     if (isZoomed) {
//       const img = zoomRef.current?.querySelector('img');
//       if (img) {
//         img.style.transition = 'transform 0.5s ease';
//         img.style.transform = 'scale(1)';
//         setIsZoomed(false);
//       }
//     }
//   };

//   // const handleAddToCart = () => {
//   //   console.log(`Added ${quantity} ${product.title} to cart`);
//   //   onAddToCart(product); // Llamada a la función para añadir al carrito
//   // };

//   const handleAddToCart = () => {
//     console.log(`Added ${quantity} ${product.title} to cart`);
//     const updatedProduct = { ...product, quantity: quantity };  
//     onAddToCart(updatedProduct);  
//   };

 

//   if (!product) {
//     return (
//       <div className="contenedor" style={{ display: 'flex' }}>
//         <div className="mitad-izquierda" style={{ flex: '1' }}>
//           <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//             No se ha seleccionado ningún producto.
//           </Typography>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Grid container spacing={2} style={{ marginTop: 0 }}>
//       <Grid item xs={12} sm={6} md={6} lg={6}>
//         <Link to="/product-catalog" style={{ textDecoration: 'none' }}>
//           <Button variant="contained" style={{ marginLeft: '20px', marginBottom: '20px', float: 'left' }}>Back</Button>
//         </Link>
//         <div
//           ref={zoomRef}
//           className="zoom-container"
//           onMouseEnter={handleMouseEnter}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//         >
//           <img
//             src={product.image}
//             alt="Product"
//             className="zoom-img"
//             style={{
//               maxWidth: '100%',
//               maxHeight: '400px',
//               padding: '15px',
//               display: 'block',
//               margin: 'auto',
//             }}
//           />
//         </div>       
//       </Grid>

//       <Grid item xs={12} sm={6} md={6} lg={6} style={{ backgroundColor: '#e0e0e0' }}>
//         <div style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
//           <div>
//             <hr />
//             <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
//               <span style={{ fontWeight: 'bold' }}>{product.title}</span>
//             </Typography>
//             <hr />

//             <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
//               <span style={{ fontWeight: 'bold' }}>Price: ${product.price}</span>
//             </Typography>
//             <hr />

//             <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//               <span style={{ fontWeight: 'bold' }}>Category:</span> {product.category}
//             </Typography>
//             <hr />

//             <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//               <span style={{ fontWeight: 'bold' }}>Description:</span> {product.description}
//             </Typography>
//             <hr />

//             <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//               <span style={{ fontWeight: 'bold' }}>Rating:</span> {product.rating.rate} ({product.rating.count} reviews)
//             </Typography>
//             <hr />
//             <div>
//                 <TextField
//                     id="quantity"
//                     label="Quantity"
//                     type="number"
//                     value={quantity}
//                     InputProps={{ inputProps: { min: 1 } }}
//                     onChange={(e) => setQuantity(parseInt(e.target.value))}
//                     variant="outlined"
//                     style={{ margin: '10px 0', width: '100px' }}
//                   />
 
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddToCart}
//                     // style={{ margin: '10px 0', width: '100px' }}
//                     style={{ margin: '10px 0' }}
//                   >
//                     Add to Cart
//                   </Button>
//               </div>

//           </div>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default ProductDetail;



// import React, { FunctionComponent } from 'react';
// import { Typography, Button } from '@mui/material';

// interface ProductDetailProps {
//   product: any; // Cambiar el tipo de product a cualquier objeto de producto
//   onBack: () => void;
// }

// const ProductDetail: FunctionComponent<ProductDetailProps> = ({ product, onBack }) => { // Cambiar el tipo de product a cualquier objeto de producto
//   if (!product) {
//     return (
//       <div className="contenedor" style={{ display: 'flex' }}>
//         <div className="mitad-izquierda" style={{ flex: '1' }}>
//           <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//             No se ha seleccionado ningún producto.
//           </Typography>
//         </div>
//       </div>
//     );
//   }

//   // Aquí deberías obtener la información completa del producto usando el ID proporcionado,
//   // ya sea desde una API o algún otro origen de datos.
//   // Por ahora, solo estamos mostrando un mensaje indicando que el producto está seleccionado.

//   return (
//     <div className="contenedor" style={{ display: 'flex' }}>
//            <div className="mitad-izquierda" style={{ flex: '1' }}>
//            <Button variant="contained" onClick={onBack} style={{ marginTop: '20px', marginLeft: '20px',float: 'left' }}>Back</Button>          
//              {/* <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px', padding:'15px'  }} /> */}

//              <div className="zoom">
//                 <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px', padding:'15px'  }} />
//             </div>


//            </div>
           
//            <div className="mitad-derecha" style={{ flex: '1', backgroundColor: '#e0e0e0', padding: '20px' }}>
//            <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
//                {product.title}
//              </Typography>
             
//              <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
//                Price: ${product.price}
//              </Typography>
             
//              <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//                Category: {product.category}
//              </Typography>
             
//              <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//                 Description: {product.description}
//              </Typography>
             
//                 <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
//                Rating: {product.rating.rate} ({product.rating.count} reviews)
//              </Typography>
//            </div>
//          </div>
//   );
// };

// export default ProductDetail;



// import  { FunctionComponent } from 'react';
// import { Typography, Button } from '@mui/material';

// interface ProductDetailProps {
//     product: {
//       id: string | null | undefined;
//       image: string | undefined;
//       title: string | undefined;
//       price: number | undefined;
//       category: string | undefined;
//       rating: { rate: string | number | undefined; count: string | number | undefined };
//     } | null; // Ajustamos el tipo de product para permitir null
//     onBack: () => void;
// }

// const ProductDetail: FunctionComponent<ProductDetailProps> = ({ product, onBack }) => {

//     console.log(product);


//   if (!product) {
//     return (
//       <div className="contenedor" style={{ display: 'flex' }}>
//         <div className="mitad-izquierda" style={{ flex: '1' }}>
//           <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//             No se ha seleccionado ningún producto.
//           </Typography>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="contenedor" style={{ display: 'flex' }}>
//       <div className="mitad-izquierda" style={{ flex: '1' }}>
//         <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           {product.title}
//         </Typography>
//         <img src={product.image} alt="Product" style={{ maxWidth: '100%' }} />
//       </div>
//       <div className="mitad-derecha" style={{ flex: '1', backgroundColor: '#e0e0e0', padding: '20px' }}>
//         <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           Price: ${product.price}
//         </Typography>
//         <Typography variant="body1" align="center" style={{ lineHeight: '1.5em' }}>
//           Category: {product.category}
//         </Typography>
//         <Typography variant="body1" align="center" style={{ lineHeight: '1.5em' }}>
//           Rating: {product.rating.rate} ({product.rating.count} reviews)
//         </Typography>
//         <Button variant="contained" onClick={onBack} style={{ marginTop: '20px' }}>Back</Button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



// import React, { FunctionComponent } from 'react';
// import { Typography } from '@mui/material';

// interface ProductDetailProps {
//   product: {
//     id: string | null | undefined;
//     image: string | undefined;
//     title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
//     price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
//     category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
//     rating: { rate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; };
//   };
// }

// const ProductDetail: FunctionComponent<ProductDetailProps> = ({ product }) => {
//   return (
//     <div className="contenedor" style={{ display: 'flex' }}>
//       <div className="mitad-izquierda" style={{ flex: '1' }}>
//         <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           {product.title}
//         </Typography>
//         <img src={product.image} alt="Product" style={{ maxWidth: '100%' }} />
//       </div>
//       <div className="mitad-derecha" style={{ flex: '1', backgroundColor: '#e0e0e0', padding: '20px' }}>
//         <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           Price: ${product.price}
//         </Typography>
//         <Typography variant="body1" align="center" style={{ lineHeight: '1.5em' }}>
//           Category: {product.category}
//         </Typography>
//         <Typography variant="body1" align="center" style={{ lineHeight: '1.5em' }}>
//           Rating: {product.rating.rate} ({product.rating.count} reviews)
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;





// import { FunctionComponent} from "react";
// import { Typography  } from '@mui/material';

// const ProductDetail: FunctionComponent = () => {

//   return (
//     <div className="contenedor" style={{ display: 'flex' }}>
//       <div className="mitad-izquierda" style={{ flex: '1' }}>
//       <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           Obten un mejor control de tus inventarios,
//           inicia sesión para comenzar!!
//         </Typography>

       
//       </div>

//       <div className="mitad-derecha" style={{ flex: '1', backgroundColor: '#e0e0e0', padding: '20px' }}>
//         <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
//           Obten un mejor control de tus inventarios,
//           inicia sesión para comenzar!!
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;