import "./Store.css";
import React, { useEffect } from "react";
import { Box, Heading, Paragraph } from 'grommet';
import ProductBox from '../components/ProductBox.js';
import config from '../config.js';

export default function Store(props) {

  const {productState, productDispatch} = props;

  const getProducts = async () => {
    try {
      const apiCall = await fetch(`${config.apiGateway.URL}/products`);
      const products = await apiCall.json();
      const sorted = products.sort((a,b) => {
        return (a.sort > b.sort) ? 1 : -1
      })
      console.log(sorted);

      return sorted;
    } catch(err) {
      return []
    }
  }

  const loadProductData = async () => {
    if (productState.products.length) {
      console.log(productState);
      return null
    }
    const products = await getProducts();
    console.log(products)
    productDispatch({ type: 'setProducts', value: products });
  }

  useEffect(() => {
    loadProductData();
  }, [])

  return (
    <div className="Store">
      <Box
        gap="small"
      >
        <Box gridArea="header">
          <Heading level="1" color="brand">Shop</Heading>
          <Paragraph size="large" color="dark-2" fill={true}>
            Recommended flamenco clothing, accessories and musical instruments
          </Paragraph>
        </Box>
        <Box className="productGrid">
          {productState.products && productState.products.map((product) => {
            return (
              <ProductBox product={product} key={product.id} />
            )
            // return productBox(product.link, product.image, product.title, product.description)
          })}
        </Box>
      </Box>
    </div>
  );
}
