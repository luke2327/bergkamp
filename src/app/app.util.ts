let browserLang: string = 'en';
export function getLang(): string {
  return browserLang;
}
export function setLang(lang: string): void {
  browserLang = lang;
}
//country 코드류 처리
let browserCountry: string = 'US';
export function getCountry(): string {
  return browserCountry;
}
export function setCountry(country: string): void {
  browserCountry = country;
}
//유효숫자 리턴
//기획사항 : 10보자 작으면 소수점 8자리까지
//아닐경우 10억보다 크면 소숫점X, 그외는 유효숫자만큼
export function significantFig(price: number): number {
  let decimalPoint: number = 8;
  if(price < 10) {
    decimalPoint = 8;
  } else {
  decimalPoint = 9 - (Math.floor(Math.log10(price)) + 1);
    if(decimalPoint < 0){
      decimalPoint = 0;
    }
  }

  return significantFigByDP(price, decimalPoint);
}
//유효숫자 소숫점자리 리턴
export function significantFigByDP(price: number, decimalPoint: number): number {
  // console.log(price);
  return Number(price.toFixed(decimalPoint));
}
