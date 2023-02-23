import config from "../conf/index.js";
//console.log(config);

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cities;
  try{
    let res = await fetch(config.backendEndpoint+'/cities');
    cities = await res.json();
  }
  catch(err){
    return null;
  }
  
  console.log(cities);
  return cities;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const row = document.getElementById('data');
  const child=document.createElement('div');
     
  child.classList.add('col-12');
  child.classList.add('col-sm-6');
  child.classList.add('col-lg-3');
  child.classList.add('mb-4');
  child.innerHTML=`
  <a href="pages/adventures/?city=${id}" id=${id}>
      <div class="tile">
        <img src=${image} />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  row.append(child);

}


export { init, fetchCities, addCityToDOM };
