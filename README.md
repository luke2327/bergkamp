# Bergkamp

1. 설치방법
 1. node js, npm 설치
 2. angular-cli 설치(version을 1.7.4로 설치할것)
 3. git clone
 4. npm install
 5. node_module/apollo-client/core/ObservabeQuery.d.ts에서 tearDownQuery()를 강제로 public으로 바꿔준다.
 6. node_module/amazon-cognito-identity-js/index.d.ts 에
  public setUserMfaPreference(smsMfaSettings: string[], softwareTokenMfaSettings: string[], callback: NodeCallback<Error, string>): void; 를
 public setUserMfaPreference(smsMfaSettings: any, softwareTokenMfaSettings: any, callback: NodeCallback<Error, string>): void; 이렇게 바꿔준다.
 또한
 public sendMFASelectionAnswer(answerChallenge: any, callback: NodeCallback<Error, UserData>): void; 추가!!!!!
 See : https://github.com/aws-amplify/amplify-js/pull/1287/commits/0f8f9aa4c99f7653f57000cabea50a527817250e
2. Angular Cli 를 통한 생성방법(angular 관련 내용은 모두 아래의 방법대로할것! 자동으로 의존성 주입됨)
 1. module 생성 : ng generate module <module_name>
 2. class 생성 : ng generate class <class_name>
 3. component 생성 : ng generate component <component_name>
 4. service 생성 : ng generate service <service_name>
 5. build : ng build --prod --aot

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
  7. Feature_B203 Favorite 요약류 구현
   - angular material 적용
   - favorite api 연동
   - sortable table 구현
  8. Feature_B201 그래프 상단 요약정보 구현
   - 디자인 가이드 적용.
   - Directive 모듈 생성
   - appsync류 service 개선
   - 몇가지 코드류 개선
  9. Feature_B203_1 호가 정보전달 및 GUI 개발
   - 호가창 구현(animation 포함)
   - 거래 내역 요약 구현
   - 일단 GUI만 우선 구현함
  10. Feature_B204 매수/매도 정보전달및 GUI 개발
   - 일단 gui만 구현한다
   - 매수/매도 시장가/지정가 거래 ui는 비슷하므로 좀더 공통으로 구현할수 있도록 하자
  11. Feature_B205 App 거래화면 내거래
   - 내거래 화면 구현
   - 상단 거래내역 알람 구현
   - Main쪽 사소한(?) 에러 수정
  12. Feature_B200_2 Css to Sass
   - npm install node-sass --save-dev : node-sass 설치
   - ng set defaults.styleExt sass : 기본 스타일 형식 sass로
   - tymx-token-quote.component 를 pair-info.component를 상속받게 변경
  13. Feature_B209 Rest-api 연동및 방식 수정
   - order쪽 rest-api 연동
   - 호출과 응답을 분리
  14. Feature_B221 Wallet main 개발
   - wallet main page 개발
   - wallet rest-api 연동
  15. Feature_B222 코인별 입출금 화면
   - history쪽 코드가 중복이 발생하므로
   - 일단 transaction history부터 구현
   - drective에 파편화된 코드 합침
   - 날짜 모듈 적용(moment.js)
   - qr 코드류 개발로직 생성(library로 그냥 하면됨)
   - Feature_B223 코인별 입출금 화면및 로직도 추가함
   - 한 페이지라서 한번에 개발함
   - 출금화면쪽 로직이 복잡한데 쪼개는게 좋을지 냅두는게 좋을지는 쫌더 고민이 필요
  16. Feature_B311 로그인 페이지
   - js쪽 언어팩 적용(찾아보니 ng-translate 모듈로 됨(개좋음))
   - 이전까지 페이지당 모듈을 하나씩 썼는데
   - auth류(login, signup, google auth 등등)은 페이지만 많고 component를 한개정도 내외로 개발가능하므로 그냥 auth란 module 하나에 필요한 component를 모두 개발한다.
   - 바로 이전페이지로 쉽게 움직이기 위해 login->auth 나 signup->email-auth 동작은 한페이지 내에서 동작하도록 처리한다.
   - cognito 처리
   - signup 까지 모두 구현
  17. Feature_B332 account page 구현
   - 별명 변경 추가(by cognito)
   - 나머지는 대부분 샘플 데이터로 끼워넣기만 구현
  18. Feature_B336 비번 재설정 구현
   - sprint 3 남은 부분 처리 로직 구현
   - api 는 추후 작업 예정
5. 개발관련 참고할만한 사이트
 1. Angular 공식 :  https://angular.io/
 2. ng-bootstrap : https://ng-bootstrap.github.io/#/home
