let currentPage = 1;

function showPage(index) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  pages[index - 1].classList.add('active');
}

function nextPage() {
  if (!validatePage(currentPage)) return;
  currentPage++;
  if (currentPage === 5) {
    generateDiscountCode();
  }
  showPage(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const emojiList = ['😄', '😊', '😐', '😟', '😠'];

  document.querySelectorAll('.question-group').forEach(group => {
    const qId = group.dataset.id;
    const row = group.querySelector('.emoji-row');

    emojiList.forEach(emoji => {
      const span = document.createElement('span');
      span.className = 'emoji';
      span.textContent = emoji;
      span.onclick = () => selectEmoji(span, qId);
      row.appendChild(span);
    });
  });
});

function selectEmoji(el, questionId) {
  const group = document.querySelector(`.question-group[data-id="${questionId}"]`);
  const emojis = group.querySelectorAll('.emoji');

  emojis.forEach(e => {
    e.classList.remove('selected', 'dimmed');
  });

  el.classList.add('selected');
  emojis.forEach(e => {
    if (e !== el) e.classList.add('dimmed');
  });
}


function validatePage(page) {
  let valid = true;
  document.querySelectorAll(`#page${page} .error`).forEach(e => {
    e.innerText = "";
    e.style.display = "none";
  });

  if (page === 2) {
    const name = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name) {
      const err = document.getElementById('error-fullname');
      err.innerText = "لطفاً نام خود را وارد کنید.";
      err.style.display = "block";
      valid = false;
    }

    if (!phone) {
      const err = document.getElementById('error-phone');
      err.innerText = "لطفاً شماره تلفن همراه را وارد کنید.";
      err.style.display = "block";
      valid = false;
    }
  }

  if (page === 3) {
    const q1 = document.querySelector(`.question-group[data-id="q1"] .selected`);
    const q2 = document.querySelector(`.question-group[data-id="q2"] .selected`);
    const q3 = document.querySelector(`.question-group[data-id="q3"] .selected`);
    const sideEffects = document.querySelector('input[name="sideEffects"]:checked');

    if (!q1) {
      const err = document.getElementById('error-q1');
      err.innerText = "پاسخ به سوال اول الزامی است.";
      err.style.display = "block";
      valid = false;
    }

    if (!q2) {
      const err = document.getElementById('error-q2');
      err.innerText = "پاسخ به سوال دوم الزامی است.";
      err.style.display = "block";
      valid = false;
    }

    if (!q3) {
      const err = document.getElementById('error-q3');
      err.innerText = "پاسخ به سوال سوم الزامی است.";
      err.style.display = "block";
      valid = false;
    }

    if (!sideEffects) {
      const err = document.getElementById('error-sideEffects');
      err.innerText = "لطفاً یکی از گزینه‌ها را انتخاب کنید.";
      err.style.display = "block";
      valid = false;
    }
  }
  return valid;
}

function generateDiscountCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DIBA';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('discountCode').textContent = code;
}
function copyToClipboard() {
  const text = document.getElementById("discountCode").innerText;
  navigator.clipboard.writeText(text)
    .then(() => {
      const msg = document.getElementById("copyMsg");
      msg.style.display = "block";
      msg.innerText = "کپی شد ✅";

      setTimeout(() => {
        msg.style.display = "none";
      }, 5000);
    });
}
