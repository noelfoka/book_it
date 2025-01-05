import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { CalendarCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  })

  return (
    <nav>
      <div>
        <div>
          <h1>
            <div>
            <CalendarCheck />
            </div>
            <span>Book<span>It</span></span>
          </h1>
        </div>
      </div>
    </nav>
  )
}

export default Navbar