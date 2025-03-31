import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 justify-center">
        <img className="w-full md:max-w-[450px] rounded-lg shadow-lg" src={assets.about_img} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Shopping should be effortless, exciting, and rewarding. At Lazada,
            we bring you the latest trends, unbeatable deals, and a seamless
            shopping experience—all at your fingertips. Whether you're looking
            for fashion, gadgets, or home essentials, we ensure quality,
            convenience, and affordability. Because at Lazada, your satisfaction
            is our priority, and every purchase brings happiness to your
            doorstep!
          </p>
          <p>
            Stay ahead with exclusive benefits! Subscribe now and enjoy early
            access to new arrivals, special discounts, and personalized deals
            tailored just for you. Never miss out on the latest trends—sign up
            today and elevate your shopping experience!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Lazada, our mission is to revolutionize online shopping by
            providing customers with a seamless, convenient, and enjoyable
            experience. We are committed to offering a wide range of quality
            products at unbeatable prices, ensuring that every purchase brings
            value and satisfaction. Through innovation, trust, and exceptional
            service, we strive to connect people with the brands they love while
            making e-commerce accessible to everyone. Our goal is to deliver
            happiness to every doorstep, empowering shoppers across the globe.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 justify-center">
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <b className="text-2xl">Quality Assurance</b>
          <p>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards. Quality assurance is our top priority. We carefully select and thoroughly vet each product to ensure it meets our stringent quality standards. Our commitment to excellence guarantees that every item we offer is reliable, durable, and of the highest quality
          </p>
        </div>
        <img className="w-full md:max-w-[450px] rounded-lg shadow-lg" src={assets.quality} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 justify-center">
        <img className="w-full md:max-w-[450px] rounded-lg shadow-lg" src={assets.convenience} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <b className="text-2xl">Convenience:</b>
          <p>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier. Convenience is at the heart of our service. With a user-friendly interface and a seamless ordering process, we ensure a hassle-free shopping experience. From browsing to checkout, everything is designed to make your purchase quick, easy, and enjoyable
          </p>
        </div>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 justify-center pb-10">
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
      <b className="text-2xl">Exceptional Customer Service:</b>
          <p>
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority. Exceptional customer service is our promise. Our dedicated team is always ready to assist you at every step, ensuring a smooth and satisfying experience. Your satisfaction is our top priority, and we go the extra mile to meet your needs
          </p>
        </div>
        <img className="w-full md:max-w-[450px] rounded-lg shadow-lg" src={assets.service} />
      
      </div>

      <NewsLetterBox/>
    </div>
  );
};

export default About;


