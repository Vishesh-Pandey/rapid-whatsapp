import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [countryCode, setCountryCode] = useState('91');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
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
    const phoneNumber = value.replace(/[^0-9]/g, '');
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

  const saveHistory = () => {
    let currentHistory = localStorage.getItem('history');
    if (currentHistory) {
      let historyArray = JSON.parse(currentHistory);
      historyArray.unshift(countryCode + number);
      localStorage.setItem('history', JSON.stringify(historyArray));
    } else {
      localStorage.setItem('history', JSON.stringify([countryCode + number]));
    }
    setContactHistory(JSON.parse(localStorage.getItem('history')));
  };

  const saveContact = () => {
    // [ {name:"name1",number:723487236},...]
    let phoneNumber = countryCode + number;
    let savedContacts = localStorage.getItem('savedContacts');
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
      localStorage.setItem('savedContacts', JSON.stringify(savedContactsArray));
    }
    //check if the name is the localstorage before save it to the set

    setYourContacts(savedContactsArray);
  };

  const deleteContact = (contactName) => {
    let allContacts = localStorage.getItem('savedContacts');
    allContacts = JSON.parse(allContacts);

    let remainingContacts = allContacts.filter((contact) => {
      return contact.name !== contactName;
    });

    localStorage.setItem('savedContacts', JSON.stringify(remainingContacts));
    setYourContacts(JSON.parse(localStorage.getItem('savedContacts')));
  };

  useEffect(() => {
    if (localStorage.getItem('history')) {
      setContactHistory(JSON.parse(localStorage.getItem('history')));
    }
    if (localStorage.getItem('savedContacts')) {
      setYourContacts(JSON.parse(localStorage.getItem('savedContacts')));
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
                    validNumber ? '' : 'disabled'
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
                {error && (
                  <p className='text-danger'>
                    Error: The name or number already exists
                  </p>
                )}
                <button
                  onClick={saveContact}
                  className={`btn btn-success w-100 my-3 ${
                    validNumber && name ? '' : 'disabled'
                  }`}
                >
                  Save Contact
                </button>
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
                      localStorage.setItem('history', '[]');
                      setContactHistory([]);
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
                        <i className='bi bi-whatsapp mx-3' />
                        {element}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className='col-md-6 py-1'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='fs-4 fw-bolder-3'>Contacts</span>
                  <button
                    onClick={() => {
                      localStorage.setItem('savedContacts', '[]');
                      setYourContacts([]);
                    }}
                    className='btn btn-outline-dark'
                  >
                    <i className='bi bi-trash3' />
                  </button>
                </div>

                <div>
                  {yourContacts.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className='card text-bg-white my-2 w-100 p-2'
                      >
                        <div className='card-header d-flex justify-content-between fw-bold'>
                          {element.name}
                          <button
                            onClick={() => {
                              deleteContact(element.name);
                            }}
                            className='btn btn-sm btn-outline-danger'
                          >
                            <i className='bi bi-trash3' />
                          </button>
                        </div>
                        <div className='card-body'>
                          <h5 className='card-title'>{element.number}</h5>
                        </div>
                        <a
                          target='_blank'
                          rel='noreferrer'
                          href={`http://wa.me/${element.number}`}
                          className='btn btn-outline-dark'
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
      </div>
    </React.Fragment>
  );
}

export default App;
