//calendario

const currentDate = document.querySelector(".p-date");
daysTag = document.querySelector(".days")
prevNextIcons = document.querySelectorAll(".icons span")

let date = new Date(),
currenYear = date.getFullYear(),
currenMonth = date.getMonth();

const months = ["Enero", "Febrero", "Marzo", "Abril" , "Mayo", "junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


const renderCalendar = () => {
    let firstDayofMonth = new Date(currenYear, currenMonth, 1).getDay(), //trae lista del 1er dia del mes anterior
    lastDateofMonth = new Date(currenYear, currenMonth + 1, 0).getDate(),//trae la ultima fecha del mes  
    lastDayofMonth = new Date(currenYear, currenMonth, lastDateofMonth).getDay(),//trae el ultimo dia del mes 
    lastDateofLastMonth = new Date(currenYear, currenMonth, 0).getDate();//trae la ultima fecha del mes anterior
    let tag = ""

    for(let i = firstDayofMonth; i > 0; i--){
        tag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
    } 
    for(let i = 1; i <= lastDateofMonth; i++){
        //elemento en calendario activo,dia de hoy
        let isToday = i === date.getDate() && currenMonth === new Date().getMonth() && currenYear === new Date().getFullYear() ? "active" : "";
        tag += `<li class="${isToday}">${i}</li>`
    }

    for(let i = lastDayofMonth; i < 6; i++){
        tag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
   
    currentDate.innerHTML = `${months[currenMonth]} ${currenYear}`;
    daysTag.innerHTML = tag

}
renderCalendar();

prevNextIcons.forEach(icon => {
  icon.addEventListener("click", () => { //desplazamiento de meses,anterior/siguiente
    currenMonth = icon.id === "prev" ? currenMonth -1 : currenMonth + 1;
    //si se termina el año o se retrocede despues de enero,crea el año proximo y el anterior
    if(currenMonth < 0 || currenMonth > 11){
      date = new Date(currenYear, currenMonth);
      currenYear = date.getFullYear();//actualiza año
      currenMonth = date.getMonth();//actualiza mes
    }else{
      date = new Date();
    }

    renderCalendar();
  })
});


