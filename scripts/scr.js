checkBox.addEventListener("change", () => {
   if (checkBox.checked) {
     status.style.color = "#134EC1";
     status.innerHTML = "Выполнено";
   } else {
     status.style.color = "#F89B11";
     status.innerHTML = "В работе";
   }
 });
