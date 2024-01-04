import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { PageHero } from '../components'
import FormRow from '../components/FormRow'
import useLocalState from '../utils/localState'

const Admin = () => {
  const localState = useLocalState()
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = localState

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    colors: '',
    company: 'ikea',
    stock: 0,
    featured: false,
    description: '',
    category: '',
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      // Create a FormData object to send files
      const formDataForUpload = new FormData()
      formDataForUpload.append('image', formData.image)

      // Upload the image
      const { data: imageResponse } = await axios.post(
        '/api/v1/products/upload',
        formDataForUpload
      )

      // Create product with the image URL
      const productData = {
        name: formData.name,
        price: formData.price,
        colors: formData.colors,
        company: formData.company,
        stock: formData.stock,
        featured: formData.featured,
        description: formData.description,
        category: formData.category,
        image: imageResponse.image,
      }

      // Create product on the server
      const response = await axios.post('/api/v1/products', productData)

      if (response.status === 201) {
        setSuccess(true)
        showAlert({
          text: 'Product created successfully!',
          type: 'success',
        })
        // You may redirect or perform additional actions here
      } else {
        showAlert({ text: 'Failed to create product' })
      }
    } catch (error) {
      showAlert({
        text:
          error.response?.data.msg ||
          'An error occurred while uploading the image.',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <main>
      <PageHero title="add Product" />
      <div className="page section section-center form product-form ">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            <p>{alert.text}</p>
            <button className="close" onClick={hideAlert}>
              <span>&times;</span>
            </button>
          </div>
        )}
        <h1>Create a New Product</h1>
        <form>
          <FormRow
            type="text"
            name="name"
            value={formData.name}
            handleChange={handleInputChange}
          />
          <FormRow
            type="number"
            name="price"
            value={formData.price}
            handleChange={handleInputChange}
          />
          <FormRow type="file" name="image" handleChange={handleFileChange} />
          <FormRow
            type="text"
            name="colors"
            value={formData.colors}
            handleChange={handleInputChange}
          />
          <FormRow
            type="select"
            name="company"
            value={formData.company}
            handleChange={handleInputChange}
          >
            <option value="ikea">IKEA</option>
            <option value="liddy">Liddy</option>
            <option value="caressa">Caressa</option>
            <option value="marcos">Marcos</option>
          </FormRow>
          <FormRow
            type="number"
            name="stock"
            value={formData.stock}
            handleChange={handleInputChange}
          />
          <FormRow
            type="checkbox"
            name="featured"
            checked={formData.featured}
            handleChange={handleInputChange}
          />
          <FormRow
            type="textarea"
            name="description"
            value={formData.description}
            handleChange={handleInputChange}
          />
          <FormRow
            type="text"
            name="category"
            value={formData.category}
            handleChange={handleInputChange}
          />

          <button
            type="button"
            className="btn btn-block"
            onClick={handleSubmit}
          >
            Create Product
          </button>
        </form>
      </div>
    </main>
  )
}

export default Admin
