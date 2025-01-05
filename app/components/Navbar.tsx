"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


const Navbar = () => {
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  });

  const isActive = (link: string) => pathname === link;

  return (
    <div className="fixed top-0 w-full bg-white backdrop-blur-sm">
    <nav className="md:px-[10%] p-5 border-b border-base-200 w-full bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <div className="bg-secondary p-1 mr-1 rounded-md text-white">
              <CalendarCheck />
            </div>
            <span>
              Book<span className="text-secondary">It</span>
            </span>
          </h1>

          { loading ? (
            <div className="flex justify-end mt-2">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          ) : (
            <div className="flex justify-end mt-2">
              <div className="badge badge-ghost">{user?.email}</div>
            </div>
          )}

        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className={`link link-hover font-extrabold ${isActive("/dashboard") ? 'text-secondary' : ''}`}>Réserver</Link>
        </div>
        <LogoutLink className="btn btn-secondary btn-sm hidden md:flex">Se déconnecter</LogoutLink>

      </div>
    </nav>
    </div>
  );
};

export default Navbar;
