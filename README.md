# 춘식 뉴스

## 🚀 주요 기능

- **무한 슬라이딩 캐러셀**: 헤드라인 뉴스를 보여주는 무한 슬라이딩 기능
- **반응형 디자인**: 다양한 디바이스에 최적화된 레이아웃
- **접근성 준수**: 웹 접근성 지침을 준수하여 모든 사용자가 이용 가능
- **성능 최적화**: 이미지 지연 로딩 및 가상화를 통한 성능 최적화

## 🛠️ 기술 스택

- **프론트엔드**: React 19, TypeScript
- **라우팅**: React Router 7
- **빌드 도구**: Vite 6
- **스타일링**: CSS Modules
- **패키지 관리**: Yarn 4

## 📂 프로젝트 구조

```
src/
├── assets/            # 이미지, 아이콘 등 정적 자산
├── components/        # 재사용 가능한 컴포넌트
│   └── Carousel/      # 캐러셀 컴포넌트 및 관련 파일
│       ├── context/   # 캐러셀 컨텍스트
│       ├── hooks/     # 캐러셀 관련 커스텀 훅
│       └── utils/     # 캐러셀 유틸리티 함수
├── lib/               # 유틸리티 함수 및 헬퍼
├── pages/             # 페이지 컴포넌트
│   └── news/          # 뉴스 페이지 관련 컴포넌트
│       ├── components/ # 뉴스 페이지 전용 컴포넌트
│       ├── mocks/     # 목업 데이터
│       └── types/     # 타입 정의
└── styles/            # 전역 스타일
```

## 🔍 주요 컴포넌트

### Carousel

무한 슬라이딩과 성능 최적화를 지원하는 캐러셀 컴포넌트입니다.

```jsx
<Carousel slides={headlineSlides} autoPlay={true} showIndicators={true} visibleRange={2} />
```

#### 특징:

- 무한 루프 슬라이딩 (처음과 끝이 자연스럽게 연결)
- 성능 최적화 (현재 보이는 슬라이드만 렌더링)
- 자동 재생 및 일시 정지 기능
- 키보드 및 터치 인터랙션 지원
- 웹 접근성 고려 (ARIA 속성 적용)

### HeadlineNews

주요 뉴스를 표시하는 컴포넌트로, 캐러셀을 활용하여 표시합니다.

### NewsHeader

뉴스 페이지의 헤더 컴포넌트입니다.

### CommonNews

일반 뉴스 목록을 표시하는 컴포넌트입니다.

## 🚀 시작하기

### 개발 환경 설정

```bash

# 프로젝트 폴더로 이동
cd choonsik-news

# Corepack 활성화 (yarn berry 의존성)
corepack enable

# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

## 🧪 성능 최적화 전략

- **컴포넌트 가상화**: 필요한 컴포넌트만 렌더링하여 리소스 절약
- **코드 스플리팅**: React.lazy()와 Suspense를 활용한 지연 로딩
- **CSS 최적화**: 불필요한 CSS 제거 및 최적화
