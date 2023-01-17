import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [otp, setotp] = useState(0);

  const generateOtp = () => {
    setotp(Math.floor(1000 + Math.random() * 9000));
  };

  generateOtp();
  const sendEmail = async(e) => {
    e.preventDefault();
    try{
      let res = await emailjs.sendForm('service_5ijhdv4', 'template_f5jb4wq', form.current, 'dw0IdgTXXNcUc6QWE');
      if(!res){
        throw new Error(`something went wrong ${res.status}`);
      }
      let data = await res.text;
      console.log(data);

    }catch(err){
      console.error(err.message)
    }

    // emailjs.sendForm('service_5ijhdv4', 'template_f5jb4wq', form.current, 'dw0IdgTXXNcUc6QWE')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });


  };
  console.log(otp);

  return (
    <>
      {otp ? (
        <h1> otp box </h1>
      ) : (
        <div>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />

            <input type="hidden" name="otp" value={otp} />

            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </>
  );
};
