/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {

  const { user } = useKindeBrowserClient();
  const [companyName, setCompanyName] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(true);

  return (
    <Wrapper>
      <div>
        <h1 className="text-2xl mb-4">Créez une entreprise</h1>

        <form>
          <div className="flex flex-row">
            <input
              type="text"
              id="companyName"
              value={companyName}
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
