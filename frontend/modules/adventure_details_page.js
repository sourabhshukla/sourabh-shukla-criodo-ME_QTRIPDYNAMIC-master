import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  
  let searchParams=new URLSearchParams(search);
  const id= searchParams.get('adventure');
  return id;

  // Place holder for functionality to work in the Stubs
 // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url=`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`;
  //let adventureDetails;

  try{
    let res=await fetch(url);
    
    let adventureDetails=await res.json();
    console.log(adventureDetails);
    return adventureDetails;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById('adventure-name').textContent=adventure.name;
  document.getElementById('adventure-subtitle').textContent=adventure.subtitle;
  document.getElementById('adventure-content').textContent=adventure.content;
  

  for(let i=0;i<adventure.images.length;i++){
    let image_div=document.createElement('div');
    image_div.innerHTML=`
     <img src=${adventure.images[i]} class='activity-card-image'>
    `;
    document.getElementById('photo-gallery').append(image_div);
  }

  //addBootstrapPhotoGallery(adventures.images);

 

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  document.getElementById('photo-gallery').innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators"></div>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Next</span>
     </button>
  </div>
    `;
  
    const inner=document.createElement('div');
    inner.classList.add('carousel-inner');
    for(let i=0;i<images.length;i++){
      const item=document.createElement('div');
      const indicator = document.createElement('button');
      indicator.setAttribute('type','button');
      indicator.setAttribute('data-bs-target',"#carouselExampleIndicators");
      indicator.setAttribute('data-bs-slide-to',`${i}`);
      indicator.setAttribute('aria-label',`Slide ${i+1}`);
      //indicator.classList.add('carousel-indicators');
      item.classList.add('carousel-item');
      if(i==0){
        item.classList.add('active');
        indicator.classList.add('active');
      }
      item.innerHTML=`
       <img src=${images[i]} class="d-block w-100 activity-card-image" alt="...">
      `;
       inner.append(item);
       document.querySelector('.carousel-indicators').append(indicator);
    }
    document.getElementById('carouselExampleIndicators').append(inner);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display='none';
    document.getElementById('reservation-panel-available').style.display='block';
    document.getElementById('reservation-person-cost').textContent=adventure.costPerHead;
  }
  else{
    document.getElementById('reservation-panel-sold-out').style.display='block';
    document.getElementById('reservation-panel-available').style.display='none';
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').textContent=adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form1=document.getElementById('myForm');

  form1.addEventListener('submit',async function(event){
     event.preventDefault();
    const form=form1.elements;

    const name=form['name'].value;
  const date=form['date'].value;
  const person=form['person'].value;
  const data={
    name: name,
    date: date,
    person: person,
    adventure: adventure.id,
  };

  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const url=`${config.backendEndpoint}/reservations/new`;

  try{
    let res = await fetch(url,options);
    console.log(res);
    alert("Success!");
    return res;
  }
  catch(err){
    //return null;
    console.log(err);
    alert('Failed');
  }
  });

  

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display='block';
  }
  else{
    document.getElementById('reserved-banner').style.display='none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
