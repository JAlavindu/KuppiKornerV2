"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/Admin/sidebar/AdminSideBar";
import AdimnProtected from "../hooks/adminProtected";
import DashBoardHero from "../components/Admin/DashBoardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdimnProtected>
        <Heading
          title="kuppikorner"
          description="Kuppikorner is a platform for learning and teaching online courses"
          keywords="Programming, MERN, Redux, ML"
        />
        <div className="flex h-[120vh]">
          <div className="1500px;w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
          </div>
        </div>
      </AdimnProtected>
    </div>
  );
};

export default page;
