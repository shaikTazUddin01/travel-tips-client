export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "travel tips",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "For You",
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
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
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
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
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
      label: "Premium",
      href: "/premium",
    },
    {
      label: "Non-Premium",
      href: "/non-premium",
    },
    {
      label: "About",
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
