
import React, { useState } from 'react';
import add from '../assets/add.png'

const IngredientComp = ({ingredients,setIngredients}) => {
  

  const handleChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  console.log(ingredients)
  
  return (
    <div className=''>
      {ingredients.map((ingredient, index) => (
        <div key={index} className='font-barlow-condensed text-2xl mb-2 flex space-x-4'>
          <input
            type='text'
            className='w-1/3 outline-none border-b-2 border-[#83f181] pb-2'
            placeholder='Name'
            value={ingredient.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />
          <input
            type='text'
            className='w-1/3 outline-none border-b-2 border-[#83f181] pb-2'
            placeholder='Quantity'
            value={ingredient.quantity}
            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
          />
          {index === ingredients.length - 1 && (
            <img
              onClick={handleAddIngredientField}
              className='w-10 hover:cursor-pointer'
              src={add}
            />
          )}
        </div>
      ))}
    </div>


  );
};

export default IngredientComp;
