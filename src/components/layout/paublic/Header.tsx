import Link from "next/link";
import React from "react";

const routes = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Login", path: "/login" },
];

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {routes.map((route) => (
        <Link key={route.name} href={route.path}>
          {route.name}
        </Link>
      ))}
    </header>
  );
};

export default Header;
