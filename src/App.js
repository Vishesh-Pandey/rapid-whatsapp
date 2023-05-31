import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import History from "./components/History";
import MainForm from "./components/MainForm";

function App() {
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    if (localStorage.getItem("savedContacts")) {
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="row py-5 my-5 text-center bg-white bg-opacity-50 rounded">
          <MainForm
            setContactHistory={setContactHistory}
            setYourContacts={setYourContacts}
          />
          <div className="col-lg-6 py-3">
            <div className="row">
              <History
                contactHistory={contactHistory}
                setContactHistory={setContactHistory}
              />
              <Contacts
                yourContacts={yourContacts}
                setYourContacts={setYourContacts}
                setContactHistory={setContactHistory}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
