export function addOrOverviewEvent() {
    const eventAddPopup = document.querySelector('.event-add-popup-container');
    const eventPreviewPopup = document.querySelector('.event-overview-popup-container');

    const thisDay = document.querySelector('.day.active');
    const coordY = thisDay.offsetTop + 'px';
    const coordX = thisDay.offsetLeft + thisDay.offsetWidth + 10 + 'px';


    (!thisDay.classList.contains('day-filled')) ? addPopupShow() : addPopupOverviewShow();

    function addPopupShow() {

        eventAddPopup.classList.remove('active');
        eventAddPopup.style.top = coordY;
        eventAddPopup.style.left = coordX;
        eventAddPopup.classList.add('active');
        const thisDay = document.querySelector('.day.active');

        const popupEventTitle = document.querySelector('.event-add-popup__input-event-name');
        const popupEventDescription = document.querySelector('.event-add-popup__input-description');
        const popupEventMembers = document.querySelector('.event-add-popup__input-members');
        const popupEventDate = document.querySelector('.event-add-popup__input-date');

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
            const thisDay = document.querySelector('.day.active');

            thisDay.querySelector('.cell-title-text').textContent = popupEventTitle.value;
            thisDay.querySelector('.event-description').textContent = popupEventDescription.value;
            thisDay.querySelector('.cell-description-text').textContent = popupEventMembers.value;

            const thisDayTitle = thisDay.querySelector('.cell-title-text').textContent;
            const thisDayDescription = thisDay.querySelector('.event-description').textContent;
            const thisDayMembers = thisDay.querySelector('.cell-description-text').textContent;

            if (thisDayTitle || thisDayDescription || thisDayMembers) {
                thisDay.classList.add('day-filled');
                buttonDelete.removeAttribute('disabled', 'disabled');
                setLocaleStorage(thisDay);
                searchListPush(thisDay);
                resetInput();
                addPopupRemove();
            } else {
                resetInput();
                addPopupRemove();
            }
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

        const thisDay = document.querySelector('.day.active');

        const popupEventTitle = document.querySelector('.event-overview-popup__event-title');
        const popupEventDescription = document.querySelector('.event-overview-popup__input-description');
        const popupEventMembers = document.querySelector('.event-overview-popup__members-text');
        const popupEventDate = document.querySelector('.event-overview-popup__event-date');

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
            searchListRemove(thisDay);
            thisDay.querySelector('.cell-title-text').textContent = '';
            thisDay.querySelector('.cell-description-text').textContent = '';
            thisDay.querySelector('.event-description').textContent = '';

            popupEventTitle.textContent = '';
            popupEventDate.textContent = '';
            popupEventMembers.textContent = '';
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

    function searchListPush(thisDay) {
        const searchList = document.querySelector('.event-search-popup__list');
        const searchItems = document.querySelectorAll('.event-search-popup__item');

        const eventTitle = thisDay.querySelector('.cell-title-text').textContent;
        const eventDate = thisDay.querySelector('.full-day').textContent;
        const eventMembers = thisDay.querySelector('.cell-description-text').textContent;
        const eventDescription = thisDay.querySelector('.event-description').textContent;

        let searchItem = document.createElement('li');
        searchItem.className = `event-search-popup__item ${eventDate.split(' ').join('')}`;

        let searchItemTitle = document.createElement('p');
        searchItemTitle.className = 'menu-title-text event-search-popup__item-title search__title';
        searchItemTitle.textContent = eventTitle;

        let searchItemDate = document.createElement('p');
        searchItemDate.className = 'menu-date-text event-search-popup__item-description search__date';
        searchItemDate.textContent = eventDate;

        let searchItemDescription = document.createElement('p');
        searchItemDescription.className = `event-description text-hidden search__description`;
        searchItemDescription.textContent = eventDescription;

        let searchItemMembers = document.createElement('p');
        searchItemMembers.className = `event-members text-hidden search__members`;
        searchItemMembers.textContent = eventMembers;

        searchItem.append(searchItemTitle);
        searchItem.append(searchItemDate);
        searchItem.append(searchItemDescription);
        searchItem.append(searchItemMembers);

        for (let i = 0; i <= searchItems.length; i++) {
            if (searchItems[i] && searchItem.querySelector('.search__date').textContent == searchItems[i].querySelector('.search__date').textContent) {
                searchItems[i].remove();
                searchList.append(searchItem);
            } else {
                searchList.append(searchItem);
            }
        }
    }

    function searchListRemove(thisDay) {
        const deletedEventDate = thisDay.querySelector('.full-day').textContent.split(' ').join('');
        const allEvents = document.querySelectorAll('.event-search-popup__item');
        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].classList.contains(deletedEventDate)) {
                allEvents[i].remove();
            }
        }
    }
}