"use client";

import Image from "next/image";
import heroimage from "../../uploads/heroimage.png";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center">
      <Image
        src={heroimage}
        alt="Fashion collection hero banner"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="relative z-10 bg-black/50 p-8 rounded-lg">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Welcome to our store
        </h1>
        <p className="text-white mt-4 text-lg">Shop the latest trend today</p>
        <button className="mt-6 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
