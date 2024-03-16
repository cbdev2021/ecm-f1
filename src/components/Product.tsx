
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';

const Product = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      {products.map((product: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; image: string | undefined; rating: { rate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          {/* <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} /> */}
          <img src={product.image} style={{ maxWidth: '200px' }} />

          <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        </div>
      ))}
    </div>
  );
};

export default Product;










// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
// import { useGetAllProductsQuery } from '../slices/productsApiSlice';

// const Product = () => {
//   const { data: products, error, isLoading } = useGetAllProductsQuery();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Products</h1>
//       {products.map((product: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
//         <div key={product.id}>
//           <h2>{product.title}</h2>
//           <p>{product.description}</p>
//           <p>Price: ${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Product;
