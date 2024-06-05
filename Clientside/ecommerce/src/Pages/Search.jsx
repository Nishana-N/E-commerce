import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Layout from '../Components/Layouts/Layout';
import { useSearch } from '../Context/Search';
import { Link } from 'react-router-dom';

const Search = () => {
  const [values] = useSearch();

  return (
    <div>
      <Layout title={"Search Result"}>
        <div className='container'>
          <div className='text-center'>
            <h1>Search Result</h1>
            <h4>{values.results && values.results.length < 1 ? "No product Found" : "Found the product"}</h4>
            <div className='d-flex flex-wrap mt-4'>
              {
                values.results && values.results.map((item) => (
                  <div key={item._id} className='product-card'>
                    <Card className='custom-card'>
                      <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                      <Card.Body>
                        <div>
                          <Card.Title> Name: {item.name}</Card.Title>
                          <Card.Text>Description: {item.description.substring(0, 30)}.....</Card.Text>
                          <Card.Text> Price: {item.price}</Card.Text>
                        </div>
                        
                        <div style={{ display: "flex", gap: "15px" }}>
                         <Button variant='primary' style={{ width: "8rem" }}>More Details</Button>
                          <Button variant='secondary'>Add to Cart</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </Layout>


    </div>
  )
}

export default Search;

