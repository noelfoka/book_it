/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {

  const { user } = useKindeBrowserClient();
  const [companyName, setCompanyName] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    if (!companyName) {
      return;
    }

    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user?.email,
          companyName: companyName
        })
      });

      if (response.ok) {
        const message = await response.json();
        console.log(message);
        return;
      }

    } catch (error) {
      console.error("Erreur lors de la création d'une entreprise", error);
    }

  };

  return (
    <Wrapper>
      <div>
        <h1 className="text-2xl mb-4">Créez une entreprise</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nom de l'entreprise"
              required
              className="input input-bordered w-full max-w-xs"
            />

            <button type="submit" className="btn btn-secondary ml-2">Créez l&apos;entreprise</button>

          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default page;
