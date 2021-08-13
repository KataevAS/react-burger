export const formatDate = (createdAt) => {
  const addZero = (n) => {
    return n < 10 ? '0' + n : n
  }

  const createTime = new Date(createdAt)
  const now = new Date()

  const lastDay = Math.ceil(Math.abs(now.getTime() - createTime.getTime()) / (1000 * 3600 * 24))
  const lastTime = addZero(createTime.getHours()) + ':' + addZero(createTime.getMinutes())
  const intervalGMT = new Date().getTimezoneOffset() / 60

  return `${lastDay === 1 ? 'Сегоня,' : lastDay === 2 ? 'Вчера,' : lastDay + ' дней назад,'} ${lastTime} i-GMT${
    intervalGMT > 0 ? '-' + intervalGMT : '+' + intervalGMT * -1
  }`
}
