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
    <nav>
      <div>
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
  );
};

export default Navbar;
