import React from "react";
import swal from "sweetalert";

const History = ({ contactHistory, setContactHistory }) => {
  return (
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
                swal("Deleted!", "Deleted Contact History!", "success");
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
              <time style={{ fontSize: "12px" }}>{element.timedate}</time>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default History;
