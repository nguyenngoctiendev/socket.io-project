document.addEventListener("DOMContentLoaded", () => {
    const createNewRoom = document.getElementById("createNewRoom");
  
    createNewRoom.addEventListener("submit", async (e) => {
      e.preventDefault();
      const roomName = document.getElementById("roomName").value;
      const result = document.getElementById("result");
      try {
        const userId = window.localStorage.getItem("accesstoken");
        if (!userId) {
          console.error("UserId not found in localStorage");
          return;
        }          
        const send = await fetch("api/chat/group", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roomName,
            users: userId
          }),
        });
        const data = await send.text();
        result.innerHTML = data;
        if (send.ok) {
          alert("Tạo phòng thành công");
          window.location.href = "/room.html";
        } else {
          alert("Có lỗi xảy ra, xin vui lòng thử lại sau");
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  });
  