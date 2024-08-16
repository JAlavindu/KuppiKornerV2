"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSideBar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import DashBoardHeader from "../../components/Admin/DashBoardHeader";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="KuppiKorner - Admin"
        description="Kuppikorner is a platform..."
        keywords="Programming, MERN, Redux, ML"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashBoardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
