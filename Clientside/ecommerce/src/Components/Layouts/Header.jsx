import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../Context/Auth';
import SearchInput from '../Form/SearchInput';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCart } from '../../Context/Cart';


const Header = () => {
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([])
    const [cart,setCart]= useCart();
    const slug = useParams();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
        })
        localStorage.removeItem("token")
    };


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])





    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
                <Container-fluid>
                    <Navbar.Brand ><GiShoppingCart />&nbsp; E-Commerce</Navbar.Brand>
                </Container-fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-md-auto flex-column flex-md-row navbar-nav justify-content-end flex-grow-1">
                        <SearchInput />
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >HOME</Link>
                        </li>
                        

                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-categories"
                                style={{ textDecoration: 'none', color: 'black',  marginTop: '-2px' }}>
                                CATEGORIES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item ><Link style={{textDecoration: "none", color: "black"}} to="/category">All Category</Link></Dropdown.Item>
                                {categories.map(item => (
                                    
                                    <Dropdown.Item key={item._id}><Link style={{textDecoration: "none", color: "black"}} to={`/category/${item.slug}`}>{item.name}</Link></Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {
                            !auth.user ? (<>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link active" aria-current="page" >REGISTER</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active" aria-current="page" >LOGIN</Link>
                                </li>
                            </>) : (<>

                                <li className='nav-item dropdown'>
                                    <Link className="nav dropdown-toggle" href="#" role="button"
                                        style={{
                                            textDecoration: "none", color: "black", marginTop: '8px',

                                            marginLeft: '10px'
                                        }}
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user?.name}
                                    </Link>
                                    <ul className='dropdown-menu me-md-auto" '>
                                        <li>
                                            <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                className="dropdown-item">
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link onClick={handleLogout} to="/login" className="nav-link active" aria-current="page" >LOGOUT</Link>
                                        </li>
                                    </ul>
                                </li>



                            </>)
                        }



                        <li className="nav-item">

                            <Link to="/cart" className="nav-link active" aria-current="page" >Cart({cart?.length})</Link>
                        </li>
                        {/* <Nav.Link to="/cart">CART(0)</Nav.Link> */}
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header