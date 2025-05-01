import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedIntro from '../Components/AnimatedIntro';
import Particle from '../Components/Particle';
import Navbar from '../Components/Navbar';
import { UserContext } from '../context/userContext';


const Main = () => {
  const navigate = useNavigate();
  const { Theme } = useContext(UserContext);
  
  useEffect(() => {
    document.title = 'Dummy App';
  })

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden ${Theme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar title="Dummy App" showLogo={false} />
      <Particle />
      <div className="flex-grow flex flex-col justify-center items-center">
        <AnimatedIntro />

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/todo')}
            className={`font-bold px-8 py-3 rounded-md transition-all duration-200 w-full sm:w-auto 
            ${Theme ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
          >
            Todo App
          </button>
          <button
            onClick={() => navigate('/products')}
            className={`font-bold px-8 py-3 rounded-md transition-all duration-200 w-full sm:w-auto 
            ${Theme ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
          >
            Product App
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
