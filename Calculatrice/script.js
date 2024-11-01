let currentInput = '0';
let previousInput = '';
let currentOperator = '';
let memory = 0;
let shouldResetScreen = false;

// Fonctions de mémoire
function memoryOperation(operation) {
    switch(operation) {
        case 'MC':
            memory = 0;
            break;
        case 'MR':
            currentInput = memory.toString();
            break;
        case 'M+':
            memory += parseFloat(currentInput);
            break;
        case 'M-':
            memory -= parseFloat(currentInput);
            break;
        case 'MS':
            memory = parseFloat(currentInput);
            break;
    }
    updateDisplay();
}

// Fonctions spéciales
function calculateFunction(func) {
    const num = parseFloat(currentInput);
    switch(func) {
        case '1/x':
            if (num !== 0) {
                currentInput = (1 / num).toString();
            } else {
                currentInput = 'Error';
            }
            break;
        case 'x²':
            currentInput = (num * num).toString();
            break;
        case '√':
            if (num >= 0) {
                currentInput = Math.sqrt(num).toString();
            } else {
                currentInput = 'Error';
            }
            break;
    }
    shouldResetScreen = true;
    updateDisplay();
}

function percentage() {
    if (previousInput && currentOperator) {
        const result = (parseFloat(previousInput) * parseFloat(currentInput)) / 100;
        currentInput = result.toString();
        updateDisplay();
    }
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

// Fonctions de base modifiées
function appendNumber(num) {
    if (currentInput.length >= 16) return;
    if (num === '.' && currentInput.includes('.')) return;
    
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === 'Error') return;
    
    if (previousInput && currentInput) {
        calculate();
    }
    previousInput = currentInput;
    currentOperator = operator;
    shouldResetScreen = true;
    updatePreviousOperation();
}

function calculate() {
    if (currentInput === 'Error' || !previousInput || !currentOperator) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch(currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
    }

    currentInput = result.toString();
    previousInput = '';
    currentOperator = '';
    shouldResetScreen = true;
    updateDisplay();
    updatePreviousOperation();
}

function updateDisplay() {
    const display = document.getElementById('result');
    display.textContent = formatNumber(currentInput);
}

function updatePreviousOperation() {
    const previousOperation = document.getElementById('previous-operation');
    previousOperation.textContent = previousInput + ' ' + currentOperator;
}

// Gestion du clavier
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === 'Backspace') deleteLastChar();
});

function clearDisplay() {
    currentInput = '0';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

setInterval(createParticle, 200);

function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Ajouter à chaque clic de bouton
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', vibrate);
});

// Ajouter cette fonction
function formatNumber(num) {
    if (num === 'Error') return num;
    
    let number = parseFloat(num);
    if (isNaN(number)) return '0';
    
    if (Math.abs(number) > 1e12 || Math.abs(number) < 1e-12) {
        return number.toExponential(8);
    }
    
    return number.toString().slice(0, 12);
}

// Ajouter à la fin du script.js
function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 50;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 0, 0, ${Math.random() * 0.5});
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particles.appendChild(particle);
    }
}

createParticles();

const easterEggs = {
    '1337': () => {
        // Mode hacker
        document.body.classList.add('hacker-mode');
    },
    '80085': () => {
        // Animation surprise
        showEasterEggAnimation();
    }
};

function createReactiveParticles(x, y) {
    for(let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'reactive-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

const scientificFunctions = {
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'log': Math.log10,
    'ln': Math.log,
    'pow': Math.pow,
    'factorial': (n) => {
        if(n === 0) return 1;
        return n * factorial(n - 1);
    }
};

const shortcuts = {
    'Control+c': () => {
        navigator.clipboard.writeText(currentInput);
    },
    'Control+v': async () => {
        const text = await navigator.clipboard.readText();
        if (!isNaN(text)) {
            currentInput = text;
            updateDisplay();
        }
    }
};

function handleEasterEgg(input) {
    if (easterEggs[input]) {
        easterEggs[input]();
    }
}

function showEasterEggAnimation() {
    document.body.classList.add('easter-egg-animation');
    setTimeout(() => {
        document.body.classList.remove('easter-egg-animation');
    }, 3000);
}