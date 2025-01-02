'use client'

import { useState } from 'react';
import FormSails from '@/app/_components/FormSails';
import SailsForm from './SailsForm';

function SailButton() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button 
      className="px-8 py-4 font-semibold transition-all rounded-md place-self-end bg-primary-700 text-primary-100 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      onClick={handleButtonClick}>Add Sail</button>
      {showForm && <FormSails/>}
    </div>
  );
}

export default SailButton;