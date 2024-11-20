document.getElementById('showFormButton').addEventListener('click', function () {
    const form = document.getElementById('registrationForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
});

document.getElementById('regForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    alert(`Регистрация прошла успешна!\n\nИмя пользователя: ${username}\nЭлектронная почта: ${email}\nПароль: ${password} (сохранен в зашифрованном виде)`);

    document.getElementById('regForm').reset();
});