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

  return (
    <div className="bg-white shadow-md fixed w-full z-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="py-1"
        maxWidth="xl"
      >
        {/* toggle button */}
        <NavbarContent
          className="sm:hidden w-full"
          justify="start"
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        
        {/* large srceen */}
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarBrand className="">
            <div className="text-xl flex items-center">
            <Logo />
            <p className="font-bold text-inherit">AGMT</p>
            </div>
            <div className="ml-2 w-[60%]">
              <NavbarItem className="hidden lg:flex w-full">
                <SearchBox />
              </NavbarItem>
            </div>
          </NavbarBrand>
        </NavbarContent>


        <NavbarContent justify="end" className="">
          {/* lg menu */}
          <ul className="hidden lg:flex gap-4  w-full ml-2 items-center justify-end">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link onClick={() => setColor(item?.label)} href={item.href}
                className={`${color==item?.label?"text-blue-900":"text-black"} text-[18px]`}
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
          {/* small screen nav end */}

        <NavbarContent justify="end" className="md:hidden">
        <NavbarBrand className="text-xl flex justify-end">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        
      </NavbarContent>

        {/* small screen */}
        <NavbarMenu>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full hover:blue text-black"
                href={item?.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item?.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
