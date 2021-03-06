import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  document.title = "Product Detail";
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/product/' + productKey)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [productKey]);

  // const product = fakeData.find(pd=> pd.key === productKey);
  // console.log(product);
  return (
    <div>
      <h1>Your Product Details...</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
