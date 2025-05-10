let userDog = "";
let btn = document.getElementById("gifButton");

btn.addEventListener("click", () => {
  let dogInput = document.getElementById("dog");
  userDog = dogInput.value.toLowerCase().trim(); 
  console.log(userDog);

  getDogImage(userDog);
});

async function getDogImage(breed) {
  const api_url = `https://dog.ceo/api/breed/${breed}/images/random`;

  try {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    if (data.status === "success") {
      displayGif(data.message);
    } else {
      displayError(`Sorry, we couldn't find any dog for "${breed}".`);
    }

  } catch (error) {
    console.error("Fetch error", error);
    displayError("Something went wrong. Please try again.");
  }
}

function displayGif(gif) {
  const gifPlace = document.getElementById("gif");
  gifPlace.innerHTML = `<img src="${gif}" alt="Dog Image">`;
}

function displayError(message) {
  const gifPlace = document.getElementById("gif");
  gifPlace.innerHTML = `<p style="color:red;">${message}</p>`;
}
