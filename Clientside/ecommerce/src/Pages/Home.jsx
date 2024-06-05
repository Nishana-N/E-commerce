import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout'
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { Checkbox, Radio } from "antd";
import { prices } from '../Components/Price';
import {  useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';


const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart()
  const navigate = useNavigate();
  

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
      if (data) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category")
    }
  };


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

    getAllCategory();
    getTotal()
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id)
    } else {
      all = all.filter(item => item !== id)
    }
    setChecked(all)
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct(); //price and radio  2um filter cheyyubozm ella products kittan vendi
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio])


  // to filter the product based on price and category and  put filter-product api
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  };



  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div>
      <Layout title={"Best Offers"}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <h4 className='text-center'>Filtered By category</h4>

              {
                categories.map((item) => (
                  <Checkbox
                    key={item._id}


                    onChange={(e) => handleFilter(e.target.checked, item._id)}
                  >
                    {item.name}

                  </Checkbox>

                ))
              }

              <h4 className='text-center'>Filter by Price</h4>
              <div className='d-flex flex-column'>
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {
                    prices.map(price => (
                      <div key={price._id}>
                        <Radio value={price.array}>
                          {price.name}
                        </Radio>
                      </div>
                    ))
                  }
                </Radio.Group>
              </div>
            </div>



            <div className='col-md-9'>
              {JSON.stringify(radio, null, 4)}
              {JSON.stringify(checked, null, 4)}
              <div>

                <h2>All products</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }} >

                  {
                    products.map((item) => (

                      <Card style={{ width: '18rem' }} key={item._id}>
                        <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                        <Card.Body>
                          <Card.Title> Name: {item.name}</Card.Title>
                          <Card.Text>
                            Description:  {item.description}
                          </Card.Text>
                          <Card.Text>
                            Price:  {item.price}
                          </Card.Text>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Button on variant="primary" 
                            onClick={()=> navigate(`/productdetails/${item.slug}`)}
                            style={{ width: "8rem" }}> More Details</Button>
                            <Button variant="secondary"
                            onClick={() => {setCart([...cart,item])}}
                            
                            >Add To Cart</Button>
                            

                          </div>
                        </Card.Body>
                      </Card>


                    ))

                  }
                </div>

                <div className='m-2 p-3'>
                  {
                    products && products.length < total && (
                      <Button className='btn btn-warning'
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(page + 1);
                        }}>
                        {loading ? "Loading...." : "Loadmore"}
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}

        <Button variant='primary'>{total}</Button>
      </Layout>

    </div>
  )
}

export default Home;