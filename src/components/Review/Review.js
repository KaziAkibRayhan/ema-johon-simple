import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
// import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced,setOrderPlaced] = useState(false);
  const history = useHistory()

  const handleProceedCheckout = () =>{
    history.push('/shipment')
  }

  const removeProduct = (productKey) => {
    // console.log("Remove Clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //Cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    fetch('http://localhost:5000/productsByKeys', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))

    // const cartProducts = productKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = saveCart[key];
    //   return product;
    // });
    // setCart(cartProducts);
  }, []);

  // let thankYou; 
  // if(orderPlaced){
  //   thankYou =  <img src={happyImage} alt=""/>
  // } 
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {/* {
          thankYou 
        } */}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
