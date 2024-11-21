/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Divider,
  Avatar,
} from "@nextui-org/react";
import { Logo } from "@/src/assets/icons";
import { siteConfig } from "@/src/config/site";
import SearchBox from "@/src/lib/queryOperation/SearchBox";
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch } from "@/src/redux/hooks";

import { logout } from "@/src/redux/features/auth/authSlice";
import useUser from "@/src/hooks/user/useShowUser";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown, IoMdNotifications } from "react-icons/io";
import { PiChatCircleDotsFill } from "react-icons/pi";
import Notification from "./Notification/Notification";
import { useGetMyNotificationQuery } from "@/src/redux/features/notification/notificationApi";
import { INotification } from "@/src/types/notification";
export default function Navbar2() {
  // get notification
  const { data: notification, isLoading: notifacationLoading } =
    useGetMyNotificationQuery(undefined);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [active, setactive] = useState("");
  const dispatch = useAppDispatch();

  const [profileNavToggle, setProfileNavToggle] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    document.cookie = `accessToken=; path=/; secure; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    router.push("/login");
  };

  // navigate for smaill menu
  const handleNavigate = async (href: string) => {
    await router.push(href);

    setTimeout(() => {
      setIsMenuOpen(false);
    }, 700);
  };

  // filter not read notification
  const readNotifi = notification?.data?.filter(
    (item: INotification) => !item?.isRead
  );
  console.log(readNotifi, notification);

  return (
    <div className="bg-white shadow-md fixed w-full z-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className=""
        maxWidth="xl"
      >
        {/* icon for small screen */}
        <NavbarContent justify="start" className="lg:hidden">
          <Link href="/" className="text-black">
            <NavbarBrand className="text-xl flex justify-end">
              <Logo />
              <p className="font-bold text-inherit">WISH</p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        {/* large srceen */}
        <NavbarContent className="hidden lg:flex" justify="start">
          <NavbarBrand className="">
            <Link href="/" className="text-black">
              <div className="text-xl flex items-center">
                <Logo />
                <p className="font-bold text-inherit">WISH</p>
              </div>
            </Link>
            <div className="ml-2 w-[60%]">
              <NavbarItem className="hidden lg:flex w-full">
                <SearchBox />
              </NavbarItem>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" className="">
          {/* lg navbar menu */}
          <ul className="hidden lg:flex gap-0  w-full ml-2 items-center justify-end ">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}
              onClick={() => setShowNotification(false)}
              >
                <Link
                  onClick={() => setactive(item?.label)}
                  href={item.href}
                  className={`${active == item?.label ? "text-blue-900" : "text-black"}`}
                >
                  <span className="flex flex-col items-center justify-center mx-3">
                    <span className="text-[26px]">{item?.icon}</span>
                    <span
                      className={`text-[12px]  tracking-wide -mt-[3px] ${active == item?.label ? "text-blue-900" : "text-[#414141]"}`}
                    >
                      {item?.label}
                    </span>
                  </span>
                  {/* bottom line */}
                  {active === item?.label && (
                    <span className="absolute -bottom-[9px] h-[3px] w-full bg-blue-900 rounded-full transition-all duration-300 ease-in-out"></span>
                  )}
                </Link>
              </NavbarItem>
            ))}
            {/* messages */}
            {/* <NavbarItem className="flex flex-col justify-center items-center mx-3">
              <span className="text-[26px]">
                <PiChatCircleDotsFill />
              </span>
              <span className="text-[12px] text-[#414141] tracking-wide -mt-[3px]">
                Messaging
              </span>
            </NavbarItem> */}
            {/* notification */}
            <NavbarItem
              className=" relative cursor-pointer"
              onClick={() => setShowNotification(!showNotification)}
            >
              <div
                className={`flex flex-col justify-center items-center mx-3 `}
              >
                <span
                  className={`text-[26px] ${(showNotification as boolean) && "text-blue-900"}`}
                >
                  <IoMdNotifications />
                </span>
                <span
                  className={`text-[12px] ${showNotification ? "text-blue-900" : "text-[#414141]"} tracking-wide -mt-[3px]`}
                >
                  Notifications
                </span>
              </div>

              {readNotifi?.length > 0 && (
                <span className="absolute -top-[2px] end-[34%] text-[11px] bg-red-500 rounded-full text-white h-4 w-4 flex justify-center items-center">
                  {readNotifi?.length}
                </span>
              )}
            </NavbarItem>

            {/* user profile */}
            <NavbarItem className="hidden sm:flex gap-2 ml-3"
            onClick={() => setShowNotification(false)}
            >
              {/* <ThemeSwitch /> */}
              <span
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={() => setProfileNavToggle(!profileNavToggle)}
              >
                <Avatar
                  radius="full"
                  // size="sm"
                  className="h-[28px] w-[28px]"
                  src={user?.image}
                />
                <p
                  className={`text-[12px]  tracking-wide -mt-[3px] flex justify-center items-center ${profileNavToggle ? "text-blue-900" : "text-[#414141]"}`}
                >
                  Me <IoMdArrowDropdown className="text-xl" />
                </p>
              </span>
              {/* toggle navbar */}
              {profileNavToggle && (
                <div className="min-w-[200px] min-h-[150px] border-1 shadow-lg p-5 absolute top-14 rounded-md right-0 bg-default-50">
                  <ul>
                    <NavbarItem>
                      <Link className="w-full" href="/profile">
                        <div className="w-full h-auto flex items-center gap-2 justify-start hover:bg-default-200 p-2 rounded-xl mb-1">
                          <Avatar
                            isBordered
                            radius="full"
                            size="sm"
                            src={user?.image}
                          />
                          <span className="text-black text-sm">
                            {user?.name}
                          </span>
                        </div>
                      </Link>
                    </NavbarItem>
                    {/* about */}
                    <NavbarItem>
                      <Link className="w-full" href="/about">
                        <Button
                          className="w-full flex items-center gap-2 justify-start"
                          variant="light"
                        >
                          Privacy Policy
                        </Button>
                      </Link>
                    </NavbarItem>
                    {/* contact */}
                    <NavbarItem>
                      <Link className="w-full" href="/contact">
                        <Button
                          className="w-full flex items-center gap-2 justify-start"
                          variant="light"
                        >
                          Help Center
                        </Button>
                      </Link>
                    </NavbarItem>
                    {/* change pass */}
                    <NavbarItem>
                      <Link className="w-full" href="/changePassword">
                        <Button
                          className="w-full flex items-center gap-2 justify-start"
                          variant="light"
                        >
                          Change Password
                        </Button>
                      </Link>
                    </NavbarItem>

                    <Divider className="my-1" />
                    <NavbarItem>
                      <Button
                        className="w-full flex items-center gap-2 justify-start"
                        variant="light"
                        onClick={() => handleLogout()}
                      >
                        <span>
                          <LuLogOut />
                        </span>
                        <span>logout</span>
                      </Button>
                    </NavbarItem>
                  </ul>
                </div>
              )}
            </NavbarItem>
          </ul>
        </NavbarContent>

        {/* small screen nav end toggle button */}
        <NavbarContent className="lg:hidden w-full" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        {/* small screen */}
        <NavbarMenu className=" space-y-0">
          <div className="mt-4">
            {/* <SearchBox /> */}
            <div className="mt-3">
              {user?.role == "ADMIN"
                ? siteConfig.adminNavMenuItems.map((item, index) => (
                    <NavbarMenuItem
                      key={index}
                      className=""
                      onClick={() => setactive(item?.label)}
                    >
                      <h1
                        className={`w-full hover:text-blue hover:bg-slate-100 rounded p-1 -mt-1 ${active == item?.label ? "text-blue-700" : "text-black"}`}
                        onClick={() => handleNavigate(item?.href)}
                      >
                        {item?.label}
                      </h1>
                    </NavbarMenuItem>
                  ))
                : siteConfig.navMenuItems.map((item, index) => (
                    <NavbarMenuItem
                      key={index}
                      onClick={() => setactive(item?.label)}
                    >
                      <h1
                        className={`w-full hover:text-blue hover:bg-slate-100 rounded p-1 -mt-1 ${active == item?.label ? "text-blue-700" : "text-black"}`}
                        onClick={() => handleNavigate(item?.href)}
                      >
                        {item?.label}
                      </h1>
                    </NavbarMenuItem>
                  ))}
              <NavbarMenuItem>
                <NavbarItem>
                  <Button
                    className="w-full flex items-center gap-2 text-[16px] mb-6"
                    onClick={() => handleLogout()}
                  >
                    <span>
                      <LuLogOut />
                    </span>
                    <span>logout</span>
                  </Button>
                </NavbarItem>
              </NavbarMenuItem>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>

      {/* notfication sidebar */}

      {showNotification && <Notification />}
    </div>
  );
}
