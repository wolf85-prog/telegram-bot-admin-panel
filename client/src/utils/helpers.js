export function parseShift(shifts, current, i) {
    // console.log(shifts, current, i)

  const [shift, hour] = current.split('T')

  if (shifts === undefined) {
    shifts[shift] = [hour]
  } else if (shift in shifts) {
    shifts[shift].push(hour)
  } else {
    shifts[shift] = [hour]
  }
  return shifts
}
