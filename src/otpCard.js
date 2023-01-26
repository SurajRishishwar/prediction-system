import { useState } from "react";
import toast,{Toaster} from 'react-hot-toast';
import './otpCard.css';
let OtpCard = ({ otp, obj }) => {
  let [otpInput, setOtpInput] = useState("");
  let [loading,setLoading] = useState(false);
  let otpVarifyHandler = () => {
    
    if (otp === +otpInput) {
        setLoading(true);
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
            setLoading(false);
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
    <div className="screen">
        <div className="container-card">
        <h1 className="heading-card">Verify your OTP</h1>
        <p className="p-card">
          OTP sent to <b>{obj.case_email}</b>
        </p>
        <input className="input-card" type="number" onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP"/>
        <button className="button-otp" onClick={otpVarifyHandler} disabled={loading}><span className="btn-text">→</span>{loading&&<span className="gap"><span className="spinner"></span></span>}</button>
      </div>
    </div>
      
    </>
  );
};
export default OtpCard;
