/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Wrapper from "@/app/components/Wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState } from "react";
import Notification from "../../components/Notification";

const page = ({ params }: { params: { companyId: string } }) => {
  const { user } = useKindeBrowserClient();

  const [employeeEmail, setEmployeeEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [notification, setNotification] = useState<string>("");
  const colseNotification = () => {
    setNotification("");
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/companies", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.companyId,
          employeeEmail: employeeEmail,
          creatorEmail: user?.email,
          action: "ADD",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification("Employé ajouté avec succès");
        return;
      } else {
        setNotification(`${data.message}`);
      }

      setEmployeeEmail('');

    } catch (error) {
      console.error(error);
      setNotification("Erreur interne du serveur");
    }
  };

  return (
    <Wrapper>
      {notification && (
        <Notification
          message={notification}
          onclose={colseNotification}
        ></Notification>
      )}

      <div>
        {/* loading ? (
          <div className="text-center mt-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (*/}
        <div>
          <h1 className="text-2xl mb-4">Ajouter un nouvel employé</h1>

          <form onSubmit={handleAddEmployee}>
            <div className="mb-4 flex flex-row">
              <input
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required
                placeholder="Email de l'employé"
              />
              <button type="submit" className="btn btn-secondary ml-2">
                Ajouter un employé
              </button>
            </div>
          </form>
        </div>
        {/* )} */}
      </div>
    </Wrapper>
  );
};

export default page;
