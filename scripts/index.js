// Date output
const monthOutput = document.querySelector('.date-navbar__month');
const daysCell = document.querySelectorAll('.day');
const monthYearOptions = { month: 'long', year: 'numeric', };
const monthOptions = { month: 'long', }
let date = new Date();

function showMonth() {
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

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

    dateReset();

    getLocalStorage();


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

window.addEventListener('load', showMonth);

// Quick event add popup

const addEventButton = document.querySelector('.buttons__add');
addEventButton.addEventListener('click', quickAddPopupShow);

function quickAddPopupShow() {

    const quickAddPopup = document.querySelector('.event-quick-add-container');
    const closeButton = document.querySelector('.event-quick-add__close');
    const createButton = document.querySelector('.button-done');

    createButton.addEventListener('click', eventQuickAdd);
    closeButton.addEventListener('click', quickAddPopupRemove);
    document.addEventListener('click', bodyClosePopup, true);

    if (!quickAddPopup.classList.contains('active')) {
        quickAddPopup.classList.add('active');
    }

    function quickAddPopupRemove() {
        if (quickAddPopup.classList.contains('active')) {
            quickAddPopup.classList.remove('active');
        }
        closeButton.removeEventListener('click', quickAddPopupRemove);
        createButton.removeEventListener('click', eventQuickAdd);
        document.removeEventListener('click', bodyClosePopup, true);
        createButton.removeEventListener('click', eventQuickAdd);
    }

    function bodyClosePopup(e) {
        let popupClick = e.composedPath().includes(quickAddPopup);
        if (!popupClick) {
            quickAddPopupRemove();
        }
    }

    function eventQuickAdd() {
        const quickAddPopupInput = document.querySelector('.event-quick-add-popup__input');
        if (quickAddPopupInput.value) {
            const cell = quickAddPopupInput.value.split(',');
            let cellDate = cell[0];
            let cellDescription = cell[1];
            let cellMembersArr = [];

            quickAddPopupInput.value = '';

            for (let i = 2; i < cell.length; i++) {
                cellMembersArr.push(cell[i]);
            }
            let cellMembers = cellMembersArr.join(', ');

            const dayList = document.querySelectorAll('.full-day');
            for (let i = 0; i < dayList.length; i++) {
                if (dayList[i].textContent === cellDate) {
                    daysCell[i].children[1].innerHTML = cellDescription;
                    daysCell[i].children[2].innerHTML = cellMembers;
                    daysCell[i].classList.add('day-filled');
                    setLocaleStorage(i);
                }
            }

            function setLocaleStorage(i) {
                let daySaved = daysCell[i].innerHTML;
                localStorage.setItem(`${cellDate}`, daySaved);
            }
        }
    }
}



// Event add/overview/edit
daysCell.forEach(day => day.addEventListener('click', setActiveDay));

function setActiveDay() {
    this.classList.add('active');
}

daysCell.forEach(day => day.addEventListener('click', addOrOverviewEvent));

function addOrOverviewEvent() {
    const eventAddPopup = document.querySelector('.event-add-popup-container');
    const eventPreviewPopup = document.querySelector('.event-overview-popup-container');

    let thisDay = document.querySelector('.day.active');
    let coordY = thisDay.offsetTop + 'px';
    let coordX = thisDay.offsetLeft + thisDay.offsetWidth + 10 + 'px';


    (!thisDay.classList.contains('day-filled')) ? addPopupShow() : addPopupOverviewShow();

    function addPopupShow() {

        eventAddPopup.classList.remove('active');
        eventAddPopup.style.top = coordY;
        eventAddPopup.style.left = coordX;
        eventAddPopup.classList.add('active');
        let thisDay = document.querySelector('.day.active');

        let popupEventTitle = document.querySelector('.event-add-popup__input-event-name');
        let popupEventDescription = document.querySelector('.event-add-popup__input-description');
        let popupEventMembers = document.querySelector('.event-add-popup__input-members');
        let popupEventDate = document.querySelector('.event-add-popup__input-date');

        const closeButton = document.querySelector('.event-add-popup__close');
        const buttonAdd = document.querySelector('.popup-add__button-done');
        const buttonDelete = document.querySelector('.popup-add__button-delete');

        closeButton.addEventListener('click', addPopupRemove);
        buttonAdd.addEventListener('click', addEvent);
        buttonDelete.addEventListener('click', deleteEvent);
        document.addEventListener('click', bodyClosePopup, true);

        popupEventDate.value = thisDay.querySelector('.full-day').textContent;
        popupEventTitle.value = thisDay.querySelector('.cell-title-text').textContent;
        popupEventDescription.value = thisDay.querySelector('.event-description').textContent;
        popupEventMembers.value = thisDay.querySelector('.cell-description-text').textContent;

        if (!thisDay.classList.contains('day-filled')) {
            buttonDelete.setAttribute('disabled', 'disabled');
        }


        function addEvent() {
            let thisDay = document.querySelector('.day.active');
            thisDay.querySelector('.cell-title-text').textContent = popupEventTitle.value;
            thisDay.querySelector('.event-description').textContent = popupEventDescription.value;
            thisDay.querySelector('.cell-description-text').textContent = popupEventMembers.value;
            thisDay.classList.add('day-filled');
            buttonDelete.removeAttribute('disabled', 'disabled');
            setLocaleStorage(thisDay);
            resetInput();
            addPopupRemove();
        }

        function resetInput() {
            popupEventTitle.value = '';
            popupEventDate.value = '';
            popupEventMembers.value = '';
            popupEventDescription.value = '';
        }

        function deleteEvent() {
            thisDay.querySelector('.cell-title-text').textContent = '';
            thisDay.querySelector('.cell-description-text').textContent = '';
            thisDay.querySelector('.event-description').textContent = '';
            thisDay.classList.remove('day-filled');

            localeStorageEventRemove(thisDay);
            resetInput();
            addPopupRemove();
        }

        function addPopupRemove() {
            if (eventAddPopup.classList.contains('active')) {
                eventAddPopup.classList.remove('active');
            }
            thisDay.classList.remove('active');
            buttonAdd.removeEventListener('click', addEvent);
            buttonDelete.removeEventListener('click', deleteEvent);
            closeButton.removeEventListener('click', addPopupRemove);
            document.removeEventListener('click', bodyClosePopup, true);
        }

        function bodyClosePopup(e) {
            let popupClick = e.composedPath().includes(eventAddPopup);
            if (!popupClick) {
                addPopupRemove();
            }
        }
    }

    function addPopupOverviewShow() {
        eventPreviewPopup.classList.remove('active');
        eventPreviewPopup.style.top = coordY;
        eventPreviewPopup.style.left = coordX;
        eventPreviewPopup.classList.add('active');
        let thisDay = document.querySelector('.day.active');

        let popupEventTitle = document.querySelector('.event-overview-popup__event-title');
        let popupEventDescription = document.querySelector('.event-overview-popup__input-description');
        let popupEventMembers = document.querySelector('.event-overview-popup__members-text');
        let popupEventDate = document.querySelector('.event-overview-popup__event-date');

        const closeButton = document.querySelector('.event-overview-popup__close');
        const doneButton = document.querySelector('.event-overview-popup__button-done');
        const deleteButton = document.querySelector('.event-overview-popup__button-delete');
        const editButton = document.querySelector('.event-overview-popup__button-edit');

        closeButton.addEventListener('click', overviewPopupRemove);
        deleteButton.addEventListener('click', deleteEvent);
        editButton.addEventListener('click', editEvent);
        doneButton.addEventListener('click', overviewPopupRemove);
        document.addEventListener('click', bodyClosePopup, true);

        fillPopup();

        function fillPopup() {
            popupEventTitle.textContent = thisDay.querySelector('.cell-title-text').textContent;
            popupEventDate.textContent = thisDay.querySelector('.full-day').textContent;
            popupEventMembers.textContent = thisDay.querySelector('.cell-description-text').textContent;
            popupEventDescription.value = thisDay.querySelector('.event-description').textContent
        }

        function deleteEvent() {
            thisDay.querySelector('.cell-title-text').textContent = '';
            thisDay.querySelector('.cell-description-text').textContent = '';
            thisDay.querySelector('.event-description').textContent = '';

            popupEventTitle.textContent = '';
            popupEventDate = '';
            popupEventMembers = '';
            popupEventDescription.value = '';

            thisDay.classList.remove('day-filled');
            localeStorageEventRemove(thisDay);
            overviewPopupRemove();
        }

        function editEvent() {
            popupReplace();
            addPopupShow();
        }

        function overviewPopupRemove() {
            if (eventPreviewPopup.classList.contains('active')) {
                eventPreviewPopup.classList.remove('active');
            }
            thisDay.classList.remove('active');
            closeButton.removeEventListener('click', overviewPopupRemove);
            deleteButton.removeEventListener('click', deleteEvent);
            doneButton.removeEventListener('click', overviewPopupRemove);
            editButton.removeEventListener('click', editEvent);
            document.removeEventListener('click', bodyClosePopup, true);
        }

        function popupReplace() {
            if (eventPreviewPopup.classList.contains('active')) {
                eventPreviewPopup.classList.remove('active');
            }
            closeButton.removeEventListener('click', overviewPopupRemove);
            deleteButton.removeEventListener('click', deleteEvent);
            doneButton.removeEventListener('click', overviewPopupRemove);
            editButton.removeEventListener('click', editEvent);
            document.removeEventListener('click', bodyClosePopup, true);
        }

        function bodyClosePopup(e) {
            let popupClick = e.composedPath().includes(eventPreviewPopup);
            if (!popupClick) {
                overviewPopupRemove();
            }
        }
    }

    function setLocaleStorage(thisDay) {
        let daySaved = thisDay.innerHTML;
        let daySavedDate = thisDay.querySelector('.full-day').textContent;
        localStorage.setItem(`${daySavedDate}`, daySaved);
    }

    function localeStorageEventRemove(thisDay) {
        localStorage.removeItem(`${thisDay.querySelector('.full-day').textContent}`);
    }
}


// LocalStorage



