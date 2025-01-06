/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../components/wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Notification from "../components/Notification";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export interface Company {
  id: string;
  name: string;
}

const page = () => {

  const { user } = useKindeBrowserClient();
  const [companyName, setCompanyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
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
        setCompanies(data.companies);
        setLoading(false);
      }
      
    } catch (error) {
      console.error(error);
      setNotification("Erreur lors de la récupération des entreprises");
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, [user])

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

        <h1 className="text-2xl my-4 font-bold">Mes entreprises</h1>

        {loading ? (
          <div className="text-center mt-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : companies && companies.length > 0 ? (
          <ul className="list-decimal divide-base-200 divide-y">
            {companies.map((company) => (
              <li key={company.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="badge badge-secondary badge-outline mb-2 md:mb-0">{company.name}</div>

                <div className="flex items-center">
                  <Link href={`employees/${company.id}`} className="btn btn-sm mr-2 btn-outline btn-secondary">Ajouter des employés</Link>
                  <Link href={`rooms/${company.id}`} className="btn btn-sm mr-2 btn-outline btn-secondary">Ajouter des salles</Link>
                  <button className="btn btn-sm">
                  <Trash2 className="w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune entreprise trouvée</p>
        )}

      </div>
    </Wrapper>
  );
};

export default page;
