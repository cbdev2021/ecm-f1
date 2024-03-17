import { Grid } from '@mui/material'; // Importamos Grid de Material-UI
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';

const ProductCatalog = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery(null);

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
      {products.map((product: { id: Key | null | undefined; image: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; rating: { rate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <div className="product">
            <div className="image-container"> 
              <img src={product.image} className="product-image" />
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
