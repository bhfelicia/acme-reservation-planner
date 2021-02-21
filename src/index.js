import axios from "axios";
// import addReservation from "./addReservation";

const userDiv = document.querySelector("#users");
const restDiv = document.querySelector("#restaurants");
const reserveDiv = document.querySelector("#reservations");
const reservForm = document.querySelector("#reservForm");

const addReservation = (users, restaurants) => {
  const html = `<form method="POST" action="/reservations">
  <label for="user">Name</label>
  <select id="userId" name="userId">
  ${users
    .map(
      (user) => `
  <option value="${user.id}">${user.name}
  </option>
  `
    )
    .join("")}
    </select>
    <label for="restName">Restaurant</label>
    <select id="restDropdown" name="restaurantId">
    ${restaurants
      .map(
        (restaurant) => `
    <option value="${restaurant.id}">${restaurant.name}
    </option>
    `
      )
      .join("")}
    </select>
    <button type="submit">Save</button>
    </form>`;
  reservForm.innerHTML = html;
};

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
  const html = reservations
    .map(
      (reservation) => `
  <div id=${reservation.id}>
  ${reservation.user.name} has a table reserved at ${reservation.restaurant.name}<button method="DELETE" action="/reservations/${reservation.id}">Cancel</button>
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

    addReservation(users, restaurants);
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

// document.addEventListener("click", (evt) => {
//   const target = evt.target;
//   const deleteReserv = document.getElementById("deleteReserv");
//   console.log("target", target, "deleteReserv", deleteReserv);
//   if (target === deleteReserv) {
//     console.log("in the if");
//     const parent = deleteReserv.parentNode;
//     deleteReserv.remove();
//     parent.remove();
//   }
// });

init();
