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

/* --- [BACKEND] 상품 이미지 데이터 (14, 17, 18번 안정성 100% ID로 교체) --- */
const uniqueFashionPhotos = [
    '1515886657613-9f3515b0c78f', // 01.
    '1485230895905-ec40ba36b9bc', // 02.
    '1525507119028-ed4c629a60a3', // 03.
    '1492288991661-058aa541ff43', // 04.
    '1503342217505-b0a15ec3261c', // 05.
    '1539008835657-9e8e9680c956', // 06.
    '1551488831-00ddcb6c6bd3', // 07.
    '1483985988355-763728e1935b', // 08.
    '1487222477894-8943e31ef7b2', // 09.
    '1475180098004-ca77a66827be', // 10.
    '1509631179647-0177331693ae', // 11.
    '1532453288672-3a27e9be9efd', // 12.
    '1509631179647-0177331693ae', // 13.
    '1483985988355-763728e1935b', // 14. [새로 교체] 겨울 코트 패션
    '1552374196-1ab2a1c593e8', // 15.
    '1506152983158-b4a74a01c721', // 16.
    '1532453288672-3a27e9be9efd', // 17. [새로 교체] 레드 배경 패션
    '1506152983158-b4a74a01c721', // 18. [새로 교체] 화이트 원피스 룩
    '1494790108377-be9c29b29330', // 19.
    '1500917293891-ef795e70e1f6'  // 20.
];

const productsData = Array.from({ length: 20 }, (_, i) => ({
    id: `item_${i + 1}`,
    name: `FITTING SPACE COLLECTION ${i + 1}`,
    price: `${(Math.floor(Math.random() * 25) + 15) * 1000 + 900} KRW`,
    img: `https://images.unsplash.com/photo-${uniqueFashionPhotos[i]}?auto=format&fit=crop&w=800&q=80`
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

/* ======================================================================
🚀 [미래 백엔드 연동용 코드] 
나중에 데이터가 세팅되면, 위에 있는 하드코딩된 'productsData' 배열을 지우고 아래 주석을 풀어서 사용
======================================================================

async function loadRealProductsFromAzure() {
    try {
        // 1. 팀원이 만들어줄 Azure API 주소를 여기에 넣습니다.
        const apiUrl = 'https://우리아앱이름-api.azurewebsites.net/api/garments'; 
        
        // 2. 서버에 데이터를 달라고 요청(fetch)합니다.
        const response = await fetch(apiUrl);
        const realProductsData = await response.json();

        // 3. 받아온 진짜 데이터를 바탕으로 화면(Grid)을 다시 그립니다.
        const grid = document.querySelector('.product-grid');
        if (grid) {
            grid.innerHTML = realProductsData.map(item => `
                <a href="detail.html?id=${item.id}" class="product-card">
                    <div class="product-image-box">
                        <img src="${item.image_url}" alt="${item.name}">
                    </div>
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <p>${item.price} KRW</p>
                    </div>
                </a>
            `).join('');
        }
        console.log("✅ Azure DB에서 실제 데이터를 성공적으로 불러왔습니다!");

    } catch (error) {
        console.error("❌ 데이터를 불러오는데 실패했습니다:", error);
    }
}

// 나중에 진짜 연동할 때 아래 함수의 주석을 풀어서 실행되게 합니다.
// window.addEventListener('DOMContentLoaded', loadRealProductsFromAzure);
*/