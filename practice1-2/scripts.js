const buttonElems = document.querySelectorAll('.btn-primary');
const modalElem = document.querySelector('#contactModal');
const submitBtn = document.querySelector('.btn.btn-primary.submit-btn');


// Функция для сброса формы и сообщений об ошибках
const resetForm = () => {
    const formInputs = document.querySelectorAll('.modal__form input');
    const textArea = document.querySelector('.modal__form textarea');
    const selectElem = document.querySelector('.modal__form select');

    formInputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    if (textArea) {
        textArea.value = '';
    }

    if (selectElem) {
        selectElem.selectedIndex = 0;
    }

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
};

// Функция для закрытия модального окна
const closeModal = event => {
    const target = event.target;
    if (target === modalElem || target.closest('.btn-close')) {
        const modal = new bootstrap.Modal(modalElem);
        modal.hide();
        resetForm();
    }
};

// Функция для открытия модального окна
const openModal = () => {
    new bootstrap.Modal(modalElem).show();
};

buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
});

modalElem.addEventListener('click', closeModal);

// Валидация формы
const validateForm = () => {
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const phoneNumber = document.querySelector('#phoneNumber');
    const date = document.querySelector('#date');
    const agree = document.querySelector('#agree');

    let isValid = true;

    const removeErrorMessages = () => {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    };

    removeErrorMessages();

    const showError = (input, message) => {
        const errorElem = document.createElement('div');
        errorElem.classList.add('error-message');
        errorElem.style.color = 'red';
        errorElem.textContent = message;
        input.parentElement.appendChild(errorElem);
        isValid = false;
    };

    if (!username.value.trim()) {
        showError(username, 'Введите ваше имя');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        showError(email, 'Введите корректный email');
    }

    const phonePattern = /^\+7\d{10}$/;
    if (!phoneNumber.value.trim() || !phonePattern.test(phoneNumber.value)) {
        showError(phoneNumber, 'Введите телефон в формате +7 и 10 цифр без пробелов');
    }

    if (!date.value) {
        showError(date, 'Выберите дату');
    }

    if (!agree.checked) {
        showError(agree, 'Необходимо ваше согласие на обработку данных');
    }

    return isValid;
};

// Обработчик на кнопку отправки формы
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (validateForm()) {
        alert('Форма успешно отправлена!');

        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(modalElem) || new bootstrap.Modal(modalElem);
        modal.hide();

        // Удаляем остаточный backdrop вручную
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());

        // Убираем блокировку скролла страницы
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';

        // Сбрасываем форму
        resetForm();
    }
});