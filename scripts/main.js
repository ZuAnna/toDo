


const addBtn = document.querySelector('.button-create');
const outer = document.querySelector('.outer');
const newBtnCreateModal = document.querySelector('.newtask__button-in');
const modalW = document.querySelector('.newtask');
const active = document.querySelectorAll('.active');
const activeOuter = document.querySelector('.outer-active');
const closeBtn = document.querySelector('newtask__close');
const bodyAll = document.querySelector('body');
const outerTwo = document.querySelector('.outer-two');
let mainChecks = document.querySelectorAll('.main__checkbox');
let mainLi = document.querySelectorAll('.main__li')
let mainListMain = document.querySelector('.main__list');




function openModalW (elem){
   elem.classList.add('active');
}
function openBlur (outerEl) {
   outerEl.classList.add('outer-active');
   outerTwo.classList.add('outer-two-active');
}

function closeModal (e) {
   if( e.target.classList.contains('newtask__close') && modalW.classList.contains('active') || e.target.classList.contains('outer-active')){
      modalW.classList.remove('active');
   }
}
function closeBlur (e) {
   if (e.target.classList.contains('newtask__close') && outer.classList.contains('outer-active') || e.target.classList.contains('outer-active')){
      outer.classList.remove('outer-active');
      outerTwo.classList.remove('outer-two-active');
   }
}
function disClick (e) {
   if (modalW.classList.contains('active') && outer.contains('outer-active') && e.target!= newtask)  {
      e.preventDefault();
      e.stopPropagation();
   }
}
modalW.addEventListener('click', (e) => {
   closeModal(e);
   closeBlur(e);
})

addBtn.addEventListener('click', (e)=> {
   openModalW(modalW);
   openBlur(outer);

})
outer.addEventListener('click', (e) => {
   closeModal(e);
   closeBlur(e);

});
// NewTask дата и статус

function saveCheckLocal(){
   let boxes = document.querySelectorAll('.main__checkbox');
      let key;
      let valueCheck;
      try{
         for (let o = 0; 0 < boxes.length; o++){
         // key = boxes[o].getAttribute('class');
      valueCheck = boxes[0].checked;
      localStorage.setItem(`${boxes[o].className}${[o]}` , `${boxes[o].checked}`);

    }
    } catch (err) {

}
}

// let newEls = document.querySelectorAll('.main__li');
let listMain = document.querySelector('.main__list')
const btnCreate = document.querySelector('.newtask__button-in');
let newEls=document.querySelectorAll('.main__li');
btnCreate.addEventListener('click', ()=>{
    newEls = document.querySelectorAll('.main__li');
   let currDataAttr;
   newEls.forEach(el=>{
    currDataAttr = el.attributes['data-curr'];
   el.attributes['data-curr'] = Math.random();

   })
   let currData = new Date();
   let currDataCorrect = `${currData.getDate()}.${currData.getMonth()+1}.${currData.getFullYear()}`;
   for (i=0; i < newEls.length; i++ ){
      let newAttr = Math.random();
      newEls[i].setAttribute('data-curr', `${newAttr}`);
      let status =  newEls[i].querySelector('.main__status');
      let checkBox = newEls[i].querySelector('.main__checkbox');
      if (status.innerHTML == ''){
         status.innerHTML = 'В работе'
      };
      checkBox.addEventListener('change',()=>{
          if(checkBox.checked){
         status.style.color = '#134EC1'
         status.innerHTML = 'Выполнено'
       } else{
         status.style.color = '#F89B11'
         status.innerHTML='В работе'
       }
      });
      let dataHtml = newEls[i].querySelector('.main__data');

      if (dataHtml.innerHTML==''){
         dataHtml.innerHTML = currDataCorrect;
      }

   };
   saveCheckLocal();

let listVals = document.querySelectorAll('.main__text');
let listArr=[];
listVals.forEach(ell=>{
   let ellVal = ell.innerText;
   listArr.push(ellVal);

})

});

// сохраним данные


   window.addEventListener('change', (e)=>{

   let boxes = document.querySelectorAll('.main__checkbox');

   if(e.target.type== 'checkbox'){
      saveCheckLocal();
   }

});

let searchBtn = document.querySelector('.search-ico');
let searchInp = document.querySelector('.search');
let listVals = document.querySelectorAll('.main__text');
searchInp.addEventListener('input', (e)=>{
   let listVals = document.querySelectorAll('.main__text');
   let val =e.target.value.trim();
   if(val!= ''){
      listVals.forEach(el=>{
         if(el.innerText.search(val) == -1){
            el.closest('.main__li').classList.add('hide');

         } else {
            el.closest('.main__li').classList.remove('hide');
         }
      });
   } else {
      listVals.forEach(el=>{
         el.closest('.main__li').classList.remove('hide');
      })

   }
})
