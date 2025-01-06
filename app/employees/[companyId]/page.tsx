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

  return (
    <Wrapper>
      {notification && (
        <Notification
          message={notification}
          onclose={colseNotification}
        ></Notification>
      )}

      <div>
        { loading ? (
          <div className="text-center mt-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div></div>
        ) }
      </div>

    </Wrapper>
  );
};

export default page;
