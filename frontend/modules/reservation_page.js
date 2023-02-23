import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url=`${config.backendEndpoint}/reservations`;
  try{
    const res=await fetch(url);
    const reservations=await res.json();
    console.log(reservations);
    return reservations;
  }
  catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length===0){
    document.getElementById('no-reservation-banner').style.display='block';
    document.getElementById('reservation-table-parent').style.display='none';
  }
  else{
    document.getElementById('no-reservation-banner').style.display='none';
    document.getElementById('reservation-table-parent').style.display='block';
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    for(let i=0;i<reservations.length;i++){
      let row=document.createElement('tr');
      let date=new Date(reservations[i].date);
      let time=new Date(reservations[i].time);
      let a='2447910730'
      
      row.innerHTML=`
      <td>${reservations[i].id}</td>
      <td>${reservations[i].name}</td>
      <td>${reservations[i].adventureName}</td>
      <td>${reservations[i].person}</td>
      <td>${date.toLocaleDateString('en-IN',{day:'numeric',month:'numeric',year:'numeric'})}</td>
      <td>${reservations[i].price}</td>
      <td>${time.toLocaleString('en-IN', { month: 'long',day:'numeric',year: 'numeric' })}, ${time.toLocaleTimeString('en-US').toLowerCase()}</td>
      <td id=${reservations[i].id}><a href='../detail/?adventure=${reservations[i].adventure}' class='reservation-visit-button' type='button'>Visit Adventure</button></td>
      `;
      document.getElementById('reservation-table').append(row);
    }

}

export { fetchReservations, addReservationToTable };
