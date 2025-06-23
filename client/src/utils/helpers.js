import dayjs from 'dayjs';
 import customParseFormat from 'dayjs/plugin/customParseFormat';
export function parseShift(shifts, current, i) {
  dayjs.extend(customParseFormat)
  let now = dayjs().subtract(1, 'day')
  
  console.log(shifts, current, i)
  console.log(dayjs(current, "DD.MM.YYYYTHH:MM"))
  console.log(now)
  

  // const [shift, hour] = current.split('T')

  // if (shifts === undefined) {
  //   shifts[shift] = [hour]
  // } else if (shift in shifts) {
  //   shifts[shift].push(hour)
  // } else {
  //   shifts[shift] = [hour]
  // }
  // return shifts
}
