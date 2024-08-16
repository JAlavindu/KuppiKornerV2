import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-ull flex items-center px-3 py-4 cursor pinter ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          My Account
        </h5>
      </div>

      <div
        className={`w-ull flex items-center px-3 py-4 cursor pinter ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          change password
        </h5>
      </div>

      <div
        className={`w-ull flex items-center px-3 py-4 cursor pinter ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Enrolled courses
        </h5>
      </div>
      {/* {user.role === "admin" && ( */}
      <Link
        className={`w-ull flex items-center px-3 py-4 cursor pinter ${
          active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        href={"/admin"}
        // onClick={() => setActive(6)}
      >
        <MdOutlineAdminPanelSettings
          size={20}
          className="dark:text-white text-black"
        />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Admin Dashboard
        </h5>
      </Link>
      {/* )} */}

      <div
        className={`w-ull flex items-center px-3 py-4 cursor pinter ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          Log out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
