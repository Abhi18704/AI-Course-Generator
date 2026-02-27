"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function SideBar() {
  const {userCourseList,setuserCourseList}=useContext(UserCourseListContext);
  const Menu = [
    { id: 1, name: "Home", icon: <IoHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <MdExplore />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <GrUpgrade />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <AiOutlineLogout />, path: "/dashboard/logout" },
  ];
const path=usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm px-5 py-6">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
      </div>

      <hr className="mb-6" />

      {/* Menu */}
      <ul className="space-y-2">
       {Menu.map((item) => (
  <li key={item.id}>
    <Link
      href={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
        ${
          path === item.path
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
        }
      `}
    >
      <span className="text-xl">{item.icon}</span>
      <span className="font-medium">{item.name}</span>
    </Link>
  </li>
))}


      </ul>
      <div className="absolute bottom-8 w-[80%]">
      <Progress value={(userCourseList?.length/10)*100} />
      <h2 className="text-sm my-2">{userCourseList?.length} Out of 10 Courses created</h2>
      <h2 className="text-xs text-gray-500">upgrade your plan for more courses</h2>
      </div>
    </aside>
  );
}

export default SideBar;
