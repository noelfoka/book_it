import React from "react";
import Wrapper from "../components/wrapper";

const page = () => {
  return (
    <Wrapper>
      <div>
        <h1 className="text-2xl mb-4">Créez une entreprise</h1>

        <form>
          <div className="flex flex-row">
            <input
              type="text"
              id="companyName"
              placeholder="Nom de l'entreprise"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default page;
