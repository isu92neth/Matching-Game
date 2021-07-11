let clickedCard = null;
let preventClick = false;
let matches = 0;
var timer;
var timeLeft = 60;
let timerStart = false;

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "black",
  "orange",
];

const cards = [...document.querySelectorAll(".card")];

for (let color of colors) {
  const cardAIndex = parseInt(Math.random() * cards.length);
  const cardA = cards[cardAIndex];
  cards.splice(cardAIndex, 1);
  cardA.className += ` ${color}`;
  cardA.setAttribute("data-color", color);

  const cardBIndex = parseInt(Math.random() * cards.length);
  const cardB = cards[cardBIndex];
  cards.splice(cardBIndex, 1);
  cardB.className += ` ${color}`;
  cardB.setAttribute("data-color", color);
}

function onCardClick(e) {
  if (!timerStart) {
    timer = setInterval(updateTimer, 1000);
    updateTimer();

    timerStart = true;
  }
  const target = e.currentTarget;

  target.className = target.className.replace("color-hidden", "").trim();
  if (
    preventClick ||
    target === clickedCard ||
    target.className.includes("done")
  ) {
    return;
  }
  target.className += " done";

  if (!clickedCard) {
    //if card is not clicked, track the card and display color
    clickedCard = target;
  } else if (clickedCard) {
    //if already clicked, check the newly clicked card
    if (
      clickedCard.getAttribute("data-color") !==
      target.getAttribute("data-color")
    ) {
      console.log("not eq");
      preventClick = true;
      setTimeout(() => {
        clickedCard.className =
          clickedCard.className.replace("done", "").trim() + " color-hidden";
        target.className =
          target.className.replace("done", "").trim() + " color-hidden";
        clickedCard = null;
        preventClick = false;
      }, 500);
    } else {
      matches++;
      clickedCard = null;
      if (matches === 8) {
        setTimeout(() => {
          alert("You Won!!!!");
        }, 1000);
      }
    }
  }
}

function reset() {
  console.log(cards);
}

//after the timer runs out
function gameOver() {
  clearInterval(timer);
  setTimeout(() => {
    alert("Time Out!!!!");
  }, 1000);
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) {
    console.log(timeLeft);
    document.getElementById("timer").innerHTML = `${timeLeft}`;
  } else {
    gameOver();
  }
}
