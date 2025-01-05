/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import Wrapper from "../components/wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


const page = () => {
  const { user } = useKindeBrowserClient();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompanyId = async () => {
    if (user) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            famillyName: user.family_name,
            givenName: user.given_name
          })
        });

        const data = await response.json();
        setCompanyId(data.companyId || null);
        setLoading(false);

      } catch (error) {
        console.error("Erreur lors de la récupération de l'id de l'entreprise", error);
        setCompanyId(null);
      }
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchCompanyId();
    }

    initializeData();
  }, [user]);

  if (loading) {
    return(
      <Wrapper>
        <div className="flex justify-center items-center w-full">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        <div>
        <div className="badge badge-secondary badge-outline">
          CompanyId: {companyId}
        </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
