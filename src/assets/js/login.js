const submit = document.querySelector("form");
submit.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.querySelector("#InputUser").value;
  const password = document.querySelector("#InputPassword").value;
  fetch("https://bright-liberating-politician.glitch.me/api/users.json")
    .then((response) => response.json())
    .then((data) => {
      const user = data.find(
        (user) =>
          (user.username === username && user.password === password) ||
          (user.email === username && user.password === password)
      );

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
      } else {
        alert("Credenciales incorrectas");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
