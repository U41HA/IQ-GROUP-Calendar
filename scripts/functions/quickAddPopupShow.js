export function quickAddPopupShow() {

    const quickAddPopup = document.querySelector('.event-quick-add-container');
    const closeButton = document.querySelector('.event-quick-add__close');
    const createButton = document.querySelector('.button-done');

    const daysCell = document.querySelectorAll('.day');
    const searchList = document.querySelector('.event-search-popup__list');
    const quickAddPopupInput = document.querySelector('.event-quick-add-popup__input');

    createButton.addEventListener('click', eventQuickAdd);
    closeButton.addEventListener('click', quickAddPopupRemove);
    document.addEventListener('click', bodyClosePopup, true);

    if (!quickAddPopup.classList.contains('active')) {
        quickAddPopup.classList.add('active');
    }

    function eventQuickAdd() {

        quickAddPopupInput.removeAttribute('invalid', 'invalid');
        
        if (quickAddPopupInput.value) {
            // Add validation arrays
            const monthValidation = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            const dayValidation = [];
            for (let i = 1; i <= 31; i++) {
                dayValidation.push(`${i}`);
            }

            // Get input value
            const cell = quickAddPopupInput.value.split(',');

            // Validation of entered date
            const cellDate = () => {
                const errorPopup = document.querySelector('.validation-error-popup');

                if (monthValidation.includes(cell[0].split(' ')[0].toLowerCase()) && dayValidation.includes(cell[0].split(' ')[1])) {
                    return `${cell[0][0].toUpperCase()}${cell[0].slice(1)}`
                } else {
                    quickAddPopupInput.value = '';
                    errorPopup.classList.add('active');

                    const errorRemove = () => {
                        errorPopup.classList.remove('active');
                        quickAddPopupInput.removeEventListener('click', errorRemove);
                    }

                    quickAddPopupInput.addEventListener('click', errorRemove);
                    return;
                }
            };
            if (!cellDate()) {return}

            const cellTitle = cell[1];
            const cellMembersArr = [];

            for (let i = 2; i < cell.length; i++) {
                cellMembersArr.push(cell[i]);
            }
            const cellMembers = cellMembersArr.join(', ');

            const dayList = document.querySelectorAll('.full-day');
            for (let i = 0; i < dayList.length; i++) {
                if (dayList[i].textContent === cellDate()) {
                    daysCell[i].querySelector('.cell-title-text').innerHTML = cellTitle;
                    daysCell[i].querySelector('.cell-description-text').innerHTML = cellMembers;
                    daysCell[i].querySelector('.event-description').innerHTML = '';
                    daysCell[i].classList.add('day-filled');
                    searchListPush();
                    setLocaleStorage(i);
                    quickAddPopupRemove();
                    break;
                } else {
                    searchListPush();
                    setLocaleStorageLast();
                    quickAddPopupRemove();
                }
            }

            function setLocaleStorage(i) {
                const daySaved = daysCell[i].innerHTML;
                localStorage.setItem(`${cellDate()}`, daySaved);
            }

            function setLocaleStorageLast() {
                let daySaved = 
                `<p class="cell-date-text"><span>${cellDate().split(' ')[1]}</span></p>
                <p class="cell-title-text"> ${cellTitle}</p>
                <p class="cell-description-text"> ${cellMembers}</p>
                <p class="text-hidden event-description"></p>
                <p class="text-hidden full-day">${cellDate()}</p>`
                localStorage.setItem(`${cellDate()}`, daySaved)
            }

            function searchListPush() {
                const searchItems = document.querySelectorAll('.event-search-popup__item');

                const searchItem = document.createElement('li');
                searchItem.className = `event-search-popup__item ${cellDate().split(' ').join('')}`;

                const searchItemTitle = document.createElement('p');
                searchItemTitle.className = 'menu-title-text event-search-popup__item-title search__title';
                searchItemTitle.textContent = cellTitle;

                const searchItemDate = document.createElement('p');
                searchItemDate.className = 'menu-date-text event-search-popup__item-description search__date';
                searchItemDate.textContent = cellDate();

                const searchItemDescription = document.createElement('p');
                searchItemDescription.className = `event-description text-hidden search__description`;
                searchItemDescription.textContent = '';

                const searchItemMembers = document.createElement('p');
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

    function quickAddPopupRemove() {
        if (quickAddPopup.classList.contains('active')) {
            quickAddPopup.classList.remove('active');
        }
        quickAddPopupInput.value = '';
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
}