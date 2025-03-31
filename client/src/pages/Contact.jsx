import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
       {/* Contact Section */}
       <div className="flex flex-col md:flex-row items-center gap-12 my-16">
        {/* Left Side - Image */}
        <div className="flex-1">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Our Store</h3>
            <p className="text-gray-600">
              202 Birch Boulevard,
              <br />
              Chennai, Tamil Nadu 600001, India
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Contact Us</h3>
            <p className="text-gray-600">
              Tel: (+91) 7358654321 <br />
              Email: <span className="text-blue-600">lazadaworld@gmail.com</span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Careers at Lazada</h3>
            <p className="text-gray-600">
              A successful career is built on passion, perseverance, and continuous growth. As Confucius once said, 
              <span className="italic"> "Choose a job you love, and you will never have to work a day in your life."</span> 
              Believe in yourself, embrace challenges, and strive for excellence.
            </p>
          </div>

          <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
