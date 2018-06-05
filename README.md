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
 2. Feature_B135
  - translate 적용 :
    - ngx-translate 설치 : npm install @ngx-translate/core @ngx-translate/http-loader --save
    - i18n 폴더 추가 : asset/i18n
    - en.json, ko.json 추가
  - Header, Footer 모듈 살짝 개편
    - Header, Footer Component를 하나 아래로.. -> UI 작업은 모듈의 html 에서 하지않고 component의 html에서 하게 바꿔둠..
  - 변수를 app.const.ts에서 통합관리하려했지만 angular2+버전에선 global variable를 굳이 쓰지말라고 함..그래서 현재 고민중(정말 필요한 변수만 쓸 예정)
 3. Feature_B113 appsync 모듈 개발
  - (참고 : https://github.com/aws-samples/aws-mobile-appsync-chat-starter-angular)
  - appsync call 스타일도 최대한 비슷하게 개발함
  - apollo-angular, apollo-cache-inmemory, apollo-client, aws-appsync, graphql, graphql-tag 설치
  - aws-appsync 디렉터리 생성
   - types : 햄님이 준 정보 저장
   - query : 쿼리구문
   - subscription : subscription 구문
   - mutation : mutate 구문
   - service : 복수의 component에서 불려지기 편한 구조로 생성(using observable)
  4. Feature_B133 데스크탑 첫 페이지 레이아웃 개발
   - Feature_B113 내용 UI와 연결하는 간략한 테스트류 개발(main/quotes)
   - Directive로 실시간 시세반영 색깔변경로직 구현
   - appsync v10 alpha2 버전 적용
   - UI 디자인 가이드 css 적용(영역 배분, font, image 등등)
  5. Feature_B121 차트 구현
   - tradingview 모듈 추가
   - tradingview 모듈중 udf-compatible-datafeed 수정
   - 차트 구현(trade 모듈 추가)
  6. Feature_B137 initialize api 구현
   - rest-api 디렉터리내부에 구현
   - service에서 observable 패턴으로 구현
   - initialize api가 수행한후 main module이 실행되는 형태로 구현 -> app.component.onInit() 에다 구현하면됨.

5. 개발관련 참고할만한 사이트
 1. Angular 공식 :  https://angular.io/
 2. ng-bootstrap : https://ng-bootstrap.github.io/#/home
