import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'
// import images from './images.png'

const Landingpage = () => {
    
  return (
    <div className="background">
    {/* <nav class=" text-lime-600  bg-yellow-500 flex hover:text-gray-500 hover:bg-green-400" >
        <span class="font-bold flex mx-5 items-center">E-Voting</span>
        <ul class="flex py-4  my-1 rounded-2xl px-96 " >
            <li class="mx-3 cursor-pointer">Home</li>
            <li class="mx-3 cursor-pointer">About</li>
            <li class="mx-3 cursor-pointer ">Contact Us</li>
        </ul>
    </nav> */}
    <main className=" flex ">
    <div className="ml-10  py-32 px-8">
        <div className=" main text-2xl font-bold">
            <h1>E-Voting Overview</h1>
        </div>
        <p className="py-5 w-1/3">E-voting, or electronic voting, is the process of casting and counting votes using electronic systems. It enhances the efficiency and accessibility of elections by allowing voters to cast their ballots online or via electronic devices.</p>
        <div className=" my-4 ">
            <Link to="/signup" className="bg-lime-500 py-2 px-3 rounded-2xl hover:text-white hover:bg-red-500 no-underline hover:underline">Sign Up</Link>
            <Link to="/login"  className="bg-lime-500 py-2 px-3 rounded-2xl hover:text-white hover:bg-red-500 mx-2 no-underline hover:underline">Log In</Link>
        </div>
    </div>
    {/* <div class=" flex  items-center mx-56">
        <img src={images} class="h-80  " alt="" />
    </div> */}
</main>
</div>
  )
}

export default Landingpage
