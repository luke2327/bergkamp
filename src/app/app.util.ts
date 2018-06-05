let browserLang: string = 'en';
export function getLang(): string {
  return browserLang;
}
export function setLang(lang: string): void {
  browserLang = lang;
}
