import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import "./Upload.css"

const Upload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [suggestedItem, setSuggestedItem] = React.useState(null);
  const [suggestedPrice, setSuggestedPrice] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [receiptImage, setReceiptImage] = React.useState(null);
  const [productImage, setProductImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [showForm, setShowForm] = React.useState(false);
  const [correctItem, setCorrectItem] = React.useState('');
  const navigate = useNavigate();


  React.useEffect(() => {
    console.log(suggestedPrice)
    if (suggestedItem !== null && suggestedItem !== undefined && suggestedPrice !== null && suggestedPrice !== undefined) {
      // Open the modal
      setModalIsOpen(true);
    }
  }, [suggestedItem, suggestedPrice]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('foodPicture', data.foodPicture[0]);
    formData.append('receipt', data.receipt[0]);
    formData.append('name', data.foodName);
    formData.append('amount', data.amount);
    formData.append('price', data.cost);
    
    // Store the images in the state
    setReceiptImage(data.receipt[0]);
    setProductImage(data.foodPicture[0]);
    setIsLoading(true);

    try {
      const response = await fetch('/uploadCatalogPost', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Item uploaded successfully');
        const responseData = await response.json();
        console.log(responseData)
        setSuggestedItem(responseData.suggested_item);
        setSuggestedPrice(responseData.suggested_price);
      } else {
        console.log('Failed to upload item');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="bg-green-200 min-h-screen py-8 flex items-center justify-center">
        <FaSpinner className="text-green-500 animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="inset-0 flex items-center justify-center space-x-4">
      <div className="bg-white p-6 rounded shadow-lg w-1/4">
        <h2 className="text-2xl mb-4 text-green-600"><b>Delivery Instructions</b></h2>
        <ul>
          <li>Upload the food you will drop off into our food center.</li>
          <br></br>
          <li>Provide accurate information and images of the product and receipt</li>
          <br></br>
          <li>If you have multiple items from a bulk purchase, indicate the amount you wish to sell and the price of each (total items price / individual item)</li>
          <br></br>
          <li>Deliver the items to the in-person center for credit receival 😀 </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-1 text-green-600"><b>Upload</b></h2>
        <i><p> Submit your food here for future dropoff! You are saving costs and helping people! 😊</p></i>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <label className="block text-gray-700">Upload Picture</label>
            <input
              type="file"
              accept="image/*"
              {...register('foodPicture', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.foodPicture && <p className="text-red-500">Please upload a picture</p>}
          </div>

          <div className="mt-3">
            <label className="block text-gray-700">Upload Receipt</label>
            <input
              type="file"
              accept="image/*"
              {...register('receipt', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.receipt && <p className="text-red-500">Please upload a receipt</p>}
          </div>

          <div className="mt-3">
            <label className="block text-gray-700">Food Name</label>
            <input
              type="text"
              {...register('foodName', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.foodName && <p className="text-red-500">Please enter a food name</p>}
          </div>

          <div className="mt-3">
            <label className="block text-gray-700">Amount of Food</label>
            <input
              type="number"
              {...register('amount', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.amount && <p className="text-red-500">Please enter the amount of food</p>}
          </div>

          <div className="mt-3">
            <label className="block text-gray-700">Cost per Food</label>
            <input
              type="number"
              {...register('cost', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.cost && <p className="text-red-500">Please enter the cost per food</p>}
          </div>

          <button
            type="submit"
            className="mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Confirmation Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>Is "{suggestedItem}" on your receipt for ${suggestedPrice} the correct corresponding item?</h2>
      <div className="image-container">
        {receiptImage ? <img src={URL.createObjectURL(receiptImage)} alt="Receipt" /> : null}
        {productImage ? <img src={URL.createObjectURL(productImage)} alt="Product" /> : null}
      </div>
      <div className="button-container">
        <button className="yes" onClick={() => {
          closeModal();
          navigate('/catalog');
        }}>Yes</button>
        <button className="no" onClick={() => {setShowForm(true)}}>No</button>
      </div>
      {showForm && (
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(`Correct item: ${correctItem}`);
        setShowForm(false);
        navigate('/catalog');
      }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Please enter the correct receipt item and we will review your submission:
          <input type="text" value={correctItem} onChange={(e) => setCorrectItem(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', outline: '2px solid blue' }} />
        </label>
        <input type="submit" value="Submit"  style={{ display: 'block', margin: '10px auto' }} />
      </form>
      
    )}


    </Modal>


    </div>
    
  );
};

export default Upload;