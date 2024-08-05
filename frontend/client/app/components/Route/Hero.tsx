import React from "react";
import AboutUs from "./AboutUs.png";
import Image from "next/image";

const Intro: React.FC = () => {
  return (
    <section className="flex items-center w-full h-screen p-12 animate-fadeIn rounded-[38px] bg-[#5c50a7] sticky top-0 font-K2D">
      <Image
        className="introImg"
        src={AboutUs}
        alt="asd"
        width={500}
        height={300}
      />

      <p className="text-[75px] text-white m-0">
        BRIDGING THE{" "}
        <span className="text-[#492a70] font-bold transition-all duration-300 ease-in-out hover:text-[80px]">
          GAP
        </span>{" "}
        BETWEEN{" "}
        <span className="text-[#492a70] font-bold transition-all duration-300 ease-in-out hover:text-[80px]">
          UNDERGRADUATES
        </span>{" "}
        AND INDUSTRY{" "}
        <span className="text-[#492a70] font-bold transition-all duration-300 ease-in-out hover:text-[80px]">
          PROFESSIONALS
        </span>
      </p>
    </section>
  );
};

export default Intro;
