import { useState } from "react";
import "./styles.css";
import { useRef } from "react";
import { useEffect } from "react";
// otp input
const OTP_DIGIT_COUNT = 5;

export default function App() {
  const [inputArray, setInputArray] = useState(
    new Array(OTP_DIGIT_COUNT).fill("")
  );
  const refArr = useRef([]);
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newVal = value.trim();
    const newArr = [...inputArray];
    newArr[index] = newVal.slice(-1);
    setInputArray(newArr);
    newVal && refArr.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.code === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Validate otp</h1>
      {inputArray.map((input, index) => {
        return (
          <input
            className="otp-input"
            key={index}
            type="text"
            value={inputArray[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
