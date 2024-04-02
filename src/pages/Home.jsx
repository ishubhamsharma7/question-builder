import React, { useState } from 'react'
import FormBuilder from '../components/FormBuilder';

const Home = () => {
   const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <button onClick={toggleModal} className='bg-indigo-400 p-4 min-w-[160px] rounded text-center'>Add Questions</button>
        {showModal && <FormBuilder close={toggleModal} />}
    </div>
  );
}
export default Home