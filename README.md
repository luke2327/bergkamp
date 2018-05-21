# Bergkamp

1. 설치방법
 1. node js, npm 설치
 2. angular-cli 설치(version을 1.7.4로 설치할것)
 3. git clone
 4. npm install

2. Angular Cli 를 통한 생성방법(angular 관련 내용은 모두 아래의 방법대로할것! 자동으로 의존성 주입됨)
 1. module 생성 : ng generate module <module_name>
 2. class 생성 : ng generate class <class_name>
 3. component 생성 : ng generate component <component_name>
 4. service 생성 : ng generate service <service_name>

4. 개발내용 정리
 1. Feature_B101
  - 프로젝트 생성
  - 앱 구조 정의 : 모듈을 크게 Header, Footer, Body로 나눔(UI 구성으로) Body는 페이지에 따라 바뀌는 형태로 구성함
  - 기본 angular 버전 : 6 -> 5로 다운그레이드(aws-sdk가 6지원하지 않음)
  - ng bootstrap 설치 : npm install --save @ng-bootstrap/ng-bootstrap

5. 개발관련 참고할만한 사이트
 1. Angular 공식 :  https://angular.io/
 2. ng-bootstrap : https://ng-bootstrap.github.io/#/home
