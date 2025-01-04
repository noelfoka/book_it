"use client";

import React from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const page = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useKindeBrowserClient();

  return (
    <div>Bienvenue {user?.email}</div>
  )
}

export default page;