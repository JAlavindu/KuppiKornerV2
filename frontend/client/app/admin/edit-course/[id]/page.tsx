"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSideBar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import DashBoardHeader from "@/app/components/Admin/DashBoardHeader";
import EditCourse from "@/app/components/Admin/Course/EditCourse";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  console.log(id);
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
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
