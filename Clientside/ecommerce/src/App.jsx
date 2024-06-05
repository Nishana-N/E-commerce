import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Policy from "./Pages/Policy"
import Pagenotfound from "./Pages/Pagenotfound"
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import Dashboard from "./User/Dashboard"
import Private from "./Route/Private"
import Forgetpassword from "./Pages/Auth/Forgetpassword"
import Adminroute from "./Route/Adminroute"

import CreateCategory from "./Admin/CreateCategory"
import CreateProduct from "./Admin/CreateProduct"
import User from "./Admin/User"
import Admindashboard from "./Admin/Admindashboard"
import Orders from "./User/Orders"
import Profile from "./User/Profile"
import Product from "./Admin/Product"
import UpdateProduct from "./Admin/UpdateProduct"
import Search from "./Pages/Search"
import ProductDetails from "./Pages/ProductDetails"
import Category from "./Pages/Category"
import CategoryProducts from "./Pages/CategoryProducts"
import CartPage from "./Pages/CartPage"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      
      <Route path="/dashboard" element={<Private/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/orders" element={<Orders/>}/>
        <Route path="user/profile" element={<Profile/>}/>
      </Route>

      <Route path="/dashboard" element={<Adminroute/>}>
        <Route path="admin" element={<Admindashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product" element={<Product/>}/>
        <Route path="admin/users" element={<User/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
      </Route>
      
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<Pagenotfound/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/productdetails/:slug" element={<ProductDetails/>}/>
      <Route path="/category" element={<Category/>}/>
      <Route path="/category/:slug" element={<CategoryProducts/>}/>

      <Route path="/cart" element={<CartPage/>}/>
      
     
      
      <Route path="/forgotpassword" element={<Forgetpassword/>}/>
    </Routes>
    </BrowserRouter>
   
      
      
     
     
    </>
   )
 }

 export default App




