//Localstorage is an developers api used to store data upto 5mb worth
//in this basically
//the object here being cardObject or taskdata 
//we are first puting the data entered in modal to global store(using push(object)) which is being 
//shown in web page(trough insertAdjacentHTML("beforeend",objects)) then we upload the data in localstorage
//()  
// and when we refresh the webpage the data from localstirage is put in 
//global store which is in turn used to display card on the webpage 
const taskContainer = document.querySelector(".task_container");
let globalStore = [];//array of objects
console.log(taskContainer);
const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4">
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageurl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.tasktitle}</h5>
   <p class="card-text">${taskData.taskdescription}</p>
   <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
  </div>
  </div>
  </div>
  `;


const loadInitialCardData = () => {
  //localstorage to get tasky card data
const getCardData = localStorage.getItem("tasky");


  //covert to normal object
const {cards} = JSON.parse(getCardData);


  //loop over those array of task obejct to create HTML card , inject it to DOM
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update our globalStore
  globalStore.push(cardObject);
}

)

};

//Delete function
/*
get the tagename of the tag through which you wnat to execute the delete function
also get its id 
then filter the globalstore 
filter all the elements you dont want in the globalstore i.e,the element you want to delete
then update the local storage i.e, set item of globalstore(updated) as localstorage data
*/

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };


taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

globalStore.push(taskData);
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};





