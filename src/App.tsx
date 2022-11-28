import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <h1 className="text-3xl font-bold underline">
        Calculator Test
      </h1>

      <div className='flex items-center w-full justify-center'>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
