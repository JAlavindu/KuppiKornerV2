"use client";
import React from "react";
// import { Global } from "@emotion/react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/Admin/sideBar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="KuppiKorner - Admin"
          description="lOREM"
          keywords="Programming"
        />

        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]"></div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
