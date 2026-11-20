"use client";

import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { Button } from "@base-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const queryClient = useQueryClient();

  const routes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You have successfully logged out.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Please try again.",
          type: "error",
        });
      },
    });
  };

  const getInitial = () => {
    const name = data?.name || data?.email || "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
            M
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            MyApp
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.path;

            return (
              <Link
                key={route.path}
                href={route.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {route.name}

                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Authentication */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : data ? (
            <div className="flex items-center gap-3">
              {/* User Profile */}
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {getInitial()}
                </div>

                <div className="hidden flex-col sm:flex">
                  <span className="text-sm font-semibold text-gray-900">
                    {data.name || "User"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {data.email || "Logged in"}
                  </span>
                </div>
              </div>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex items-center gap-6 border-t border-gray-100 px-4 py-3 md:hidden">
        {routes.map((route) => {
          const isActive = pathname === route.path;

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {route.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
