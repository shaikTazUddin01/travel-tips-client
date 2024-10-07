"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { LuLogOut } from "react-icons/lu";
import { Avatar, Divider } from "@nextui-org/react";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import useUser from "../hooks/user/useShowUser";

import { siteConfig } from "@/src/config/site";
import {
  SearchIcon,
  Logo,
} from "@/src/assets/icons";



export const Navbar = () => {
  const dispatch = useAppDispatch();
  const [profileNavToggle, setProfileNavToggle] = useState(false);
  const { user } = useUser();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NextUINavbar className="bg-white shadow-md fixed" maxWidth="xl">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* site logo */}
        <NavbarBrand as="li" className="gap-3 max-w-fit ">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        {/* search */}
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>
      {/* theme switcher lg */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem> */}
        {/* lg menu */}
        <ul className="hidden lg:flex gap-4  w-full ml-2 items-center justify-end">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
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
                      <div
                        className="w-full h-auto flex items-center gap-2 justify-start hover:bg-default-200 p-2 rounded-xl mb-1"
                        
                      >
                        <Avatar
                          isBordered
                          radius="full"
                          size="sm"
                          src={user?.image}
                        />
                        <span className="text-black text-sm">{user?.name}</span>
                      </div>
                    </Link>
                    <Divider />
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

        {/* <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem> */}
      </NavbarContent>
      {/* navtoggle and theme switcher */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      {/* smaill screen */}
      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
