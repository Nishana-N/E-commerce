import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const CategoryProducts = () => {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([])
  const params = useParams();
  const navigate = useNavigate();




  const getCategoryProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products);
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getCategoryProducts();

  }, [params.slug])


  return (
    <div>
      <Layout>
        <div className='container'>
          <h1>category - {categories?.name}</h1>
          <h1>{products?.length} Result Found</h1>
          <div className='row'>
            <div >
              <div  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }}>
                {
                  products.map((item) => (
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
                        <Button variant="primary"
                        onClick={()=> navigate(`/productdetails/${item.slug}`)}
                        >More Details</Button>
                        <Button variant="primary">Add to cart</Button>
                      </Card.Body>
                    </Card>
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

export default CategoryProducts;