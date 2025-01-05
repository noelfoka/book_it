"use client";

import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Wrapper from "../components/wrapper";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useKindeBrowserClient();

  return (
    <Wrapper>
      <div>
        <div>Bienvenue {user?.given_name}</div>
      </div>
    </Wrapper>
  );
};

export default page;
