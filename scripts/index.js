import {showMonth} from './functions/_showMonth.js';
import {quickAddPopupShow} from './functions/_quickAddPopupShow.js';
import {addOrOverviewEvent} from './functions/_addOrOverviewEvent.js';
import {searchPopupShow} from './functions/_searchPopupShow.js';
import {setLocaleStorageSearchList} from './functions/_setLocaleStorageSearchList.js';
import {getLocaleStorageSearchList} from './functions/_getLocaleStorageSearchList.js';
import {setActiveDay} from './functions/_setActiveDay.js';

const daysCell = document.querySelectorAll('.day');
const addEventButton = document.querySelector('.buttons__add');
const searchInput = document.querySelector('.search__input');

window.addEventListener('load', showMonth);
daysCell.forEach(day => day.addEventListener('click', setActiveDay));
daysCell.forEach(day => day.addEventListener('click', addOrOverviewEvent));
addEventButton.addEventListener('click', quickAddPopupShow);
searchInput.addEventListener('click', searchPopupShow);
window.addEventListener('beforeunload', setLocaleStorageSearchList);
window.addEventListener('load', getLocaleStorageSearchList);