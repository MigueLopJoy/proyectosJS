const $dates = document.querySelector(".dates"),
      $headerText = document.querySelector(".header-text"),
      $prevNextIcons = document.querySelectorAll(".icons span");

let date = new Date(),
      curYear = date.getFullYear(),
      curMonth = date.getMonth();

const renderCalendar = () => {
    const firstDayOfMonth = new Date(curYear, curMonth, 1).getDay(),
          lastDateOfMonth = new Date(curYear, curMonth + 1, 0).getDate(),
          lastDayOfMonth = new Date(curYear, curMonth, lastDateOfMonth).getDay(),
          lastDateOfLastMonth = new Date(curYear, curMonth, 0).getDate()
          $li = "";

    const month = ["January", "February", "March", "April", "May", "June", "July", "August",
                   "September", "October", "November", "December"];


    for (let i = firstDayOfMonth - 1; i > 0; i--) {
        $li += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    };

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let istoday = i === date.getDate() && curMonth === new Date().getMonth() 
                    && curYear === new Date().getFullYear() ? "today" : "";    
        $li += `<li class="${istoday}">${i}</li>`;
    };

    for (let i = lastDayOfMonth; i <= 6; i++) {
        $li += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    };
    
    $headerText.textContent = month[curMonth] + " " + curYear;
    $dates.innerHTML = $li;
};
renderCalendar();

$prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        curMonth = icon.id === "next" ? curMonth + 1 : curMonth - 1;

        if (curMonth < 0 ||curMonth > 11) {
            date = new Date(curYear, curMonth),
            curYear = date.getFullYear(),
            curMonth = date.getMonth();
        } else date = new Date();

        renderCalendar(); 
    });
});