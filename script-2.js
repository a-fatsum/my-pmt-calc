"use strict";
//

//

// const fortnightlyWeeklyTab = document.querySelector(".fortnightly-weekly-tab");
// const monthlyTab = document.querySelector(".monthly-tab");

// fortnightlyWeeklyTab.addEventListener("click", () => {
//   (document.querySelector(".monthly-arrangement-details").classList.replace =
//     "show"),
//     "hide";
// });
// fortnightlyWeeklyTab.addEventListener("click", () => {
//   (document.querySelector(".monthly-arrangement-details").classList.replace =
//     "show"),
//     "hide";
// });

// //
// monthlyTab.addEventListener("click", () => {});
// monthlyTab.addEventListener("click", () => {
//   document.querySelector(".monthly-arrangement-details").style.display =
//     "block";
//   document.querySelector(".payment-details").classList.replace("show", "hide");
//   document
//     .querySelector(".arrangement-details")
//     .classList.replace("show", "hide");
//   document
//     .querySelector(".arrangement-outer-legend")
//     .classList.replace("show", "hide");
//   document.querySelector(".QA-container").classList.replace("show", "hide");
// });

// ============================================ //
const overdue = document.getElementById("overdue-input").value;
const monthlyInstalment = document.querySelector(".monthly-instalment").value;
const paymentStartDate = document.querySelector(".date-picker").value;
const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
const billingDay = document.querySelector(".select").value;
const lateFees = 25;
const numOfMonths = document.querySelector(".num-of-months").value;

console.log(numOfMonths);
console.log(billingDay);
console.log(todayDate);
console.log(overdue);
console.log(monthlyInstalment);
console.log(paymentStartDate);

const instalementDueFullDate = function (instalementDueDay) {
  // const today = new Date(); // ->   "2023-01-31" // "2023-09-01"
  // let dueFullDate = new Date(); // ->   "2023-01-31"    // // "2023-09-01"
  const today = new Date(); // ->   "2023-01-31" // "2023-09-01"
  let dueFullDate = new Date(); // ->   "2023-01-31"    // // "2023-09-01"
  dueFullDate.setDate(Number(instalementDueDay));
  //
  // accounting for February and Leap years...
  // If we're in January
  if (
    Number(instalementDueDay) > 28 &&
    Number(today.getMonth()) == 0 &&
    dueFullDate < today
  ) {
    dueFullDate = new Date(today.getFullYear(), 2, 0);
  }
  // If we're in February
  else if (
    Number(instalementDueDay) > 28 &&
    Number(today.getMonth()) == 1 &&
    dueFullDate > today
  ) {
    dueFullDate = new Date(today.getFullYear(), 2, 0);
  }
  //
  if (dueFullDate <= today) {
    dueFullDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      instalementDueDay
    );
  }
  //
  dueFullDate.setHours(0, 0, 0, 0);
  //
  return dueFullDate;
};

// ==============>>>>>>>
const calculateMonthly = function () {
  let newMonthly =
    Number(monthlyInstalment) / Number(numOfMonths) +
    25 +
    Number(monthlyInstalment);
  for (let i = 0; i < numOfMonths; i++) {
    const newMonth = new Date(instalementDueFullDate(billingDay)).getMonth + i;
    const due_dates = new Date(instalementDueFullDate(billingDay)).setMonth(
      newMonth
    );
    return due_dates;
  }
};
//
console.log(calculateMonthly());
