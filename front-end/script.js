/* --- UI 제어 함수 --- */
function toggleChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        const isHidden = chatWindow.style.display === 'none' || chatWindow.style.display === '';
        chatWindow.style.display = isHidden ? 'flex' : 'none';
    }
}

function openModal() { document.getElementById('infoModal').style.display = 'flex'; }
function closeModal() { document.getElementById('infoModal').style.display = 'none'; }
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }

/* --- [BACKEND] 상품 이미지 데이터 (이미지 20개 완전 복구) --- */
const fashionPhotos = [
    '1539106723-03501ad16a0e', '1434389677639-e4551726b24c', '1515886657613-9f3515b0c78f', '1581044777550-4cfa60707c03',
    '1485230895905-ec40ba36b9bc', '1509631179647-0177331693ae', '1525507119028-ed4c629a60a3', '1506152983158-b4a74a01c721',
    '1544441893-675973e3a985', '1585487000161-c400034606ca', '1467043237213-65f2da533965', '1490481651871-ab68de25d43d',
    '1554568212-9c67ad8b054a', '1475178626620-a4d074967452', '1551488831-00ddcb6c6bd3', '1496741475011-8558aa7c1f40',
    '1524041255633-8c77d4607730', '1523381210434-271e8be1f52b', '1502716119020-b3473f33dc03', '1512436991641-6745cdb1a701'
];

const productsData = Array.from({ length: 20 }, (_, i) => ({
    id: `item_${i + 1}`,
    name: `PREMIUM COLLECTION ${i + 1}`, // 명칭을 조금 더 고급스럽게 변경
    price: `${(Math.floor(Math.random() * 25) + 15) * 1000 + 900} KRW`,
    img: `https://images.unsplash.com/photo-${fashionPhotos[i]}?auto=format&fit=crop&w=800&q=80`
}));

window.onload = function() {
    // 1. 메인 페이지 그리드 렌더링
    const grid = document.querySelector('.product-grid');
    if (grid) {
        grid.innerHTML = productsData.map(item => `
            <a href="detail.html?id=${item.id}" class="product-card">
                <div class="product-image-box">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                </div>
            </a>
        `).join('');
    }

    // 2. 상세 페이지 데이터 바인딩
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = productsData.find(p => p.id === id);
    if (product && document.getElementById('detailTitle')) {
        document.getElementById('detailTitle').innerText = product.name;
        document.getElementById('detailPrice').innerText = product.price;
        document.getElementById('detailMainImg').src = product.img;
    }
};

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target.className === 'modal-overlay') {
        event.target.style.display = 'none';
    }
}