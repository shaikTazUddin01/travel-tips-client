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
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { LuLogOut } from "react-icons/lu";
import { Avatar, Divider } from "@nextui-org/react";
import { useState } from "react";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import useUser from "../hooks/user/useShowUser";
import SearchBox from "../lib/queryOperation/SearchBox";

import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/assets/icons";
import { useRouter } from "next/navigation";

export const Navbar = () => {
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
        <NavbarItem className="hidden lg:flex">
          <SearchBox />
        </NavbarItem>
      </NavbarContent>
      {/* theme switcher lg */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
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
                      <div className="w-full h-auto flex items-center gap-2 justify-start hover:bg-default-200 p-2 rounded-xl mb-1">
                        <Avatar
                          isBordered
                          radius="full"
                          size="sm"
                          src={user?.image}
                        />
                        <span className="text-black text-sm">{user?.name}</span>
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
        <SearchBox />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="text-black hover:text-blue-600"
                href={item?.href}
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
