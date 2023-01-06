"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname , useRouter} from "next/navigation";
import { FaReceipt, FaChartPie } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers, HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsBarChartSteps } from "react-icons/bs";

const menu = [
  { icon: TbLayoutDashboard, title: "Dashboard", href: "/dash" },
  { icon: CgProfile, title: "My Profile", href: "/MyProfile" },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Organization Profile",
    href: "/OrganizationProfile",
  },
  { icon: AiOutlineUserAdd, title: "Users", href: "/Users" },
  {
    icon: HiOutlineUsers,
    title: "Funder",
    href: "/Funder",
  },
  {
    icon: FaReceipt,
    title: "Receipt",
    href: "/Receipt",
  },
  {
    icon: AiOutlineFundProjectionScreen,
    title: "Project",
    href: "/Project",
  },
  {
    icon: FaChartPie,
    title: "Budget",
    href: "/Budget",
  },
  {
    icon: BsBarChartSteps,
    title: "Project Gantt chart",
    href: "/Gantt-chart",
  },
];

function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex w-64 flex-none flex-col justify-between bg-slate-900 p-6 text-white overflow-y-auto">
      <div className="flex flex-col space-y-5">
        {/* Logo */}
        <div>
          <Link href="/dash" className="block px-2 py-3">
            <Image
              src="/assed/images/vedvika.png"
              width={250}
              height={100}
              alt={"logo"}
              layout="responsive"
              loading="lazy"
              className="mx-auto p-2"
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <ul className="flex flex-col space-y-2">
            {menu.map((menu, index) => (
              <>
                <li key={index}>
                  <Link
                    href={menu.href}
                    className={`relative flex rounded py-2 px-4 ${
                      pathname == menu.href
                        ? "button-text bg-purple-500 "
                        : "opacity-75 hover:bg-primary"
                    }`}
                  >
                    {pathname == menu.href && (
                      <span className="absolute left-0 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded bg-white"></span>
                    )}
                    <menu.icon className="mr-3 self-center" />
                    {menu.title}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <button
          className="h3 flex w-full items-center justify-center rounded-lg bg-white/20 py-3 px-4 gap-2"
          onClick={() => {
            fetch("/api/logout", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            });
            router.push("/Login");
          }}
        >
          <Image
            src="/assed/images/logout_light.png"
            alt="logout pic"
            width={30}
            height={30}
            priority
          />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
