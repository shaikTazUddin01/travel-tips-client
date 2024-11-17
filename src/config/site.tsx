
import { FaCreativeCommonsNc } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbPremiumRights } from "react-icons/tb";
import { RiCreativeCommonsNcFill, RiMoneyDollarCircleFill } from "react-icons/ri";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "travel tips",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon:<GoHomeFill/>
    },
    {
      label: "Network",
      href: "/network",
      icon:<PiUsersThreeFill />
    },
    // {
    //   label: "Group",
    //   href: "/group",
    // },
    {
      label: "Premium",
      href: "/premium",
      icon: <RiMoneyDollarCircleFill />
    },
    {
      label: "Non-Premium",
      href: "/non-premium",
      icon: <RiCreativeCommonsNcFill />
    },
    // {
    //   label: "About",
    //   href: "/about",
    // },
    // {
    //   label: "Help Center",
    //   href: "/contact",
    //   icon:<IoHelpCircleSharp/>
    // },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Network",
      href: "/network",
    },
    {
      label: "Premium",
      href: "/premium",
    },
    {
      label: "Non-Premium",
      href: "/non-premium",
    },
    {
      label: "Privacy Policy",
      href: "/about",
    },
    {
      label: "Help Center",
      href: "/contact",
    },
    {
      label: "Change Password",
      href: "/changePassword",
    },
  ],
  adminNavMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Network",
      href: "/network",
    },
    {
      label: "Premium",
      href: "/premium",
    },
    {
      label: "Non-Premium",
      href: "/non-premium",
    },
    {
      label: "Policy",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "user Management",
      href: "/all-user",
    },
    {
      label: "Content Management",
      href: "/content-management",
    },
    {
      label: "Payment Management",
      href: "/payment-management",
    },

    {
      label: "Change Password",
      href: "/changePassword",
    },
  ],

  // links: {
  //   github: "https://github.com/nextui-org/nextui",
  //   twitter: "https://twitter.com/getnextui",
  //   docs: "https://nextui.org",
  //   discord: "https://discord.gg/9b6yyZKmH4",
  //   sponsor: "https://patreon.com/jrgarciadev",
  // },
};
