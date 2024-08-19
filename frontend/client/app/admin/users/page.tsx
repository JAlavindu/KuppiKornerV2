"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSideBar";
import AdimnProtected from "@/app/hooks/adminProtected";
import DashBoardHero from "@/app/components/Admin/DashBoardHero";
import AllUsers from "@/app/components/Admin/Users/AllUsers";

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
        <div className="flex h-screen">
          <div className="1500px;w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
            <AllUsers isTeam={false} />
          </div>
        </div>
      </AdimnProtected>
    </div>
  );
};

export default page;
