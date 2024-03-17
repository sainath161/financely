import React, { useState } from "react";
import "./styles.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Input({ label, state, setState, placeholder, type }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      {type === "password" ? (
        <div style={{ position: "relative" }}>
          <input
            value={state}
            type={isPasswordVisible ? "text" : "password"}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            className="custom-input"
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>
      ) : (
        <input
          value={state}
          type={type}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          className="custom-input"
        />
      )}
    </div>
  );
}

export default Input;

// import React from "react";
// import "./styles.css";

// function Input({ label, state, setState, placeholder, type }) {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   return (
//     <div className="input-wrapper">
//       <p className="label-input">{label}</p>
//       <input
//         value={state}
//         type={type}
//         placeholder={placeholder}
//         onChange={(e) => setState(e.target.value)}
//         className="custom-input"
//       />
//     </div>
//   );
// }

// export default Input;
