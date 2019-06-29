const toyURL = "http://localhost:3000/toys/";


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
    card.dataset.toyid= this.id;
    card.dataset.toylikes = this.likes;
    card.classList.add("card");
    card.innerHTML=
    `<h2>${this.name}</h2>
    <img src=${this.image} class="toy-avatar"/>
    <p>${this.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
    containerElement.append(card);
    const likeButton = card.querySelector("button.like-btn")
    likeButton.addEventListener("click",likeHandler);
  }

  updateDOM(){
    document.querySelector(`[data-toyid='${this.id}']`).dataset.toylikes = this.likes;
    document.querySelector(`[data-toyid='${this.id}']`).querySelector("p").innerText = `${this.likes} Likes`;

  }
}

function objectCreator(toy){
  
  let toyObj = new Toy (toy.id,toy.name,toy.image,toy.likes);
  toyObj.render(getToyContainer());
  
}

function likeHandler(e)
  e.currentTarget.parentElement.dataset
  let likes = Number(e.currentTarget.parentElement.dataset.toylikes) + 1
  fetch(toyURL+e.currentTarget.parentElement.dataset.toyid.toString(),{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({likes}),
  })
  .then(res => res.json())
  .then(toy => {
    let refToy = new Toy(toy.id,toy.name,toy.image,toy.likes);
    refToy.updateDOM();
  })
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