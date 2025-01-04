"use client";

import React from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const page = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useKindeBrowserClient();

  return (
    <div>
      <div>Bienvenue {user?.given_name}</div>
      <LogoutLink className='btn'>Se déconnecter</LogoutLink>
    </div>
  )
}

export default page;