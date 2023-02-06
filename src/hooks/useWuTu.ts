import { sixtyList } from './useDate'
// 这里计算乌兔太阳
export const useWuTu = solar => {
  //乌兔太阳日
  const isWuTuTaiYangRi = () => {
    const day = solar.format('cD')
    const lunarDay = solar.lunar.day
    const sixtyListLong = sixtyList.concat(sixtyList).concat(sixtyList)
    const index = sixtyListLong.findIndex(x => x === day)
    const chuYiGanZhi = sixtyListLong[index + 1 - lunarDay]
    let data = false
    if (chuYiGanZhi) {
      if (
        (chuYiGanZhi === '甲子' && day === '己巳' && lunarDay === 6) ||
        (chuYiGanZhi === '甲子' && day === '戊寅' && lunarDay === 15) ||
        (chuYiGanZhi === '甲子' && day === '丁亥' && lunarDay === 24) ||
        (chuYiGanZhi === '乙丑' && day === '乙丑' && lunarDay === 1) ||
        (chuYiGanZhi === '乙丑' && day === '甲戌' && lunarDay === 10) ||
        (chuYiGanZhi === '乙丑' && day === '癸未' && lunarDay === 19) ||
        (chuYiGanZhi === '乙丑' && day === '壬辰' && lunarDay === 28) ||
        (chuYiGanZhi === '丙寅' && day === '丙寅' && lunarDay === 1) ||
        (chuYiGanZhi === '丙寅' && day === '乙亥' && lunarDay === 10) ||
        (chuYiGanZhi === '丙寅' && day === '甲申' && lunarDay === 19) ||
        (chuYiGanZhi === '丙寅' && day === '癸巳' && lunarDay === 28) ||
        (chuYiGanZhi === '丁卯' && day === '甲戌' && lunarDay === 8) ||
        (chuYiGanZhi === '丁卯' && day === '癸未' && lunarDay === 17) ||
        (chuYiGanZhi === '丁卯' && day === '壬辰' && lunarDay === 26) ||
        (chuYiGanZhi === '戊辰' && day === '戊辰' && lunarDay === 1) ||
        (chuYiGanZhi === '戊辰' && day === '丁丑' && lunarDay === 10) ||
        (chuYiGanZhi === '戊辰' && day === '丙戌' && lunarDay === 19) ||
        (chuYiGanZhi === '戊辰' && day === '乙未' && lunarDay === 28) ||
        (chuYiGanZhi === '己巳' && day === '己巳' && lunarDay === 1) ||
        (chuYiGanZhi === '己巳' && day === '戊寅' && lunarDay === 10) ||
        (chuYiGanZhi === '己巳' && day === '丁亥' && lunarDay === 19) ||
        (chuYiGanZhi === '己巳' && day === '丙申' && lunarDay === 28) ||
        (chuYiGanZhi === '庚午' && day === '甲戌' && lunarDay === 5) ||
        (chuYiGanZhi === '庚午' && day === '癸未' && lunarDay === 14) ||
        (chuYiGanZhi === '庚午' && day === '壬辰' && lunarDay === 23) ||
        (chuYiGanZhi === '辛未' && day === '丙子' && lunarDay === 6) ||
        (chuYiGanZhi === '辛未' && day === '乙酉' && lunarDay === 15) ||
        (chuYiGanZhi === '辛未' && day === '甲午' && lunarDay === 24) ||
        (chuYiGanZhi === '壬申' && day === '丙子' && lunarDay === 5) ||
        (chuYiGanZhi === '壬申' && day === '乙酉' && lunarDay === 14) ||
        (chuYiGanZhi === '壬申' && day === '甲午' && lunarDay === 23) ||
        (chuYiGanZhi === '癸酉' && day === '辛巳' && lunarDay === 9) ||
        (chuYiGanZhi === '癸酉' && day === '庚寅' && lunarDay === 18) ||
        (chuYiGanZhi === '癸酉' && day === '己亥' && lunarDay === 27) ||
        (chuYiGanZhi === '甲戌' && day === '庚辰' && lunarDay === 7) ||
        (chuYiGanZhi === '甲戌' && day === '己丑' && lunarDay === 16) ||
        (chuYiGanZhi === '甲戌' && day === '戊戌' && lunarDay === 25) ||
        (chuYiGanZhi === '乙亥' && day === '戊寅' && lunarDay === 4) ||
        (chuYiGanZhi === '乙亥' && day === '丁亥' && lunarDay === 13) ||
        (chuYiGanZhi === '乙亥' && day === '丙申' && lunarDay === 22) ||
        (chuYiGanZhi === '丙子' && day === '甲申' && lunarDay === 9) ||
        (chuYiGanZhi === '丙子' && day === '癸巳' && lunarDay === 18) ||
        (chuYiGanZhi === '丙子' && day === '壬寅' && lunarDay === 27) ||
        (chuYiGanZhi === '丁丑' && day === '己亥' && lunarDay === 3) ||
        (chuYiGanZhi === '丁丑' && day === '戊申' && lunarDay === 12) ||
        (chuYiGanZhi === '丁丑' && day === '丁巳' && lunarDay === 21) ||
        (chuYiGanZhi === '丁丑' && day === '丙寅' && lunarDay === 30) ||
        (chuYiGanZhi === '戊寅' && day === '庚辰' && lunarDay === 3) ||
        (chuYiGanZhi === '戊寅' && day === '己丑' && lunarDay === 12) ||
        (chuYiGanZhi === '戊寅' && day === '戊戌' && lunarDay === 21) ||
        (chuYiGanZhi === '戊寅' && day === '丁未' && lunarDay === 30) ||
        (chuYiGanZhi === '己卯' && day === '丙戌' && lunarDay === 8) ||
        (chuYiGanZhi === '己卯' && day === '乙未' && lunarDay === 17) ||
        (chuYiGanZhi === '己卯' && day === '甲辰' && lunarDay === 26) ||
        (chuYiGanZhi === '庚辰' && day === '庚辰' && lunarDay === 1) ||
        (chuYiGanZhi === '庚辰' && day === '己丑' && lunarDay === 10) ||
        (chuYiGanZhi === '庚辰' && day === '戊戌' && lunarDay === 19) ||
        (chuYiGanZhi === '庚辰' && day === '丁未' && lunarDay === 28) ||
        (chuYiGanZhi === '辛巳' && day === '辛巳' && lunarDay === 1) ||
        (chuYiGanZhi === '辛巳' && day === '庚寅' && lunarDay === 10) ||
        (chuYiGanZhi === '辛巳' && day === '己亥' && lunarDay === 19) ||
        (chuYiGanZhi === '辛巳' && day === '戊申' && lunarDay === 28) ||
        (chuYiGanZhi === '壬午' && day === '丁亥' && lunarDay === 6) ||
        (chuYiGanZhi === '壬午' && day === '丙申' && lunarDay === 15) ||
        (chuYiGanZhi === '壬午' && day === '乙巳' && lunarDay === 24) ||
        (chuYiGanZhi === '癸未' && day === '丁亥' && lunarDay === 5) ||
        (chuYiGanZhi === '癸未' && day === '丙申' && lunarDay === 14) ||
        (chuYiGanZhi === '癸未' && day === '乙巳' && lunarDay === 23) ||
        (chuYiGanZhi === '甲申' && day === '戊子' && lunarDay === 5) ||
        (chuYiGanZhi === '甲申' && day === '丁酉' && lunarDay === 14) ||
        (chuYiGanZhi === '甲申' && day === '丙午' && lunarDay === 23) ||
        (chuYiGanZhi === '乙酉' && day === '丙戌' && lunarDay === 2) ||
        (chuYiGanZhi === '乙酉' && day === '乙未' && lunarDay === 11) ||
        (chuYiGanZhi === '乙酉' && day === '甲辰' && lunarDay === 20) ||
        (chuYiGanZhi === '乙酉' && day === '癸丑' && lunarDay === 29) ||
        (chuYiGanZhi === '丙戌' && day === '己丑' && lunarDay === 4) ||
        (chuYiGanZhi === '丙戌' && day === '戊戌' && lunarDay === 13) ||
        (chuYiGanZhi === '丙戌' && day === '丁未' && lunarDay === 22) ||
        (chuYiGanZhi === '丁亥' && day === '癸巳' && lunarDay === 7) ||
        (chuYiGanZhi === '丁亥' && day === '壬寅' && lunarDay === 16) ||
        (chuYiGanZhi === '丁亥' && day === '辛亥' && lunarDay === 25) ||
        (chuYiGanZhi === '戊子' && day === '己丑' && lunarDay === 2) ||
        (chuYiGanZhi === '戊子' && day === '戊戌' && lunarDay === 11) ||
        (chuYiGanZhi === '戊子' && day === '丁未' && lunarDay === 20) ||
        (chuYiGanZhi === '戊子' && day === '丙辰' && lunarDay === 29) ||
        (chuYiGanZhi === '己丑' && day === '辛卯' && lunarDay === 3) ||
        (chuYiGanZhi === '己丑' && day === '庚子' && lunarDay === 12) ||
        (chuYiGanZhi === '己丑' && day === '己酉' && lunarDay === 21) ||
        (chuYiGanZhi === '己丑' && day === '戊午' && lunarDay === 30) ||
        (chuYiGanZhi === '庚寅' && day === '丁酉' && lunarDay === 8) ||
        (chuYiGanZhi === '庚寅' && day === '丙午' && lunarDay === 17) ||
        (chuYiGanZhi === '庚寅' && day === '乙卯' && lunarDay === 26) ||
        (chuYiGanZhi === '辛卯' && day === '癸巳' && lunarDay === 3) ||
        (chuYiGanZhi === '辛卯' && day === '壬寅' && lunarDay === 12) ||
        (chuYiGanZhi === '辛卯' && day === '辛亥' && lunarDay === 21) ||
        (chuYiGanZhi === '辛卯' && day === '庚申' && lunarDay === 30) ||
        (chuYiGanZhi === '壬辰' && day === '甲午' && lunarDay === 3) ||
        (chuYiGanZhi === '壬辰' && day === '癸卯' && lunarDay === 12) ||
        (chuYiGanZhi === '壬辰' && day === '壬子' && lunarDay === 21) ||
        (chuYiGanZhi === '壬辰' && day === '辛酉' && lunarDay === 30) ||
        (chuYiGanZhi === '癸巳' && day === '乙未' && lunarDay === 3) ||
        (chuYiGanZhi === '癸巳' && day === '甲辰' && lunarDay === 12) ||
        (chuYiGanZhi === '癸巳' && day === '癸丑' && lunarDay === 21) ||
        (chuYiGanZhi === '癸巳' && day === '壬戌' && lunarDay === 30) ||
        (chuYiGanZhi === '甲午' && day === '乙未' && lunarDay === 2) ||
        (chuYiGanZhi === '甲午' && day === '甲辰' && lunarDay === 11) ||
        (chuYiGanZhi === '甲午' && day === '癸丑' && lunarDay === 20) ||
        (chuYiGanZhi === '甲午' && day === '壬戌' && lunarDay === 29) ||
        (chuYiGanZhi === '乙未' && day === '戊戌' && lunarDay === 4) ||
        (chuYiGanZhi === '乙未' && day === '丁未' && lunarDay === 13) ||
        (chuYiGanZhi === '乙未' && day === '丙辰' && lunarDay === 22) ||
        (chuYiGanZhi === '丙申' && day === '己亥' && lunarDay === 4) ||
        (chuYiGanZhi === '丙申' && day === '戊申' && lunarDay === 13) ||
        (chuYiGanZhi === '丙申' && day === '丁巳' && lunarDay === 22) ||
        (chuYiGanZhi === '丁酉' && day === '乙巳' && lunarDay === 9) ||
        (chuYiGanZhi === '丁酉' && day === '甲寅' && lunarDay === 18) ||
        (chuYiGanZhi === '丁酉' && day === '癸亥' && lunarDay === 27) ||
        (chuYiGanZhi === '戊戌' && day === '壬寅' && lunarDay === 5) ||
        (chuYiGanZhi === '戊戌' && day === '辛亥' && lunarDay === 14) ||
        (chuYiGanZhi === '戊戌' && day === '庚申' && lunarDay === 23) ||
        (chuYiGanZhi === '己亥' && day === '癸卯' && lunarDay === 5) ||
        (chuYiGanZhi === '己亥' && day === '壬子' && lunarDay === 14) ||
        (chuYiGanZhi === '己亥' && day === '辛酉' && lunarDay === 23) ||
        (chuYiGanZhi === '庚子' && day === '甲辰' && lunarDay === 5) ||
        (chuYiGanZhi === '庚子' && day === '癸丑' && lunarDay === 14) ||
        (chuYiGanZhi === '庚子' && day === '壬戌' && lunarDay === 23) ||
        (chuYiGanZhi === '辛丑' && day === '辛丑' && lunarDay === 1) ||
        (chuYiGanZhi === '辛丑' && day === '庚戌' && lunarDay === 10) ||
        (chuYiGanZhi === '辛丑' && day === '己未' && lunarDay === 19) ||
        (chuYiGanZhi === '辛丑' && day === '戊辰' && lunarDay === 28) ||
        (chuYiGanZhi === '壬寅' && day === '壬寅' && lunarDay === 1) ||
        (chuYiGanZhi === '壬寅' && day === '辛亥' && lunarDay === 10) ||
        (chuYiGanZhi === '壬寅' && day === '庚申' && lunarDay === 19) ||
        (chuYiGanZhi === '壬寅' && day === '己巳' && lunarDay === 28) ||
        (chuYiGanZhi === '癸卯' && day === '庚戌' && lunarDay === 8) ||
        (chuYiGanZhi === '癸卯' && day === '己未' && lunarDay === 17) ||
        (chuYiGanZhi === '癸卯' && day === '戊辰' && lunarDay === 26) ||
        (chuYiGanZhi === '甲辰' && day === '甲辰' && lunarDay === 1) ||
        (chuYiGanZhi === '甲辰' && day === '癸丑' && lunarDay === 10) ||
        (chuYiGanZhi === '甲辰' && day === '壬戌' && lunarDay === 19) ||
        (chuYiGanZhi === '甲辰' && day === '辛未' && lunarDay === 28) ||
        (chuYiGanZhi === '乙巳' && day === '乙巳' && lunarDay === 1) ||
        (chuYiGanZhi === '乙巳' && day === '甲寅' && lunarDay === 10) ||
        (chuYiGanZhi === '乙巳' && day === '癸亥' && lunarDay === 19) ||
        (chuYiGanZhi === '乙巳' && day === '壬申' && lunarDay === 28) ||
        (chuYiGanZhi === '丙午' && day === '庚戌' && lunarDay === 5) ||
        (chuYiGanZhi === '丙午' && day === '己未' && lunarDay === 14) ||
        (chuYiGanZhi === '丙午' && day === '戊辰' && lunarDay === 23) ||
        (chuYiGanZhi === '丁未' && day === '辛亥' && lunarDay === 5) ||
        (chuYiGanZhi === '丁未' && day === '庚申' && lunarDay === 14) ||
        (chuYiGanZhi === '丁未' && day === '己巳' && lunarDay === 23) ||
        (chuYiGanZhi === '戊申' && day === '壬子' && lunarDay === 5) ||
        (chuYiGanZhi === '戊申' && day === '辛酉' && lunarDay === 14) ||
        (chuYiGanZhi === '戊申' && day === '庚午' && lunarDay === 23) ||
        (chuYiGanZhi === '己酉' && day === '丁巳' && lunarDay === 9) ||
        (chuYiGanZhi === '己酉' && day === '丙寅' && lunarDay === 18) ||
        (chuYiGanZhi === '己酉' && day === '乙亥 ' && lunarDay === 27) ||
        (chuYiGanZhi === '庚戌' && day === '癸丑' && lunarDay === 4) ||
        (chuYiGanZhi === '庚戌' && day === '壬戌' && lunarDay === 13) ||
        (chuYiGanZhi === '庚戌' && day === '辛未' && lunarDay === 22) ||
        (chuYiGanZhi === '辛亥' && day === '甲寅' && lunarDay === 4) ||
        (chuYiGanZhi === '辛亥' && day === '癸亥' && lunarDay === 13) ||
        (chuYiGanZhi === '辛亥' && day === '壬申' && lunarDay === 22) ||
        (chuYiGanZhi === '壬子' && day === '癸丑' && lunarDay === 2) ||
        (chuYiGanZhi === '壬子' && day === '壬戌' && lunarDay === 11) ||
        (chuYiGanZhi === '壬子' && day === '辛未' && lunarDay === 20) ||
        (chuYiGanZhi === '壬子' && day === '庚辰' && lunarDay === 29) ||
        (chuYiGanZhi === '癸丑' && day === '乙卯' && lunarDay === 3) ||
        (chuYiGanZhi === '癸丑' && day === '甲子' && lunarDay === 12) ||
        (chuYiGanZhi === '癸丑' && day === '癸酉' && lunarDay === 21) ||
        (chuYiGanZhi === '癸丑' && day === '壬午' && lunarDay === 30) ||
        (chuYiGanZhi === '甲寅' && day === '丙辰' && lunarDay === 3) ||
        (chuYiGanZhi === '甲寅' && day === '乙丑' && lunarDay === 12) ||
        (chuYiGanZhi === '甲寅' && day === '甲戌' && lunarDay === 21) ||
        (chuYiGanZhi === '甲寅' && day === '癸未' && lunarDay === 30) ||
        (chuYiGanZhi === '乙卯' && day === '丁巳' && lunarDay === 3) ||
        (chuYiGanZhi === '乙卯' && day === '丙寅' && lunarDay === 12) ||
        (chuYiGanZhi === '乙卯' && day === '乙亥' && lunarDay === 21) ||
        (chuYiGanZhi === '乙卯' && day === '甲申' && lunarDay === 30) ||
        (chuYiGanZhi === '丙辰' && day === '癸亥' && lunarDay === 8) ||
        (chuYiGanZhi === '丙辰' && day === '壬申' && lunarDay === 17) ||
        (chuYiGanZhi === '丙辰' && day === '辛巳' && lunarDay === 26) ||
        (chuYiGanZhi === '丁巳' && day === '己未' && lunarDay === 3) ||
        (chuYiGanZhi === '丁巳' && day === '戊辰' && lunarDay === 12) ||
        (chuYiGanZhi === '丁巳' && day === '丁丑' && lunarDay === 21) ||
        (chuYiGanZhi === '丁巳' && day === '丙辰' && lunarDay === 30) ||
        (chuYiGanZhi === '戊午' && day === '己未' && lunarDay === 2) ||
        (chuYiGanZhi === '戊午' && day === '戊辰' && lunarDay === 11) ||
        (chuYiGanZhi === '戊午' && day === '丁丑' && lunarDay === 20) ||
        (chuYiGanZhi === '戊午' && day === '丙辰' && lunarDay === 29) ||
        (chuYiGanZhi === '己未' && day === '乙丑' && lunarDay === 7) ||
        (chuYiGanZhi === '己未' && day === '甲戌' && lunarDay === 16) ||
        (chuYiGanZhi === '己未' && day === '癸未' && lunarDay === 25) ||
        (chuYiGanZhi === '庚申' && day === '癸亥' && lunarDay === 4) ||
        (chuYiGanZhi === '庚申' && day === '壬申' && lunarDay === 13) ||
        (chuYiGanZhi === '庚申' && day === '辛巳' && lunarDay === 22) ||
        (chuYiGanZhi === '辛酉' && day === '壬戌' && lunarDay === 2) ||
        (chuYiGanZhi === '辛酉' && day === '辛未' && lunarDay === 11) ||
        (chuYiGanZhi === '辛酉' && day === '庚辰' && lunarDay === 20) ||
        (chuYiGanZhi === '辛酉' && day === '己丑' && lunarDay === 29) ||
        (chuYiGanZhi === '壬戌' && day === '丙寅' && lunarDay === 5) ||
        (chuYiGanZhi === '壬戌' && day === '乙亥' && lunarDay === 14) ||
        (chuYiGanZhi === '壬戌' && day === '丙申' && lunarDay === 23) ||
        (chuYiGanZhi === '癸亥' && day === '丁卯' && lunarDay === 5) ||
        (chuYiGanZhi === '癸亥' && day === '丙子' && lunarDay === 14) ||
        (chuYiGanZhi === '癸亥' && day === '乙酉' && lunarDay === 23)
      ) {
        data = true
      }
    }
    return data
  }
  // //乌兔太阳时
  const isWuTuTaiYangShi = hourZhi => {
    const day = solar.format('cD')
    const lunarDay = solar.lunar.day
    const sixtyListLong = sixtyList.concat(sixtyList).concat(sixtyList)
    const index = sixtyListLong.findIndex(x => x === day)
    const chuYiGanZhi = sixtyListLong[index + 1 - lunarDay]
    let data = false
    if (chuYiGanZhi) {
      if (
        (chuYiGanZhi === '甲子' && day === '己巳' && lunarDay === 6 && hourZhi === '未') ||
        (chuYiGanZhi === '甲子' && day === '戊寅' && lunarDay === 15 && hourZhi === '卯') ||
        (chuYiGanZhi === '甲子' && day === '丁亥' && lunarDay === 24 && hourZhi === '申') ||
        (chuYiGanZhi === '乙丑' && day === '乙丑' && lunarDay === 1 && hourZhi === '申') ||
        (chuYiGanZhi === '乙丑' && day === '甲戌' && lunarDay === 10 && hourZhi === '未') ||
        (chuYiGanZhi === '乙丑' && day === '癸未' && lunarDay === 19 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙丑' && day === '壬辰' && lunarDay === 28 && hourZhi === '申') ||
        (chuYiGanZhi === '丙寅' && day === '丙寅' && lunarDay === 1 && hourZhi === '辰') ||
        (chuYiGanZhi === '丙寅' && day === '乙亥' && lunarDay === 10 && hourZhi === '申') ||
        (chuYiGanZhi === '丙寅' && day === '甲申' && lunarDay === 19 && hourZhi === '未') ||
        (chuYiGanZhi === '丙寅' && day === '癸巳' && lunarDay === 28 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁卯' && day === '甲戌' && lunarDay === 8 && hourZhi === '未') ||
        (chuYiGanZhi === '丁卯' && day === '癸未' && lunarDay === 17 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁卯' && day === '壬辰' && lunarDay === 26 && hourZhi === '申') ||
        (chuYiGanZhi === '戊辰' && day === '戊辰' && lunarDay === 1 && hourZhi === '卯') ||
        (chuYiGanZhi === '戊辰' && day === '丁丑' && lunarDay === 10 && hourZhi === '申') ||
        (chuYiGanZhi === '戊辰' && day === '丙戌' && lunarDay === 19 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊辰' && day === '乙未' && lunarDay === 28 && hourZhi === '申') ||
        (chuYiGanZhi === '己巳' && day === '己巳' && lunarDay === 1 && hourZhi === '未') ||
        (chuYiGanZhi === '己巳' && day === '戊寅' && lunarDay === 10 && hourZhi === '卯') ||
        (chuYiGanZhi === '己巳' && day === '丁亥' && lunarDay === 19 && hourZhi === '申') ||
        (chuYiGanZhi === '己巳' && day === '丙申' && lunarDay === 28 && hourZhi === '辰') ||
        (chuYiGanZhi === '庚午' && day === '甲戌' && lunarDay === 5 && hourZhi === '未') ||
        (chuYiGanZhi === '庚午' && day === '癸未' && lunarDay === 14 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚午' && day === '壬辰' && lunarDay === 23 && hourZhi === '申') ||
        (chuYiGanZhi === '辛未' && day === '丙子' && lunarDay === 6 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛未' && day === '乙酉' && lunarDay === 15 && hourZhi === '申') ||
        (chuYiGanZhi === '辛未' && day === '甲午' && lunarDay === 24 && hourZhi === '未') ||
        (chuYiGanZhi === '壬申' && day === '丙子' && lunarDay === 5 && hourZhi === '辰') ||
        (chuYiGanZhi === '壬申' && day === '乙酉' && lunarDay === 14 && hourZhi === '申') ||
        (chuYiGanZhi === '壬申' && day === '甲午' && lunarDay === 23 && hourZhi === '未') ||
        (chuYiGanZhi === '癸酉' && day === '辛巳' && lunarDay === 9 && hourZhi === '辰') ||
        (chuYiGanZhi === '癸酉' && day === '庚寅' && lunarDay === 18 && hourZhi === '申') ||
        (chuYiGanZhi === '癸酉' && day === '己亥' && lunarDay === 27 && hourZhi === '未') ||
        (chuYiGanZhi === '甲戌' && day === '庚辰' && lunarDay === 7 && hourZhi === '申') ||
        (chuYiGanZhi === '甲戌' && day === '己丑' && lunarDay === 16 && hourZhi === '未') ||
        (chuYiGanZhi === '甲戌' && day === '戊戌' && lunarDay === 25 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙亥' && day === '戊寅' && lunarDay === 4 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙亥' && day === '丁亥' && lunarDay === 13 && hourZhi === '申') ||
        (chuYiGanZhi === '乙亥' && day === '丙申' && lunarDay === 22 && hourZhi === '辰') ||
        (chuYiGanZhi === '丙子' && day === '甲申' && lunarDay === 9 && hourZhi === '未') ||
        (chuYiGanZhi === '丙子' && day === '癸巳' && lunarDay === 18 && hourZhi === '卯') ||
        (chuYiGanZhi === '丙子' && day === '壬寅' && lunarDay === 27 && hourZhi === '申') ||
        (chuYiGanZhi === '丁丑' && day === '己亥' && lunarDay === 3 && hourZhi === '未') ||
        (chuYiGanZhi === '丁丑' && day === '戊申' && lunarDay === 12 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁丑' && day === '丁巳' && lunarDay === 21 && hourZhi === '申') ||
        (chuYiGanZhi === '丁丑' && day === '丙寅' && lunarDay === 30 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊寅' && day === '庚辰' && lunarDay === 3 && hourZhi === '申') ||
        (chuYiGanZhi === '戊寅' && day === '己丑' && lunarDay === 12 && hourZhi === '未') ||
        (chuYiGanZhi === '戊寅' && day === '戊戌' && lunarDay === 21 && hourZhi === '卯') ||
        (chuYiGanZhi === '戊寅' && day === '丁未' && lunarDay === 30 && hourZhi === '申') ||
        (chuYiGanZhi === '己卯' && day === '丙戌' && lunarDay === 8 && hourZhi === '辰') ||
        (chuYiGanZhi === '己卯' && day === '乙未' && lunarDay === 17 && hourZhi === '申') ||
        (chuYiGanZhi === '己卯' && day === '甲辰' && lunarDay === 26 && hourZhi === '未') ||
        (chuYiGanZhi === '庚辰' && day === '庚辰' && lunarDay === 1 && hourZhi === '申') ||
        (chuYiGanZhi === '庚辰' && day === '己丑' && lunarDay === 10 && hourZhi === '未') ||
        (chuYiGanZhi === '庚辰' && day === '戊戌' && lunarDay === 19 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚辰' && day === '丁未' && lunarDay === 28 && hourZhi === '申') ||
        (chuYiGanZhi === '辛巳' && day === '辛巳' && lunarDay === 1 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛巳' && day === '庚寅' && lunarDay === 10 && hourZhi === '申') ||
        (chuYiGanZhi === '辛巳' && day === '己亥' && lunarDay === 19 && hourZhi === '未') ||
        (chuYiGanZhi === '辛巳' && day === '戊申' && lunarDay === 28 && hourZhi === '卯') ||
        (chuYiGanZhi === '壬午' && day === '丁亥' && lunarDay === 6 && hourZhi === '申') ||
        (chuYiGanZhi === '壬午' && day === '丙申' && lunarDay === 15 && hourZhi === '辰') ||
        (chuYiGanZhi === '壬午' && day === '乙巳' && lunarDay === 24 && hourZhi === '申') ||
        (chuYiGanZhi === '癸未' && day === '丁亥' && lunarDay === 5 && hourZhi === '申') ||
        (chuYiGanZhi === '癸未' && day === '丙申' && lunarDay === 14 && hourZhi === '辰') ||
        (chuYiGanZhi === '癸未' && day === '乙巳' && lunarDay === 23 && hourZhi === '申') ||
        (chuYiGanZhi === '甲申' && day === '戊子' && lunarDay === 5 && hourZhi === '卯') ||
        (chuYiGanZhi === '甲申' && day === '丁酉' && lunarDay === 14 && hourZhi === '申') ||
        (chuYiGanZhi === '甲申' && day === '丙午' && lunarDay === 23 && hourZhi === '辰') ||
        (chuYiGanZhi === '乙酉' && day === '丙戌' && lunarDay === 2 && hourZhi === '辰') ||
        (chuYiGanZhi === '乙酉' && day === '乙未' && lunarDay === 11 && hourZhi === '申') ||
        (chuYiGanZhi === '乙酉' && day === '甲辰' && lunarDay === 20 && hourZhi === '未') ||
        (chuYiGanZhi === '乙酉' && day === '癸丑' && lunarDay === 29 && hourZhi === '卯') ||
        (chuYiGanZhi === '丙戌' && day === '己丑' && lunarDay === 4 && hourZhi === '未') ||
        (chuYiGanZhi === '丙戌' && day === '戊戌' && lunarDay === 13 && hourZhi === '卯') ||
        (chuYiGanZhi === '丙戌' && day === '丁未' && lunarDay === 22 && hourZhi === '申') ||
        (chuYiGanZhi === '丁亥' && day === '癸巳' && lunarDay === 7 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁亥' && day === '壬寅' && lunarDay === 16 && hourZhi === '申') ||
        (chuYiGanZhi === '丁亥' && day === '辛亥' && lunarDay === 25 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊子' && day === '己丑' && lunarDay === 2 && hourZhi === '未') ||
        (chuYiGanZhi === '戊子' && day === '戊戌' && lunarDay === 11 && hourZhi === '卯') ||
        (chuYiGanZhi === '戊子' && day === '丁未' && lunarDay === 20 && hourZhi === '申') ||
        (chuYiGanZhi === '戊子' && day === '丙辰' && lunarDay === 29 && hourZhi === '辰') ||
        (chuYiGanZhi === '己丑' && day === '辛卯' && lunarDay === 3 && hourZhi === '辰') ||
        (chuYiGanZhi === '己丑' && day === '庚子' && lunarDay === 12 && hourZhi === '申') ||
        (chuYiGanZhi === '己丑' && day === '己酉' && lunarDay === 21 && hourZhi === '未') ||
        (chuYiGanZhi === '己丑' && day === '戊午' && lunarDay === 30 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚寅' && day === '丁酉' && lunarDay === 8 && hourZhi === '申') ||
        (chuYiGanZhi === '庚寅' && day === '丙午' && lunarDay === 17 && hourZhi === '辰') ||
        (chuYiGanZhi === '庚寅' && day === '乙卯' && lunarDay === 26 && hourZhi === '申') ||
        (chuYiGanZhi === '辛卯' && day === '癸巳' && lunarDay === 3 && hourZhi === '卯') ||
        (chuYiGanZhi === '辛卯' && day === '壬寅' && lunarDay === 12 && hourZhi === '申') ||
        (chuYiGanZhi === '辛卯' && day === '辛亥' && lunarDay === 21 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛卯' && day === '庚申' && lunarDay === 30 && hourZhi === '申') ||
        (chuYiGanZhi === '壬辰' && day === '甲午' && lunarDay === 3 && hourZhi === '未') ||
        (chuYiGanZhi === '壬辰' && day === '癸卯' && lunarDay === 12 && hourZhi === '卯') ||
        (chuYiGanZhi === '壬辰' && day === '壬子' && lunarDay === 21 && hourZhi === '申') ||
        (chuYiGanZhi === '壬辰' && day === '辛酉' && lunarDay === 30 && hourZhi === '辰') ||
        (chuYiGanZhi === '癸巳' && day === '乙未' && lunarDay === 3 && hourZhi === '申') ||
        (chuYiGanZhi === '癸巳' && day === '甲辰' && lunarDay === 12 && hourZhi === '未') ||
        (chuYiGanZhi === '癸巳' && day === '癸丑' && lunarDay === 21 && hourZhi === '卯') ||
        (chuYiGanZhi === '癸巳' && day === '壬戌' && lunarDay === 30 && hourZhi === '申') ||
        (chuYiGanZhi === '甲午' && day === '乙未' && lunarDay === 2 && hourZhi === '申') ||
        (chuYiGanZhi === '甲午' && day === '甲辰' && lunarDay === 11 && hourZhi === '未') ||
        (chuYiGanZhi === '甲午' && day === '癸丑' && lunarDay === 20 && hourZhi === '卯') ||
        (chuYiGanZhi === '甲午' && day === '壬戌' && lunarDay === 29 && hourZhi === '申') ||
        (chuYiGanZhi === '乙未' && day === '戊戌' && lunarDay === 4 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙未' && day === '丁未' && lunarDay === 13 && hourZhi === '申') ||
        (chuYiGanZhi === '乙未' && day === '丙辰' && lunarDay === 22 && hourZhi === '辰') ||
        (chuYiGanZhi === '丙申' && day === '己亥' && lunarDay === 4 && hourZhi === '未') ||
        (chuYiGanZhi === '丙申' && day === '戊申' && lunarDay === 13 && hourZhi === '卯') ||
        (chuYiGanZhi === '丙申' && day === '丁巳' && lunarDay === 22 && hourZhi === '申') ||
        (chuYiGanZhi === '丁酉' && day === '乙巳' && lunarDay === 9 && hourZhi === '申') ||
        (chuYiGanZhi === '丁酉' && day === '甲寅' && lunarDay === 18 && hourZhi === '辰') ||
        (chuYiGanZhi === '丁酉' && day === '癸亥' && lunarDay === 27 && hourZhi === '卯') ||
        (chuYiGanZhi === '戊戌' && day === '壬寅' && lunarDay === 5 && hourZhi === '申') ||
        (chuYiGanZhi === '戊戌' && day === '辛亥' && lunarDay === 14 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊戌' && day === '庚申' && lunarDay === 23 && hourZhi === '申') ||
        (chuYiGanZhi === '己亥' && day === '癸卯' && lunarDay === 5 && hourZhi === '卯') ||
        (chuYiGanZhi === '己亥' && day === '壬子' && lunarDay === 14 && hourZhi === '申') ||
        (chuYiGanZhi === '己亥' && day === '辛酉' && lunarDay === 23 && hourZhi === '辰') ||
        (chuYiGanZhi === '庚子' && day === '甲辰' && lunarDay === 5 && hourZhi === '未') ||
        (chuYiGanZhi === '庚子' && day === '癸丑' && lunarDay === 14 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚子' && day === '壬戌' && lunarDay === 23 && hourZhi === '申') ||
        (chuYiGanZhi === '辛丑' && day === '辛丑' && lunarDay === 1 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛丑' && day === '庚戌' && lunarDay === 10 && hourZhi === '申') ||
        (chuYiGanZhi === '辛丑' && day === '己未' && lunarDay === 19 && hourZhi === '未') ||
        (chuYiGanZhi === '辛丑' && day === '戊辰' && lunarDay === 28 && hourZhi === '卯') ||
        (chuYiGanZhi === '壬寅' && day === '壬寅' && lunarDay === 1 && hourZhi === '申') ||
        (chuYiGanZhi === '壬寅' && day === '辛亥' && lunarDay === 10 && hourZhi === '辰') ||
        (chuYiGanZhi === '壬寅' && day === '庚申' && lunarDay === 19 && hourZhi === '申') ||
        (chuYiGanZhi === '壬寅' && day === '己巳' && lunarDay === 28 && hourZhi === '未') ||
        (chuYiGanZhi === '癸卯' && day === '庚戌' && lunarDay === 8 && hourZhi === '申') ||
        (chuYiGanZhi === '癸卯' && day === '己未' && lunarDay === 17 && hourZhi === '未') ||
        (chuYiGanZhi === '癸卯' && day === '戊辰' && lunarDay === 26 && hourZhi === '卯') ||
        (chuYiGanZhi === '甲辰' && day === '甲辰' && lunarDay === 1 && hourZhi === '未') ||
        (chuYiGanZhi === '甲辰' && day === '癸丑' && lunarDay === 10 && hourZhi === '卯') ||
        (chuYiGanZhi === '甲辰' && day === '壬戌' && lunarDay === 19 && hourZhi === '申') ||
        (chuYiGanZhi === '甲辰' && day === '辛未' && lunarDay === 28 && hourZhi === '辰') ||
        (chuYiGanZhi === '乙巳' && day === '乙巳' && lunarDay === 1 && hourZhi === '申') ||
        (chuYiGanZhi === '乙巳' && day === '甲寅' && lunarDay === 10 && hourZhi === '未') ||
        (chuYiGanZhi === '乙巳' && day === '癸亥' && lunarDay === 19 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙巳' && day === '壬申' && lunarDay === 28 && hourZhi === '申') ||
        (chuYiGanZhi === '丙午' && day === '庚戌' && lunarDay === 5 && hourZhi === '申') ||
        (chuYiGanZhi === '丙午' && day === '己未' && lunarDay === 14 && hourZhi === '未') ||
        (chuYiGanZhi === '丙午' && day === '戊辰' && lunarDay === 23 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁未' && day === '辛亥' && lunarDay === 5 && hourZhi === '辰') ||
        (chuYiGanZhi === '丁未' && day === '庚申' && lunarDay === 14 && hourZhi === '申') ||
        (chuYiGanZhi === '丁未' && day === '己巳' && lunarDay === 23 && hourZhi === '未') ||
        (chuYiGanZhi === '戊申' && day === '壬子' && lunarDay === 5 && hourZhi === '申') ||
        (chuYiGanZhi === '戊申' && day === '辛酉' && lunarDay === 14 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊申' && day === '庚午' && lunarDay === 23 && hourZhi === '申') ||
        (chuYiGanZhi === '己酉' && day === '丁巳' && lunarDay === 9 && hourZhi === '申') ||
        (chuYiGanZhi === '己酉' && day === '丙寅' && lunarDay === 18 && hourZhi === '辰') ||
        (chuYiGanZhi === '己酉' && day === '乙亥' && lunarDay === 27 && hourZhi === '申') ||
        (chuYiGanZhi === '庚戌' && day === '癸丑' && lunarDay === 4 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚戌' && day === '壬戌' && lunarDay === 13 && hourZhi === '申') ||
        (chuYiGanZhi === '庚戌' && day === '辛未' && lunarDay === 22 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛亥' && day === '甲寅' && lunarDay === 4 && hourZhi === '未') ||
        (chuYiGanZhi === '辛亥' && day === '癸亥' && lunarDay === 13 && hourZhi === '卯') ||
        (chuYiGanZhi === '辛亥' && day === '壬申' && lunarDay === 22 && hourZhi === '申') ||
        (chuYiGanZhi === '壬子' && day === '癸丑' && lunarDay === 2 && hourZhi === '卯') ||
        (chuYiGanZhi === '壬子' && day === '壬戌' && lunarDay === 11 && hourZhi === '申') ||
        (chuYiGanZhi === '壬子' && day === '辛未' && lunarDay === 20 && hourZhi === '辰') ||
        (chuYiGanZhi === '壬子' && day === '庚辰' && lunarDay === 29 && hourZhi === '申') ||
        (chuYiGanZhi === '癸丑' && day === '乙卯' && lunarDay === 3 && hourZhi === '申') ||
        (chuYiGanZhi === '癸丑' && day === '甲子' && lunarDay === 12 && hourZhi === '未') ||
        (chuYiGanZhi === '癸丑' && day === '癸酉' && lunarDay === 21 && hourZhi === '卯') ||
        (chuYiGanZhi === '癸丑' && day === '壬午' && lunarDay === 30 && hourZhi === '申') ||
        (chuYiGanZhi === '甲寅' && day === '丙辰' && lunarDay === 3 && hourZhi === '辰') ||
        (chuYiGanZhi === '甲寅' && day === '乙丑' && lunarDay === 12 && hourZhi === '申') ||
        (chuYiGanZhi === '甲寅' && day === '甲戌' && lunarDay === 21 && hourZhi === '未') ||
        (chuYiGanZhi === '甲寅' && day === '癸未' && lunarDay === 30 && hourZhi === '卯') ||
        (chuYiGanZhi === '乙卯' && day === '丁巳' && lunarDay === 3 && hourZhi === '申') ||
        (chuYiGanZhi === '乙卯' && day === '丙寅' && lunarDay === 12 && hourZhi === '辰') ||
        (chuYiGanZhi === '乙卯' && day === '乙亥' && lunarDay === 21 && hourZhi === '申') ||
        (chuYiGanZhi === '乙卯' && day === '甲申' && lunarDay === 30 && hourZhi === '未') ||
        (chuYiGanZhi === '丙辰' && day === '癸亥' && lunarDay === 8 && hourZhi === '卯') ||
        (chuYiGanZhi === '丙辰' && day === '壬申' && lunarDay === 17 && hourZhi === '申') ||
        (chuYiGanZhi === '丙辰' && day === '辛巳' && lunarDay === 26 && hourZhi === '辰') ||
        (chuYiGanZhi === '丁巳' && day === '己未' && lunarDay === 3 && hourZhi === '未') ||
        (chuYiGanZhi === '丁巳' && day === '戊辰' && lunarDay === 12 && hourZhi === '卯') ||
        (chuYiGanZhi === '丁巳' && day === '丁丑' && lunarDay === 21 && hourZhi === '申') ||
        (chuYiGanZhi === '丁巳' && day === '丙辰' && lunarDay === 30 && hourZhi === '辰') ||
        (chuYiGanZhi === '戊午' && day === '己未' && lunarDay === 2 && hourZhi === '未') ||
        (chuYiGanZhi === '戊午' && day === '戊辰' && lunarDay === 11 && hourZhi === '卯') ||
        (chuYiGanZhi === '戊午' && day === '丁丑' && lunarDay === 20 && hourZhi === '申') ||
        (chuYiGanZhi === '戊午' && day === '丙辰' && lunarDay === 29 && hourZhi === '辰') ||
        (chuYiGanZhi === '己未' && day === '乙丑' && lunarDay === 7 && hourZhi === '申') ||
        (chuYiGanZhi === '己未' && day === '甲戌' && lunarDay === 16 && hourZhi === '未') ||
        (chuYiGanZhi === '己未' && day === '癸未' && lunarDay === 25 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚申' && day === '癸亥' && lunarDay === 4 && hourZhi === '卯') ||
        (chuYiGanZhi === '庚申' && day === '壬申' && lunarDay === 13 && hourZhi === '申') ||
        (chuYiGanZhi === '庚申' && day === '辛巳' && lunarDay === 22 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛酉' && day === '壬戌' && lunarDay === 2 && hourZhi === '申') ||
        (chuYiGanZhi === '辛酉' && day === '辛未' && lunarDay === 11 && hourZhi === '辰') ||
        (chuYiGanZhi === '辛酉' && day === '庚辰' && lunarDay === 20 && hourZhi === '申') ||
        (chuYiGanZhi === '辛酉' && day === '己丑' && lunarDay === 29 && hourZhi === '未') ||
        (chuYiGanZhi === '壬戌' && day === '丙寅' && lunarDay === 5 && hourZhi === '辰') ||
        (chuYiGanZhi === '壬戌' && day === '乙亥' && lunarDay === 14 && hourZhi === '申') ||
        (chuYiGanZhi === '壬戌' && day === '丙申' && lunarDay === 23 && hourZhi === '未') ||
        (chuYiGanZhi === '癸亥' && day === '丁卯' && lunarDay === 5 && hourZhi === '申') ||
        (chuYiGanZhi === '癸亥' && day === '丙子' && lunarDay === 14 && hourZhi === '辰') ||
        (chuYiGanZhi === '癸亥' && day === '乙酉' && lunarDay === 23 && hourZhi === '申')
      ) {
        data = true
      }
    }
    return data
  }
  return {
    isWuTuTaiYangRi,
    isWuTuTaiYangShi,
  }
}
