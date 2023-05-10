import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import swal from "sweetalert";

function App() {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);
  const [error, setError] = useState(false);
  const handleCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex =
      /^1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return phoneRegex.test(number) && number.length === 10;
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    const phoneNumber = value.replace(/[^0-9]/g, "");
    setNumber(phoneNumber);
    if (validatePhoneNumber(phoneNumber)) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  };

  const onChat = () => {
    saveHistory();
  };

  function now() {
    const now = new Date();
    const formattedString = `Contacted on: ${now.toUTCString()}`;
    return formattedString;
  }

  const saveHistory = () => {
    let currentHistory = localStorage.getItem("history");
    if (!currentHistory) {
      currentHistory = [];
    }
    let historyArray = JSON.parse(currentHistory);
    historyArray.unshift({
      number: countryCode + number,
      timedate: now(),
    });
    localStorage.setItem("history", JSON.stringify(historyArray));
    setContactHistory(JSON.parse(localStorage.getItem("history")));
  };

  const saveContact = () => {
    // [ {name:"name1",number:723487236},...]
    let phoneNumber = countryCode + number;
    let savedContacts = localStorage.getItem("savedContacts");
    let savedContactsArray = savedContacts ? JSON.parse(savedContacts) : [];
    let nameExists = savedContactsArray.some(
      (contact) => contact.name === name
    );
    let numberExists = savedContactsArray.some(
      (contact) => contact.number === phoneNumber
    );

    if (nameExists || numberExists) {
      setError(true);
    } else {
      setError(false);
      savedContactsArray.push({
        name: name,
        number: countryCode + number,
      });
      localStorage.setItem("savedContacts", JSON.stringify(savedContactsArray));
    }
    setYourContacts(savedContactsArray);
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
    <React.Fragment>
      <Navbar />

      <div className='container'>
        <div className='row py-5 my-5 text-center bg-white bg-opacity-50 rounded'>
          <div className='col-lg-6 py-3 '>
            <div className='row'>
              <div className='col-sm-4'>
                <p className='text-dark text-sm'>Country</p>
                <input
                  onChange={handleCountryCode}
                  value={countryCode}
                  type='text'
                  className='form-control'
                  placeholder='Country Code'
                />
              </div>
              <div className='col-sm-8'>
                <p className='text-dark text-sm'>Phone Number</p>
                <input
                  onChange={handleOnChange}
                  value={number}
                  type='tel'
                  className='form-control'
                  placeholder='Enter valid number (10 digits )'
                />
                <a
                  onClick={onChat}
                  rel='noreferrer'
                  target='_blank'
                  href={`http://wa.me/${countryCode + number}`}
                  className={`btn btn-success my-3 m-auto w-100 ${
                    validNumber ? "" : "disabled"
                  }`}
                >
                  <i className='bi bi-whatsapp' /> Chat on whatsapp
                </a>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  type='text'
                  className='form-control'
                  placeholder='Enter name to save contact on browser'
                />
                <button
                  onClick={saveContact}
                  className={`btn btn-success w-100 my-3 ${
                    validNumber && name ? "" : "disabled"
                  }`}
                >
                  Save Contact
                </button>
                {error && (
                  <p className='text-danger'>
                    Error: The name or number already exists
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='col-lg-6 py-3'>
            <div className='row'>
              <div className='col-md-6 py-1'>
                <div className='d-flex justify-content-between align-items-center '>
                  <span className='fw-border-4 fs-4'>History</span>
                  <button
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete the history?",
                        icon: "warning",
                        dangerMode: true,
                        buttons: ["No", "Yes"],
                      }).then((willDelete) => {
                        if (willDelete) {
                          localStorage.setItem("history", "[]");
                          setContactHistory([]);
                          swal(
                            "Deleted!",
                            "Deleted Contact History!",
                            "success"
                          );
                        } else {
                          swal({
                            title: "History is safe!",
                          });
                        }
                      });
                    }}
                    className='btn btn-outline-dark '
                  >
                    <i className='bi bi-trash3' />
                  </button>
                </div>

                <div>
                  {contactHistory.map((element, index) => {
                    return (
                      <a
                        key={index}
                        target='_blank'
                        rel='noreferrer'
                        href={`http://wa.me/${element}`}
                        className='btn btn-outline-dark my-2 w-100'
                      >
                        <div>
                          <i className='bi bi-whatsapp mx-3' />
                          {element.number}
                        </div>
                        <time style={{ fontSize: "12px" }}>
                          {element.timedate}
                        </time>
                      </a>
                    );
                  })}
                </div>
              </div>
              <Contacts
                yourContacts={yourContacts}
                setYourContacts={setYourContacts}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
