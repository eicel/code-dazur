import type { NextPage } from 'next'
import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProductsPage from '../../components/ProductsPage';

const Product: NextPage = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <ProductsPage />
      </main>
	  <Footer/>
    </React.Fragment>
  )
}

export default Product;
