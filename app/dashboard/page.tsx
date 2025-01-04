"use client";

import React, { use } from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const page = () => {

  const {user} = useKindeBrowserClient()

  return (
    <div>Bienvenue {user?.email}</div>
  )
}

export default page