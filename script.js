const divEle = document.querySelector(".card-container");

function getUser(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Id does not match any data");
    }
    return response.json();
  });
}


function getDetails(id) {
  divEle.innerHTML = ""; // Clear existing cards

  getUser(`https://dummyjson.com/users/${id - 1}`)
    .then((user) => {
      displayUser(user, "beforeend", "other"); // Previous user
      return getUser(`https://dummyjson.com/users/${id}`);
    })
    .then((user) => {
      displayUser(user, "beforeend"); // Current user
      return getUser(`https://dummyjson.com/users/${id + 1}`);
    })
    .then((user) => {
      displayUser(user, "beforeend", "back"); // Next user
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
}

function displayUser(data, pos, className = "") {
  const card = `<div class="user-card ${className}">
        <img src=${data.image} alt="Profile Image" />
        <h3>${data.firstName}</h3>
        <h3>${data.lastName}</h3>
        <p class="email">${data.email}</p>
        <button class="btn">View Profile</button>
      </div>`;

  divEle.insertAdjacentHTML(pos, card);
}

function handleUserFetch() {
  const inputElement = document.getElementById("userIdInput");
  const userId = inputElement.valueAsNumber;

  if (!Number.isInteger(userId) || userId < 1) {
    alert("Please enter a valid user ID greater than 0.");
    return;
  }

  getDetails(userId);
}

// Optionally preload one user
getDetails(4);
