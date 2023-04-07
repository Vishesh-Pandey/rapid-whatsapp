import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [previousNumber, setpreviousNumber] = useState(
    localStorage.getItem("previousNumber")
  );
  const [validNumber, setValidNumber] = useState(false);

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
    console.log("Working");
    localStorage.setItem("previousNumber", countryCode + number);
    setpreviousNumber(localStorage.getItem("previousNumber"));
  };

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
                  placeholder="enter full number (12 digits )"
                />
              </div>
              <div className="col-8">
                <p className="text-info text-sm">Phone Number</p>
                <input
                  onChange={handleOnChange}
                  value={number}
                  type="text"
                  className="form-control"
                  placeholder="enter full number (12 digits )"
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
                <a
                  rel="noreferrer"
                  target="_blank"
                  className={`btn btn-warning w-100 ${
                    previousNumber ? "" : "d-none"
                  }`}
                  href={`http://wa.me/${previousNumber}`}
                >
                  Chat {previousNumber}
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5 py-5 text-center bg-warning rounded"></div>
        </div>
      </div>
    </>
  );
}

export default App;
