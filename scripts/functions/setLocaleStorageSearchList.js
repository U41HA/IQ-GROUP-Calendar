export function setLocaleStorageSearchList() {
    const searchList = document.querySelector('.event-search-popup__list');
    localStorage.setItem('searchList', searchList.innerHTML);
}