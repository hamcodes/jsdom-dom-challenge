document.addEventListener("DOMContentLoaded", () => {
  challengeDom();
});

function challengeDom() {
  let counterValue = document.getElementById("counter")
  let count = parseInt(document.getElementById("counter").innerText);
  let onLoadTimer = setInterval(() => { count += 1; counterValue.innerText = count }, 1000);
  let submitButton = document.getElementById("submit");
  const form = document.getElementById("comment-form")
  const plus = document.querySelector("#plus");
  const minus = document.querySelector("#minus");
  const heart = document.querySelector("#heart");
  const pause = document.querySelector("#pause");

  plus.addEventListener("click", function () {
      count += 1;
      plus.value = count;
  });

  minus.addEventListener("click", () => {
      count -= 1;
      minus.value = count;
  });

  pause.addEventListener("click", function (event) {
      event.preventDefault();
      if (!submitButton.attributes["disabled"]) {
          clearInterval(onLoadTimer)
          submitButton.disabled = true;
          plus.disabled = true;
          minus.disabled = true;
          heart.disabled = true;
          event.target.innerText = "resume"
      }
      else {
          setInterval(() => { count += 1; counterValue.innerText = count }, 1000);
          event.target.innerText = "pause"
          submitButton.disabled = false;
          plus.disabled = false;
          minus.disabled = false;
          heart.disabled = false;
      }
  });

  heart.addEventListener("click", function (event) {
      event.preventDefault();
      likeNumber()
  })

  function likeNumber() {
      let num = parseInt(document.getElementById("counter").innerText);
      const existingLi = document.querySelector('[data-num="' + num + '"]') 
      let counter = 1;
      if (existingLi) {
          counter++;
          existingLi.innerText = `${num} has been liked ${counter} times!`
      }
      else {
          const ul = document.querySelector(".likes")
          const li = document.createElement("li")
          li.setAttribute("data-num", num)
          li.innerText = `${num} has been liked.`
          ul.appendChild(li)
      }
  };

  form.addEventListener("submit", function(e) {
      e.preventDefault();
      const comment = e.target.querySelector("#comment-input")
      const div = document.querySelector(".comments")
      const p = document.createElement("p")
      div.appendChild(p)
      p.textContent = comment.value
      comment.value = ""
  })

}