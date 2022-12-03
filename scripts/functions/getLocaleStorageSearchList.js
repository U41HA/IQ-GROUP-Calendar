export function getLocaleStorageSearchList() {
    const searchList = document.querySelector('.event-search-popup__list');
    if (localStorage.searchList) {
        searchList.innerHTML = localStorage.getItem('searchList');
    }
}