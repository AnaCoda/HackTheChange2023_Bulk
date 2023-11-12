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
  const [approvalModalIsOpen, setApprovalModalIsOpen] = React.useState(false);

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
    formData.append('expiryDate', data.expiryDate);
    formData.append('originalCost', data.originalCost);
    formData.append('origin', data.origin);

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
        To sell your food items on our app, please follow these steps:
        <br></br>
        <br></br>
        - Take a photo of the product and the receipt and upload them to the app. Make sure the images are clear and show the details of the product and the purchase date.
        <br></br>
        <br></br>
        - Enter the information about the product, such as the name, brand, weight, expiration date, etc.
        <br></br>
        <br></br>
        - If you bought multiple items in bulk and want to sell them individually, enter the quantity you want to sell and the price per item. The price should be based on the total cost of the bulk purchase divided by the number of items.
        <br></br>         
        <br></br>
        - Bring the items to our nearest food center and drop them off, perhaps from a trip back from grocery shopping. You will receive credit for your sale once we verify the items. 😊

        <br></br>
        <br></br>
        - With credit, you can buy other's discounted bulk sale items
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
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="date"
            {...register('expiryDate', { required: true })}
            className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
          />
          {errors.expiryDate && <p className="text-red-500">Please enter the expiry date</p>}
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

          <div className="mt-3">
            <label className="block text-gray-700">Original cost per Food</label>
            <input
              type="number"
              {...register('originalCost', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            />
            {errors.cost && <p className="text-red-500">Please enter the original cost per food</p>}
          </div>

          <div className="mt-3">
            <label className="block text-gray-700">Discounted Location</label>
            <select
              {...register('origin', { required: true })}
              className="mt-1 px-4 py-2 rounded bg-gray-100 w-full"
            >
              <option value="">Select an option</option>
              <option value="costco">Costco</option>
              <option value="walmart">Walmart</option>
              <option value="amazon">Amazon</option>
              <option value="superstore">Superstore</option>
              <option value="other">Other</option>
            </select>
            {errors.originalCost && <p className="text-red-500">Please select the discounted location</p>}
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
          setApprovalModalIsOpen(true);
        }}>Yes</button>
        <button className="no" onClick={() => {setShowForm(true)}}>No</button>
      </div>
      {showForm && (
      <form onSubmit={(e) => {
        closeModal();
        e.preventDefault();
        console.log(`Correct item: ${correctItem}`);
        setShowForm(false);
        setApprovalModalIsOpen(true);
      }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Please enter the correct receipt item and we will review your submission:
          <input type="text" value={correctItem} onChange={(e) => setCorrectItem(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', outline: '2px solid blue' }} />
        </label>
        <input type="submit" value="Submit"  style={{ display: 'block', margin: '10px auto' }} />
      </form>
      
    )}
    </Modal>

    <Modal
      isOpen={approvalModalIsOpen}
      onRequestClose={() => setApprovalModalIsOpen(false)}
      contentLabel="Approval Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2>Thank you for posting your extra bulk food to help save the planet and your wallet!<br/><br/>
        Your posting is preliminarily up and you will be approved to drop off your food within 24 hours.<br/><br/>
        You will have up to a week to drop off your food after approval.</h2>
      <button className="yes" onClick={() => navigate('/catalog')}>Catalog</button>
    </Modal>

    </div>
    
  );
};

export default Upload;