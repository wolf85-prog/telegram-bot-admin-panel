
const specData = [
    {
        id: 1,
        name: 'Звук',
        icon: 'Sound',
        models: [
            {id: 1, name: 'Звукорежиссер',},
            {id: 2, name: 'Системный инженер',},
            {id: 3, name: 'RF-Менеджер',},
            {id: 4, name: 'Backline',},
            {id: 5, name: 'Roadie',},
            {id: 6, name: 'Техник по звуку',},
            {id: 7, name: 'Микрофонный техник'},
        ]
    },
    {
        id: 2,
        name: 'Свет',
        icon: 'Light',
        models: [
            {id: 1, name: 'Художник по свету',},
            {id: 2, name: 'Оператор световой пушки',},
            {id: 3, name: 'Гафер',},
            {id: 4, name: 'Техник по свету',},
            {id: 5, name: 'Электрик',},
        ]
    },
    {
        id: 3,
        name: 'Видео',
        icon: 'Video',
        models: [
            {id: 1, name: 'Инженер VMix',},
            {id: 2, name: 'Инженер Resolume',},
            {id: 3, name: 'Оператор',},
            {id: 4, name: 'Оператор Zoom-конференций',},
            {id: 5, name: 'Оператор Action-съемки',},
            {id: 6, name: 'Оператор-постановщик',},
            {id: 7, name: 'Режиссер эфиров',},
            {id: 8, name: 'Техник по монтажу экранов',}, 
        ]
    },
    {
        id: 4,
        name: 'Фото',
        icon: 'Photo',
        models: [
            {id: 1, name: 'Документальная съемка',},
            {id: 2, name: 'Репортажная съемка',},
            {id: 3, name: 'Свадебная съемка',}, 
            {id: 4, name: 'Портретная съемка',},
            {id: 5, name: 'Предметная съемка',},
            
        ]
    },
    {
        id: 5,
        name: 'Кино / Театр',
        icon: 'Kino',
        models: [
            {id: 1, name: 'Режиссер', color: '#fff'},
            {id: 2, name: 'Оператор-постановщик', color: '#fff'},
            {id: 3, name: 'Стедикам', color: '#fff'},
            {id: 4, name: 'Оператор крана', color: '#fff'},
            {id: 5, name: 'Оператор Action-съемки', color: '#fff'},
            {id: 6, name: 'Гафер', color: '#fff'},
            {id: 7, name: 'Актер', color: '#fff'},
            {id: 8, name: 'Гример', color: '#fff'},
            {id: 9, name: 'Костюмер', color: '#fff'},
        ]
    },
    {
        id: 6,
        name: 'Промо',
        icon: 'Promo',
        models: [
            {id: 1, name: 'Промоутер',},
            {id: 2, name: 'Модель',},
            {id: 4, name: 'Визажист',},
            {id: 5, name: 'Костюмер',},
        ]
    },
    {
        id: 7,
        name: 'Кейтеринг',
        icon: 'Catering',
        models: [
            {id: 1, name: 'Банкетный менеджер',},  
            {id: 2, name: 'Повар',}, 
            {id: 3, name: 'Хостес',},  
            {id: 4, name: 'Бармен',},
            {id: 5, name: 'Официант',},      
        ]
    },  
    {
        id: 8,
        name: 'Помощники',
        icon: 'Stagehands',
        models: [
            {id: 1, name: 'Помощник \/ Грузчик',},
        ]
    },
    {
        id: 9,
        name: 'Риггеры \/ Сцена',
        icon: 'Riggers \/ Ground',
        models: [
            {id: 1, name: 'Верхний Риггер',},
            {id: 2, name: 'Нижний Риггер',},
            {id: 3, name: 'Монтаж конструктива сцены',},
            {id: 4, name: 'Монтаж шатров',},
        ]
    }, 
    {
        id: 10,
        name: 'Грузоперевозки',
        icon: 'Trucks',
        models: [
            {id: 1, name: 'С гидролифтом',},
            {id: 2, name: 'Без гидролифта',},
            {id: 3, name: 'C личным ТС [B\/C]',},
            {id: 4, name: 'Без личного ТС [B\/C]',},
            {id: 5, name: 'Мотокурьер',},  
        ]
    },
    {
        id: 11,
        name: 'Артисты',
        icon: 'Party',
        models: [
            {id: 1, name: 'Кавер-бенд',},
            {id: 2, name: 'Танцевальный коллектив',},
            {id: 3, name: 'Диджей',},
            {id: 4, name: 'Ведущий',},
            {id: 5, name: 'Певец \/ певица',},
            {id: 6, name: 'Артист оригинального жанра',},
            {id: 7, name: 'Go-Go',},
            {id: 8, name: 'Фаир-шоу',},
        ]
    },
    {
        id: 12,
        name: 'Игры',
        icon: 'Games',
        models: [
            {id: 1, name: 'Квест',},
            {id: 2, name: 'Квиз',},
            {id: 3, name: 'Аниматор',},
            {id: 4, name: 'Пневмокостюм \/ ростовая кукла',},
            {id: 5, name: 'Настольные игры \/ игровые автоматы',},
            {id: 6, name: 'Активности \/ аттракционы',},
        ]
    },
    {
        id: 13,
        name: 'Продакшн',
        icon: 'Production',
        models: [
            {id: 1, name: 'Мероприятие под ключ',},
            {id: 2, name: 'Отдельные технические задачи',},
            {id: 3, name: 'Event-менеджер',},
        ]
    },

    {
        id: 14,
        name: 'Декорации',
        icon: 'Decor',
        models: [
            {id: 1, name: 'Декоратор',},
            {id: 2, name: 'Флорист оформитель',},
            {id: 3, name: 'Монтаж мебели',},
            {id: 3, name: 'Монтаж выставочных стендов',},
            {id: 3, name: 'Напольные покрытия',},
        ]
    },
];

export default specData;