const STATUS_IN_PROGRESS = { id: 1, name: 'В работе', color: 'yellow.400', icon: '🟨' }
const STATUS_DONE = { id: 1, name: 'Расчитан', color: 'uley_green.0', icon: '🟩' }
const STATUS_NEW = { id: 1, name: 'Новый', color: 'uley_orange.0', icon: '🟧' }

let ic = '🟥🟦🟪'

export const STATUSES = [STATUS_IN_PROGRESS, STATUS_DONE, STATUS_NEW]

const estimates = [
  {
    id: 1,
    project: 'Проект №1',
    date: '08.08.2024',
    manager: 'Захаров М. Н.',
    hours: 15,
    payment: 12000,
    company: 'Компания 1',
    status: STATUS_NEW,
  },
  {
    id: 2,
    project: 'Проект №2',
    date: '07.08.2024',
    manager: 'Рогов А. Е.',
    hours: 10,
    payment: 25000,
    company: 'Компания 2',
    status: STATUS_DONE,
  },
  {
    id: 3,
    project: 'Проект №3',
    date: '18.07.2024',
    manager: 'Игнатов А. П.',
    hours: 10,
    payment: 12000,
    company: 'Компания 1',
    status: STATUS_IN_PROGRESS,
  },
  {
    id: 4,
    project: 'Проект №4',
    date: '25.06.2024',
    manager: 'Никитина А. И.',
    hours: 10,
    payment: 20000,
    company: 'Компания 1',
    status: STATUS_DONE,
  },
  {
    id: 5,
    date: '23.06.2024',
    project: 'Проект №5',
    manager: 'Фролов Г. П.',
    hours: 10,
    payment: 8000,
    company: 'Компания 1',
    status: STATUS_DONE,
  },
  {
    id: 6,
    project: 'Проект №6',
    date: '18.06.2024',
    manager: 'Игнатов А. П.',
    hours: 10,
    payment: 12000,
    company: 'Компания 3',
    status: STATUS_IN_PROGRESS,
  },
  {
    id: 7,
    project: 'Проект №7',
    date: '13.06.2024',
    manager: 'Игнатов А. П.',
    hours: 10,
    payment: 12000,
    company: 'Компания 2',
    status: STATUS_DONE,
  },
  {
    id: 8,
    project: 'Проект №8',
    date: '12.06.2024',
    manager: 'Захаров М. Н.',
    hours: 10,
    payment: 12000,
    company: 'Компания 1',
    status: STATUS_DONE,
  },
]

export default estimates

export const payRates = [
  {
    id: 1,
    category: 'Звук',
    speciality: 'Звукорежиссер',
    payRate: 10000,
    hours: 10,
    stavka1: 10000.0,
    stavka2: 12000,
    stavka3: 13000,
    stavka4: 14000,
    stavka5: 15000,
    stavka6: 16000,
    stavka7: 17000,
    stavka8: 18000,
  },
  {
    id: 2,
    category: 'Звук',
    speciality: 'Системный инженер',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 12000,
    stavka3: 13000,
    stavka4: 14000,
    stavka5: 15000,
    stavka6: 16000,
    stavka7: 17000,
    stavka8: 18000,
  },
  {
    id: 3,
    category: 'Звук',
    speciality: 'RF-Менеджер',
    payRate: 12000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 4,
    category: 'Звук',
    speciality: 'Backline',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 5,
    category: 'Звук',
    speciality: 'Roadie',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 6,
    category: 'Звук',
    speciality: 'Техник по звуку',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 7,
    category: 'Звук',
    speciality: 'Техник по звуку 2',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 8,
    category: 'Звук',
    speciality: 'Техник по звуку 3',
    payRate: 10000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 9,
    category: 'Звук',
    speciality: 'Техник по звуку 4',
    payRate: 15000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 10,
    category: 'Звук',
    speciality: 'Техник по звуку 4',
    payRate: 15000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 11,
    category: 'Свет',
    speciality: 'Техник по свету',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 12,
    category: 'Свет',
    speciality: 'Оператор световой пушки',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 13,
    category: 'Свет',
    speciality: 'Художник по свету',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 14,
    category: 'Свет',
    speciality: 'Гафер',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 15,
    category: 'Свет',
    speciality: 'Техник по свету 2',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 16,
    category: 'Свет',
    speciality: 'Техник по свету 3',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 17,
    category: 'Свет',
    speciality: 'Техник по свету 4',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 18,
    category: 'Свет',
    speciality: 'Техник по свету 5',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 19,
    category: 'Свет',
    speciality: 'Техник по свету 6',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 20,
    category: 'Свет',
    speciality: 'Техник по свету 7',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 21,
    category: 'Test1',
    speciality: 'Специальность 1',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 22,
    category: 'Test1',
    speciality: 'Специальность 2',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 23,
    category: 'Test1',
    speciality: 'Специальность 3',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 24,
    category: 'Test1',
    speciality: 'Специальность 4',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 25,
    category: 'Test1',
    speciality: 'Специальность 5',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 26,
    category: 'Test1',
    speciality: 'Специальность 6',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 27,
    category: 'Test1',
    speciality: 'Специальность 7',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 28,
    category: 'Test1',
    speciality: 'Специальность 8',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 29,
    category: 'Test1',
    speciality: 'Специальность 9',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
  {
    id: 30,
    category: 'Test1',
    speciality: 'Специальность 10',
    payRate: 8000,
    hours: 10,
    stavka1: 10000,
    stavka2: 10000,
    stavka3: 10000,
    stavka4: 10000,
    stavka5: 10000,
    stavka6: 10000,
    stavka7: 10000,
    stavka8: 10000,
  },
]

export const groups = [
  { id: 1, name: 'Звук' },
  { id: 2, name: 'Свет' },
  { id: 3, name: 'Видео' },
  { id: 4, name: 'Фото' },
  { id: 5, name: 'Промо' },
  { id: 6, name: 'Кейтеринг' },
  { id: 7, name: 'Помощники' },
  { id: 8, name: 'Риггеры / Сцена' },
  { id: 9, name: 'Грузоперевозки' },
  { id: 10, name: 'Артист' },
  { id: 11, name: 'Игры' },
  { id: 12, name: 'Технический продакшн' },
  { id: 13, name: 'U.L.E.Y' },
]