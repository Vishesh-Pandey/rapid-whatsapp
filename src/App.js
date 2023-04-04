import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);

  const handleOnChange = (event) => {
    setNumber(event.target.value);
    if (event.target.value.length === 12) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
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
          <div className="col-6 m-auto py-5 text-center bg-success rounded">
            <input
              onChange={handleOnChange}
              value={number}
              type="text"
              className="form-control"
              placeholder="enter full number (12 digits )"
            />

            <a
              rel="noreferrer"
              target="_blank"
              href={`http://wa.me/${number}`}
              className={`btn btn-primary my-3 m-auto ${
                validNumber ? "" : "disabled"
              }`}
            >
              <i className="bi bi-whatsapp"></i> Chat on whatsapp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
