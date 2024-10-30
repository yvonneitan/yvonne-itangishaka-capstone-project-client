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
// import React, { useState } from "react";
// import "./ColorPicker.scss";

// const ColorPicker = ({ targetRef }) => {
//   const [selectedColor, setSelectedColor] = useState("#e9e9e9");

//   const fetchAIColor = async () => {
//     try {
//       const response = await fetch("http://colormind.io/api/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "default", 
//         }),
//       });
      
//       const data = await response.json();
//       const aiColor = `rgb(${data.result[0].join(",")})`;
      
//       setSelectedColor(aiColor);
      
//       if (targetRef.current) {
//         targetRef.current.style.backgroundColor = aiColor;
//       }
//     } catch (error) {
//       console.error("Error fetching AI-generated color:", error);
//     }
//   };

//   return (
//     <div className="color">
//       <p className="color__title">Colors:</p>
//       <button onClick={fetchAIColor} className="color__choice">
//       </button>
//       <input
//         type="color"
//         value={selectedColor}
//         onChange={(e) => {
//           setSelectedColor(e.target.value);
//           if (targetRef.current) {
//             targetRef.current.style.backgroundColor = e.target.value;
//           }
//         }}
//         aria-label="Choose a background color"
//         className="color__choice"
//       />
//     </div>
//   );
// };

// export default ColorPicker;
