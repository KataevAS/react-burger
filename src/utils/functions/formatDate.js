export const formatDate = (createdAt) => {
  const createTime = new Date(createdAt)
  const now = new Date()

  const lastDay = Math.ceil(Math.abs(now.getTime() - createTime.getTime()) / (1000 * 3600 * 24))
  const lastTime = createTime.getHours() + ':' + createTime.getMinutes()
  const intervalGMT = new Date().getTimezoneOffset() / 60

  return `${lastDay === 1 ? 'Сегоня' : lastDay === 2 ? 'Вчера' : lastDay + ' дней назад'} ${lastTime} i-GMT${
    intervalGMT > 0 ? '-' + intervalGMT : '+' + intervalGMT * -1
  }`
}
