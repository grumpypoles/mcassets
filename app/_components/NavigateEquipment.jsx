"use client";

import {
  Cog6ToothIcon,
  ComputerDesktopIcon,
  LifebuoyIcon,
  PlayCircleIcon, WalletIcon, SlashIcon, PauseIcon, PaperClipIcon, BackwardIcon, BookmarkIcon
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
   
  {
    name: "Equipment",
    href: "/equipment",
    icon: <WalletIcon className="w-5 h-5 text-primary-600" />,
  },
 
];



const navSubLinksGear = [
  {
    name: "Boards",
    href: "/account/admin/swimstroke",
    icon: <BackwardIcon className="w-5 h-5 text-primary-600" />,
  },
  {
    name: "Sails",
    href: "/sails",
    icon: <BookmarkIcon className="w-5 h-5 text-primary-600" />,
  },
 
  {
    name: "Booms",
    href: "/account/admin/appdata",
    icon: <PaperClipIcon className="w-5 h-5 text-primary-600" />,
  },
  {
    name: "Masts",
    href: "/masts",
    icon: <PauseIcon className="w-5 h-5 text-primary-600" />,
  },
  {
    name: "Others",
    href: "/account/admin",
    icon: <Cog6ToothIcon className="w-5 h-5 text-primary-600" />,
  },
];


const NavigateEquipment = () => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (name) => {
    setActiveMenu((prev) => (prev === name ? null : name));
  };

  return (
    <ul className="flex flex-col h-full gap-2 text-lg">
      {navLinks.map((link) => (
        <li key={link.name}>
          <div onClick={() => handleMenuClick(link.name)}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-800" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </div>
          {link.name === "Equipment" && activeMenu === "Equipment" && (
            <>
              <ul className="pl-5">
                {navSubLinksGear.map((subs) => (
                  <li key={subs.name}>
                    <Link
                      className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                        pathname === subs.href ? "bg-primary-800" : ""
                      }`}
                      href={subs.href}
                    >
                      {subs.icon}
                      <span>{subs.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          
        </li>
      ))}

      
    </ul>
  );
};

export default NavigateEquipment;
