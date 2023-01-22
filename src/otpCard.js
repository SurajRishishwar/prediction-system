import { useState } from "react";
import toast,{Toaster} from 'react-hot-toast';
let OtpCard = ({ otp, obj }) => {
  let [otpInput, setOtpInput] = useState("");
  let otpVarifyHandler = () => {
    
    if (otp === +otpInput) {
        const notification = toast.loading("Verifying OTP", {
            style: {
              background: "white",
              color: "black",
              fontWeight: "17px",
              padding: "20px",
            },
          });
      fetch(
        "https://prediction-system-backend-services.onrender.com/store-data",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(function (response) {
          toast.success("OTP verified!, Your form has been submitted", {
            style: {
              background: "white",
              color: "black",
              fontWeight: "17px",
              padding: "20px",
            },
          });
          console.log(response);
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          toast.error("Something went wrong!", {
            style: {
              background: "white",
              color: "black",
              fontWeight: "17px",
              padding: "20px",
            },
          });
        })
        .finally(() => {
          toast.dismiss(notification);
        });
    } else {
      toast.error("OTP does not match", {
        style: {
          background: "white",
          color: "black",
          fontWeight: "17px",
          padding: "20px",
        },
      });
    }
  };

  return (
    <>
    <Toaster position="top-center" />
      <div>
        <h1>Verify your otp</h1>
        <p>
          OTP sended to <b>{obj.case_email}</b>
        </p>
        <input type="number" onChange={(e) => setOtpInput(e.target.value)} />
        <button onClick={otpVarifyHandler}>Verify</button>
      </div>
    </>
  );
};
export default OtpCard;
