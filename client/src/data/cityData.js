
const cityData = [
            {name: 'Выбрать...', label: 'Выбрать...',},
            {value: 1, label: "Москва",},
            {value: 2, label: "Санкт-Петербург"},
            
            {value: 3, label: 'Адыгея',},
            {value: 4, label: '• Майкоп', disabled: true },

            {value: 5, label: 'Амурская обл.',},
            {value: 6, label: "• Горно-Алтайск", disabled: true },
            {value: 7, label: "• Благовещенск", disabled: true },

            {value: 8, label: "Архангельская обл.",},
            {value: 9, label: "• Архангельск", disabled: true },

            {value: 10, label: "Астраханская обл.",},
            {value: 11, label: "• Астрахань", disabled: true },

            {value: 12, label: "Алтайский край",},
            {value: 13, label: "• Барнаул", disabled: true },

            {value: 14, label: "Башкортостан",},
            {value: 15, label: "• Уфа", disabled: true },

            {value: 16, label: "Белгородская обл.",},
            {value: 17, label: "• Белгород", disabled: true },

            {value: 18, label: "Брянская обл.",},
            {value: 19, label: "• Брянск", disabled: true },

            {value: 20, label: "Бурятия", },
            {value: 21, label: "• Улан-Удэ", disabled: true },

            {value: 22, label: "Владимирская обл.",},
            {value: 23, label: "• Владимир", disabled: true },
            {value: 24, label: "• Муром", disabled: true },
            {value: 25, label: "• Суздаль", disabled: true },

            {value: 26, label: "Волгоградская обл.",},
            {value: 27, label: "• Волгоград", disabled: true},

            {value: 28, label: "Вологодская обл.",},
            {value: 29, label: "• Вологда", disabled: true},
            {value: 30, label: "• Череповец", disabled: true},

            {value: 31, label: "Воронежская обл.",},
            {value: 32, label: "• Воронеж", disabled: true},

            {value: 33, label: "Гомельская обл.",},
            {value: 34, label: "• Гомель", disabled: true},

            {value: 35, label: "Дагестан",},
            {value: 36, label: "• Махачкала", disabled: true},

            {value: 37, label: "Еврейская автономная обл.",},
            {value: 38, label: "• Биробиджан", disabled: true},

            {value: 39, label: "Забайкальский край",},
            {value: 40, label: "• Чита", disabled: true},

            {value: 41, label: "Ингушетия",},
            {value: 42, label: "• Магас", disabled: true},

            {value: 43, label: "Ивановская обл.",},
            {value: 44, label: "• Иваново", disabled: true},

            {value: 45, label: "Иркутская обл.",},
            {value: 46, label: "• Иркутск", disabled: true},

            {value: 47, label: "Кабардино-Балкарская Республика",},
            {value: 48, label: "• Нальчик", disabled: true},

            {value: 49, label: "Калмыкия",},
            {value: 50, label: "• Элиста", disabled: true},

            {value: 51, label: "Карачаево-Черкасская Республика",},
            {value: 52, label: "• Черкесск", disabled: true},

            {value: 53, label: "Карелия",},
            {value: 54, label: "• Петрозаводск", disabled: true},

            {value: 55, label: "Коми",},
            {value: 56, label: "• Сыктывкар", disabled: true},
            {value: 57, label: "• Петрозаводск", disabled: true},

            {value: 58, label: "Крым",},
            {value: 59, label: "• Евпатория", disabled: true},
            {value: 60, label: "• Керчь", disabled: true},
            {value: 61, label: "• Феодосия", disabled: true},
            {value: 62, label: "• Ялта", disabled: true},
            {value: 63, label: "• Симферополь", disabled: true},
            {value: 64, label: "• Севастополь", disabled: true},

            {value: 65, label: "Камчатский край",},
            {value: 66, label: "• Петропавловск-Камчатский", disabled: true},

            {value: 67, label: "Краснодарский край", },
            {value: 68, label: "• Анапа", disabled: true},
            {value: 69, label: "• Краснодар", disabled: true},
            {value: 70, label: "• Геленджик", disabled: true},
            {value: 71, label: "• Новороссийск", disabled: true},
            {value: 72, label: "• Сочи", disabled: true},

            {value: 73, label: "Красноярский край",},
            {value: 74, label: "• Кросноярск", disabled: true},
            {value: 75, label: "• Норильск", disabled: true},
            {value: 76, label: "• Таганрог", disabled: true},

            {value: 77, label: "Калининградская обл.",},
            {value: 78, label: "• Калининград ", disabled: true},

            {value: 79, label: "Калужская обл.",},
            {value: 80, label: "• Калуга", disabled: true},

            {value: 81, label: "Кемеровская обл.",},
            {value: 82, label: "• Кемерово", disabled: true},

            {value: 83, label: "Кировская обл.",},
            {value: 84, label: "• Киров", disabled: true},

            {value: 85, label: "Костромская обл.",},
            {value: 86, label: "• Кострома", disabled: true},

            {value: 87, label: "Курганская обл.",},
            {value: 88, label: "• Курган", disabled: true},

            {value: 89, label: "Курская обл.",},
            {value: 90, label: "• Курск", disabled: true},
            
            {value: 91, label: "Ленинградская обл.",},
            {value: 92, label: "• Санкт-Петербург", disabled: true},
            {value: 93, label: "• Выборг", disabled: true},
            {value: 94, label: "• Гатчина", disabled: true},

            {value: 95, label: "Липецкая обл.",},
            {value: 96, label: "• Елец", disabled: true},
            {value: 97, label: "• Липецк", disabled: true},
            
            {value: 98, label: "Луганская обл.",},
            {value: 99, label: "• Луганск", disabled: true},
            
            {value: 100, label: "Марий-Эл Республика",},
            {value: 101, label: "• Йошкар-Ола", disabled: true},
            
            {value: 102, label: "Мордовия Республика",},
            {value: 103, label: "• Саранск", disabled: true},
            
            {value: 104, label: "Магаданская обл.",},
            {value: 105, label: "• Магадан", disabled: true},
            
            {value: 106, label: "Московская обл.",},
            {value: 107, label: "• Москва", disabled: true},
            
            // {value: 107, label: "Мурманская обл.",},
            // {value: 108, label: "• Мурманск", disabled: true},
            
            {value: 108, label: "Минская обл.",},
            {value: 109, label: "• Минск", disabled: true},
            
            {value: 110, label: "Нижегородская обл.",},
            {value: 111, label: "• Нижний Новгород", disabled: true},
            
            {value: 112, label: "Новгородская обл.",},
            {value: 113, label: "• Валдай", disabled: true},
            {value: 114, label: "• Великий Новгород", disabled: true},
            
            {value: 115, label: "Новосибирская обл.",},
            {value: 116, label: "• Новосибирск", disabled: true},

            {value: 117, label: "Ненецкий автономный округ",},
            {value: 118, label: "• Нарьян-Мар", disabled: true},

            {value: 119, label: "Омская обл.",},
            {value: 120, label: "• Омск", disabled: true},
            
            {value: 121, label: "Оренбургская обл.",},
            {value: 122, label: "• Оренбург", disabled: true},
            
            {value: 123, label: "Орловская обл.",},
            {value: 124, label: "• Орел", disabled: true},


            {value: 125, label: "Пермский обл.",},
            {value: 126, label: "• Пермь", disabled: true},
            {value: 127, label: "• Соликамск", disabled: true},

            {value: 128, label: "Приморский обл.",},
            {value: 129, label: "• Владивосток", disabled: true},

            {value: 130, label: "Пензенская обл.",},
            {value: 131, label: "• Пенза", disabled: true},

            {value: 132, label: "Псковская обл.",},
            {value: 133, label: "• Псков", disabled: true},


            {value: 134, label: "Ростовская обл.",},
            {value: 135, label: "• Ростов-на-Дону", disabled: true},
            {value: 136, label: "• Таганрог", disabled: true},
            

            {value: 137, label: "Рязанская обл.",},
            {value: 138, label: "• Рязань", disabled: true},

            {value: 139, label: "Северная Осетия-Алания",},
            {value: 140, label: "• Владикавказ", disabled: true},

            {value: 141, label: "Ставропольский край",},
            {value: 142, label: "• Кисловодск", disabled: true},
            {value: 143, label: "• Пятигорск", disabled: true},
            {value: 144, label: "• Ставрополь", disabled: true},

            {value: 145, label: "Самарская обл.",},
            {value: 146, label: "• Самара", disabled: true},
            {value: 147, label: "• Тольятти", disabled: true},

            {value: 148, label: "Саратовская обл.",},
            {value: 149, label: "• Саратов", disabled: true},

            {value: 150, label: "Сахалинская обл.",},
            {value: 151, label: "• Южно-Сахалинск", disabled: true},

            {value: 152, label: "Свердловская обл.",},
            {value: 153, label: "• Екатеринбург", disabled: true},
            {value: 154, label: "• Нижний Тагил", disabled: true},

            {value: 155, label: "Смоленская обл.",},
            {value: 156, label: "• Смоленск", disabled: true},

            {value: 157, label: "Татарстан Республика",},
            {value: 158, label: "• Казань", disabled: true},
            {value: 159, label: "• Набережные Челны", disabled: true},

            {value: 160, label: "Тыва (Тува) Республика",},
            {value: 161, label: "• Кызыл", disabled: true},

            {value: 162, label: "Тамбовская обл.",},
            {value: 163, label: "• Тамбов", disabled: true},

            {value: 164, label: "Тверская обл.",},
            {value: 165, label: "• Тверь", disabled: true},
            {value: 166, label: "• Ржев", disabled: true},

            {value: 167, label: "Томская обл.",},
            {value: 168, label: "• Томск", disabled: true},

            {value: 169, label: "Тульская обл.",},
            {value: 170, label: "• Тула", disabled: true},

            {value: 171, label: "Тюменская обл.",},
            {value: 172, label: "• Тюмень", disabled: true},

            {value: 173, label: "Удмуртия ",},
            {value: 174, label: "• Ижевск", disabled: true},

            {value: 175, label: "Ульяновская обл.",},
            {value: 176, label: "• Ульяновск", disabled: true},

            {value: 177, label: "Хакасия",},
            {value: 178, label: "• Абакан", disabled: true},

            {value: 179, label: "Хабаровский край",},
            {value: 180, label: "• Хабаровск", disabled: true},

            {value: 181, label: "Ханты-Мансийский автономный округ - Югра",},
            {value: 182, label: "• Ханты-Мансийск", disabled: true},

            {value: 183, label: "Чеченская Республика",},
            {value: 184, label: "• Грозный", disabled: true},

            {value: 185, label: "Чувашия",},
            {value: 186, label: "• Чебоксары", disabled: true},

            {value: 187, label: "Челябинская обл.",},
            {value: 188, label: "• Челябинск", disabled: true},

            {value: 189, label: "Чукотский автономный округ",},
            {value: 190, label: "• Анадырь", disabled: true},

            {value: 191, label: "Ярославская обл.",},
            {value: 192, label: "• Ростов Великий", disabled: true},
            {value: 193, label: "• Рыбинск", disabled: true},
            {value: 194, label: "• Ярославль", disabled: true},

            {value: 195, label: "Ямало-Ненецкий автономный округ",},
            {value: 196, label: "• Салехард", disabled: true},

            {value: 197, label: "Якутская область (Республика Саха)",},
            {value: 198, label: "• Якутск", disabled: true},

];

export default cityData;