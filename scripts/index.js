// Initial function for day filling and listener adding
import { showMonth } from './functions/showMonth.js';

// Quick event add
import { quickAddPopupShow } from './functions/quickAddPopupShow.js';

// Overview existing event or add new 
import { addOrOverviewEvent } from './functions/addOrOverviewEvent.js';

// Search and moving through events
import { searchPopupShow } from './functions/searchPopupShow.js';

// Locale storage saving
import { setLocaleStorageSearchList } from './functions/setLocaleStorageSearchList.js';

// Locale storage loading
import { getLocaleStorageSearchList } from './functions/getLocaleStorageSearchList.js';

// Active day setting for event adding 
import { setActiveDay } from './functions/setActiveDay.js';

// Coming event notification
import {comingEventShow} from './functions/comingEventShow.js'

(function initApp() {
    const daysCell = document.querySelectorAll('.day');
    const addEventButton = document.querySelector('.buttons__add');
    const searchInput = document.querySelector('.search__input');
    const comingEventButton = document.querySelector('.buttons__coming');
    comingEventButton.addEventListener('click', comingEventShow);

    daysCell.forEach(day => day.addEventListener('click', setActiveDay));
    daysCell.forEach(day => day.addEventListener('click', addOrOverviewEvent));
    addEventButton.addEventListener('click', quickAddPopupShow);
    searchInput.addEventListener('click', searchPopupShow);
    window.addEventListener('load', showMonth);
    window.addEventListener('load', getLocaleStorageSearchList);
    window.addEventListener('beforeunload', setLocaleStorageSearchList);
})();




