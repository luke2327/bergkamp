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
