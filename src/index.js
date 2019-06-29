const toyURL = "http://localhost:3000/toys";
let testArray = [];


class Toy{
  constructor(id,name,image,likes){
    this.id = id;
    this.name = name;
    this.image = image;
    this.likes = likes;
  }

  render(containerElement){
    const card = document.createElement("div");
    card.id = `Toy-${this.id}`;
    card.dataset.toyID= this.id;
    card.classList.add("card");
    // card.innerHTML=
    // `<h2>${this.name}</h2>
    // <img src=${this.image} />
    // <p>${this.likes} Likes </p>`
    const toyHeader = document.createElement("h2");
    toyHeader.innerText = this.name;
    const toyImage = document.createElement("img");
    toyImage.src = this.image;
    const toyLikes = document.createElement("p");
    toyLikes.innerText = `${this.likes} Likes`;
    const likeButton = document.createElement("button");
    likeButton.innerText="Like <3";
    likeButton.addEventListener("click",likeHandler);
    card.appendChild(toyHeader);
    card.appendChild(toyImage);
    card.appendChild(toyLikes);
    card.appendChild(likeButton);
    containerElement.append(card);
  }
}

function objectCreator(toy){
  
  let toyObj = new Toy (toy.id,toy.name,toy.image,toy.likes);
  toyObj.render(getToyContainer());
  debugger
  
}

function likeHandler(){
  console.log(`Card # ${e.currentTarget.parentElement.id} was liked`)
}

function init(){
  fetch(toyURL)
  .then(res => res.json())
  .then(toyArray => toyArray.forEach(objectCreator))
}

function getToyContainer(){
  return document.getElementById("toy-collection");
}

document.addEventListener("DOMContentLoaded",init);