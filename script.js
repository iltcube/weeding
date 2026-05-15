const targetDate = new Date("2026-07-08T15:30:00+03:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));

  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));

  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();

setInterval(updateCountdown, 1000);

// ОТПРАВКА ФОРМЫ

const form = document.getElementById("guest-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const drinks = [];

  formData.getAll("drinks").forEach((drink) => {
    drinks.push(drink);
  });

  const data = {
    fullname: formData.get("fullname"),
    presence: formData.get("presence"),
    drinks,
    transfer: formData.get("transfer") === "on",
  };

  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert("Анкета успешно отправлена!");
      form.reset();
    } else {
      alert("Ошибка отправки");
      console.error(result.error);
    }
  } catch (error) {
    alert("Ошибка соединения");
    console.error(error);
  }
});
