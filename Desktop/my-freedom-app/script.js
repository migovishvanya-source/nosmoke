// 1. Ініціалізація даних
// Беремо збережені звички з пам'яті браузера, або створюємо дефолтну, якщо там порожньо
let habits = JSON.parse(localStorage.getItem('myHabits')) || [
    { name: "Куріння (Подік)", date: "2026-02-12", cost: 14.8 }
];

// Функція для збереження змін у локальну пам'ять
function saveToLocalStorage() {
    localStorage.setItem('myHabits', JSON.stringify(habits));
}

// 2. Головна функція рендеру (малювання) карток
function renderHabits() {
    const container = document.getElementById('habits-container');
    if (!container) return; // Захист від помилок

    container.innerHTML = ''; // Очищуємо контейнер перед оновленням

    habits.forEach((habit, index) => {
        const now = new Date();
        const start = new Date(habit.date);
        const diff = now - start;

        // Рахуємо час (якщо дата в майбутньому, буде 0)
        const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
        const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
        const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

        // Рахуємо гроші
        const moneySaved = Math.max(0, (diff / (1000 * 60 * 60 * 24)) * habit.cost);

        // Створюємо HTML код для кожної картки
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <h2>${habit.name} 🌿</h2>
            <div class="timer">
                ${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
            </div>
            <p>днів : год : хв : сек</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
            <p>Заощаджено: <b style="color: #2ecc71;">${moneySaved.toFixed(2)} ₴</b></p>
            <button onclick="deleteHabit(${index})" style="margin-top: 10px; border-color: #ff7675; color: #ff7675; background: none;">Видалити</button>
        `;
        container.appendChild(card);
    });
}

// 3. Додавання нової звички
function addNewHabit() {
    const nameInput = document.getElementById('habit-name');
    const dateInput = document.getElementById('habit-date');
    const costInput = document.getElementById('habit-cost');

    const name = nameInput.value;
    const date = dateInput.value;
    const cost = parseFloat(costInput.value);

    if (name && date && !isNaN(cost)) {
        habits.push({ name, date, cost });
        saveToLocalStorage();
        renderHabits();
        
        // Очищуємо поля після додавання
        nameInput.value = '';
        dateInput.value = '';
        costInput.value = '';
    } else {
        alert("Заповни всі поля правильно, бро!");
    }
}

// 4. Видалення звички
function deleteHabit(index) {
    if (confirm("Впевнений, що хочеш видалити цю ціль?")) {
        habits.splice(index, 1);
        saveToLocalStorage();
        renderHabits();
    }
}

// 5. Запуск циклу оновлення
setInterval(renderHabits, 1000);
renderHabits(); // Перший запуск відразу