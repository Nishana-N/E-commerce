import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([])

    const getAllProduct = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
            if (data) {
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in getting product")
        }
    };

    useEffect(() => {
        getAllProduct();
    }, [])




    return (
        <div>
            <Layout title="dashboard crested produc">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Adminmenu />
                        </div>

                        <div className='col-md-9'>
                            <h1>Products</h1>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }} >

                                {
                                    products.map((item) => (
                                        <Link style={{textDecoration:"none", color:"black"}}
                                            key={item._id}
                                            to={`/dashboard/admin/product/${item.slug}`}>
                                            <Card style={{ width: '18rem' }} key={item._id}>
                                                <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                                                <Card.Body>
                                                    <Card.Title> Name: {item.name}</Card.Title>
                                                    <Card.Text>
                                                       Description:  {item.description}
                                                    </Card.Text>
                                                    <Card.Text>
                                                      Quantity:  {item.quantity}
                                                    </Card.Text>
                                                    <Card.Text>
                                                      Price:   {item.price}
                                                    </Card.Text>

                                                    <Button variant="primary">Buy</Button>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    ))

                                }
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default Product