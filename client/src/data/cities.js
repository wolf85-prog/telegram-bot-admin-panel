
const cities = [
            {name: 'Выбрать...', label: 'Выбрать...',},
            {value: 1, label: "Москва ",},
            {value: 2, label: "Санкт-Петербург"},
            
            {value: 3, label: 'Адыгея',},
            {value: 4, label: 'Майкоп'},

            {value: 5, label: 'Амурская обл.',},
            {value: 6, label: "Горно-Алтайск", },
            {value: 7, label: "Благовещенск",},

            {value: 8, label: "Архангельская обл.",},
            {value: 9, label: "Архангельск",  },

            {value: 10, label: "Астраханская обл.",},
            {value: 11, label: "Астрахань",  },

            {value: 12, label: "Алтайский край",},
            {value: 13, label: "Барнаул",  },

            {value: 14, label: "Башкортостан",},
            {value: 15, label: "Уфа",  },

            {value: 16, label: "Белгородская обл.",},
            {value: 17, label: "Белгород",  },

            {value: 18, label: "Брянская обл.",},
            {value: 19, label: "Брянск",  },

            {value: 20, label: "Бурятия", },
            {value: 21, label: "Улан-Удэ",  },

            {value: 22, label: "Владимирская обл.",},
            {value: 23, label: "Владимир",  },
            {value: 24, label: "Муром",  },
            {value: 25, label: "Суздаль",  },

            {value: 26, label: "Волгоградская обл.",},
            {value: 27, label: "Волгоград", },

            {value: 28, label: "Вологодская обл.",},
            {value: 29, label: "Вологда", },
            {value: 30, label: "Череповец", },

            {value: 31, label: "Воронежская обл.",},
            {value: 32, label: "Воронеж", },

            {value: 33, label: "Гомельская обл.",},
            {value: 34, label: "Гомель", },

            {value: 35, label: "Дагестан",},
            {value: 36, label: "Махачкала", },

            {value: 37, label: "ЕАО",},
            {value: 38, label: "Биробиджан", },

            {value: 39, label: "Забайкальский край",},
            {value: 40, label: "Чита", },

            {value: 41, label: "Ингушетия",},
            {value: 42, label: "Магас", },

            {value: 43, label: "Ивановская обл.",},
            {value: 44, label: "Иваново", },

            {value: 45, label: "Иркутская обл.",},
            {value: 46, label: "Иркутск", },

            {value: 47, label: "Кабардино-Балкарская Республика",},
            {value: 48, label: "Нальчик", },

            {value: 49, label: "Калмыкия",},
            {value: 50, label: "Элиста", },

            {value: 51, label: "Карачаево-Черкасская Республика",},
            {value: 52, label: "Черкесск", },

            {value: 53, label: "Карелия",},
            {value: 54, label: "Петрозаводск", },

            {value: 55, label: "Коми",},
            {value: 56, label: "Сыктывкар", },
            {value: 57, label: "Петрозаводск", },

            {value: 58, label: "Крым",},
            {value: 59, label: "Евпатория", },
            {value: 60, label: "Керчь", },
            {value: 61, label: "Феодосия", },
            {value: 62, label: "Ялта", },
            {value: 63, label: "Симферополь", },
            {value: 64, label: "Севастополь", },

            {value: 65, label: "Камчатский край",},
            {value: 66, label: "Петропавловск-Камчатский", },

            {value: 67, label: "Краснодарский край", },
            {value: 68, label: "Анапа", },
            {value: 69, label: "Краснодар", },
            {value: 70, label: "Геленджик", },
            {value: 71, label: "Новороссийск", },
            {value: 72, label: "Сочи", },

            {value: 73, label: "Красноярский край",},
            {value: 74, label: "Красноярск", },
            {value: 75, label: "Норильск", },
            {value: 76, label: "Таганрог", },

            {value: 77, label: "Калининградская обл.",},
            {value: 78, label: "Калининград ", },

            {value: 79, label: "Калужская обл.",},
            {value: 80, label: "Калуга", },

            {value: 81, label: "Кемеровская обл.",},
            {value: 82, label: "Кемерово", },

            {value: 83, label: "Кировская обл.",},
            {value: 84, label: "Киров", },

            {value: 85, label: "Костромская обл.",},
            {value: 86, label: "Кострома", },

            {value: 87, label: "Курганская обл.",},
            {value: 88, label: "Курган", },

            {value: 89, label: "Курская обл.",},
            {value: 90, label: "Курск", },
            
            {value: 91, label: "Ленинградская обл.",},
            {value: 92, label: "Санкт-Петербург", },
            {value: 93, label: "Выборг", },
            {value: 94, label: "Гатчина", },

            {value: 95, label: "Липецкая обл.",},
            {value: 96, label: "Елец", },
            {value: 97, label: "Липецк", },
            
            {value: 98, label: "Луганская обл.",},
            {value: 99, label: "Луганск", },
            
            {value: 100, label: "Марий-Эл",},
            {value: 101, label: "Йошкар-Ола", },
            
            {value: 102, label: "Мордовия",},
            {value: 103, label: "Саранск", },
            
            {value: 104, label: "Магаданская обл.",},
            {value: 105, label: "Магадан", },
            
            // {value: 106, label: "Московская обл.",},
            // {value: 107, label: "Москва", },
            
            {value: 106, label: "Мурманская обл.",},
            {value: 107, label: "Мурманск", },
            
            {value: 108, label: "Минская обл.",},
            {value: 109, label: "Минск", },
            
            {value: 110, label: "Нижегородская обл.",},
            {value: 111, label: "Нижний Новгород", },
            
            {value: 112, label: "Новгородская обл.",},
            {value: 113, label: "Валдай", },
            {value: 114, label: "Великий Новгород", },
            
            {value: 115, label: "Новосибирская обл.",},
            {value: 116, label: "Новосибирск", },

            {value: 117, label: "Ненецкий автономный округ",},
            {value: 118, label: "Нарьян-Мар", },

            {value: 119, label: "Омская обл.",},
            {value: 120, label: "Омск", },
            
            {value: 121, label: "Оренбургская обл.",},
            {value: 122, label: "Оренбург", },
            
            {value: 123, label: "Орловская обл.",},
            {value: 124, label: "Орел", },


            {value: 125, label: "Пермский обл.",},
            {value: 126, label: "Пермь", },
            {value: 127, label: "Соликамск", },

            {value: 128, label: "Приморский обл.",},
            {value: 129, label: "Владивосток", },

            {value: 130, label: "Пензенская обл.",},
            {value: 131, label: "Пенза", },

            {value: 132, label: "Псковская обл.",},
            {value: 133, label: "Псков", },


            {value: 134, label: "Ростовская обл.",},
            {value: 135, label: "Ростов-на-Дону", },
            {value: 136, label: "Таганрог", },
            

            {value: 137, label: "Рязанская обл.",},
            {value: 138, label: "Рязань", },

            {value: 139, label: "Северная Осетия-Алания",},
            {value: 140, label: "Владикавказ", },

            {value: 141, label: "Ставропольский край",},
            {value: 142, label: "Кисловодск", },
            {value: 143, label: "Пятигорск", },
            {value: 144, label: "Ставрополь", },

            {value: 145, label: "Самарская обл.",},
            {value: 146, label: "Самара", },
            {value: 147, label: "Тольятти", },

            {value: 148, label: "Саратовская обл.",},
            {value: 149, label: "Саратов", },

            {value: 150, label: "Сахалинская обл.",},
            {value: 151, label: "Южно-Сахалинск", },

            {value: 152, label: "Свердловская обл.",},
            {value: 153, label: "Екатеринбург", },
            {value: 154, label: "Нижний Тагил", },

            {value: 155, label: "Смоленская обл.",},
            {value: 156, label: "Смоленск", },

            {value: 157, label: "Татарстан",},
            {value: 158, label: "Казань", },
            {value: 159, label: "Набережные Челны", },

            {value: 160, label: "Тыва (Тува)",},
            {value: 161, label: "Кызыл", },

            {value: 162, label: "Тамбовская обл.",},
            {value: 163, label: "Тамбов", },

            {value: 164, label: "Тверская обл.",},
            {value: 165, label: "Тверь", },
            {value: 166, label: "Ржев", },

            {value: 167, label: "Томская обл.",},
            {value: 168, label: "Томск", },

            {value: 169, label: "Тульская обл.",},
            {value: 170, label: "Тула", },

            {value: 171, label: "Тюменская обл.",},
            {value: 172, label: "Тюмень", },

            {value: 173, label: "Удмуртия ",},
            {value: 174, label: "Ижевск", },

            {value: 175, label: "Ульяновская обл.",},
            {value: 176, label: "Ульяновск", },

            {value: 177, label: "Хакасия",},
            {value: 178, label: "Абакан", },

            {value: 179, label: "Хабаровский край",},
            {value: 180, label: "Хабаровск", },

            {value: 181, label: "Ханты-Мансийский автономный округ - Югра",},
            {value: 182, label: "Ханты-Мансийск", },

            {value: 183, label: "Чечня",},
            {value: 184, label: "Грозный", },

            {value: 185, label: "Чувашия",},
            {value: 186, label: "Чебоксары", },

            {value: 187, label: "Челябинская обл.",},
            {value: 188, label: "Челябинск", },

            {value: 189, label: "Чукотский автономный округ",},
            {value: 190, label: "Анадырь", },

            {value: 191, label: "Ярославская обл.",},
            {value: 192, label: "Ростов Великий", },
            {value: 193, label: "Рыбинск", },
            {value: 194, label: "Ярославль", },

            {value: 195, label: "Ямало-Ненецкий автономный округ",},
            {value: 196, label: "Салехард", },

            {value: 197, label: "Якутская область (Республика Саха)",},
            {value: 198, label: "Якутск", },

];

export default cities;