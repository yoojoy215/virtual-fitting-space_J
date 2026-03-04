/* --- UI 제어 및 모달 --- */
function toggleChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
    }
}
function openModal() { document.getElementById('infoModal').style.display = 'flex'; }
function closeModal() { document.getElementById('infoModal').style.display = 'none'; }
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }

/* --- 챗봇 확장 기능 --- */
function expandChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('expanded');
    }
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}

/* --- 하트(찜) 기능 --- */
function toggleHeart(element) {
    element.classList.toggle('active');
    element.innerText = element.classList.contains('active') ? '❤️' : '🤍';
}

/* --- [BACKEND] 데이터 바인딩 --- */
const uniqueFashionPhotos = [
    '1515886657613-9f3515b0c78f', '1485230895905-ec40ba36b9bc', '1525507119028-ed4c629a60a3', '1492288991661-058aa541ff43',
    '1503342217505-b0a15ec3261c', '1539008835657-9e8e9680c956', '1551488831-00ddcb6c6bd3', '1483985988355-763728e1935b',
    '1487222477894-8943e31ef7b2', '1475180098004-ca77a66827be', '1509631179647-0177331693ae', '1532453288672-3a27e9be9efd',
    '1509631179647-0177331693ae', '1483985988355-763728e1935b', '1552374196-1ab2a1c593e8', '1506152983158-b4a74a01c721',
    '1532453288672-3a27e9be9efd', '1506152983158-b4a74a01c721', '1494790108377-be9c29b29330', '1500917293891-ef795e70e1f6'
];

const productsData = Array.from({ length: 20 }, (_, i) => ({
    id: `item_${i + 1}`,
    name: `FITTING SPACE COLLECTION ${i + 1}`,
    price: `${(Math.floor(Math.random() * 25) + 15) * 1000 + 900} KRW`,
    img: `https://images.unsplash.com/photo-${uniqueFashionPhotos[i]}?auto=format&fit=crop&w=800&q=80`
}));

window.onload = function() {
    // 1. 메인 페이지 로드
    const grid = document.querySelector('.product-grid');
    if (grid) {
        grid.innerHTML = productsData.map(item => `
            <a href="detail.html?id=${item.id}" class="product-card">
                <div class="product-image-box"><img src="${item.img}" alt="${item.name}"></div>
                <div class="product-info">
                    <h3>${item.name}</h3><p>${item.price}</p>
                </div>
            </a>
        `).join('');
    }

    // 2. 상세 페이지 로드
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = productsData.find(p => p.id === id);
    if (product && document.getElementById('detailTitle')) {
        document.getElementById('detailTitle').innerText = product.name;
        document.getElementById('detailPrice').innerText = product.price;
        document.getElementById('detailMainImg').src = product.img;
    }
};

/* --- AI 로딩 화면 제어 --- */
const loadingMessages = [
    "AI가 고객님의 체형을 분석하고 있습니다...",
    "선택하신 옷의 핏과 질감을 렌더링 중입니다...",
    "거의 다 되었습니다! 멋진 스타일을 준비 중입니다 ✨"
];

function showLoadingScreen() {
    let overlay = document.getElementById('aiLoading');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'aiLoading';
        overlay.className = 'ai-loading-overlay';
        overlay.innerHTML = `<div class="spinner"></div><div class="loading-text" id="loadingText">${loadingMessages[0]}</div>`;
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
    
    let msgIdx = 0;
    window.loadingInterval = setInterval(() => {
        msgIdx = (msgIdx + 1) % loadingMessages.length;
        document.getElementById('loadingText').innerText = loadingMessages[msgIdx];
    }, 2500);
}

function hideLoadingScreen() {
    const overlay = document.getElementById('aiLoading');
    if (overlay) {
        overlay.style.display = 'none';
        clearInterval(window.loadingInterval);
    }
}

/* --- 사진 업로드 (디테일 페이지) --- */
function previewUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const outputZone = document.getElementById('outputZone');
            outputZone.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:contain;">`;
            outputZone.style.border = 'none';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// 피팅 버튼 클릭 시뮬레이션
function generateTryOn() {
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        alert("API 연결 전입니다! De-CART 모델 결과가 여기에 렌더링됩니다.");
    }, 6000); 
}

/* --- 스튜디오 페이지 웹캠 제어 --- */
let stream = null;
async function toggleCamera() {
    const video = document.getElementById('inputCamera');
    const placeholder = document.getElementById('cameraPlaceholder');
    if (!video) return; // 상세/메인 페이지에서는 작동 안함
    
    if (stream) { 
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        if(placeholder) placeholder.style.display = 'block';
    } else { 
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            if(placeholder) placeholder.style.display = 'none';
        } catch (err) {
            alert("카메라 권한을 허용해주세요!");
        }
    }
}

function startRealtimeFit() {
    if (!stream) {
        alert("먼저 카메라를 켜주세요!");
        return;
    }
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        const outImg = document.getElementById('outputCamera');
        const outPlace = document.getElementById('outputPlaceholder');
        if(outPlace) outPlace.style.display = 'none';
        outImg.style.display = 'block';
        outImg.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'; 
    }, 3000);
}

/* --- [BACKEND API CONFIG] API 셋업 --- */
const API_BASE = {
    qwen: "https://qwen-api.azurewebsites.net", 
    decart: "https://decart-api.azurewebsites.net", 
    llm: "https://chatbot-api.azurewebsites.net" 
};

async function fetchFromAI(aiName, endpoint, data, isFormData = false) {
    try {
        const options = { method: 'POST' };
        if (isFormData) options.body = data;
        else {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(data);
        }
        const response = await fetch(`${API_BASE[aiName]}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error(`${aiName} 연결 실패:`, error);
    }
}