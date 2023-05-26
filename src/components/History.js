import React from "react";
import swal from "sweetalert";

const History = ({ contactHistory, setContactHistory }) => {
  const clearHistory = () => {
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
  };

  const clearIndividualChatHistory = (individual) => {
    let modifiedHistory = contactHistory.filter((history) => {
      return history.timedate !== individual.timedate;
    });
    localStorage.setItem("history", JSON.stringify(modifiedHistory));
    setContactHistory(JSON.parse(localStorage.getItem("history")));
  }

  return (
    <div className='col-md-6 py-1'>
      <div className='d-flex justify-content-between align-items-center '>
        <span className='fw-border-4 fs-4'>History</span>
        <button onClick={clearHistory} className='btn btn-outline-dark mx-1 d-flex'>
          <i className='bi bi-trash3' />
        </button>
      </div>

      <div>
        {contactHistory.map((element, index) => {
          return (
            <div className='d-flex'>
              <a
                key={index}
                target='_blank'
                rel='noreferrer'
                href={`http://wa.me/${element}`}
                className='btn btn-outline-dark w-100 my-2'
              >
                <div>
                  <i className='bi bi-whatsapp mx-3' />
                  {element.number}
                </div>
                <time style={{ fontSize: "12px" }}>{element.timedate}</time>
              </a>
              <div className="my-4 ml-2">
                <button onClick={e => clearIndividualChatHistory(element)} value={element} 
                  className='btn btn-outline-dark m-1'>
                  <i className='bi bi-trash3' />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
