import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

let data=[];
export const ContactUs = () => {
  const form = useRef();
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      let res
      //  = await emailjs.sendForm(
      //   "service_5ijhdv4",
      //   "template_f5jb4wq",
      //   form.current,
      //   "dw0IdgTXXNcUc6QWE"
      // );
      if (!res) {
        throw new Error(`something went wrong ${res.status}`);
      }

      let data = await res.text;
      console.log(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      let formData = new FormData(form.current);
      let obj={};
      for (let [key,value] of formData.entries()) {
        obj[key]=value;
      }
      data.push(obj);
      console.log({data,obj});
    }

    // emailjs.sendForm('service_5ijhdv4', 'template_f5jb4wq', form.current, 'dw0IdgTXXNcUc6QWE')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  };

  // console.log(otp);

  return (
    <>
      {false ? (
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
            <input type="hidden" name="otp" value={generateOtp()} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </>
  );
};
