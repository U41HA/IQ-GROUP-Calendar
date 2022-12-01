export function quickAddPopupShow() {

    const quickAddPopup = document.querySelector('.event-quick-add-container');
    const closeButton = document.querySelector('.event-quick-add__close');
    const createButton = document.querySelector('.button-done');

    // Global variables
    const daysCell = document.querySelectorAll('.day');
    const searchList = document.querySelector('.event-search-popup__list');

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
            let cellTitle = cell[1];
            let cellMembersArr = [];

            quickAddPopupInput.value = '';

            for (let i = 2; i < cell.length; i++) {
                cellMembersArr.push(cell[i]);
            }
            let cellMembers = cellMembersArr.join(', ');

            const dayList = document.querySelectorAll('.full-day');
            for (let i = 0; i < dayList.length; i++) {
                if (dayList[i].textContent === cellDate) {
                    daysCell[i].children[1].innerHTML = cellTitle;
                    daysCell[i].children[2].innerHTML = cellMembers;
                    daysCell[i].classList.add('day-filled');
                    searchListPush();
                    setLocaleStorage(i);
                }
            }

            function setLocaleStorage(i) {
                let daySaved = daysCell[i].innerHTML;
                localStorage.setItem(`${cellDate}`, daySaved);
            }

            function searchListPush() {
                let searchItems = document.querySelectorAll('.event-search-popup__item');

                let searchItem = document.createElement('li');
                searchItem.className = `event-search-popup__item ${cellDate.split(' ').join('')}`;

                let searchItemTitle = document.createElement('p');
                searchItemTitle.className = 'menu-title-text event-search-popup__item-title search__title';
                searchItemTitle.textContent = cellTitle;

                let searchItemDate = document.createElement('p');
                searchItemDate.className = 'menu-date-text event-search-popup__item-description search__date';
                searchItemDate.textContent = cellDate;

                let searchItemDescription = document.createElement('p');
                searchItemDescription.className = `event-description text-hidden search__description`;
                searchItemDescription.textContent = '';

                let searchItemMembers = document.createElement('p');
                searchItemMembers.className = `event-members text-hidden search__members`;
                searchItemMembers.textContent = cellMembers;

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
        }
    }
}