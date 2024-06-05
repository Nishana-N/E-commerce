import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layouts/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from '../Context/Cart';



const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([])
    const params = useParams();
    const [cart, setCart]= useCart();

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-singleproduct/${params.slug}`);

            setProduct(data.product)
            getSimilarProduct(data?.product._id,data?.product.category._id);


        } catch (error) {
            console.log(error);

        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct();

        }

    }, [params?.slug]);


    return (
        <div>
            <Layout title={"Product Details"}>
                <div className='container'>
                    <h1 className='text-center'>Product Details</h1>
                    <div className='row'>
                        <div className='col-md-5 col-12'>
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} className='img-fluid' />
                        </div>
                        <div className='col-md-7 col-12'>

                            <h2>Name: {product.name}</h2>
                            <h2>Description: {product.description}</h2>
                            <h2>Price: {product.price}</h2>
                            <h2>Category : {product?.category?.name}</h2>
                            <Button variant='secondary' className='mt-3'
                            onClick={()=> setCart([...cart,product])}
                            >Add To Cart</Button>
                        </div>
                    </div>

                </div>
                <div className='row container'>
                    <h1>Similar Products</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }}>
                    {
                        relatedProducts.length < 1 && (<h3 className='text-center'>No similar procucts</h3>)
                    }
                    {/* {JSON.stringify(relatedProducts, null, 4)} */}
                    {
                        relatedProducts.map((item) => (
                            <div key={item.id} className='product-card'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description.substring(0, 30)}....
                                        </Card.Text>
                                        <Card.Text>
                                            {item.price}
                                        </Card.Text>
                                        <Button variant="secondary">Buy Now</Button>
                                        <Button variant="primary"
                                         onClick={()=> {setCart([...cart,item])}}
                                        >Add To Cart</Button>
                                    </Card.Body>
                                </Card>
                                
                            </div>
                        ))
                    }
                    </div>
                </div>
                {/* {JSON.stringify(product, null,4)}  */}
            </Layout>
        </div>
    )
}

export default ProductDetails;


