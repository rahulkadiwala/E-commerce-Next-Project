import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[70vh] bg-gray-100 flex items-center justify-center text-center">
      <img
        src="/heroimage.png"
        alt="hero image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Welcome to our store
        </h1>
        <p className="text-white mt-4 text-lg">Shop the latest trend today</p>
        <button className="mt-6 bg-white text-black px-6 py-2 rounded font-semibold">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
