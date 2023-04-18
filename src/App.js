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

  const saveHistory = () => {
    let currentHistory = localStorage.getItem("history");
    if (currentHistory) {
      let historyArray = JSON.parse(currentHistory);
      historyArray.push(countryCode + number);
      localStorage.setItem("history", `[${historyArray}]`);
    } else {
      localStorage.setItem("history", `[${countryCode + number}]`);
    }
    setContactHistory(JSON.parse(localStorage.getItem("history")));
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

  const deleteContact = (contactName) => {
    let allContacts = localStorage.getItem("savedContacts");
    allContacts = JSON.parse(allContacts);

    let remainingContacts = allContacts.filter((contact) => {
      return contact.name !== contactName;
    });

    localStorage.setItem("savedContacts", JSON.stringify(remainingContacts));
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
          <div className="col-lg-6 py-5 text-center bg-white bg-opacity-50 rounded-start">
            <div className="row">
              <div className="col-4">
                <p className="text-dark text-sm">Country</p>
                <input
                  onChange={handleCountryCode}
                  value={countryCode}
                  type="text"
                  className="form-control"
                  placeholder="Country Code"
                />
              </div>
              <div className="col-8">
                <p className="text-dark text-sm">Phone Number</p>
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
          <div className="col-lg-6 py-5 text-center bg-white bg-opacity-50 rounded-end">
            <div className="row">
              <div className="col-6">
                <h4>
                  <span className="float-start px-3">History</span>
                  <button
                    onClick={() => {
                      localStorage.setItem("history", "[]");
                      setContactHistory([]);
                    }}
                    className="btn btn-outline-dark float-end"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </h4>
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
                <h4>
                  <span className="float-start px-3">Your Contacts</span>
                  <button
                    onClick={() => {
                      localStorage.setItem("savedContacts", "[]");
                      setYourContacts([]);
                    }}
                    className="btn btn-outline-dark float-end"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </h4>
                {yourContacts.map((element, index) => {
                  return (
                    <div
                      key={index}
                      className="card text-bg-white my-2 w-100 p-2"
                    >
                      <div className="card-header d-flex justify-content-between fw-bold">
                        {element.name}
                        <button
                          onClick={() => {
                            deleteContact(element.name);
                          }}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{element.number}</h5>
                      </div>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`http://wa.me/${element.number}`}
                        className="btn btn-outline-dark"
                      >
                        Chat
                      </a>
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
