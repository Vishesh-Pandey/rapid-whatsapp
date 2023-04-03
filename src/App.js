import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState("123");

  const handleOnChange = (event) => {
    setNumber(event.target.value);
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
              placeholder="enter full number"
            />

            <a
              rel="noreferrer"
              target="_blank"
              href={`http://wa.me/91${number}`}
              className="btn btn-primary my-3 m-auto"
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
