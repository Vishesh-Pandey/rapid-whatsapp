import React, { useState } from "react";
import { saveHistory } from "../utils/contactUtils";

const MainForm = ({ setContactHistory, setYourContacts }) => {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  function now() {
    const now = new Date();
    const formattedString = `Contacted on: ${now.toUTCString()}`;
    return formattedString;
  }

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

  return (
    <div className="col-lg-6 py-3">
      <div className="row">
        <div className="col-sm-4">
          <p className="text-dark text-sm">Country</p>
          <input
            onChange={handleCountryCode}
            value={countryCode}
            type="text"
            className="form-control"
            placeholder="Country Code"
          />
        </div>
        <div className="col-sm-8">
          <p className="text-dark text-sm">Phone Number</p>
          <input
            onChange={handleOnChange}
            value={number}
            type="tel"
            className="form-control"
            placeholder="Enter valid number (10 digits )"
          />
          <a
            onClick={() => {
              saveHistory(countryCode + number, now());
              setContactHistory(JSON.parse(localStorage.getItem("history")));
            }}
            rel="noreferrer"
            target="_blank"
            href={`http://wa.me/${countryCode + number}`}
            className={`btn btn-success my-3 m-auto w-100 ${
              validNumber ? "" : "disabled"
            }`}
          >
            <i className="bi bi-whatsapp" /> Chat on whatsapp
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
            className={`btn btn-success w-100 my-3 ${
              validNumber && name ? "" : "disabled"
            }`}
          >
            Save Contact
          </button>
          {error && (
            <p className="text-danger">
              Error: The name or number already exists
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainForm;
