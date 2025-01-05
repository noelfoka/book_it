import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  });

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
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
