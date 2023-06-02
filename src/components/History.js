import React, { useState } from "react";
import swal from "sweetalert";

const History = ({ contactHistory, setContactHistory }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);
  let limitedContactHistory = contactHistory;
  let loadMoreButton = null;

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
  };

  if (!showAllHistory) {
    limitedContactHistory = contactHistory.slice(0, 5);

    if (contactHistory.length > 5) {
      loadMoreButton = (
        <button
          onClick={() => {
            setShowAllHistory(true);
          }}
          className="btn btn-success w-100 my-3"
        >
          Load More
        </button>
      );
    }
  }

  return (
    <div className="col-md-6 py-1">
      <div className="d-flex justify-content-between align-items-center ">
        <span className="fw-border-4 fs-4">History</span>
        <button
          onClick={clearHistory}
          className="btn btn-outline-dark mx-1 d-flex"
        >
          <i className="bi bi-trash3" />
        </button>
      </div>

      <div>
        {limitedContactHistory.map((element, index) => {
          return (
            <div key={index} className="btn btn-outline-dark w-100 my-2">
              <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`http://wa.me/${element.number}`}
                  className="btn btn-outline-success btn-sm border-0 w-75"
                >
                  <i className="bi bi-whatsapp mx-3" />
                  <span>{element.number}</span>
                </a>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearIndividualChatHistory(element);
                  }}
                  value={element}
                  className="btn btn-outline-danger btn-sm border-0 float-end w-25"
                >
                  <i className="bi bi-trash3" />
                </button>
              </div>
              <time style={{ fontSize: "12px" }}>{element.timedate}</time>
            </div>
          );
        })}
        {loadMoreButton}
      </div>
    </div>
  );
};

export default History;
