export interface NavLink {
  href: string;
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const primaryNavCta: NavLink = {
  href: "/contact",
  label: "Work with Brivent",
};

export const footerNav: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export const footerLegalNav: NavLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];
