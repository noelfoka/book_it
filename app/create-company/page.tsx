/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Notification from "../components/Notification";

export interface Company {
  id: string;
  name: string;
}

const page = () => {

  const { user } = useKindeBrowserClient();
  const [companyName, setCompanyName] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[] | null>(null);

  const [notification, setNotification] = useState<string>("");
  const colseNotification = () => {
    setNotification("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!companyName) {
      setNotification("Le nom de l'entreprise est requis");
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
        setNotification(message);
        return;
      }

      setNotification("Entreprise créée avec succès");
      setCompanyName("");

    } catch (error) {
      console.error(error);
      setNotification("Erreur interne du serveur");
    }

  };

  // Récupération des données de l'entreprise
  const fetchCompanies = async () => {
    try {

      if (user?.email) {
        const response = await fetch(`/api/companies?email=${user.email}`, {
          method: "GET"
        });

        if(!response.ok) {
          // si la réponse n'est pas ok, on affiche une notification
          const {message} = await response.json();
          throw new Error(message);
        }

        const data = await response.json();
      }
      
    } catch (error) {
      console.error(error);
      setNotification("Erreur lors de la récupération des entreprises");
    }
  }

  return (
    <Wrapper>

      {notification && (
        <Notification message={notification} onclose={colseNotification}></Notification>
      )}

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
