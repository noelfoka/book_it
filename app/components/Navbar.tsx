import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const Navbar = () => {

  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div>Navbar</div>
  )
}

export default Navbar