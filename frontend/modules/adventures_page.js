import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 const url=new URLSearchParams(search);
 return url.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch advenures using the Backend API and return the data
  const url=config.backendEndpoint+`/adventures/?city=${city}`;
  let res;
  try{
    res=await fetch(url);
  }
  catch(err){
    return null;
  }
  const adventures=await res.json();
  //console.log(adventures);
  //addAdventureToDOM(adventures);
  
  return adventures;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const row=document.getElementById('data');
  
 // console.log(adventures);
  

  for(let adventure of adventures){
    const child=document.createElement('div');
     
  child.classList.add('col-6');
  child.classList.add('col-lg-3');
  child.classList.add('mb-3');
    child.innerHTML=`
  <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
      <div class="card activity-card">
       <div class="category-banner">
         ${adventure.category}
       </div>
        <img src=${adventure.image} class="card-img-top" alt="..." />
        <div class="card-body d-md-flex justify-content-between">
          <h5 class="card-title">${adventure.name}</h5>
          <p class="card-text">₹${adventure.costPerHead}</p>
        </div>
        <div class="card-body d-md-flex justify-content-between">
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${adventure.duration}</p>
        </div>
      </div>
    </a>
  `;
  row.append(child);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((adventure)=> low<=adventure.duration && high>=adventure.duration);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(categoryList.length===0){
    return list;
  }

  let filteredList=[];
  
  for(let adventure of list){
     for(let category of categoryList){
       if(adventure.category===category){
        filteredList.push(adventure);
        break;
       }
     }
  }

  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length>0){
    console.log(`filter=${filters.category}`);
    list = filterByCategory(list,filters.category);
  }
  if(filters.duration!==''){
    let ans=filters.duration.split('-');
    let low=parseInt(ans[0]);
    let high=parseInt(ans[1]);
    list=filterByDuration(list,low,high);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  if(localStorage['filters']==='undefined'){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const pillList=document.getElementById('category-list');
  pillList.innerHTML=``;
  for(let category of filters.category){
    let child=document.createElement('p');
    child.textContent=category;
    pillList.append(child);
  }

  if(filters.duration===''){
    document.getElementById('duration-select').selectedIndex=0;
    return;
  }

  const duration = document.getElementById('duration-select');
  for(let i=0;i<duration.options.length;i++){
    if(duration.options[i].value===filters.duration){
      duration.options[i].selected=true;
      return;
    }
  }
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
