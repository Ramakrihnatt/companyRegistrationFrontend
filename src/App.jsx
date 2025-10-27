import { useState, useEffect } from "react";
import CompanyRegistrationForm from "./components/CompanyRegistrationForm";
import CompanyList from "./components/CompanyList";

function App() {
  const [view, setView] = useState("register"); // "register" or "list"

  useEffect(() => {
    if (view === "list") {
      console.log("Page navigated to Company List");
  
    }
  }, [view]);

  return (
    <div>
      {view === "register" && (
        <CompanyRegistrationForm
          onRegistered={() => setView("list")}
          onViewList={() => setView("list")}
        />
      )}
      {view === "list" && (
        <CompanyList
          onBack={() => setView("register")}
          onEdit={(company) => {
            console.log("Edit company:", company);
            setView("register");
          }}
        />
      )}
    </div>
  );
}

export default App;
