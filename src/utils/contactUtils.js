export const saveHistory = (number, timedate) => {
  let historyArray;
  let currentHistory = localStorage.getItem("history");
  if (!currentHistory) {
    historyArray = [];
  } else {
    historyArray = JSON.parse(currentHistory);
  }


   let contacts = localStorage.getItem("savedContacts");
   let contactsArray= contacts? JSON.parse(contacts): []
   let name=""
   const foundContact = contactsArray.find(contact => contact.number === number);

   if(foundContact){
     name=foundContact.name 
   }

  historyArray.unshift({
    name:name,
    number: number ,
    timedate: timedate,
  });
  localStorage.setItem("history", JSON.stringify(historyArray));
};
