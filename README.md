# 바닐라 JS 프로젝트 성능 개선

- url: https://front-5th-chapter4-2-basic-ten.vercel.app/

## 성능 개선 보고서

### 1. 개선 이유

- LCP (Largest Contentful Paint) 값이 14.56초로 기준을 크게 초과해 사용자 경험 저하 우려
- CLS (Cumulative Layout Shift)도 경고 수치에 근접해 UI 안정성 이슈
- Best Practices, Accessibility, SEO 등 전반적 지표도 낮게 나와 웹 표준/성능 개선 필요

### 2. 기준 값 정리

| 항목    | Good (🟢) | Needs Improvement (🟠) | Poor (🔴) |
| ------- | --------- | ---------------------- | --------- |
| **LCP** | < 2.5초   | < 4.0초                | ≥ 4.0초   |
| **INP** | < 200ms   | < 500ms                | ≥ 500ms   |
| **CLS** | < 0.1     | < 0.25                 | ≥ 0.25    |

### 3. 개선 방법

| 항목                       | 개선 방식                                  |
| -------------------------- | ------------------------------------------ |
| Hero / Best Sellers 이미지 | `width`/`height` 명시, `.webp` 포맷        |
| Google Fonts               | 외부 로딩 제거, `ttf` 직접 배포 및 preload |
| JS / CSS                   | `defer`, `async` 로 렌더링 블로킹 제거     |
| CookieConsent              | 최신 버전(v4.2.0) 적용 및 defer            |
| 이미지 로딩                | Lazy loading 적용                          |
| DOM 렌더링                 | `documentFragment` 사용                    |
| 연산 최적화                | 메인 스레드 블로킹 연산 chunk 처리         |

##### 이미지 포맷 변경 및 크기 명시

`/images/` 디렉토리에 있는 이미지(`Hero\__.webp`, `vr_.webp`)는 기존 JPEG/PNG에서 `.webp` 포맷으로 변경되어 용량이 줄고, 로딩 속도 향상됨 <br>
`<img>` 태그에 `width`, `height` 속성을 명시하여 CLS(Cumulative Layout Shift)를 방지

##### 폰트 최적화

`/css/fonts/`에 직접 `.ttf` 폰트를 저장하고, 외부 Google Fonts 대신 `preload` 및 local font loading을 적용함으로써 외부 요청 지연 제거 및 초기 렌더링 속도 향상

##### JavaScript 병렬 로딩 처리

`/js/main.js`, `/js/products.js` 파일을 `<script defer>`로 처리하여 렌더링 블로킹 제거. <br>
기존에는 `<script>`가 `<head>`에 있고 blocking으로 처리되어 LCP에 영향을 주었으나, `defer` 처리로 해결됨.

##### DOM 삽입 최적화

`document.createDocumentFragment()`를 사용해 여러 DOM 조작을 하나의 트랜잭션으로 처리함으로써 Reflow/Repaint 최소화.

##### Lazy Loading 적용

`<img loading="lazy">` 속성 적용하여, 사용자가 화면에 접근할 때만 이미지가 로드되도록 설정 → 불필요한 초기 트래픽 감소.

##### 쿠키 배너 최신화

`termsfeed.com`에서 불러오는 Cookie Consent 스크립트를 v4.2.0 최신 버전으로 교체하여 보안성과 퍼포먼스 모두 개선.

```html
<script
  defer
  type="text/javascript"
  src="https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js"
  charset="UTF-8"
></script>
```

### 4. 개선 후 향상된 지표

#### 보고서 성능 지표

| 지표               | 개선 전 (2025.6.1 23:17) | 개선 후 (2025.6.2 2:00) | 개선폭            |
| ------------------ | ------------------------ | ----------------------- | ----------------- |
| **Performance**    | 72%                      | 99%                     | ▲ 27%             |
| **Accessibility**  | 82%                      | 95%                     | ▲ 13%             |
| **Best Practices** | 75%                      | 96%                     | ▲ 21%             |
| **SEO**            | 82%                      | 91%                     | ▲ 9%              |
| **LCP**            | 14.56초                  | 2.03초                  | ▼ 12.53초 (개선!) |
| **CLS**            | 0.011                    | 0.009                   | ▼ 0.002 (안정화)  |

- PWA는 적용되어 있지 않아 여전히 0% 상태입니다. 추후 개선 여지 있음.

#### 구글 PageSpeed Insights 비교

**Before**
![Image](https://github.com/user-attachments/assets/b7402b08-1fd0-4309-8263-110b3c09784c)
**After**
![Image](https://github.com/user-attachments/assets/c7e5d0c6-3263-42ac-830c-a375984939a7)

### 5. 결론

이번 성능 최적화 작업을 통해 LCP를 14.56초 → 2.03초로 대폭 개선했고, 전반적인 웹 성능 지표를 모두 **녹색 구간**으로 끌어올렸습니다.
Hero 이미지 및 외부 라이브러리 처리, JS/CSS 최적화를 함께 진행하며 **사용자 경험(UX)**을 눈에 띄게 향상했습니다.

### 6. PWA 향후 도입 아이디어

- `manifest.json` 및 `service-worker.js`를 적용해 PWA 성능 점수(현재 0%)를 올릴 수 있습니다.
- 다음 항목 도입을 고려 가능
  - 오프라인 캐싱 (Workbox 사용)
  - 홈 화면에 추가 (manifest: display standalone)
  - Splash screen, theme color 설정
