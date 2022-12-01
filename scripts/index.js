import {showMonth} from './functions/showMonth.js';
import {quickAddPopupShow} from './functions/quickAddPopupShow.js';
import {addOrOverviewEvent} from './functions/addOrOverviewEvent.js';
import {searchPopupShow} from './functions/searchPopupShow.js';
import {setLocaleStorageSearchList} from './functions/setLocaleStorageSearchList.js';
import {getLocaleStorageSearchList} from './functions/getLocaleStorageSearchList.js';
import {setActiveDay} from './functions/setActiveDay.js';

(function initApp() {
    const daysCell = document.querySelectorAll('.day');
    const addEventButton = document.querySelector('.buttons__add');
    const searchInput = document.querySelector('.search__input');
    
    daysCell.forEach(day => day.addEventListener('click', setActiveDay));
    daysCell.forEach(day => day.addEventListener('click', addOrOverviewEvent));
    addEventButton.addEventListener('click', quickAddPopupShow);
    searchInput.addEventListener('click', searchPopupShow);
    window.addEventListener('load', showMonth);
    window.addEventListener('load', getLocaleStorageSearchList);
    window.addEventListener('beforeunload', setLocaleStorageSearchList);
})();
