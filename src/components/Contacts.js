import React from "react";
import swal from "sweetalert";

const Contacts = ({ yourContacts, setYourContacts }) => {
  const deleteContact = (contactName) => {
    let allContacts = localStorage.getItem("savedContacts");
    allContacts = JSON.parse(allContacts);

    let remainingContacts = allContacts.filter((contact) => {
      return contact.name !== contactName;
    });

    localStorage.setItem("savedContacts", JSON.stringify(remainingContacts));
    setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
  };
  return (
    <>
      <div className='col-md-6 py-1'>
        <div className='d-flex justify-content-between align-items-center'>
          <span className='fs-4 fw-bolder-3'>Contacts</span>
          <button
            onClick={() => {
              swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete all the contacts?",
                icon: "warning",
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  localStorage.setItem("savedContacts", "[]");
                  setYourContacts([]);
                  swal("Deleted!", "Deleted all Contacts.", "success");
                } else {
                  swal({
                    title: "Contacts are safe!",
                  });
                }
              });
            }}
            className='btn btn-outline-dark'
          >
            <i className='bi bi-trash3' />
          </button>
        </div>

        <div>
          {yourContacts.map((element, index) => {
            return (
              <div key={index} className='card text-bg-white my-2 w-100 p-2'>
                <div className='card-header d-flex justify-content-between fw-bold'>
                  {element.name}
                  <button
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to delete this contact?",
                        icon: "warning",
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          deleteContact(element.name);
                          swal({
                            title: "Deleted Successfully!",
                            icon: "success",
                          });
                        } else {
                          swal({
                            title: "Contact Not deleted.",
                          });
                        }
                      });
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
    </>
  );
};

export default Contacts;
