import { Layout, Select } from 'antd';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Adminmenu from '../Components/Layouts/Adminmenu';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState()
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("")
    const navigate = useNavigate()
    const params = useParams()

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in getting product")
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getSingleProduct()
    }, [])


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong in deleting the category");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`,
                productData
            );
            if (data) {
                toast.error(data.message)
            } else {
                toast.success("product updated successfully")
                navigate("/dashboard/admin/product")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }



    return (
        <div>
            <Layout title={"dashboard update product"}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Adminmenu />
                        </div>

                        <div className='col-md-9'>
                            <h1>Update product</h1>

                            <div className='m-1 w-75'>

                                <Select
                                     bordered={false}
                                    placeholder="Select a category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setCategory(value) }}
                                    value={category}
                                >
                                    {
                                        categories.map((item) => (
                                            <Option key={item._id} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <div className='mb-3'>
                                    <label className='btn btn-outline-secondary col-md-12'>
                                        {
                                            photo ? photo.name : "Upload photo"
                                        }
                                        <input
                                            type='file'
                                            name='photo'
                                            accept='image/*'
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            hidden
                                        />
                                    </label>
                                </div>

                                <div className='mb-3'>
                                    {
                                        photo && (
                                            <div className='text-center'>
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt='product-photo'
                                                    height={"200px"}
                                                    className='img img-responsive'
                                                />
                                            </div>
                                        )
                                    }
                                </div>

                                <div className='mb-3'>
                                    <input type='text'
                                        value={name}
                                        placeholder='write a name'
                                        className='form-control'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input type='text'
                                        value={description}
                                        placeholder='write description'
                                        className='form-control'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input type='text'
                                        value={quantity}
                                        placeholder='write quantity'
                                        className='form-control'
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input type='text'
                                        value={price}
                                        placeholder='price of the product'
                                        className='form-control'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input type='text'
                                        value={category}
                                        placeholder='enter category'
                                        className='form-control'
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>


                                <div className='mb-3'>
                                    <Select
                                    bordered={false}
                                    placeholder="Select shipping"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setShipping(value)}}
                                    value={shipping ? "yes" : "No"}
                                    >
                                        <Option value="0" >No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>

                                <div className='mb-3'>
                                    <button className='btn btn-primary'
                                    onClick={handleUpdate}>Update Product</button>
                                </div>

                                <div className='mb-3'>
                                    <button className='btn btn-danger' onClick={handleDelete}>
                                        Delete Product
                                    </button>
                                </div>




                            </div>



                        </div>





                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default UpdateProduct;


{/* <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))", gap: "16px" }} >

                                {
                                    categories.map((item) => (
                                        <Link
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

                                                    <Button variant="primary" onClick={handleUpdate}>Edit</Button>
                                                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    ))

                                }
                            </div> */}