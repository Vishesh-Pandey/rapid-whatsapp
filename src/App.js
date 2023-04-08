import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);

  const handleCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  const saveHistory = () => {
    let currentHistory = localStorage.getItem("history");

    console.log(currentHistory);

    if (currentHistory) {
      let historyArray = JSON.parse(currentHistory);
      historyArray.push(countryCode + number);
      localStorage.setItem("history", `[${historyArray}]`);
    } else {
      localStorage.setItem("history", `[${countryCode + number}]`);
    }
  };

  const handleOnChange = (event) => {
    setNumber(event.target.value);
    if (event.target.value.length === 10) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  };

  const onChat = () => {
    saveHistory();
  };

  const saveContact = () => {
    // [ {name:"name1",number:723487236},...]
    let savedContacts = localStorage.getItem("savedContacts");
    if (savedContacts) {
      let savedContactsArray = JSON.parse(savedContacts);
      console.log(savedContactsArray);
      savedContactsArray.push({
        name: name,
        number: countryCode + number,
      });
      localStorage.setItem("savedContacts", JSON.stringify(savedContactsArray));
    } else {
      localStorage.setItem(
        "savedContacts",
        JSON.stringify([
          {
            name: name,
            number: countryCode + number,
          },
        ])
      );
    }
    setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
  };

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    if (localStorage.getItem("savedContacts")) {
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark bg-success shadow">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-whatsapp"></i> Rapid Whatsapp
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row py-5">
          <div className="col-lg-6 py-5 text-center bg-success rounded">
            <div className="row">
              <div className="col-4">
                <p className="text-info text-sm">Country</p>
                <input
                  onChange={handleCountryCode}
                  value={countryCode}
                  type="text"
                  className="form-control"
                  placeholder="Country Code"
                />
              </div>
              <div className="col-8">
                <p className="text-info text-sm">Phone Number</p>
                <input
                  onChange={handleOnChange}
                  value={number}
                  type="text"
                  className="form-control"
                  placeholder="Enter valid number (10 digits )"
                />
                <a
                  onClick={onChat}
                  rel="noreferrer"
                  target="_blank"
                  href={`http://wa.me/${countryCode + number}`}
                  className={`btn btn-primary my-3 m-auto w-100 ${
                    validNumber ? "" : "disabled"
                  }`}
                >
                  <i className="bi bi-whatsapp"></i> Chat on whatsapp
                </a>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Enter name to save contact on browser"
                />
                <button
                  onClick={saveContact}
                  className={`btn btn-primary w-100 my-3 ${
                    validNumber && name ? "" : "disabled"
                  }`}
                >
                  Save Contact
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 py-5 text-center bg-warning rounded">
            <div className="row">
              <div className="col-6">
                <p>History</p>
                {contactHistory.map((element, index) => {
                  return (
                    <a
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                      href={`http://wa.me/${element}`}
                      className="btn btn-outline-dark my-2 w-100"
                    >
                      <i className="bi bi-whatsapp mx-3"></i>
                      {element}
                    </a>
                  );
                })}
              </div>
              <div className="col-6">
                <p>Saved Contacts</p>
                {yourContacts.map((element, index) => {
                  return (
                    <div
                      key={index}
                      className="contact bg-dark text-white border border-3"
                    >
                      <p>Name : {element.name}</p>
                      <p>Number : {element.number}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
