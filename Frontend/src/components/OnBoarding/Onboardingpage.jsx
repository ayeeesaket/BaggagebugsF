import React from 'react';
import { useState } from "react"
import CarryOnBag from '../../assets/CarryOnBag.svg'; // Correct import
import { ChevronDown, Menu, ArrowDown, ArrowUp } from "lucide-react"
import yellowlargetravelbackpack from '../../assets/yellowlargetravelbackpack.svg';
import suitcasewithstickers from '../../assets/suitcasewithstickers.svg';

function Onboardingpage() {
    const [capacity, setCapacity] = useState(5)
    
        const increaseCapacity = () => {
          setCapacity((prev) => prev + 1)
        }
      
        const decreaseCapacity = () => {
          if (capacity > 1) {
            setCapacity((prev) => prev - 1)
          }
        }
  return (
    <>
            {/* Header */}
            <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center">
          <img
            src={CarryOnBag} 
            alt="Baggage Bugs Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-2xl font-medium">
            <span className="text-[#63C5DA]">Baggage</span> <span className="text-[#FA8128]">Bugs</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="border text-[#FA8128] rounded-full px-4 py-2 flex items-center">
            <span className="mr-2 text-black">English</span>
            <ChevronDown className="text-[#FA8128]" size={16} />
          </div>
          <button className="text-[#FA8128]">
            <Menu size={32} />
          </button>
        </div>
      </header>
      {/* Header */}
      <section className="relative w-full py-12 overflow-hidden">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
    
    {/* Backpack Image on the Left, touching ellipse */}
    <div className="md:w-[40%] flex justify-end md:mr-[-80px] mt-10 md:mt-0 z-10">
      <img
        src={yellowlargetravelbackpack}
        alt="Backpack with luggage"
        className="w-[400px] h-auto"
      />
    </div>

    {/* Oval Ellipse with Content on the Right */}
    <div className="relative w-full md:w-[60%] h-[400px] flex items-center pr-6 md:pr-12">
      {/* Oval Ellipse */}
      <div className="absolute right-0 top-0 w-[250%] h-[80%] border-4 border-orange-400 rounded-full translate-x-1/2" />

      {/* Content inside the ellipse */}
      <div className="relative z-10 text-right ml-auto">
        <h2 className="text-3xl text-orange-500 mb-4">
          Earn money effortlessly!
        </h2>
        <p className="text-xl text-sky-400 leading-relaxed mb-6">
          Life isn’t just about parcels<br />
          Why not boost your income by storing<br />
          luggage?
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-base font-medium py-2 px-6 rounded-full shadow-md transition-all">
          Become a partner
        </button>
      </div>
    </div>
  </div>
</section>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 pl-4 md:pl-6">
        <span className="text-[#FA8128]">Storing luggage with Baggage Bugs is a total</span>
        <br />
        <span className="text-[#63C5DA]">game-changer!</span>
        </h1>

      

      <div className="flex flex-col md:flex-row gap-6">
        

  {/* Left Column */}
  <div className="w-full md:w-1/2 border-4 border-[#63C5DA] p-6 rounded-md md:rounded-l-none md:border-l-0">
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F47B20]">No costs, just cash!</h2>
        <p className="text-[#63C5DA] text-lg">Keep 100% of the profits.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#FA8128]">Money straight to your account</h2>
        <p className="text-[#63C5DA] text-lg">Get paid every month hassle-free.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#FA8128]">Get noticed!</h2>
        <p className="text-[#63C5DA] text-lg">Let the world discover your business for free.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#FA8128]">More bags, more bucks!</h2>
        <p className="text-[#63C5DA] text-lg">Every customer is a potential buyer for you.</p>
      </div>
    </div>
  </div>

  {/* Right Column */}
  <div className="w-full md:w-1/2 flex flex-col justify-between items-center gap-8">
    
    {/* Capacity Control */}
    <div className="flex items-center gap-4">
      <div className="bg-white border border-[#63C5DA] text-[#63C5DA] py-2 px-4 flex items-center rounded-l-md">
        <span className="text-lg font-medium">Your capacity</span>
      </div>

      <div className="bg-[#FA8128] text-white py-2 px-6 flex items-center rounded-r-md">
        <button onClick={decreaseCapacity} className="mr-2 focus:outline-none" aria-label="Decrease capacity">
          <ArrowDown size={16} />
        </button>
        <span className="text-xl font-bold mx-2">{capacity}</span>
        <button onClick={increaseCapacity} className="ml-2 focus:outline-none" aria-label="Increase capacity">
          <ArrowUp size={16} />
        </button>
      </div>
    </div>

    {/* Estimate Section */}
    <div className="text-center">
      <h2 className="text-[#63C5DA] text-4xl font-bold">Upto</h2>
      <p className="text-[#FA8128] text-5xl font-bold">450EUR/month</p>
      <button className="text-[#63C5DA] text-sm underline mt-1">How is this estimated?</button>
    </div>

    {/* Calculate Button */}
    <button className="bg-[#FA8128] text-white text-xl font-bold py-3 px-10 rounded-full hover:bg-[#e06a10] transition-colors">
      Calculate
    </button>
  </div>

</div>
 {/* TeamUp  */}

 <section className="px-4 md:px-8 py-12 mt-8">
  <h2 className="text-2xl md:text-3xl text-[#FA8128] font-bold text-center mb-12">
    Why team up with Baggage Bugs?
  </h2>

  <div className="flex flex-col md:flex-row items-center">
    {/* Text Content */}
    <div className="md:w-1/2 max-w-3xl space-y-10 mb-8 md:mb-0">
  <div>
    <h3 className="text-[#63C5DA] text-3xl leading-snug">Zero cost, zero commitment</h3>
    <p className="text-[#FA8128] text-xl leading-relaxed">
      Store luggage on your terms, hassle-free!
    </p>
  </div>

  <div>
    <h3 className="text-[#63C5DA] text-3xl leading-snug">7-day support – Got questions?</h3>
    <p className="text-[#FA8128] text-xl leading-relaxed">
      We've got answers, anytime.
    </p>
  </div>

  <div>
    <h3 className="text-[#63C5DA] text-3xl leading-snug">You store the bags, we handle the rest. Payments?</h3>
    <p className="text-[#FA8128] text-xl leading-relaxed">
      Straight to your account!
    </p>
  </div>

  <div>
    <h3 className="text-[#63C5DA] text-3xl leading-snug">Free promo for your biz</h3>
    <p className="text-[#FA8128] text-xl leading-relaxed">
      More exposure, more customers, more cash!
    </p>
  </div>

  <div className="pt-6">
    <button className="bg-orange-500 text-white rounded-full px-10 py-4 text-xl hover:bg-orange-600 transition">
      Join
    </button>
  </div>
</div>



    {/* Image aligned right */}
    <div className="md:w-1/2 flex justify-end">
      <img
        src={suitcasewithstickers}
        alt="Suitcase with stickers"
        width={400}
        height={400}
        className="max-w-full h-auto"
      />
    </div>
  </div>
</section>


    </>
  )
}

export default Onboardingpage
