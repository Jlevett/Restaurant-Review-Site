let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
  filterhamburger();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
}

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })

}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // restaurant-imgove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  let tabIndex = 5;
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant, tabIndex++));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 * Review changes.
 */
 createRestaurantHTML = (restaurant, tabIndex) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.alt = restaurant.name + 'image';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.setAttribute('tabindex', tabIndex.toString());
  more.setAttribute('aria-label', 'View details for ' + restaurant.name );
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more);

  return li;
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}

//Setup event listeners for burger menu clicks and viewport changes.
filterhamburger = () => {
  const handler = document.querySelector('.hamburger-box');
  //For keyPress
  handler.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13)
      hamburgerToggle(e);
  });
  //For MouseClick or Touch
  handler.addEventListener('click', hamburgerToggle);

  window.addEventListener("resize", backtoDefaultFilter);
};

/*Home page: Burger Menu additions*/

//if burger is click is pressed it toggles the burger menu type and selection boxes.
hamburgerToggle = (event) => {
  const handler = document.querySelector('.hamburger-box');
  const hamburger = document.querySelector('.hamburger');
  const neighborhoodSelect =  document.querySelector('#neighborhoods-select');
  const cuisinesSelect = document.querySelector('#cuisines-select');

  if (hamburger.className === "hamburger hamburger--minus is-active") {
    hamburger.className = "hamburger hamburger--minus js-hamburger";
    neighborhoodSelect.style.display = "none";
    cuisinesSelect.style.display = "none";
    //Add in accessibility
    handler.setAttribute('aria-label', 'Hamburger Menu. Closed. Open with Enter Key Stroke');
  } else {
    hamburger.className = "hamburger hamburger--minus is-active";
    neighborhoodSelect.style.display = "inline";
    cuisinesSelect.style.display = "inline";
    //Add in accessibility
    handler.setAttribute('aria-label', 'Hamburger Menu. Currently Open');
  }
};

//If the viewport gets wider  than 600px it reset selectors to open so the menus dont get lost.
backtoDefaultFilter = (event) => {
  const handler = document.querySelector('.hamburger-box');
  const hamburger = document.querySelector('.hamburger');
  const neighborhoodSelect =  document.querySelector('#neighborhoods-select');
  const cuisinesSelect = document.querySelector('#cuisines-select');

  if (document.body.clientWidth>583) {
    neighborhoodSelect.style.display = "inline";
    cuisinesSelect.style.display = "inline";
    hamburger.className = "hamburger hamburger--minus js-hamburger";
    //Add in accessibility
    handler.setAttribute('aria-label', 'Hamburger Menu. Currently Open');
  }
  //If viewport is less than 600px then hide the selection boxes
  else if(document.body.clientWidth<=583 && hamburger.className === "hamburger hamburger--minus js-hamburger") {
    neighborhoodSelect.style.display = "none";
    cuisinesSelect.style.display = "none";
    //Add in accessibility
    handler.setAttribute('aria-label', 'Hamburger Menu. Closed. Open with Enter Key Stroke');
  }
};