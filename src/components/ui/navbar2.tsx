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
export default function Navbar2() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [color, setColor] = useState("");
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

  return (
    <div className="bg-white shadow-md fixed w-full z-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="py-1"
        maxWidth="xl"
      >
        {/* icon for small screen */}
        <NavbarContent justify="start" className="lg:hidden">
          <Link href="/" className="text-black">
            <NavbarBrand className="text-xl flex justify-end">
              <Logo />
              <p className="font-bold text-inherit">AGMT</p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        {/* large srceen */}
        <NavbarContent className="hidden lg:flex gap-4" justify="start">
          <NavbarBrand className="">
            <Link href="/" className="text-black">
              <div className="text-xl flex items-center">
                <Logo />
                <p className="font-bold text-inherit">AGMT</p>
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
          {/* lg menu */}
          <ul className="hidden lg:flex gap-4  w-full ml-2 items-center justify-end ">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  onClick={() => setColor(item?.label)}
                  href={item.href}
                  className={`${color == item?.label ? "text-blue-900" : "text-black"} text-[17px]`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
            <NavbarItem className="hidden sm:flex gap-2">
              {/* <ThemeSwitch /> */}
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={user?.image}
                onClick={() => setProfileNavToggle(!profileNavToggle)}
              />
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
                    onClick={() => setColor(item?.label)}
                  >
                    <h1
                      className={`w-full hover:text-blue hover:bg-slate-100 rounded p-1 -mt-1 ${color == item?.label ? "text-blue-700" : "text-black"}`}
                      onClick={() => handleNavigate(item?.href)}
                    >
                      {item?.label}
                    </h1>
                  </NavbarMenuItem>
                ))
              : siteConfig.navMenuItems.map((item, index) => (
                  <NavbarMenuItem
                    key={index}
                    onClick={() => setColor(item?.label)}
                  >
                    <h1
                      className={`w-full hover:text-blue hover:bg-slate-100 rounded p-1 -mt-1 ${color == item?.label ? "text-blue-700" : "text-black"}`}
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
    </div>
  );
}
