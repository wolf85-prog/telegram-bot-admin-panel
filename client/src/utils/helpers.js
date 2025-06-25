import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ru'
import dayjs from 'dayjs';
 import customParseFormat from 'dayjs/plugin/customParseFormat';
export function parseShift(shifts, current, i) {
  dayjs.locale('ru')
  dayjs.extend(customParseFormat)
  let dayFilter = dayjs().subtract(1, 'day') 
  
  let currentDateTime = dayjs(current, 'DD.MM.YYYYTHH:mm', 'Europe/Moscow')  

  if (
    currentDateTime.format('DD.MM') in shifts &&
    currentDateTime > dayFilter
  ) {
    shifts[currentDateTime.format('DD.MM')].push(
      currentDateTime.format('HH:mm'),
    )
  } else if (
    !(currentDateTime.format('DD.MM') in shifts) &&
    currentDateTime > dayFilter
  ) {
    shifts[currentDateTime.format('DD.MM')] = [currentDateTime.format('HH:mm')]
  }
  
  return shifts
}
