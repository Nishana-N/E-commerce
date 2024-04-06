import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'
import axios from 'axios';
import Categoryform from '../Components/Form/Categoryform';
import toast from 'react-hot-toast';
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { response } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name })
      console.log(response)
      if (response?.success) {
        toast.success(`${response.name} is created`);
        getAllCategory();
      } else {
        toast.error(response.message)
      }


    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input")
    }
  };


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



  useEffect(() => {
    getAllCategory();
  }, [])

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${categoryId}`);
      toast.success("category deleted successfully")
      getAllCategory();
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong in deleting the category.");
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  };



  return (
    <div>
      <Layout title={"Dashboard Create Category"}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <Adminmenu />
            </div>

            <div className='col-md-9'>
              <h1>Category</h1>
              <div className='p-3'>
                <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>

              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>
                            <button className='btn btn-primary btn-sm btn-custom' onClick={() => { setSelected(item); setUpdatedName(item.name); setVisible(true); }}>Edit</button>
                            <button className='btn btn-danger btn-sm btn-custom' onClick={() => handleDelete(item._id)}>delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
              <Modal onCancel={() => { setVisible(false); setUpdatedName(""); }} footer={null} visible={visible} >
              <Categoryform value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
               </Modal>     

            </div>


          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CreateCategory