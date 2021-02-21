import axios from "axios";
import addReservation from "./addReservation"

const userDiv = document.querySelector("#users");
const restDiv = document.querySelector("#restaurants");
const reserveDiv = document.querySelector("#reservations");

const renderUsers = (users) => {
  const html = users
    .map(
      (user) => `
  <div>
  <a href="#${user.id}">
  ${user.name}
  </a>
  </div>
  `
    )
    .join("");
  userDiv.innerHTML = html;
};

const renderRestaurants = (restaurants) => {
  const html = restaurants
    .map(
      (restaurant) => `
  <div>
  <h3>${restaurant.name}</h3> 
  <div id = 'resNum' >Number of res: 0</div>
  </div>
  `
    )
    .join("");
  restDiv.innerHTML = html;
};

const renderReservations = (reservations) => {
  console.log(reservations);
  const html = reservations
    .map(
      (reservation) => `
  <div>
  ${reservation.user.name} has a table reserved at ${reservation.restaurant.name}
  </div>
  `
    )
    .join("");
  reserveDiv.innerHTML = html;
};

const init = async () => {
  try {
    const users = (await axios.get("/api/users")).data;
    const restaurants = (await axios.get("/api/restaurants")).data;
    renderUsers(users);
    renderRestaurants(restaurants);
    const userId = +window.location.hash.slice(1);
    if (userId) {
      const reservations = (
        await axios.get(`/api/users/${userId}/reservations`)
      ).data;
      renderReservations(reservations);
    }
  } catch (error) {
    console.log(error);
  }
};

// document.addEventListener("click", () => {
//   const userId = +window.location.hash.slice(1)

// });

window.addEventListener("hashchange", async () => {
  const userId = +window.location.hash.slice(1);
  const reservations = (await axios.get(`/api/users/${userId}/reservations`))
    .data;
  renderReservations(reservations);
});

init();
