"use strict";
//

//
const monthlyButton = document.querySelector(".monthly-button");

const fortnightlyWeeklyButton = document.querySelector(
  ".fortnightly-weekly-button"
);

// ----
fortnightlyWeeklyButton.addEventListener("click", () => {
  // hide monthly arrangement container
  document
    .getElementById("month-wrapper")
    .classList.replace("show-monthly", "monthly-arrangement-details");

  // show payment-details container
  document.querySelector(".payment-details").classList.replace("hide", "show");
  // show arrangement-deails-container
  document
    .querySelector(".arrangement-details-container")
    .classList.replace("hide", "show");
  // change opacity of the monthly button
  monthlyButton.style.opacity = "0.2";
  fortnightlyWeeklyButton.style.opacity = "1";
});
// ---
monthlyButton.addEventListener("click", () => {
  document
    .getElementById("month-wrapper")
    .classList.replace("monthly-arrangement-details", "show-monthly");

  //
  document.querySelector(".payment-details").classList.replace("show", "hide");
  //
  document
    .querySelector(".arrangement-details-container")
    .classList.replace("show", "hide");
  //
  monthlyButton.style.opacity = "1";
  fortnightlyWeeklyButton.style.opacity = "0.2";
});

// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
// ============================================ //
//
const main_function = function () {
  const overdue = document.getElementById("overdue-input").value;
  const monthlyInstalment = document.querySelector(".monthly-instalment").value;
  // const paymentStartDate = document.querySelector(".monthly-date-picker").value;
  const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
  const billingDay = document.querySelector(".select").value;
  const lateFees = 25;
  const numOfMonths = document.querySelector(".num-of-months").value;
  console.log(numOfMonths);
  console.log(billingDay);
  console.log(todayDate);
  console.log(overdue);
  console.log(monthlyInstalment);
  // console.log(paymentStartDate);

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
  // ==============>>>>>>>
  // ==============>>>>>>>

  // ==============>>>>>>>
  // ==============>>>>>>>

  const calculateMonthly = function () {
    const late_fees_total = Number(numOfMonths) * Number(lateFees);
    const total_arrangement_amount = Number(overdue) + late_fees_total;
    const amount_per_month =
      Number(total_arrangement_amount) / Number(numOfMonths) +
      Number(monthlyInstalment);
    return amount_per_month;
  };

  const total_monthly_arrangement =
    Number(calculateMonthly()) * Number(numOfMonths);

  document.querySelector(".amount-per-month-label").textContent = Number(
    calculateMonthly()
  ).toFixed(2);
  document.querySelector(".total-monthly-label").textContent = Number(
    total_monthly_arrangement
  ).toFixed(2);

  // ==============>>>>>>>
  // const calculateMonthly = function () {
  //   let monthlyDates = instalementDueFullDate(billingDay);
  //   const month = monthlyDates.getMonth();
  //   const list_of_dates_in_arrg = [];
  //   for (let i = 0; i < numOfMonths; i++) {
  //     monthlyDates = new Date(monthlyDates.setMonth(month + i));
  //     list_of_dates_in_arrg.push(monthlyDates);
  //   }
  //   return list_of_dates_in_arrg;
  // };
  // //
  // console.log(calculateMonthly());
  // ===================>>>>>>>>>>>>>>>
  //
  // ===================>>>>>>>>>>>>>>>
  // ===================>>>>>>>>>>>>>>>

  // for (let index = 0; index < numOfMonths; index++) {
  //   console.log(Number(index) + 1);
  //   let month_input = `month_input_${Number(index) + 1}`;
  //   console.log(month_input);
  // }

  // ---------->>>>
  // ---------->>>>

  // ---------->>>> Creat input fields for months amounts
  for (let index = 0; index < numOfMonths; index++) {
    var month_input_ = document.createElement("INPUT");
    console.log(month_input_);
    const months_input_container = document.getElementById(
      "months-input-container"
    );
    month_input_.classList.add("months");
    months_input_container.append(month_input_);
  }

  // ---------->>>> Creat input fields for dates

  for (let index = 0; index < numOfMonths; index++) {
    var month_date_field = document.createElement("DIV");
    console.log(month_date_field);
    const months_dates_container = document.getElementById(
      "months-dates-containter"
    );
    month_date_field.classList.add("month");
    months_dates_container.append(month_date_field);
  }

  // ---------->>>>
  // ---------->>>>

  // month_input_2.value = calculateMonthly().toFixed(2);
  // month_input_3.value = calculateMonthly().toFixed(2);

  // month_input_1.addEventListener("keyup", () => {
  //   const remaining_balance =
  //     Number(total_monthly_arrangement) - Number(month_input_1.value);
  //   month_input_2.value = Number(remaining_balance) / 2;
  //   month_input_3.value = Number(remaining_balance) / 2;
  // });
  // month_input_2.addEventListener("keyup", () => {
  //   const remaining_balance =
  //     Number(total_monthly_arrangement) - Number(month_input_2.value);
  //   month_input_1.value = Number(remaining_balance) / 2;
  //   month_input_3.value = Number(remaining_balance) / 2;
  // });
  // month_input_3.addEventListener("keyup", () => {
  //   const remaining_balance =
  //     Number(total_monthly_arrangement) - Number(month_input_3.value);
  //   month_input_1.value = Number(remaining_balance) / 2;
  //   month_input_2.value = Number(remaining_balance) / 2;
  // });

  //
  // ===================>>>>>>>>>>>>>>>
  // ===================>>>>>>>>>>>>>>>
  // ===================>>>>>>>>>>>>>>>

  // ===================>>>>>>>>>>>>>>> Add dates into dates fields
  const list_of_dates_in_arrg = [];
  list_of_dates_in_arrg.push(instalementDueFullDate(billingDay));
  let monthlyDates = instalementDueFullDate(billingDay);
  const month = monthlyDates.getMonth();
  for (let i = 0; i < numOfMonths; i++) {
    monthlyDates = new Date(monthlyDates.setMonth(month + i));
    console.log(monthlyDates);
    list_of_dates_in_arrg.push(monthlyDates);
  }
  console.log(list_of_dates_in_arrg);

  let list_of_elements = document.getElementsByClassName("month");
  for (let i = 0, len = list_of_elements.length; i <= len; i++) {
    list_of_elements[i].innerHTML = list_of_dates_in_arrg[i].toDateString();
  }
  // ===================>>>>>>>>>>>>>>>
  //

  // ===================>>>>>>>>>>>>>>> Add monthly amounts to monthly inputs
};

// =================================

const overdue = document.getElementById("overdue-input");
const monthlyInstalment = document.querySelector(".monthly-instalment");
// const paymentStartDate = document.querySelector(".monthly-date-picker");
const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
const billingDay = document.querySelector(".select");
const lateFees = 25;
const numOfMonths = document.querySelector(".num-of-months");
//

overdue.addEventListener("input", main_function);
monthlyInstalment.addEventListener("input", main_function);
billingDay.addEventListener("click", main_function);
numOfMonths.addEventListener("input", main_function);
