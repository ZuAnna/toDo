const addBtn = document.querySelector(".button-create");
const outer = document.querySelector(".outer");
const newBtnCreateModal = document.querySelector(".newtask__button-in");
const modalW = document.querySelector(".newtask");
let inputValue = document.querySelector(".newtask__input");
const active = document.querySelectorAll(".active");
const activeOuter = document.querySelector(".outer-active");
const closeBtn = document.querySelector("newtask__close");
const bodyAll = document.querySelector("body");
const outerTwo = document.querySelector(".outer-two");
let mainChecks = document.querySelectorAll(".main__checkbox");
let mainLi = document.querySelectorAll(".main__li");
let mainListMain = document.querySelector(".main__list");

function openModalW(elem) {
  elem.classList.add("active");
}
function openBlur(outerEl) {
  outerEl.classList.add("outer-active");
  outerTwo.classList.add("outer-two-active");
}

function closeModal(e) {
  if (
    (e.target.classList.contains("newtask__close") &&
      modalW.classList.contains("active")) ||
    e.target.classList.contains("outer-active")
  ) {
    modalW.classList.remove("active");
  }
}
function closeBlur(e) {
  if (
    (e.target.classList.contains("newtask__close") &&
      outer.classList.contains("outer-active")) ||
    e.target.classList.contains("outer-active")
  ) {
    outer.classList.remove("outer-active");
    outerTwo.classList.remove("outer-two-active");
  }
}
function disClick(e) {
  if (
    modalW.classList.contains("active") &&
    outer.contains("outer-active") &&
    e.target != newtask
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
}
modalW.addEventListener("click", (e) => {
  closeModal(e);
  closeBlur(e);
});

addBtn.addEventListener("click", (e) => {
  openModalW(modalW);
  openBlur(outer);
});
outer.addEventListener("click", (e) => {
  closeModal(e);
  closeBlur(e);
});
// NewTask дата и статус

function saveCheckLocal() {
  let boxes = document.querySelectorAll(".main__checkbox");
  let key;
  let valueCheck;
  try {
    for (let o = 0; 0 < boxes.length; o++) {
      // key = boxes[o].getAttribute('class');
      valueCheck = boxes[o].checked;
      localStorage.setItem(
        `${boxes[o].className}${[o]}`,
        `${boxes[o].checked}`
      );
    }
  } catch (err) {}
}

// let newEls = document.querySelectorAll('.main__li');
let listMain = document.querySelector(".main__list");
const btnCreate = document.querySelector(".newtask__button-in");
let newEls = document.querySelectorAll(".main__li");
btnCreate.addEventListener("click", () => {
  newEls = document.querySelectorAll(".main__li");
  let currDataAttr;
  newEls.forEach((el) => {
    currDataAttr = el.attributes["data-curr"];
    el.attributes["data-curr"] = Math.random();
  });
  let currData = new Date();
  let currDataCorrect = `${currData.getDate()}.${
    currData.getMonth() + 1
  }.${currData.getFullYear()}`;
  for (i = 0; i < newEls.length; i++) {
    let newAttr = Math.random();
    newEls[i].setAttribute("data-curr", `${newAttr}`);
    let status = newEls[i].querySelector(".main__status");
    let checkBox = newEls[i].querySelector(".main__checkbox");
    if (status.innerHTML == "") {
      status.innerHTML = "В работе";
    }
    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        status.style.color = "#134EC1";
        status.innerHTML = "Выполнено";
      } else {
        status.style.color = "#F89B11";
        status.innerHTML = "В работе";
      }
    });
    let dataHtml = newEls[i].querySelector(".main__data");

    if (dataHtml.innerHTML == "") {
      dataHtml.innerHTML = currDataCorrect;
    }
  }
  saveCheckLocal();

  let listVals = document.querySelectorAll(".main__text");
  let listArr = [];
  listVals.forEach((ell) => {
    let ellVal = ell.innerText;
    listArr.push(ellVal);
  });
});

// search
let searchBtn = document.querySelector(".search-ico");
let searchInp = document.querySelector(".search");
let listVals = document.querySelectorAll(".main__text");
searchInp.addEventListener("input", (e) => {
  let listVals = document.querySelectorAll(".main__text");
  let dataSearch = document.querySelectorAll(".main__data");
  let statusSearch = document.querySelectorAll(".main__status");
  let val = e.target.value.trim();
  if (val != "") {
    let textFlag = true;
    let statusFlag = true;
    let dataFlag = true;
    listVals.forEach(el => {
      let termText = el.innerText.toLowerCase();
      let newVal = val.toLowerCase();
      if (termText.search(newVal) === -1) {
        el.closest(".main__li").classList.add("hide");
        console.log('No', newVal)
      } else {
        el.closest(".main__li").classList.remove("hide");
      }
    });
    // statusSearch.forEach(el=>{
    //   let term = el.innerText.toLowerCase();
    //   let newVal = val.toLowerCase();
    //   console.log(term.search(newVal), 'Status')
    //   if(term.search(newVal)==-1){
    //     el.closest(".main__li").classList.add("hide");
    //     console.log('No', newVal)
    //   } else {
    //     el.closest(".main__li").classList.remove("hide");
    //     console.log('Yes', el.innerText)
    //   }
    // });
    // dataSearch.forEach(el=>{
    //   let newVal = val.toLowerCase();
    //   console.log(el.innerText.search(newVal), 'Data')
    //   if(el.innerText.search(newVal)==-1){
    //     el.closest(".main__li").classList.add("hide");
    //     console.log('No', newVal)
    //   } else {
    //     el.closest(".main__li").classList.remove("hide");
    //     console.log('Yes', el.innerText)
    //   }
    // });
  } else {
    listVals.forEach((el) => {
      el.closest(".main__li").classList.remove("hide");
    });
    dataSearch.forEach(el=>{
      el.closest(".main__li").classList.remove("hide");
    });
    statusSearch.forEach(el=>{
      el.closest(".main__li").classList.remove("hide");
    });
  }
});
//  сохраним данные
let items = [];
if (localStorage.items) {
  items = JSON.parse(localStorage.getItem("items"));
} else {
  items = [];
  localStorage.setItem("items", []);
}

let mainLiSave;
let mainListSave;
let textIn = {};

function addItem() {
  let mainText = document.querySelectorAll(".main__text");
  let dataCurr = document.querySelectorAll(".main__data");
  let mainStatus = document.querySelectorAll(".main__status");
  for (let d = 0; d < mainText.length; d++) {
    let mainText = document.querySelectorAll(".main__text");
    textIn = {
      text: mainText[d].innerText,
      checked: false,
      data: dataCurr[d].innerText,
      status: mainStatus[d].innerText,
      color: mainStatus[d].style.color,
    };
    items[d] = textIn;
  }
}

function idForCheck() {
  let mainChecks = document.querySelectorAll(".main__checkbox");
  for (let i = 0; i < mainChecks.length; i++) {
    mainChecks[i].setAttribute("id", `itemcheck${[i]}`);
  }
}
function checkStatus() {
  let mainChecks = document.querySelectorAll(".main__checkbox");
  let mainStatus = document.querySelectorAll(".main__status");
  for (let c = 0; c < mainChecks.length; c++) {
    items[c]["checked"] = mainChecks[c].checked;
    items[c]["status"] = mainStatus[c].innerText;
    if (mainChecks[c]["checked"]) {
      items[c]["status"] = "Выполнено";
      items[c]["color"] = "#134EC1";
      mainStatus[c].style.color = "#134EC1";
      mainStatus[c].innerText = "Выполнено";
    } else {
      items[c]["status"] = "В работе";
      items[c]["color"] = "#F89B11";
      mainStatus[c].innerText = "В работе";
      mainStatus[c].style.color = "#F89B11";
    }
  }
}

newBtnCreateModal.addEventListener("click", () => {
  let liAfter = document.querySelectorAll(".main__li");
  addItem();
  idForCheck();
  checkStatus();
  localStorage.setItem("items", JSON.stringify(items));
});

window.addEventListener("change", (e) => {
  let status = document.querySelectorAll(".main__status");
  let checkBox = document.querySelectorAll("main__checkbox");
  let mainChecks = document.querySelectorAll(".main__checkbox");
  let mainStatus = document.querySelectorAll(".main__status");
  if (e.target.type == "checkbox") {
    saveCheckLocal();
    checkStatus();
    localStorage.setItem("items", JSON.stringify(items));
  }
});
function displayItems() {
  let itemText = document.querySelectorAll(".main__text");
  let itemData = document.querySelectorAll(".main__data");
  let itemChecked = document.querySelector(".main__checkbox");
  let listDisp = document.querySelectorAll(".main__li");
  let list = document.querySelector(".main__listTwo");

  let localLength = localStorage.getItem("items").length;
  list.innerHTML += items
    .map((item, index) => {
      return `<li class="main__li" v-for="(mask, index) in needDoList" :key="mask.id" data-curr="">
    <div class="main__li-inner">
      <div class="main__input-group">
        <label>
          <input type="checkbox" class="main__checkbox" ${
            items[index]["checked"] ? "checked" : ""
          }/>
          <span class="main__checkbox-pseudo"></span>
        </label>

        <span class="main__text">${items[index]["text"]}</span>
      </div>
      <div class="main__right-group">
        <span class="main__status">${
          items[index]["checked"] ? "Выполнено" : "В работе"
        }</span>
        <span class="main__data"}>${items[index]["data"]}</span>
        <div class="delete">
      <span class="delete__in" v-on:click="needDoList.splice(index, 1)"></span>
      </div>
      </div>
    </div>
  </li>`;
    })
    .join("");
}

displayItems();
checkStatus();

let deleteBtn = document.querySelectorAll('.delete__in');
 for (let r=0; r<deleteBtn.length; r++){
  let mainLiDelete = document.querySelectorAll(".main__li");
  deleteBtn[r].addEventListener('click',()=>{
    let item = mainLiDelete[r];
    item.remove();
    items.splice([r], 1);
    localStorage.setItem("items", JSON.stringify(items))


  })
 }

//  filter
// let dataSave = document.querySelectorAll(".main__data")
// dataSave.forEach(el=>{
//   console.log(el.innerText)
// })
