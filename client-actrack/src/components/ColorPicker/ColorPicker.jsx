import React, { useState } from "react";
import "./ColorPicker.scss";

const ColorPicker = ({ targetRef }) => {
  const [selectedColor, setSelectedColor] = useState("#e9e9e9");

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    if (targetRef.current) {
      targetRef.current.style.backgroundColor = color;
    }
  };

  return (
    <div className="color">
      <p className="color__title">Colors:</p>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        aria-label="Choose a background color"
        className="color__choice"
      />
    </div>
  );
};
export default ColorPicker;
