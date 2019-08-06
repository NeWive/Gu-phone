export default function generateDate(date) {
    return `${date.getFullYear()}-0${date.getMonth()}-${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()} ${date.getHours() < 10 ? `0${date.getHours()}` :  date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
}