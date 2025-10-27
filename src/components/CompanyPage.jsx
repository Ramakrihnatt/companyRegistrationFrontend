import { useState } from "react";
import CompanyRegistrationForm from "./CompanyRegistrationForm";
import CompanyList from "./CompanyList";

function CompanyPage() {
  const [showList, setShowList] = useState(false);

  return (
    <>
      {showList ? (
        <CompanyList onRegisterNew={() => setShowList(false)} />
      ) : (
        <CompanyRegistrationForm onRegistered={() => setShowList(true)} onViewList={() => setShowList(true)} />
      )}
    </>
  );
}

export default CompanyPage;
