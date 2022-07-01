# 1. 프로젝트 실행 방법
- yarn : library 설치
- yarn start: dev server 시작

# 2. 주 사용 라이브러리와 사용 의도
- material ui : 과제에 ui component를 처리하기 위하 ui component library
- emotion : custom css 를 처리하기 위한 css in js 라이브러리
- axios : 비동기 데이터 처리를 위한 XhhtpRequest 라이브러리
- lodash : fp를 좀 더 편하게 처리하기 위한 라이브러리
- react-router-dom: router 처리를 위한 라이브러리
- jotai : 컴포넌트 간 데이터 공유를 위한 상태관리 라이브러리
- prettier : 코드 포매터 라이브러리
# 3. 프로젝트 폴더 구조와 설계 의도
- index.tsx : root 선택자에 mount 하는 tsx 파일
- App.tsx : root Component 
- Routes.tsx : 라우트 전용 jsx 파일
- src : 프로젝트 진행 코드의 집합
  - components : 화면을 구성하는 컴포넌트 모음
    - Account : 계정 정보 화면을 표현하는 컴포넌트
    - Common : 공통 사용 컴포넌트 모음
    - Home : index 화면 - 로그인 화면 컴포넌트
    - Reset : 비밀번호 변경 화면을 위한 컴포넌트 모음, 단계 별 컴포넌트와 Context Api Wrapper Component로 구성
  - constants : 프로젝트에서 사용되는 상수 모음
  - pages : 컴포넌트가 최종 렌더링 되는 화면
    - Account : 계정 정보 컴포넌트 집합 화면
    - Home : index 화면, 로그인 화면
    - Reset : 비밀번호 변경 컴포넌트 집합 화면, Context Api 로 Wrapping 되어 있음
  - store : 전체 상태 관리 코드의 모음
  - styles : styled 컴포넌트로 구성되며 스타일 요소를 포함하는 디렉토리
  - types : interface 또는 type 등 타입스크립트 타입 요소 모음
  - utils : 비즈니스 로직 외의 공통 로직의 모음
# 4. 컴포넌트 구조와 설계 의도
- Components : pages를 구성하는 화면 요소, component 모음을 통해 화면 구성
  - Common : 컴포넌트 간 공통적으로 사용되는 컴포넌트
  - Account: 계정 정보 컴포넌트 
  - Home : index 화면, 로그인 화면
  - Reset : 계정 비밀번호 변경 컴포넌트, spa를 통해 Reset 컴포넌트에서 라우팅 변경 없이 한 화면에서 스텝으로 구분해 렌더링이 일어남, context api로 래핑되어 있음.  
    - IssueCode : email code 발급 화면
    - ValidateCode : email에 발송된 코드 검증 페이지
    - ChangePassword : 비밀번호 변경 최종 페이지
    - ResetStore : Reset에서 사용되는 Context Api Wrapper
  - pages: components에 같은 이름으로 구성된 디렉토리를 렌더링하는 디렉토리
    - routing end point 개념으로 사용됨
    - end point이기 이전에 Context Api 또는 다른 Theme과 같은 전체 데이터 또는 환경 주입 코드를 래핑할때 사용
# 5. (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도
- jotai 
  - 전체 컴포넌트에서 공통적으로 사용하는 데이터
  - 별도의 보일러 플레이트 없이 개발할 수 있고 hook과 같은 사용성으로 간단히 이용 가능
  - 전체적으로 공용 사용되는 스토어 코드만 정의 
  - modal :
    - atoms : 모달 관련 상태의 atom 들을 정의
    - initialStates : atom의 초기값을 정의
  - user :
    - atoms : user 관련 상태의 atom 들을 정의
    - initialStates: user atom의 초기값을 정의
- Context Api
  - Reset password에서 props 드릴링을 방지하기 위해 사용
  - globally하게 사용하지는 않지만 한 화면에서 여러 상태가 다양한 컴포넌트에서 공유되어야 하는 상황에서 사용
  - Reset 컴포넌트에서 단계별로 화면이 진행되고 이것이 url routing하지 않아 url 접근을 막고자 스텝으로 구분
  - 스텝 정보도 context 스토어에서 관리를 하고 현 스텝에서 다음 스텝의 정보를 갖고 다음 스텝에 넘겨주어야 하는 형태였고 이를 로컬 훅으로 관리하고자 할때 데이터 공유가 어려워 context api 사용
