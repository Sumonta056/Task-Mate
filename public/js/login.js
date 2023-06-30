form.addEventListener("submit", () => {

  const emailField = document.getElementById("emailss");
  const emailField1 = document.getElementById("emailsss");
  const passField = document.getElementById("passsss");

  const login = {
    email: email.value,
    password: password.value,
  };

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "error") {
        success.style.display = "none";
        error.style.display = "block";
        home.style.display = "none";
        error.innerText = data.error;
      } else {
        success.style.display = "block";
        error.style.display = "none";
        home.style.display = "block";
        success.innerText = data.success;

        // Hide email and password fields
        emailField.style.display = "none";
        emailField1.style.display = "none";
        passField.style.display = "none";
      }
    });
});
