/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useState } from 'react'

const page = ({params} : {params: {companyId: string}}) => {

  const { user } = useKindeBrowserClient();

  const [employeeEmail, setEmployeeEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

  return (
    <div>{params.companyId}</div>
  )
}

export default page