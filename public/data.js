// 1. Azure Storage 기본 정보 설정
const STORAGE_ACCOUNT = "fittingspaceimage6"; 
const CONTAINER_NAME = "fitting-space-ui-image"; 

// 2. 발급받으신 SAS 토큰 (만료일: 26년 3월 13일)
const SAS_TOKEN = "?sp=rl&st=2026-03-05T06:44:53Z&se=2026-03-13T14:59:53Z&spr=https&sv=2024-11-04&sr=c&sig=LykhwRU4SEh%2BAKocqAcnS6LlbNvAFJ8xWvGadhxyeGo%3D";

// 3. 이미지 URL 자동 조립 함수
const getUrl = (id, fileName) => `https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/${id}/${fileName}${SAS_TOKEN}`;

// 4. Fitting Space PoC용 제품 마스터 데이터 (20개)
// 수정 포인트: export를 지우고 순수 window 객체에 할당합니다.
window.pocData = [
  // 👕 UPPER (상의)
  {
    id: "upper_001", name: "옥스포드 셔츠", category: "upper", gender: "male", style_tags: ["미니멀", "오피스"],
    look_images: [getUrl("upper_001", "look_01.jpg"), getUrl("upper_001", "look_02.jpg")],
    product_images: [getUrl("upper_001", "product_01.jpg")]
  },
  {
    id: "upper_002", name: "브이넥 니트", category: "upper", gender: "male", style_tags: ["미니멀", "데이트"],
    look_images: [getUrl("upper_002", "look_01.jpg"), getUrl("upper_002", "look_02.jpg")],
    product_images: [getUrl("upper_002", "product_01.jpg")]
  },
  {
    id: "upper_003", name: "크롭 데님 자켓", category: "upper", gender: "female", style_tags: ["캐주얼", "스트릿"],
    look_images: [getUrl("upper_003", "look_01.jpg"), getUrl("upper_003", "look_02.jpg")],
    product_images: [getUrl("upper_003", "product_01.jpg")]
  },
  {
    id: "upper_004", name: "린넨 셔츠", category: "upper", gender: "unisex", style_tags: ["미니멀", "휴양지"],
    look_images: [getUrl("upper_004", "look_01.jpg"), getUrl("upper_004", "look_02.jpg")],
    product_images: [getUrl("upper_004", "product_01.jpg")]
  },
  {
    id: "upper_005", name: "그래픽 티셔츠", category: "upper", gender: "unisex", style_tags: ["스트릿", "페스티벌"],
    look_images: [getUrl("upper_005", "look_01.jpg"), getUrl("upper_005", "look_02.jpg")],
    product_images: [getUrl("upper_005", "product_01.jpg")]
  },
  {
    id: "upper_006", name: "터틀넥 이너", category: "upper", gender: "unisex", style_tags: ["미니멀", "레이어드"],
    look_images: [getUrl("upper_006", "look_01.jpg"), getUrl("upper_006", "look_02.jpg")],
    product_images: [getUrl("upper_006", "product_01.jpg")]
  },
  {
    id: "upper_007", name: "후드 집업", category: "upper", gender: "unisex", style_tags: ["캐주얼", "데일리"],
    look_images: [getUrl("upper_007", "look_01.jpg"), getUrl("upper_007", "look_02.jpg")],
    product_images: [getUrl("upper_007", "product_01.jpg")]
  },
  {
    id: "upper_008", name: "블레이저 자켓", category: "upper", gender: "male", style_tags: ["포멀", "오피스"],
    look_images: [getUrl("upper_008", "look_01.jpg"), getUrl("upper_008", "look_02.jpg")],
    product_images: [getUrl("upper_008", "product_01.jpg")]
  },

  // 👖 BOTTOM (하의)
  {
    id: "bottom_001", name: "테이퍼드 슬랙스", category: "bottom", gender: "male", style_tags: ["오피스", "포멀"],
    look_images: [getUrl("bottom_001", "look_01.jpg"), getUrl("bottom_001", "look_02.jpg"), getUrl("bottom_001", "look_03.jpg"), getUrl("bottom_001", "look_04.jpg")],
    product_images: [getUrl("bottom_001", "product_01.jpg"), getUrl("bottom_001", "product_02.jpg"), getUrl("bottom_001", "product_03.jpg")]
  },
  {
    id: "bottom_002", name: "와이드 데님 팬츠", category: "bottom", gender: "unisex", style_tags: ["캐주얼", "스트릿"],
    look_images: [getUrl("bottom_002", "look_01.jpg"), getUrl("bottom_002", "look_02.jpg")],
    product_images: [getUrl("bottom_002", "product_01.jpg")]
  },
  {
    id: "bottom_003", name: "크림 치노 팬츠", category: "bottom", gender: "male", style_tags: ["미니멀", "데이트"],
    look_images: [getUrl("bottom_003", "look_01.jpg"), getUrl("bottom_003", "look_02.jpg")],
    product_images: [getUrl("bottom_003", "product_01.jpg")]
  },
  {
    id: "bottom_004", name: "카고 팬츠", category: "bottom", gender: "unisex", style_tags: ["스트릿", "페스티벌"],
    look_images: [getUrl("bottom_004", "look_01.jpg"), getUrl("bottom_004", "look_02.jpg")],
    product_images: [getUrl("bottom_004", "product_01.jpg")]
  },
  {
    id: "bottom_005", name: "데님 쇼츠", category: "bottom", gender: "unisex", style_tags: ["캐주얼", "휴양지"],
    look_images: [getUrl("bottom_005", "look_01.jpg"), getUrl("bottom_005", "look_02.jpg")],
    product_images: [getUrl("bottom_005", "product_01.jpg")]
  },
  {
    id: "bottom_006", name: "블랙 스커트", category: "bottom", gender: "female", style_tags: ["미니멀", "데이트"],
    look_images: [getUrl("bottom_006", "look_01.jpg"), getUrl("bottom_006", "look_02.jpg")],
    product_images: [getUrl("bottom_006", "product_01.jpg")]
  },
  {
    id: "bottom_007", name: "조거 팬츠", category: "bottom", gender: "unisex", style_tags: ["캐주얼", "원마일웨어"],
    look_images: [getUrl("bottom_007", "look_01.jpg"), getUrl("bottom_007", "look_02.jpg")],
    product_images: [getUrl("bottom_007", "product_01.jpg")]
  },

  // 👗 OVERALL (한벌옷)
  {
    id: "overall_001", name: "셔츠 원피스", category: "overall", gender: "female", style_tags: ["미니멀", "오피스"],
    look_images: [getUrl("overall_001", "look_01.jpg"), getUrl("overall_001", "look_02.jpg")],
    product_images: [getUrl("overall_001", "product_01.jpg")]
  },
  {
    id: "overall_002", name: "블랙 미디 원피스", category: "overall", gender: "female", style_tags: ["포멀"],
    look_images: [getUrl("overall_002", "look_01.jpg"), getUrl("overall_002", "look_02.jpg")],
    product_images: [getUrl("overall_002", "product_01.jpg")]
  },
  {
    id: "overall_003", name: "데님 원피스", category: "overall", gender: "female", style_tags: ["캐주얼"],
    look_images: [getUrl("overall_003", "look_01.jpg"), getUrl("overall_003", "look_02.jpg")],
    product_images: [getUrl("overall_003", "product_01.jpg")]
  },
  {
    id: "overall_004", name: "점프수트", category: "overall", gender: "female", style_tags: ["캐주얼", "데일리"],
    look_images: [getUrl("overall_004", "look_01.jpg"), getUrl("overall_004", "look_02.jpg")],
    product_images: [getUrl("overall_004", "product_01.jpg")]
  },
  {
    id: "overall_005", name: "플로럴 롱 원피스", category: "overall", gender: "female", style_tags: ["데이트", "휴양지"],
    look_images: [getUrl("overall_005", "look_01.jpg"), getUrl("overall_005", "look_02.jpg")],
    product_images: [getUrl("overall_005", "product_01.jpg")]
  }
];