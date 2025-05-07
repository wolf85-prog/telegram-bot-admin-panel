
const specOnlyData2 = [
            {value: 1, label: 'Звукорежиссер', name: 'Звукорежиссер', color: '#fff'},
            {value: 2, label: 'Системный инженер', name: 'Системный инженер', color: '#fff'},
            {value: 3, label: 'RF-Менеджер', name: 'RF-Менеджер', color: '#fff'},
            {value: 4, label: 'Backline', name: 'Backline', color: '#fff'},
            {value: 5, label: 'Roadie', name: 'Roadie', color: '#fff'},
            {value: 6, label: 'Техник по звуку', name: 'Техник по звуку', color: '#fff'},
            {value: 7, label: 'Микрофонный техник', name: 'Микрофонный техник', color: '#fff'},

            {value: 8, label: 'Художник по свету', name: 'Художник по свету', color: ''},
            {value: 9, label: 'Оператор световой пушки', name: 'Оператор световой пушки', color: ''},
            {value: 10, label: 'Гафер', name: 'Гафер',},
            {value: 11, label: 'Техник по свету', name: 'Техник по свету', color: ''},
            {value: 12, label: 'Электрик', name: 'Электрик', color: ''},

            {value: 13, label: 'Инженер VMix', name: 'Инженер VMix', color: '#fff'},
            {value: 14, label: 'Инженер Resolume', name: 'Инженер Resolume', color: '#fff'},
            {value: 15, label: 'Оператор', name: 'Оператор', color: '#fff'},
            {value: 16, label: 'Оператор Zoom-конференций', name: 'Оператор Zoom-конференций', color: '#fff'},
            {value: 17, label: 'Оператор Action-съемки', name: 'Оператор Action-съемки', color: '#fff'},
            {value: 18, label: 'Режиссер эфиров', name: 'Режиссер эфиров', color: '#fff'},
            {value: 19, label: 'Техник по монтажу экранов', name: 'Техник по монтажу экранов', color: '#fff'},  

            {value: 20, label: 'Документальная съемка', name: 'Документальная съемка', color: ''},
            {value: 21, label: 'Репортажная съемка', name: 'Репортажная съемка', color: ''},
            {value: 22, label: 'Свадебная съемка', name: 'Свадебная съемка', color: ''},
            {value: 23, label: 'Портретная съемка', name: 'Портретная съемка', color: ''},
            {value: 24, label: 'Предметная съемка', name: 'Предметная съемка', color: ''},

            {value: 25, label: 'Режиссер', color: '#fff'},
            {value: 26, label: 'Оператор-постановщик', color: '#fff'},
            {value: 27, label: 'Стедикам', color: '#fff'},
            {value: 28, label: 'Оператор крана', color: '#fff'},
            {value: 29, label: 'Оператор Action-съемки', color: '#fff'},
            {value: 30, label: 'Гафер', color: '#fff'},
            {value: 31, label: 'Актер', color: '#fff'},
            {value: 32, label: 'Гример', color: '#fff'},
            {value: 33, label: 'Костюмер', color: '#fff'},
            {value: 34, label: 'Художник-постановщик', color: '#fff'},

            {value: 35, label: 'Модель', color: ''},
            {value: 36, label: 'Промоутер', color: ''},
            {value: 37, label: 'Визажист', color: ''},
            {value: 38, label: 'Костюмер', color: ''},

            {value: 39, label: 'Банкетный менеджер', color: '#fff'}, 
            {value: 40, label: 'Повар', color: '#fff'},  
            {value: 41, label: 'Хостес', color: '#fff'}, 
            {value: 42, label: 'Бармен', color: '#fff'}, 
            {value: 43, label: 'Официант', color: '#fff'},     

            {value: 44, label: 'Помощник \/ Грузчик', color: ''},

            {value: 45, label: 'Верхний Риггер', color: '#fff'},
            {value: 46, label: 'Нижний Риггер', color: '#fff'},
            {value: 47, label: 'Монтаж конструктива сцены', color: '#fff'},
            {value: 48, label: 'Монтаж шатров', color: '#fff'},

            {value: 49, label: 'Декоратор', color: ''},
            {value: 50, label: 'Флорист оформитель', color: ''},
            {value: 51, label: 'Монтаж мебели', color: ''},
            {value: 52, label: 'Монтаж выставочных стендов', color: ''},
            {value: 53, label: 'Напольные покрытия', color: ''},

            {value: 54, label: 'С гидролифтом', color: ''},
            {value: 55, label: 'Без гидролифта', color: ''},
            {value: 56, label: 'C личным ТС [B\/C]', color: ''},
            {value: 57, label: 'Без личного ТС [B\/C]', color: ''},
            {value: 58, label: 'Мотокурьер', color: ''},   

            {value: 59, label: 'Кавер-бенд', color: '#fff'},
            {value: 60, label: 'Танцевальный коллектив', color: '#fff'},
            {value: 61, label: 'Диджей', color: '#fff'},
            {value: 62, label: 'Ведущий', color: '#fff'},
            {value: 63, label: 'Певец \/ певица', color: '#fff'},
            {value: 64, label: 'Артист оригинального жанра', color: '#fff'},
            {value: 65, label: 'Фаир-шоу', color: '#fff'},
            {value: 66, label: 'Go-Go', color: '#fff'},

            {value: 67, label: 'Квест', color: ''},
            {value: 68, label: 'Квиз', color: ''},
            {value: 69, label: 'Аниматор', color: ''},
            {value: 70, label: 'Пневмокостюм \/ ростовая кукла', color: ''},
            {value: 71, label: 'Настольные игры \/ игровые автоматы', color: ''},
            {value: 72, label: 'Активности \/ аттракционы', color: ''},

            {value: 73, label: 'Мероприятие под ключ', color: '#fff'},
            {value: 74, label: 'Отдельные технические задачи', color: '#fff'},
            {value: 75, label: 'Event-менеджер', color: '#fff'},

            
            
            {value: 76, label: 'Менеджер «U.L.E.Y»', color: '#fff'},

];

export default specOnlyData2;