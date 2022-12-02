export function comingEventShow() {

    const date = new Date();
    const dateOptions = { month: 'long', day: 'numeric', };
    const todayDate = new Date(date.toLocaleDateString('en-US', dateOptions));
    const eventList = document.querySelector('.event-search-popup__list');
    const allEvents = eventList.querySelectorAll('.event-search-popup__item');

    const comingEventPopup = document.querySelector('.event-coming-popup-container');
    const comingEventList = document.querySelector('.event-coming-popup__list');
    const daysCell = document.querySelectorAll('.day');

    document.addEventListener('click', bodyClosePopup, true);

    comingEventList.innerHTML = '';

    if (!comingEventPopup.classList.contains('active')) {
        comingEventPopup.classList.add('active');
    }

    for (let i = 0; i < allEvents.length; i++) {
        let eventDate = new Date(allEvents[i].querySelector('.search__date').textContent);
        if ((eventDate.getDate() - todayDate.getDate()) <= 7) {
            let comingEvent = allEvents[i].cloneNode(true);
            comingEventList.append(comingEvent);
        }
    }

    if (comingEventList.childElementCount <= 0) {
        const noEventMessage = document.createElement('p');
        noEventMessage.className = `menu-date-text coming-event-text`;
        noEventMessage.textContent = 'No event coming';
        comingEventList.append(noEventMessage);
    }

    const comingEventItems = comingEventList.querySelectorAll('.event-search-popup__item');
    for (let i = 0; i < comingEventItems.length; i++) {
        comingEventItems[i].addEventListener('click', goToEvent);
    }

    function goToEvent() {
        const eventDate = this.querySelector('.search__date').textContent;
        for (let i = 0; i < daysCell.length; i++) {
            if (daysCell[i].querySelector('.full-day').textContent === eventDate) {
                daysCell[i].click();
                popupRemove();
            }
        }
    }

    function popupRemove() {
        if (comingEventPopup.classList.contains('active')) {
            comingEventPopup.classList.remove('active');
        }
        for (let i = 0; i < comingEventItems.length; i++) {
            comingEventItems[i].removeEventListener('click', goToEvent);
        }
        document.removeEventListener('click', bodyClosePopup, true);

    }

    function bodyClosePopup(e) {
        let popupClick = e.composedPath().includes(comingEventPopup);
        if (!popupClick) {
            popupRemove();
        }
    }
}