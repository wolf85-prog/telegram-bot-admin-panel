
const cityData = [
            {name: 'Выбрать...', label: 'Выбрать...',},
            {value: 1, label: 'Адыгея',},
            {value: 2, label: 'Майкоп', disabled: true },

            {value: 3, label: 'Амурская обл.',},
            {value: 4, label: "Горно-Алтайск", disabled: true },
            {value: 5, label: "Благовещенск", disabled: true },

            {value: 6, label: "Архангельская обл.",},
            {value: 7, label: "Архангельск", disabled: true },

            {value: 8, label: "Астраханская обл.",},
            {value: 9, label: "Астрахань", disabled: true },

            {value: 10, label: "Алтайский край",},
            {value: 11, label: "Барнаул", disabled: true },

            {value: 12, label: "Башкортостан",},
            {value: 13, label: "Уфа", disabled: true },

            {value: 14, label: "Белгородская обл.",},
            {value: 15, label: "Белгород", disabled: true },

            {value: 16, label: "Брянская обл.",},
            {value: 17, label: "Брянск", disabled: true },

            {value: 18, label: "Бурятия", },
            {value: 19, label: "Улан-Удэ", disabled: true },

            {value: 20, label: "Владимирская обл.",},
            {value: 21, label: "Владимир", disabled: true },
            {value: 22, label: "Муром", disabled: true },
            {value: 23, label: "Суздаль", disabled: true },

            {value: 24, label: "Волгоградская обл.",},
            {value: 25, label: "Волгоград", disabled: true},

            {value: 26, label: "Вологодская обл.",},
            {value: 27, label: "Вологда", disabled: true},
            {value: 28, label: "Череповец", disabled: true},

            {value: 29, label: "Воронежская обл.",},
            {value: 30, label: "Воронеж", disabled: true},

            {value: 31, label: "Гомельская обл.",},
            {value: 32, label: "Гомель", disabled: true},

            {value: 33, label: "Дагестан",},
            {value: 34, label: "Махачкала", disabled: true},

            {value: 36, label: "Еврейская автономная обл.",},
            {value: 37, label: "Биробиджан", disabled: true},

            {value: 38, label: "Забайкальский край",},
            {value: 39, label: "Чита", disabled: true},

            {value: 40, label: "Ингушетия",},
            {value: 41, label: "Магас", disabled: true},

            {value: 42, label: "Ивановская обл.",},
            {value: 43, label: "Иваново", disabled: true},

            {value: 44, label: "Иркутская обл.",},
            {value: 45, label: "Иркутск", disabled: true},

            {value: 46, label: "Кабардино-Балкарская Республика",},
            {value: 47, label: "Нальчик", disabled: true},

            {value: 48, label: "Калмыкия",},
            {value: 49, label: "Элиста", disabled: true},

            {value: 50, label: "Карачаево-Черкасская Республика",},
            {value: 51, label: "Черкесск", disabled: true},

            {value: 52, label: "Карелия",},
            {value: 53, label: "Петрозаводск", disabled: true},

            {value: 54, label: "Коми",},
            {value: 55, label: "Сыктывкар", disabled: true},
            {value: 56, label: "Петрозаводск", disabled: true},

            {value: 57, label: "Крым",},
            {value: 58, label: "Евпатория", disabled: true},
            {value: 59, label: "Керчь", disabled: true},
            {value: 60, label: "Феодосия", disabled: true},
            {value: 61, label: "Ялта", disabled: true},
            {value: 62, label: "Симферополь", disabled: true},
            {value: 63, label: "Севастополь", disabled: true},

            {value: 64, label: "Камчатский край",},
            {value: 65, label: "Петропавловск-Камчатский", disabled: true},

            {value: 66, label: "Краснодарский край", },
            {value: 67, label: "Анапа", disabled: true},
            {value: 68, label: "Краснодар", disabled: true},
            {value: 69, label: "Геленджик", disabled: true},
            {value: 70, label: "Новороссийск", disabled: true},
            {value: 71, label: "Сочи", disabled: true},

            {value: 72, label: "Красноярский край",},
            {value: 73, label: "Кросноярск", disabled: true},
            {value: 74, label: "Норильск", disabled: true},
            {value: 75, label: "Таганрог", disabled: true},

            {value: 76, label: "Калининградская обл.",},
            {value: 77, label: "Калининград ", disabled: true},

            {value: 78, label: "Калужская обл.",},
            {value: 79, label: "Калуга", disabled: true},

            {value: 80, label: "Кемеровская обл.",},
            {value: 81, label: "Кемерово", disabled: true},

            {value: 82, label: "Кировская обл.",},
            {value: 83, label: "Киров", disabled: true},

            {value: 84, label: "Костромская обл.",},
            {value: 85, label: "Кострома", disabled: true},

            {value: 86, label: "Курганская обл.",},
            {value: 87, label: "Курган", disabled: true},

            {value: 88, label: "Курская обл.",},
            {value: 89, label: "Курск", disabled: true},
            
            {value: 90, label: "Ленинградская обл.",},
            {value: 91, label: "Санкт-Петербург", disabled: true},
            {value: 92, label: "Выборг", disabled: true},
            {value: 93, label: "Гатчина", disabled: true},

            {value: 94, label: "Липецкая обл.",},
            {value: 95, label: "Елец", disabled: true},
            {value: 96, label: "Липецк", disabled: true},
            
            {value: 97, label: "Луганская обл.",},
            {value: 98, label: "Луганск", disabled: true},
            
            {value: 99, label: "Марий-Эл Республика",},
            {value: 100, label: "Йошкар-Ола", disabled: true},
            
            {value: 101, label: "Мордовия Республика",},
            {value: 102, label: "Саранск", disabled: true},
            
            {value: 103, label: "Магаданская обл.",},
            {value: 104, label: "Магадан", disabled: true},
            
            {value: 105, label: "Московская обл.",},
            {value: 106, label: "Москва", disabled: true},
            
            {value: 107, label: "Мурманская обл.",},
            {value: 108, label: "Мурманск", disabled: true},
            
            {value: 109, label: "Минская обл.",},
            {value: 110, label: "Минск", disabled: true},
            
            {value: 111, label: "Нижегородская обл.",},
            {value: 112, label: "Нижний Новгород", disabled: true},
            
            {value: 113, label: "Новгородская обл.",},
            {value: 114, label: "Валдай", disabled: true},
            {value: 115, label: "Великий Новгород", disabled: true},
            
            {value: 116, label: "Новосибирская обл.",},
            {value: 117, label: "Новосибирск", disabled: true},

            {value: 118, label: "Ненецкий автономный округ",},
            {value: 119, label: "Нарьян-Мар", disabled: true},

            {value: 120, label: "Омская обл.",},
            {value: 121, label: "Омск", disabled: true},
            
            {value: 122, label: "Оренбургская обл.",},
            {value: 123, label: "Оренбург", disabled: true},
            
            {value: 124, label: "Орловская обл.",},
            {value: 125, label: "Орел", disabled: true},


            {value: 126, label: "Пермский обл.",},
            {value: 127, label: "Пермь", disabled: true},
            {value: 128, label: "Соликамск", disabled: true},

            {value: 129, label: "Приморский обл.",},
            {value: 130, label: "Владивосток", disabled: true},

            {value: 131, label: "Пензенская обл.",},
            {value: 132, label: "Пенза", disabled: true},

            {value: 133, label: "Псковская обл.",},
            {value: 134, label: "Псков", disabled: true},


            {value: 135, label: "Ростовская обл.",},
            {value: 136, label: "Ростов-на-Дону", disabled: true},
            {value: 137, label: "Таганрог", disabled: true},
            

            {value: 138, label: "Рязанская обл.",},
            {value: 139, label: "Рязань", disabled: true},

            {value: 140, label: "Северная Осетия-Алания Республика",},
            {value: 141, label: "Владикавказ", disabled: true},

            {value: 142, label: "Ставропольский край",},
            {value: 143, label: "Кисловодск", disabled: true},
            {value: 144, label: "Пятигорск", disabled: true},
            {value: 145, label: "Ставрополь", disabled: true},

            {value: 146, label: "Самарская обл.",},
            {value: 147, label: "Самара", disabled: true},
            {value: 148, label: "Тольятти", disabled: true},

            {value: 149, label: "Саратовская обл.",},
            {value: 150, label: "Саратов", disabled: true},

            {value: 151, label: "Сахалинская обл.",},
            {value: 152, label: "Южно-Сахалинск", disabled: true},

            {value: 153, label: "Свердловская обл.",},
            {value: 154, label: "Екатеринбург", disabled: true},
            {value: 155, label: "Нижний Тагил", disabled: true},

            {value: 156, label: "Смоленская обл.",},
            {value: 157, label: "Смоленск", disabled: true},

            {value: 158, label: "Татарстан Республика",},
            {value: 159, label: "Казань", disabled: true},
            {value: 160, label: "Набережные Челны", disabled: true},

            {value: 161, label: "Тыва (Тува) Республика",},
            {value: 162, label: "Кызыл", disabled: true},

            {value: 163, label: "Тамбовская обл.",},
            {value: 164, label: "Тамбов", disabled: true},

            {value: 165, label: "Тверская обл.",},
            {value: 166, label: "Тверь", disabled: true},
            {value: 167, label: "Ржев", disabled: true},

            {value: 168, label: "Томская обл.",},
            {value: 169, label: "Томск", disabled: true},

            {value: 170, label: "Тульская обл.",},
            {value: 171, label: "Тула", disabled: true},

            {value: 172, label: "Тюменская обл.",},
            {value: 173, label: "Тюмень", disabled: true},

            {value: 174, label: "Удмуртская Республика ",},
            {value: 175, label: "Ижевск", disabled: true},

            {value: 176, label: "Ульяновская обл.",},
            {value: 177, label: "Ульяновск", disabled: true},

            {value: 178, label: "Хакасия Республика",},
            {value: 179, label: "Абакан", disabled: true},

            {value: 180, label: "Хабаровский край",},
            {value: 181, label: "Хабаровск", disabled: true},

            {value: 182, label: "Ханты-Мансийский автономный округ - Югра",},
            {value: 183, label: "Ханты-Мансийск", disabled: true},

            {value: 184, label: "Чеченская Республика",},
            {value: 185, label: "Грозный", disabled: true},

            {value: 186, label: "Чувашия",},
            {value: 187, label: "Чебоксары", disabled: true},

            {value: 188, label: "Челябинская обл.",},
            {value: 189, label: "Челябинск", disabled: true},

            {value: 190, label: "Чукотский автономный округ",},
            {value: 191, label: "Анадырь", disabled: true},

            {value: 192, label: "Ярославская обл.",},
            {value: 193, label: "Ростов Великий", disabled: true},
            {value: 194, label: "Рыбинск", disabled: true},
            {value: 195, label: "Ярославль", disabled: true},

            {value: 196, label: "Ямало-Ненецкий автономный округ",},
            {value: 197, label: "Салехард", disabled: true},

            {value: 198, label: "Якутская область (Республика Саха)",},
            {value: 199, label: "Якутск", disabled: true},

];

export default cityData;