import React, { useState } from 'react'
import add from '../assets/add.png'

const InstructionComp = ({instructions,setInstructions}) => {
  

  const handleChange = (index, value) => {
    const newInstruction = [...instructions];
    newInstruction[index] = value;
    setInstructions(newInstruction);
  };
  
  const handleAddInstructionField = () => {
    setInstructions([...instructions, '']);
  };

  console.log(instructions)

  return (
    <div className=''>
      {instructions.map((instruction, index) => (
        <div key={index} className='font-barlow-condensed text-2xl mb-2 flex space-x-7'>
          {
            index == 0 ? (
              <input
                type='text'
                className='w-[60%] outline-none border-b-2 border-[#83f181] pb-2'
                placeholder='Step 1'
                value={instruction}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ) : (<input
              type='text'
              className='w-[60%] outline-none border-b-2 border-[#83f181] pb-2'
              placeholder='Next Step'
              value={instruction}
              onChange={(e) => handleChange(index, e.target.value)}
            />)
          }


          {index === instructions.length - 1 && (
            <img
              onClick={handleAddInstructionField}
              className='w-10 hover:cursor-pointer'
              src={add}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default InstructionComp