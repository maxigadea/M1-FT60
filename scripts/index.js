const { Repository } = require("./models.mjs");

const repository = new Repository();

const handleDelete = (id) => {
  repository.deleteActivity(id);
  addToDOM();
};

const activityToElement = ({ id, title, description, imgUrl }) => {
  // ? Crear elementos HTML
  const cardTitle = document.createElement("h3");
  const cardDescription = document.createElement("p");
  const cardImage = document.createElement("img");
  const cardContainer = document.createElement("div");

  cardTitle.textContent = title;
  cardDescription.textContent = description;
  cardImage.src = imgUrl;

  cardContainer.classList.add("divContainerCard");

  cardContainer.appendChild(cardTitle);
  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardDescription);

  const cardButton = document.createElement("button");
  cardButton.innerText = "X";
  cardButton.addEventListener("click", () => handleDelete(id));

  cardButton.classList.add("buttonDelete");

  cardContainer.appendChild(cardButton);

  return cardContainer;
  // * <div> <h3></h3> <p></p> <img/> </div>
};

const addToDOM = () => {
  const containerCards = document.getElementById("divContainerCards");

  containerCards.innerHTML = "";

  const allActivities = repository.getAllActivities();

  const allElements = allActivities.map(activityToElement);
  // * [<div></div>, <div></div>, <div></div>]

  allElements.forEach((element) => containerCards.appendChild(element));
};

addToDOM();

const handleSubmit = (event) => {
  event.preventDefault();
  const form = document.getElementById("form");
  const inputTitle = document.getElementById("title").value;
  const inputImage = document.getElementById("image").value;
  const textArea = document.getElementById("description").value;

  if (!inputTitle || !inputImage || !textArea)
    return alert("Hay datos incompletos");

  repository.createActivity(inputTitle, textArea, inputImage);

  addToDOM();

  form.reset();
};

const btnSubmit = document.getElementById("addButton");

btnSubmit.addEventListener("click", handleSubmit);
