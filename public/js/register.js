form.addEventListener("submit", () => {
  const register = {
    name: names.value,
    email: email.value,
    password: password.value,
    repass: repass.value,
  };

  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(register),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "error") {
        success.style.display = "none"
        error.style.display = "block"
        error.innerText = data.error
      } else {
        success.style.display = "block"
        error.style.display = "none"
        success.innerText = data.success
      }
    });
});
