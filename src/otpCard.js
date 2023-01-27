import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./otpCard.css";
let OtpCard = ({ otp, obj, style }) => {
  let [otpInput, setOtpInput] = useState("");
  let [loading, setLoading] = useState(false);
  let [hideOtp, setHideOtp] = useState(false);
  let otpVarifyHandler = () => {
    if (otp === +otpInput) {
      setLoading(true);
      const notification = toast.loading("Verifying OTP", style);
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
          toast.success("OTP verified!, Your form has been submitted", style, {
            duration: 1000,
          });
          console.log(response);
          setHideOtp(true);
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          toast.error("Something went wrong!", style, {
            duration: 8000,
          });
        })
        .finally(() => {
          setLoading(false);
          toast.dismiss(notification);
        });
    } else {
      toast.error("OTP does not match", style, {
        duration: 8000,
      });
    }
  };

  return (
    <>
      {/* <Toaster position="top-right"/> */}
      {hideOtp ? (
        <>
          <div className="screen">
            <div className="container-card">
              <h1 className="heading-card">Thank You!</h1>
              <p className="thankyou-card">
                <b style={{ fontWeight: "600" }}>
                  Hey {obj.case_person.split(" ").slice(0, 1)}, We have received
                  your request,
                </b>
                <br />
                <hr />
                <b>
                  we will reach you by email when your request will be fulfiled.
                </b>
                <br />
              </p>
              <h4>Team Prediction</h4>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="screen">
            <div className="container-card">
              <h1 className="heading-card">Verify your OTP</h1>
              <p className="p-card">
                OTP sent to <b>{obj.case_email}</b>
              </p>
              <input
                className="input-card"
                type="number"
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter OTP"
              />
              <button
                className="button-otp"
                onClick={otpVarifyHandler}
                disabled={loading}
              >
                <span className="btn-text">→</span>
                {loading && (
                  <span className="gap">
                    <span className="spinner"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default OtpCard;
