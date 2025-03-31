import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
               <img src={assets.logo} className='mb-5 w-44'/>
               <p className='w-full md:w-2/3 text-gray-700'>Bringing the best products, unbeatable deals, and a seamless shopping experience to every doorstep.</p> 
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                 <li>Home</li>
                 <li>About Us</li>
                 <li>Delivery</li>
                 <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 7358654328</li>
                    <li>shivaskn199@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ lazada.com - All Rights  </p>
        </div>
    </div>
  )
}

export default Footer