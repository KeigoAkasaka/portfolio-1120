// DOM要素の取得
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// バリデーション関数
function validateName(name) {
    if (!name.trim()) {
        return '名前を入力してください';
    }
    if (name.trim().length < 2) {
        return '名前は2文字以上で入力してください';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'メールアドレスを入力してください';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return '有効なメールアドレスを入力してください';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'メッセージを入力してください';
    }
    if (message.trim().length < 10) {
        return 'メッセージは10文字以上で入力してください';
    }
    return '';
}

// エラーメッセージの表示
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// フォーム送信処理
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // エラーメッセージをクリア
    clearError(nameError);
    clearError(emailError);
    clearError(messageError);
    formMessage.style.display = 'none';
    
    // バリデーション
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    
    let isValid = true;
    
    const nameErrorMsg = validateName(name);
    if (nameErrorMsg) {
        showError(nameError, nameErrorMsg);
        isValid = false;
    }
    
    const emailErrorMsg = validateEmail(email);
    if (emailErrorMsg) {
        showError(emailError, emailErrorMsg);
        isValid = false;
    }
    
    const messageErrorMsg = validateMessage(message);
    if (messageErrorMsg) {
        showError(messageError, messageErrorMsg);
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // フォーム送信のシミュレーション（実際の実装では、サーバーに送信）
    // ここでは成功メッセージを表示
    formMessage.textContent = 'お問い合わせありがとうございます。メッセージを送信しました。';
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    // フォームをリセット
    contactForm.reset();
    
    // 3秒後にメッセージを非表示
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// リアルタイムバリデーション（オプション）
nameInput.addEventListener('blur', function() {
    const error = validateName(this.value);
    if (error) {
        showError(nameError, error);
    } else {
        clearError(nameError);
    }
});

emailInput.addEventListener('blur', function() {
    const error = validateEmail(this.value);
    if (error) {
        showError(emailError, error);
    } else {
        clearError(emailError);
    }
});

messageInput.addEventListener('blur', function() {
    const error = validateMessage(this.value);
    if (error) {
        showError(messageError, error);
    } else {
        clearError(messageError);
    }
});

// 入力中はエラーメッセージをクリア
nameInput.addEventListener('input', function() {
    if (nameError.textContent) {
        clearError(nameError);
    }
});

emailInput.addEventListener('input', function() {
    if (emailError.textContent) {
        clearError(emailError);
    }
});

messageInput.addEventListener('input', function() {
    if (messageError.textContent) {
        clearError(messageError);
    }
});

// プロジェクトスライドアニメーション
function initProjectSlider() {
    const projectCards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    
    if (projectCards.length === 0) return;
    
    function showNextProject() {
        // 現在のカードを非表示にする
        projectCards[currentIndex].classList.remove('active');
        projectCards[currentIndex].classList.add('slide-out');
        
        // 次のインデックスを計算
        currentIndex = (currentIndex + 1) % projectCards.length;
        
        // 少し遅延を入れてから次のカードを表示
        setTimeout(() => {
            // すべてのカードからクラスを削除
            projectCards.forEach(card => {
                card.classList.remove('active', 'slide-out');
            });
            
            // 次のカードを表示
            projectCards[currentIndex].classList.add('active');
        }, 400);
    }
    
    // 3秒間隔でスライドを実行
    setInterval(showNextProject, 3000);
}

// ページ読み込み時にスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
    initProjectSlider();
});

