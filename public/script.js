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
    element.innerText = element.classList.contains('active') ? '♥' : '♡';
}

/* --- [BACKEND] 데이터 바인딩 (수정됨) --- */
// 상품을 화면에 그려주는 핵심 함수
function renderProducts(category = 'all') {
    const grid = document.querySelector('.product-grid');
    if (!grid) return; // 메인 페이지가 아니면(detail 페이지 등) 실행 안 함

    // 1. 카테고리에 맞게 데이터 필터링 (pocData는 data.js에서 가져옴)
    const filteredData = category === 'all' 
        ? window.pocData 
        : window.pocData.filter(item => item.category === category);

    // 2. 화면 초기화 후 필터링된 데이터 렌더링
    grid.innerHTML = filteredData.map(item => `
        <a href="detail.html?id=${item.id}" class="product-card">
            <div class="product-image-box">
                <img src="${item.look_images[0]}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p style="font-size: 0.8em; color: gray;">${item.style_tags.join(', ')} | ${item.gender.toUpperCase()}</p>
            </div>
        </a>
    `).join('');
}

window.onload = function() {
    // 1. 메인 페이지 로드 시 '전체(all)' 상품 렌더링
    if (typeof renderProducts === 'function') {
        renderProducts('all');
    }

    // 2. 상세 페이지(detail.html) 데이터 로드 로직
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    // id가 있고, pocData가 정상 로드되었다면 실행
    if (id && typeof window.pocData !== 'undefined') {
        const product = window.pocData.find(p => p.id === id);
        if (product) {
            // [A] 상단 텍스트 및 메인 이미지 세팅
            if (document.getElementById('detailTitle')) {
                document.getElementById('detailTitle').innerText = product.name;
            }
            if(document.getElementById('detailPrice')) {
                document.getElementById('detailPrice').innerText = `${product.style_tags.join(', ')} | ${product.gender.toUpperCase()}`;
            }
            if(document.getElementById('detailCode')) {
                document.getElementById('detailCode').innerText = `PRODUCT ID: ${product.id}`;
            }
            // 룩북 첫 번째 사진을 메인으로!
            if(document.getElementById('detailMainImg')) {
                document.getElementById('detailMainImg').src = product.look_images[0];
            }

            // [B] 하단에 쇼핑몰처럼 남은 모든 이미지 일괄 나열
            const detailImagesContainer = document.getElementById('detailImagesContainer');
            if (detailImagesContainer) {
                detailImagesContainer.innerHTML = ''; 
                // look 이미지와 product 이미지 배열 합치기
                const allImages = [...product.look_images, ...product.product_images];
                
                allImages.forEach(imgUrl => {
                    const imgEl = `
                        <img src="${imgUrl}" alt="${product.name} 상세 이미지" 
                             style="max-width: 100%; width: 600px; height: auto; object-fit: cover; display: block;">
                    `;
                    detailImagesContainer.insertAdjacentHTML('beforeend', imgEl);
                });
            }
        }
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
    if (!video) return; 
    
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