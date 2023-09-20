"use strict";
//

//

const fortnightlyWeeklyTab = document.querySelector(".fortnightly-weekly-tab");
const monthlyTab = document.querySelector(".monthly-tab");

// function toggleHide() {
//   document.querySelector(".payment-details").classList.toggle("hide");
//   document.querySelector(".arrangement-details").classList.toggle("hide");
//   document.querySelector(".arrangement-outer-legend").classList.toggle("hide");
//   document.querySelector(".QA-container").classList.toggle("hide");
// }

fortnightlyWeeklyTab.addEventListener("click", () => {
  (document.querySelector(".monthly-arrangement-details").classList.replace =
    "show"),
    "hide";
});
fortnightlyWeeklyTab.addEventListener("click", () => {
  (document.querySelector(".monthly-arrangement-details").classList.replace =
    "show"),
    "hide";
});

//
monthlyTab.addEventListener("click", () => {});
monthlyTab.addEventListener("click", () => {
  document.querySelector(".monthly-arrangement-details").style.display =
    "block";
  document.querySelector(".payment-details").classList.replace("show", "hide");
  document
    .querySelector(".arrangement-details")
    .classList.replace("show", "hide");
  document
    .querySelector(".arrangement-outer-legend")
    .classList.replace("show", "hide");
  document.querySelector(".QA-container").classList.replace("show", "hide");
});
