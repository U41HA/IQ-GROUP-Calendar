# IQ-GROUP Тестовое задание

## Соискатель:
[**Фрайнд Александр Викторович**](https://tyumen.hh.ru/resume/4a052802ff0b73c3370039ed1f384633577865)

## Описание ТЗ
- ### Верстка страницы согласно [макету](https://www.figma.com/file/N8ahYKmWH4Hyj39MoIjuyx/Frontend-Calendar-test-task)
- ### Реализация логики с помощью JS
    * Добавление/редактирование событий;
    * Переход по месяцам;
    * Поиск событий;
    * Сохранение календаря в localeStorage;
## Реализация
- #### Микропрезинтация основного функционала (58 секунд):
![Calendar image](/assets/Git-images/Calendar_presentation.gif)
### Верстка
* Семантическая верстка;
* Классы по БЭМ;
* Применение flex-разметки;
### CSS
* Использование препроцессора SASS
    - Использование Mixin;
    - Использование Placeholder;
    - Архитектура 7-1;
### Реализация JS логики
> Логика реализована без подключения сторонних библиотек на ванильном JS

> При написании функций следовал парадигме функционального программирования с использованием чистых функций.

- #### Добавление событий
![Calendar image](/assets/Git-images/calendar_add.jpg)
- #### Просмотр существующих событий
![Calendar image](/assets/Git-images/calendar_overview.jpg)
- #### Редактирование событий
![Calendar image](/assets/Git-images/calendar_edit.jpg)
- #### Быстрое добавление события
![Calendar image](/assets/Git-images/calendar_quick-add.jpg)
- #### Поиск по существующим событиями
![Calendar image](/assets/Git-images/calendar_search.jpg)
![Calendar image](/assets/Git-images/calendar_search_action.jpg)
- #### Сохранение событий в localeStorage и их выгрузка при загрузке страницы

### Дополнительный функционал
> За рамками ТЗ были реализованы две дополнительных функции:
- #### Выделение текущего дня специальным стилем
![Calendar image](/assets/Git-images/calendar_today.jpg)
- #### Функция просмотра ближайших событий на неделю
![Calendar image](/assets/Git-images/calendar_coming-event.jpg)
