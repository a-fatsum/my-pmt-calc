// Set the date we're counting down to
let countDownDate = new Date("Jan 1, 2024 00:00:01").getTime();

// Update the count down every 1 second
let interval = setInterval(function () {
  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="timer"
  // document.getElementById("timer").innerHTML =
  //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  //
  document.querySelector(".days").innerHTML = days;
  //
  document.querySelector(".hours").innerHTML = hours;
  //
  document.querySelector(".minutes").innerHTML = minutes;
  //
  document.querySelector(".seconds").innerHTML = seconds;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "It's 2024!!";
  }
}, 1000);
