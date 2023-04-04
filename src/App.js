import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState("123");
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
      <div className="container">
        <div className="row">
          <div className="col-6 m-auto py-5 text-center">
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
              Chat on whatsapp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
