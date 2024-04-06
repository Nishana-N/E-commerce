import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'
import { Select } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate()

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)

      const { data } = await axios.post("http://localhost:8080/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message)
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/product")
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  };



  useEffect(() => {
    getAllCategory();
  }, [])


  return (
    <div>
      <Layout title={"Dashboard Create Product"}>
        <div className='row'>
          <div className='col-md-3'>
            <Adminmenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select
                placeholder="select a category"
                className='form-select mb-3'
                onChange={(value) => { setCategory(value) }}>
                {
                  categories.map((item) => (

                    <Option key={item._id} value={item._id}>
                      {item.name}

                    </Option>
                  ))
                };

              </Select>

              <div className='mb-9'>
                <label className='btn btn-outline-secondary'>
                  {
                    photo ? photo.name : "upload photo"

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

              <div className='mb-8'>
                {
                  photo && (
                    <div className='text-center'>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt='product photo'
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
                  placeholder='write description of the product'
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <input type='text'
                  value={quantity}
                  placeholder='Quantity of the product'
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
                  onChange={(value) => { setShipping(value) }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0" >No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>

            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CreateProduct