document.addEventListener('DOMContentLoaded', () => {
    var accessToken = window.localStorage.getItem("accesstoken");
    if (!accessToken) {
      window.location.href = "/login.html";
    }
})