// import React, { useEffect, useState } from 'react'
// import { useCart } from '../Context/Cart'
// import Layout from '../Components/Layouts/Layout';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import toast from 'react-hot-toast';
// import { useAuth } from '../Context/Auth';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DropIn from "braintree-web-drop-in-react"


// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setauth] = useAuth();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const removeCardItem = (pid) => {
//     try {
//       const index = cart.filter(item => item._id !== pid)
//       setCart(index);
//       localStorage.setItem("cart", JSON.stringify(index))

//     } catch (error) {
//       console.log(error)
//     }
//   };

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.forEach(item => {
//         total += item.price;
//       });

//       const formattedTotal = total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD"
//       });

//       toast.success("item removed");

//       return formattedTotal;
//     } catch (error) {
//       console.log(error)
//     }
//   };


//   const handlePayment = async () => {
//     if(!instance) {
//       console.error("Braintree instance is not available");
//     return
//     }
    
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       setCart([]);
//       localStorage.removeItem("cart");
//       toast.success("Payment successful");
//       navigate("/dashboard/user/orders");
//     } catch (error) {
//       console.error("Error processing payment:",error);
//       setLoading(false);
//       toast.error("Payment Failed, Try again")
//     }
//   };

  
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken()
//   }, [auth?.token]);







//   return (
//     <div>
//       <Layout title={"Cart Page"}>
//         <div className='container'>
//           <h1>cart</h1>
//           <h6>Cart length is - {cart?.length}</h6>
//           <div className='row'>
//             <div className='col-md-6'>

//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }}>
//                 {
//                   cart.map((item, index) => (
//                     <Card style={{ width: '18rem' }} key={index} >
//                       <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
//                       <Card.Body>
//                         <Card.Title>Name: {item.name}</Card.Title>
//                         <Card.Text>
//                           Quantity: {item.quantity}
//                         </Card.Text>
//                         <Card.Text>
//                           Price: {item.price}
//                         </Card.Text>
//                         <Button variant="danger"
//                           onClick={() => removeCardItem(item._id)}
//                         >Remove</Button>
//                       </Card.Body>
//                     </Card>
//                   ))
//                 }

//                 <div className='mt-2'>
//                   {
//                     clientToken && (
//                       <>
//                         <DropIn
//                           options={{
//                             authorization: clientToken,
//                             paypal: {
//                               flow: "vault",
//                             },
//                           }}
//                           onInstance={(instance) => {
//                             console.log("Braintree DropIn Instance:" , instance);
//                             setInstance(instance)
//                           }
//                             }
//                         />
//                         <button
//                           className='btn btn-primary'
//                           onClick={handlePayment}
//                           disabled={loading || !instance || !auth?.user?.address}
//                         >
//                           {loading ? "Processing...." : "Make Payment"}
//                         </button>
//                       </>
//                     )
//                   }
//                 </div>




//               </div>
//             </div>

//             <div className='col-md-6'>
//               <h1>Cart Summary</h1>
//               <p>Total  |  CheckOut  | Payment</p>
//               <p>Total: {totalPrice()} </p>

//               {auth?.user?.address ? (
//                 <>
//                   <div className='mb-3'>
//                     <h4>Current Address</h4>
//                     <h5>{auth?.user?.address}</h5>
//                     <button className='btn btn-outline'
//                       onClick={() => navigate("/dashboard/user/profile")}>
//                       Updated Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className='mb-3'>
//                   {
//                     auth?.token ? (
//                       <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>
//                         Updated Addres
//                       </button>
//                     ) : (
//                       <button className='btn btn-outline'
//                         onClick={() => navigate("/login",
//                           {
//                             state: "/cart"

//                           })}>please  login to checkout</button>
//                     )

//                   }
//                 </div>
//               )}
//             </div>

//           </div>


//         </div>
//       </Layout>

//     </div>
//   )
// }

// export default CartPage;

import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "$0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // Handle payment process
  const handlePayment = async () => {
    if (!instance) {
      console.error("Braintree instance not available");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello  ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="200px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      console.log("Braintree DropIn instance:", instance);
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

