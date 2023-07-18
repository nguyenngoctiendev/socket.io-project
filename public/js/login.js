document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;

        // Đăng nhập thành công
        // Chuyển hướng đến trang chat hoặc trang khác
        window.location.href = '/chat.html';

        // Lưu thông tin đăng nhập vào
        window.localStorage.setItem("accesstoken", accessToken);
        console.log(accessToken)
      } else {
        window.location.href = "/login.html";
      }

    } catch (error) {
      console.error(error);
    }
  });
});
