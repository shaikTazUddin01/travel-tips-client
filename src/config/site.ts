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
      label: "Following People",
      href: "/followingpeople",
    },
    {
      label: "Premium",
      href: "/premium",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
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
