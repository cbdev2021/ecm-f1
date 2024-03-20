import  { useState } from 'react';
import ProductDetail from './ProductDetail';
import ProductCatalog from './ProductCatalog';

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {selectedProduct ? (
        <ProductDetail
          product={{
            id: '1',
            image: 'url_de_la_imagen',
            title: 'Nombre del producto',
            price: 10.99,
            category: 'Categoría del producto',
            rating: { rate: 4.5, count: 100 }
          }}
          onBack={handleBackClick}
        />
      ) : (
        <ProductCatalog onSelectProduct={handleProductSelect} categoryFilter={''} />
      )}
    </div>
  );
};

export default ProductPage;
