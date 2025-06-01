# 바닐라 JS 프로젝트 성능 개선

- url: https://front-5th-chapter4-2-basic-ten.vercel.app/

## 성능 개선 보고서

### 1. 개선 이유

- LCP (Largest Contentful Paint) 값이 14.56초로 기준을 크게 초과해 사용자 경험 저하 우려
- CLS (Cumulative Layout Shift)도 경고 수치에 근접해 UI 안정성 이슈
- Best Practices, Accessibility, SEO 등 전반적 지표도 낮게 나와 웹 표준/성능 개선 필요

### 2. 개선 방법

- **Hero 이미지 및 Best Sellers 이미지**: 명시적 `width`/`height` 지정으로 CLS 안정화
- **Hero 이미지**: `.webp` 포맷으로 교체 및 불필요한 스크립트 제거
- **Google Fonts 외부 로드 제거**: woff2 직접 배포, `preload` 적용
- **JS/CSS**: `defer/async`로 로딩 최적화
- **Cookie Consent** 라이브러리 최신화 (4.2.0으로 업그레이드)
- **무거운 JS 연산**을 chunk 처리해 메인 스레드 차단 최소화
- **Lazy loading**: 이미지 로딩 최적화
- **DOM 업데이트 최적화**: `documentFragment`를 사용해 리플로우·리페인트 최소화

### 3. 개선 후 향상된 지표

#### 보고서 성능 지표

| 지표               | 개선 전 (2025.6.1 23:17) | 개선 후 (2025.6.2 2:00) | 개선폭            |
| ------------------ | ------------------------ | ----------------------- | ----------------- |
| **Performance**    | 72%                      | 99%                     | ▲ 27%             |
| **Accessibility**  | 82%                      | 95%                     | ▲ 13%             |
| **Best Practices** | 75%                      | 96%                     | ▲ 21%             |
| **SEO**            | 82%                      | 91%                     | ▲ 9%              |
| **LCP**            | 14.56초                  | 2.03초                  | ▼ 12.53초 (개선!) |
| **CLS**            | 0.011                    | 0.009                   | ▼ 0.002 (안정화)  |

#### 구글 PageSpeed Insights 비교

**Before**
![Image](https://github.com/user-attachments/assets/b7402b08-1fd0-4309-8263-110b3c09784c)
**After**
![Image](https://github.com/user-attachments/assets/c7e5d0c6-3263-42ac-830c-a375984939a7)

### 4. 기타 보완사항

- CSS/JS 최적화 과정에서 렌더링 블로킹 리소스를 제거하고, inline script를 최소화해 초기 로드 성능을 높였습니다.
- CookieConsent 라이브러리를 최신 버전(v4.2.0)으로 업그레이드하여, 외부 스크립트의 보안성을 강화했습니다.
- Hero 이미지에 width/height를 명시적으로 설정해 CLS 안정화를 실현했습니다.
- 최적화 이후 Lighthouse 및 PageSpeed Insights에서 모두 안정적인 녹색 점수를 확보했습니다.

### 5. 결론

이번 성능 최적화 작업을 통해 LCP를 14.56초 → 2.03초로 대폭 개선했고, 전반적인 웹 성능 지표를 모두 녹색 구간으로 끌어올렸습니다.
Hero 이미지 및 외부 라이브러리 처리, JS/CSS 최적화를 함께 진행하며 **사용자 경험(UX)**을 눈에 띄게 향상했습니다.
추후에 PWA 성능도 개선해보면 좋을 거 같습니다.
