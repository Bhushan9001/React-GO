import React from 'react'
import LetteredAvatar from 'react-lettered-avatar';
function Avatar({name}) {
  const defaultColors = [
    "#2ecc71",
    "#3498db",
    "#8e44ad",
    "#e67e22",
    "#e74c3c",
    "#1abc9c",
    "#2c3e50"
  ];

  return (
    <LetteredAvatar name={name} backgroundColors={defaultColors}/>
  )
}

export default Avatar
