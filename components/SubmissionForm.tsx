import React, { useState } from 'react'
import CustomButton from './CustomButton';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
      name: '',
      amount: 0,
      siren: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make the API POST request
      const response = await fetch('/api/credit-limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // TODO: Notice the user that request succeeded
      console.log(response.json());
    } catch (error) {
      // TODO: Notice the user that request failed
      console.error('Error:', error);
    }
  };

  // Handle changes to form input fields and update the formData state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };
  
  const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  const inputStyles = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  const inputErrorStyles = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      
  return (
    <div className='w-full max-w-md mx-auto text-left'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
            <label className={labelStyles}>Company Name</label>

            <input
                className={formData.name.length === 0 ? inputErrorStyles : inputStyles}
                placeholder='Aria'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
          </div>

          <div className='w-full sm:w-1/2 px-3'>
            <label className={labelStyles}>Amount</label>

            <input
              className={formData.amount === 0 ? inputErrorStyles : inputStyles}
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={labelStyles}>SIREN Number</label>

            <input
              className={formData.siren.length < 11 ? inputErrorStyles : inputStyles}
              type="text"
              name="siren"
              value={formData.siren}
              onChange={handleInputChange}
              placeholder='FR123456789'
            />
          </div>
        </div>

        <CustomButton 
          title="Submit" 
          containerStyles='text-white border-2 bg-blue-400 p-2 rounded-md' 
          btnType="submit"
        />
      </form>
    </div>
  )
}

export default SubmissionForm;