import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


export const ContactUs = () => {
  const form = useRef();
  const [otp,setotp]=useState("");

  const otpp = () =>{
    setotp(Math.floor(1000 + Math.random() * 9000));
    
  }


  const sendEmail = (e) => {
    e.preventDefault();
    otpp();
    console.log(otp);
    // setotp(Math.floor(1000 + Math.random() * 9000));
   

    emailjs.sendForm('service_5ijhdv4', 'template_f5jb4wq', form.current, 'dw0IdgTXXNcUc6QWE')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
    {otp ? (<h1> otp box </h1>):(
    <div>  
    <form ref={form} onSubmit={sendEmail}>
    <label>Name</label>
    <input type="text" name="user_name" />
    <label>Email</label>
    <input type="email" name="user_email" />
    <label>Message</label>
    <textarea name="message" />

    <input type="hidden"
    name='otp'
    value={otp}/>
    
    <input type="submit" value="Send" />
    </form>
  </div>
    ) 
}
  </>
  )
};
   
  
