// ===================================
// TaxoGenius - Quiz & Binomial Challenge
// ===================================

// Quiz Questions Array
const questions = [
    { text: "Dünya üzerinde keşfedilen yaklaşık 1,2 milyon canlı türü vardır.", answer: true },
    { text: "Kitapları konularına göre ayırmak gibi, canlıları sınıflandırmak da bilgiye erişimi kolaylaştırır.", answer: true },
    { text: "Taksonomi, canlıların sadece fiziksel özelliklerine göre yapılan sınıflandırmadır.", answer: false },
    { text: "Türlerin isimlendirilmesinde Carl Linnaeus'un önerdiği ikili adlandırma kullanılır.", answer: true },
    { text: "Âlemden tür basamağına doğru gidildikçe birey sayısı artar.", answer: false },
    { text: "Aynı türdeki canlılar birbiriyle çiftleştiğinde verimli (doğurgan) döl verebilir.", answer: true },
    { text: "Binomial adlandırmada birinci kelime her zaman küçük harfle başlar.", answer: false },
    { text: "Modern sınıflandırma sistemi canlıların akrabalık ilişkilerini (filogenetik) temel alır.", answer: true },
    { text: "Âlemden türe gidildikçe canlılar arasındaki protein benzerliği artar.", answer: true },
    { text: "Pinus nigra ve Pinus pinea türleri aynı cins içinde yer alır.", answer: true }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

// DOM Elements
const quizStart = document.getElementById('quizStart');
const quizGame = document.getElementById('quizGame');
const quizResult = document.getElementById('quizResult');
const startQuizBtn = document.getElementById('startQuizBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');

const quizProgress = document.getElementById('quizProgress');
const quizScore = document.getElementById('quizScore');
const questionText = document.getElementById('questionText');
const btnTrue = document.getElementById('btnTrue');
const btnFalse = document.getElementById('btnFalse');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedbackText');

const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultScore = document.getElementById('resultScore');
const resultMessage = document.getElementById('resultMessage');

// Binomial Challenge Elements
const binomialChallenge = document.getElementById('binomialChallenge');
const binomialInput = document.getElementById('binomialInput');
const checkBinomialBtn = document.getElementById('checkBinomialBtn');
const challengeFeedback = document.getElementById('challengeFeedback');

// ===================================
// Quiz Functions
// ===================================

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;
    
    quizStart.classList.add('hidden');
    quizResult.classList.add('hidden');
    quizGame.classList.remove('hidden');
    
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    questionText.textContent = question.text;
    quizProgress.textContent = `Soru ${currentQuestionIndex + 1}/${questions.length}`;
    quizScore.textContent = `Puan: ${score}`;
    
    // Reset UI
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'incorrect');
    btnTrue.disabled = false;
    btnFalse.disabled = false;
    isAnswered = false;
}

function checkAnswer(userAnswer) {
    if (isAnswered) return;
    
    isAnswered = true;
    const question = questions[currentQuestionIndex];
    const isCorrect = userAnswer === question.answer;
    
    // Disable buttons
    btnTrue.disabled = true;
    btnFalse.disabled = true;
    
    // Update score
    if (isCorrect) {
        score++;
        quizScore.textContent = `Puan: ${score}`;
    }
    
    // Show feedback
    feedback.classList.remove('hidden');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
        feedbackText.textContent = '✓ Doğru cevap!';
    } else {
        const correctAnswer = question.answer ? 'Doğru' : 'Yanlış';
        feedbackText.textContent = `✗ Yanlış! Doğru cevap: ${correctAnswer}`;
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizGame.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = (score / questions.length) * 100;
    
    // Update result display
    resultScore.textContent = `${score}/${questions.length} doğru cevap!`;
    
    // Set icon, title, and message based on score
    if (percentage === 100) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Mükemmel!';
        resultMessage.textContent = 'Tüm soruları doğru bildin! Gerçek bir taksonomi ustasısın!';
    } else if (percentage >= 80) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Harika!';
        resultMessage.textContent = 'Çok iyi bir performans! Taksonomi konusunda oldukça bilgilisin.';
    } else if (percentage >= 60) {
        resultIcon.textContent = '👍';
        resultTitle.textContent = 'İyi!';
        resultMessage.textContent = 'Güzel bir başlangıç! Biraz daha çalışarak daha da iyileştirebilirsin.';
    } else if (percentage >= 40) {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Geliştirebilirsin';
        resultMessage.textContent = 'Konu anlatımını tekrar okumayı dene!';
    } else {
        resultIcon.textContent = '💪';
        resultTitle.textContent = 'Tekrar Dene!';
        resultMessage.textContent = 'Endişelenme! Ders notlarını oku ve tekrar dene.';
    }
    
    // Reset binomial challenge
    binomialInput.value = '';
    challengeFeedback.classList.add('hidden');
    challengeFeedback.classList.remove('correct', 'incorrect');
}

function restartQuiz() {
    startQuiz();
}

// ===================================
// Binomial Challenge Functions
// ===================================

function checkBinomialName() {
    const userInput = binomialInput.value.trim();
    
    if (!userInput) {
        showChallengeFeedback('Lütfen bir bilimsel ad girin!', false);
        return;
    }
    
    // Expected answer: "Pinus nigra" (case-sensitive check)
    const expectedAnswer = 'Pinus nigra';
    
    // Check for exact match
    if (userInput === expectedAnswer) {
        showChallengeFeedback('🎉 Mükemmel! Binomial adlandırma kurallarına tam uygun!', true);
        checkBinomialBtn.disabled = true;
        binomialInput.disabled = true;
        return;
    }
    
    // Check for case variations
    if (userInput.toLowerCase() === expectedAnswer.toLowerCase()) {
        // Check specific issues
        const parts = userInput.split(' ');
        if (parts.length === 2) {
            const genusCorrect = parts[0][0] === parts[0][0].toUpperCase();
            const epithetCorrect = parts[1][0] === parts[1][0].toLowerCase();
            
            if (!genusCorrect && !epithetCorrect) {
                showChallengeFeedback('❌ Cins adı büyük harfle, tür epiteti küçük harfle başlamalı!', false);
            } else if (!genusCorrect) {
                showChallengeFeedback('❌ Cins adı (Pinus) büyük harfle başlamalı!', false);
            } else if (!epithetCorrect) {
                showChallengeFeedback('❌ Tür epiteti (nigra) küçük harfle başlamalı!', false);
            }
            return;
        }
    }
    
    // Check if it's a valid binomial format at all
    const parts = userInput.split(/\s+/);
    if (parts.length !== 2) {
        showChallengeFeedback('❌ Binomial ad iki kelimeden oluşmalı: Cins adı + tür epiteti', false);
        return;
    }
    
    // Generic wrong answer
    showChallengeFeedback(`❌ Yanlış! Karaçam'ın bilimsel adı: ${expectedAnswer}`, false);
}

function showChallengeFeedback(message, isCorrect) {
    challengeFeedback.textContent = message;
    challengeFeedback.classList.remove('hidden', 'correct', 'incorrect');
    challengeFeedback.classList.add(isCorrect ? 'correct' : 'incorrect');
}

// ===================================
// Event Listeners
// ===================================

// Quiz buttons
startQuizBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', restartQuiz);
btnTrue.addEventListener('click', () => checkAnswer(true));
btnFalse.addEventListener('click', () => checkAnswer(false));

// Binomial challenge
checkBinomialBtn.addEventListener('click', checkBinomialName);
binomialInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBinomialName();
    }
});

// ===================================
// Pyramid Layer Hover Enhancement
// ===================================

document.querySelectorAll('.pyramid-layer').forEach(layer => {
    layer.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    });
    
    layer.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ===================================
// Initialize
// ===================================

console.log('🌿 TaxoGenius - Taksonomi Eğitim Portalı yüklendi!');
console.log(`📋 Toplam ${questions.length} soru hazır.`);
