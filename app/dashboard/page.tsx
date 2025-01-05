"use client";

import React, { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Wrapper from "../components/wrapper";


const page = () => {
  const { user } = useKindeBrowserClient();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompanyId = async () => {
    if (user) {
      try {
        
      } catch (error) {
        console.error("Erreur lors de la récupération de l'id de l'entreprise", error);
        setCompanyId(null);
      }
    }
  };

  return (
    <Wrapper>
      <div>
        
      </div>
    </Wrapper>
  );
};

export default page;
