import React, { useEffect, useState } from "react";

export default function Otp(props) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  function getCodeBoxElement(index) {
    return document.getElementById(`codeBox${index}`);
  }
  function onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    if (getCodeBoxElement(index).value.length === 1) {
      if (index !== 6) {
        getCodeBoxElement(index + 1).focus();
      } else {
        // getCodeBoxElement(index).blur();
        // verifyOtp();
        // Submit code
        // console.log("submit code ");
      }
    }
    if (eventCode === 8 && index !== 1) {
      getCodeBoxElement(index - 1).focus();
    }
  }
  function onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = getCodeBoxElement(item);
      // currentElement.style.borderColor= "#F7941D"
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

    useEffect(() => {
      props.setOtp(input1+input2+input3+input4+input5+input6);
    }, [input1, input2, input3, input4, input5, input6]);
  // const isOTPFilled = () => {
  //   const inputs = [input1, input2, input3, input4, input5, input6];
  //   const x = inputs.every((v) => v.length === 1);
  //   props.setIsOtpFilled(x);
  // };

  return (
    <>
      <div
        className="otp-input-com  sm:space-x-5 space-x-3 justify-center mb-8"
        id="otp-inputs"
        style={{ display: "flex" }}
      >
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400 text-center items-center text-2xl font-bold text-dark-gray"
            onKeyUp={(e) => onKeyUpEvent(1, e)}
            onFocus={() => onFocusEvent(1)}
            // onBlur={() => onBlurEvent(1)}
            value={input1}
            maxLength="1"
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
            onChange={(e) => {
              if (/\d{1,}/.test(e.target.value) || e.target.value === "") {
                if (isNaN(e.target.value)) {
                  return false;
                }
                setInput1(e.target.value);
              }
            }}
            onPaste={(event) => {
              const pasteContent = event.clipboardData.getData("text");
              if (!/\d{1,}/.test(pasteContent)) return;
              pasteContent.split("").forEach((digit, index) => {
                switch (index) {
                  case 0:
                    return setInput1(digit);
                  case 1:
                    return setInput2(digit);
                  case 2:
                    return setInput3(digit);
                  case 3:
                    return setInput4(digit);
                  case 4:
                    return setInput5(digit);
                  case 5:
                    return setInput6(digit);
                  default:
                }
              });
            }}
            pattern="\d{1}"
            id="codeBox1"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
          />
        </div>
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400 text-center items-center text-2xl font-bold text-dark-gray w-full h-full bg-[#FAFAFA]"
            onKeyUp={(e) => onKeyUpEvent(2, e)}
            onFocus={() => onFocusEvent(2)}
            maxLength="1"
            value={input2}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return false;
              }
              setInput2(e.target.value);
            }}
            id="codeBox2"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400  leading-14 text-center items-center text-2xl font-bold text-dark-gray w-full h-full bg-[#FAFAFA]"
            onKeyUp={(e) => onKeyUpEvent(3, e)}
            onFocus={() => onFocusEvent(3)}
            maxLength="1"
            value={input3}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return false;
              }
              setInput3(e.target.value);
            }}
            id="codeBox3"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400  leading-14 text-center items-center text-2xl font-bold text-dark-gray w-full h-full bg-[#FAFAFA]"
            onKeyUp={(e) => onKeyUpEvent(4, e)}
            onFocus={() => onFocusEvent(4)}
            maxLength="1"
            value={input4}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return false;
              }
              setInput4(e.target.value);
            }}
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
            id="codeBox4"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
          />
        </div>
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400  leading-14 text-center items-center text-2xl font-bold text-dark-gray w-full h-full bg-[#FAFAFA]"
            onKeyUp={(e) => onKeyUpEvent(5, e)}
            onFocus={() => onFocusEvent(5)}
            maxLength="1"
            value={input5}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return false;
              }
              setInput5(e.target.value);
            }}
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
            id="codeBox5"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
          />
        </div>
        <div>
          <input
            type="text"
            className="input-field placeholder:text-slate-400  leading-14 text-center items-center text-2xl text-dark-gray w-full h-full bg-[#FAFAFA]"
            onKeyUp={(e) => onKeyUpEvent(6, e)}
            onFocus={() => onFocusEvent(6)}
            maxLength="1"
            value={input6}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return false;
              }
              setInput6(e.target.value);
            }}
            id="codeBox6"
            name="input1"
            autoComplete="one-time-code"
            required
            placeholder="0"
            inputMode="numeric"
            style={{
              paddingRight: "2px",
              borderRadius: "58%",
              height: "170%",
              width: "77%",
              fontWeight: "700",
            }}
          />
        </div>
      </div>
    </>
  );
}