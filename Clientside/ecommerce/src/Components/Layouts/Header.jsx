import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../../Context/Auth';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
        })
        localStorage.removeItem("token")
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand ><GiShoppingCart />&nbsp; E-Commerce</Navbar.Brand>
                </Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto navbar-nav justify-content-end flex-grow-1">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/catogories" className="nav-link active" aria-current="page" >CATEGORIES</Link>
                        </li>
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
                                    <NavLink className="nav dropdown-toggle" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user?.name}
                                    </NavLink>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                className="dropdown-item">
                                                Dashboard
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <Link onClick={handleLogout} to="/login" className="nav-link active" aria-current="page" >LOGOUT</Link>
                                        </li>
                                    </ul>
                                </li>



                            </>)
                        }




                        <Nav.Link to="/cart">CART(0)</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header