import React from 'react';
import { useForm } from 'react-hook-form';

const Upload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('foodPicture', data.foodPicture[0]);
    formData.append('receipt', data.receipt[0]);
    formData.append('foodName', data.foodName);
    formData.append('amount', data.amount);
    formData.append('cost', data.cost);
  
    // Log the FormData object to the console
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  };

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
    </div>
  );
};

export default Upload;
