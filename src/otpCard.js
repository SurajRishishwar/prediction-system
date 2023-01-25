import { useState } from "react";

let OtpCard = ({otp,obj}) =>{
    let [otpInput,setOtpInput] = useState('');
    let otpVarifyHandler = () =>{
        if(otp === +otpInput){
        fetch('https://prediction-system-backend-services.onrender.com/store-data', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
    
      }).then(function(response) {
        console.log(response)
        return response.json();
      }).then((data)=>console.log(data)).catch(err=>console.error(err.message));
        
    }else{
        alert('OTP does not match, Please check it in your E-Mail')
    }
}
       
    return(
        <>
        <div>
            <h1>Verify your otp</h1>
            <p>OTP sended to <b>{obj.case_email}</b></p>
            <input type="number" onChange={e=>setOtpInput(e.target.value)}/>
            <button onClick={otpVarifyHandler}>Verify</button>
        </div>
        </>
    )
}
export default OtpCard;