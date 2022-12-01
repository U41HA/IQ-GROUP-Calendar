export function showMonth() {

    if (typeof date == 'undefined') {
        window.date = new Date();
    }

    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    // Global variables
    const monthOutput = document.querySelector('.date-navbar__month');
    const daysCell = document.querySelectorAll('.day');
    const monthYearOptions = { month: 'long', year: 'numeric', };
    const monthOptions = { month: 'long', };
    const dayOption = { month: 'long', day: 'numeric', };


    const nextMonthButton = document.querySelector('.date-navbar__slide-right');
    const prevMonthButton = document.querySelector('.date-navbar__slide-left');
    const todayButton = document.querySelector('.date-navbar__button');
    const refreshButton = document.querySelector('.buttons__refresh')

    refreshButton.addEventListener('click', refreshApp);
    todayButton.addEventListener('click', goToday);
    nextMonthButton.addEventListener('click', nextMonth);
    prevMonthButton.addEventListener('click', prevMonth);

    monthOutput.textContent = date.toLocaleDateString('en-US', monthYearOptions);

    function dateReset() {
        date = new Date(currentYear, currentMonth);
        date.setDate(1);
    }

    function dayOfWeek() {
        let dayOfWeek = date.getDay();
        if (dayOfWeek === 0) dayOfWeek += 7;
        return dayOfWeek;
    }

    dateReset();

    for (let i = dayOfWeek() - 2; i >= 0; i--) {
        if (i < 0) i += 7;
        date.setDate(date.getDate() - 1);
        daysCell[i].firstElementChild.firstElementChild.textContent = date.getDate();
        daysCell[i].lastElementChild.textContent = `${date.toLocaleDateString('en-US', monthOptions)} ${date.getDate()}`;
    }

    dateReset();

    for (let i = dayOfWeek() - 1; i < daysCell.length; i++) {
        daysCell[i].firstElementChild.firstElementChild.textContent = date.getDate();
        daysCell[i].lastElementChild.textContent = `${date.toLocaleDateString('en-US', monthOptions)} ${date.getDate()}`;
        date.setDate(date.getDate() + 1);
    }

    setToday();

    getLocalStorage();

    function setToday() {
        date = new Date();
        for (let i = 0; i < daysCell.length; i++) {
            daysCell[i].classList.remove('today');
            if (daysCell[i].lastElementChild.textContent == date.toLocaleDateString('en-US', dayOption)) {
                daysCell[i].classList.add('today')
            }
        }
    }

    function getLocalStorage() {
        for (let i = 0; i < daysCell.length; i++) {
            deleteEvent(i);
            let filledDay = daysCell[i].querySelector('.full-day').textContent;
            if (filledDay in localStorage) {
                daysCell[i].innerHTML = localStorage.getItem(`${filledDay}`);
                daysCell[i].classList.add('day-filled');
            }
        }

        function deleteEvent(i) {
            daysCell[i].querySelector('.cell-title-text').textContent = '';
            daysCell[i].querySelector('.cell-description-text').textContent = '';
            daysCell[i].querySelector('.event-description').textContent = '';
            if (daysCell[i].querySelector('.cell-date-text').firstChild.length > 2 && i > 6) {
                daysCell[i].querySelector('.cell-date-text').firstChild.textContent = '';
            }
            daysCell[i].classList.remove('day-filled');
        }
    }

    // Date slide

    function nextMonth() {
        dateReset();
        date.setMonth(date.getMonth() + 1);
        monthOutput.textContent = date.toLocaleDateString('en-US', monthYearOptions);
        showMonth();
    }

    function prevMonth() {
        dateReset();
        date.setMonth(date.getMonth() - 1);
        monthOutput.textContent = date.toLocaleDateString('en-US', monthYearOptions);
        showMonth();
    }

    // Today button

    function goToday() {
        date = new Date();
        showMonth();
    }

    // Refresh button

    function refreshApp() {
        location.reload();
    }

}