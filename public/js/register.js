document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
  
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
const showInfo = document.getElementById("showInfo")  
      try {
        const response = await fetch('api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          showInfo.textContent = "Tạo tài khoản thành công"
           }   else {
showInfo.textContent = "Tạo tài khoản thất bại"          
      }
     } catch (error) {
        console.error(error);
        // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
      }
    });
  });
  