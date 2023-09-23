"use strict";

// <---------^ EVENT_FUNCTION ^-------------->
//  ------------------------------->
const event_function = function () {
  // start with  values
  let overdue = document.getElementById("overdue-input").value; //overdue value
  const monthlyInstalment = document.querySelector(".monthly-instalment").value; //monthly instalment value
  const instalement_Due_Day = document.querySelector(".select").value; //billing due day
  const frequency = document.querySelector(".frequency-input").checked; //frequency --->> fortnightly = true -- weekly = false
  const annualised = document.getElementById("toggle_checkBox").checked; //min|pref --->> pref = true -- min = false
  let paymentStartDate = document.querySelector(".date-picker").value; //Start Date
  const proposedArrangement = document.getElementById(
    "proposedArrangement"
  ).value; //proposed arrangement
  const weeklyFortnightlyTag = document.querySelector(
    ".weekly-fortnightly-tag"
  );
  //
  ////// late_fees
  const late_fees = 25;
  //
  //
  new Date(paymentStartDate).max = new Date().toISOString().split("T")[5];

  /////////////////////////////////////////////////////////////ERROR HANDLING////////////////
  // ???? overdue
  try {
    if (!overdue) throw (overdue = 0);
  } catch (error) {
    //
  }
  // ???? monthlyInstalment
  try {
    if (!monthlyInstalment) throw (monthlyInstalment = 0);
  } catch (error) {
    //
  }
  // ???? instalement_Due_Day
  try {
    if (typeof instalement_Due_Day == "string") throw (instalement_Due_Day = 0);
  } catch (error) {
    //
  }
  // ???? paymentStartDate
  //
  try {
    if (!paymentStartDate) throw (paymentStartDate = new Date());
  } catch (error) {
    //
  }
  ////////////////////////////////////////////////////////////////////////////////////////

  //-*****      <<-_-_-_-_-_-_-_-_-_-_-_CalculateRegularPayment-_-_-_-_-_-_-_-_-_-_-_-_-_->>        *****-//

  const CalculateRegularPayment = function (
    frequency,
    annualised,
    monthlyInstalment
  ) {
    let regular_amount = 0; // Define regular amount variable
    let freq = 0; // Define frequesncy variable

    // fortnightly && min
    if (frequency && !annualised) {
      //
      freq = 14;
      regular_amount = monthlyInstalment / 2.165;
      // fortnightly && pref
    } else if (frequency && annualised) {
      //
      freq = 14;
      regular_amount = monthlyInstalment / 2;
    }
    // weekly && min
    else if (!frequency && !annualised) {
      //
      freq = 7;
      regular_amount = monthlyInstalment / 4.33;
    }
    // Weekly && Pref
    else if (!frequency && annualised) {
      //
      freq = 7;
      regular_amount = monthlyInstalment / 4;
    }
    return [regular_amount, freq];
  };
  //-*****      <<-_-_-_-_-_-_-_-_-_-_-_ _-_-_-_-_-_-_-_-_-_-_-_-_->>        *****-//

  const [regular_amount, freq] = CalculateRegularPayment(
    frequency,
    annualised,
    monthlyInstalment
  );
  //
  const regularPayment = document.querySelector(".regular-payment-amount"); // DOM Regular Payment
  regularPayment.innerHTML = regular_amount.toFixed(2); // Display the regular payment amount - user feedback
  //
  if (freq == 7) {
    weeklyFortnightlyTag.textContent = "weekly";
    weeklyFortnightlyTag.classList.remove("fortnightly");
    weeklyFortnightlyTag.classList.add("weekly");
  } else if (freq == 14) {
    weeklyFortnightlyTag.textContent = "fortnightly";
    weeklyFortnightlyTag.classList.remove("weekly");
    weeklyFortnightlyTag.classList.add("fortnightly");
  }
  //
  if (!annualised) {
    document.querySelector(".min-pref-label").innerHTML = "Minimum";
    document.querySelector(".min-pref-label").style.fontWeight = 900;
  } else {
    document.querySelector(".min-pref-label").innerHTML = "Preferred";
    document.querySelector(".min-pref-label").style.fontWeight = 900;
  }

  //

  //

  //

  //

  //

  //

  //

  //

  //

  //
  //  ///------------------***********--------------///
  // Loop through DatesList and increment by 7 or 14 days
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const regularPaymentDates = function (interval, paymentStartDate) {
    // interval is the frequency 7 || 14
    const paymentDates = [];
    // ------- //
    // Function that finds the range of dates and place it in array ->  dates[]... Should return 365 dates..
    // We need to find the range of dates between PaymentStartDate and same start date for next year.
    const getDatesInRange = function (startDate, endDate) {
      const date = new Date(startDate);
      const dates = [];
      while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return dates;
    };
    //
    // Function that returns the paymentStartDate date next year.
    const getDateNextYear = function (dt) {
      let nextYear = new Date(dt);
      nextYear.setDate(nextYear.getDate() + 365);
      return nextYear;
    };
    // ------- //
    // create a list of dates using getDatesInRange function
    const oneYearDatesList = getDatesInRange(
      paymentStartDate,
      getDateNextYear(paymentStartDate)
    );
    //
    //
    for (let i = 0; i <= oneYearDatesList.length; i += interval) {
      paymentDates.push(new Date(oneYearDatesList[i].setHours(0, 0, 0, 0)));
    }
    return paymentDates;
  };
  const regular_dates = regularPaymentDates(freq, paymentStartDate);

  //

  //

  //

  //

  //

  //

  //

  //

  // Set today's date ---> for Quality Assurance to change today's date
  const setTodayDate = function () {
    const QACheckBox = document.getElementById("QA-checkbox").checked;
    const QADatePicker = document.getElementById("QA-date-picker");
    let todayDate = new Date(QADatePicker.value);
    //
    if (QACheckBox) {
      QADatePicker.style.display = "block";
      return new Date(todayDate.setHours(0, 0, 0, 0));
    }
    //
    else {
      QADatePicker.style.display = "none";
      todayDate = new Date();
      return new Date(todayDate.setHours(0, 0, 0, 0));
    }
  };
  // console.log(setTodayDate());
  const dateOfToday = setTodayDate();

  //

  //

  //

  //

  //

  //

  //

  //
  // Convert due day to due full date
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const instalementDueFullDate = function (instalementDueDay, dateOfToday) {
    // const today = new Date(); // ->   "2023-01-31" // "2023-09-01"
    // let dueFullDate = new Date(); // ->   "2023-01-31"    // // "2023-09-01"

    const today = new Date(dateOfToday); // ->   "2023-01-31" // "2023-09-01"
    let dueFullDate = new Date(dateOfToday); // ->   "2023-01-31"    // // "2023-09-01"

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
      // or =
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

  //

  //

  //

  //

  //

  //

  //

  //

  // Due_Dates_List
  // Function that generates a list of 12 due dates for the whole year
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const Due_Dates_List = function (dueDate) {
    const Dates_List = [];
    // if LESS than or == 28
    if (instalement_Due_Day <= 28) {
      // add the first due date into the array first
      Dates_List.push(dueDate);
      for (let i = 0; i < 11; i++) {
        dueDate = new Date(
          dueDate.getFullYear(),
          dueDate.getMonth(),
          instalement_Due_Day
        );
        dueDate.setMonth(dueDate.getMonth() + 1);
        Dates_List.push(dueDate);
      }
    }
    //
    // if GREATER than or == 28
    else if (instalement_Due_Day >= 28) {
      // add the first due date into the array first
      Dates_List.push(dueDate);
      for (let i = 0; i < 11; i++) {
        dueDate = new Date(
          dueDate.getFullYear(),
          dueDate.getMonth() + 1,
          instalement_Due_Day
        );
        Dates_List.push(dueDate);
      }
      // Make a list of months in the due dates list
      const months = [];
      for (let i = 0; i < Dates_List.length; i++) {
        const month = Dates_List[i].getMonth();
        months.push(month);
      }
      // Find out if months contains Feb
      if (!months.includes(1)) {
        // Find the January index
        const januaryIndex = months.indexOf(0);
        // create last date of February
        const LastDateFebruary = new Date(
          Dates_List[januaryIndex].getFullYear(),
          2,
          0
        );
        const LastDateMarch = new Date(
          Dates_List[januaryIndex].getFullYear(),
          2,
          Number(instalement_Due_Day)
        );
        Dates_List.splice(januaryIndex + 1, 1, LastDateFebruary);
        Dates_List.splice(januaryIndex + 2, 0, LastDateMarch);
      }
      //
    }
    return Dates_List;
  };
  const due_dates = Due_Dates_List(
    instalementDueFullDate(instalement_Due_Day, dateOfToday)
  );

  //

  //

  //

  //

  //

  //

  //

  //

  // Calculate balances
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const cal_balances = function (dueDatesList, regularDatesList) {
    const balances = [];

    // loop through paymentDates
    for (
      let i = 0, c = 0, balance = Number(overdue);
      i < regularDatesList.length;
      i++
    ) {
      let due_date = dueDatesList[c];

      // if payment date is LESS than due date
      if (regularDatesList[i] < due_date) {
        balance -= Number(proposedArrangement);
        balances.push(balance);
      }
      // if payment date is GREATER than due date
      if (regularDatesList[i] >= due_date) {
        balance =
          balance +
          late_fees +
          Number(monthlyInstalment) -
          Number(proposedArrangement);
        balances.push(balance);
        c++;
      }
    }
    return balances;
  };

  const balances_list = cal_balances(due_dates, regular_dates);

  //

  //

  //

  //

  //

  //

  //

  //

  // cal_net_balances function          ****************************
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const cal_net_balances = function (
    overDue,
    regularDatesList,
    dueDatesList,
    balancesList,
    monthlyAmt,
    //
    regularAmt,
    lateFees
  ) {
    // Find the initial Net_Balance value  if the FIRST regular date is greater than the FIRST due date
    let initNetBalance;
    if (regularDatesList[0] > dueDatesList[0]) {
      const numOfPmtsBeforeFirstDueDate = regularDatesList.filter(function (
        date
      ) {
        return date <= dueDatesList[1];
      }).length;
      initNetBalance = Number(overDue) + lateFees + Number(monthlyAmt);
      initNetBalance =
        initNetBalance +
        Number(monthlyAmt) +
        Number(lateFees) -
        Number(regularAmt) * numOfPmtsBeforeFirstDueDate;
    }
    // CONDITION:: if FIRST reguldar date is greater than FIRST due date !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const copyOfRegularDates = regularDatesList.slice();
    const numOfPmtsBeforeFirstDueDate = [];
    const net_balances = [];
    //
    for (let i = 0, c = 0; i < regularDatesList.length; i++) {
      if (regularDatesList[i] < dueDatesList[c]) {
        //
        const filteredList = copyOfRegularDates.filter(function (dte) {
          return dte <= dueDatesList[c];
        });
        numOfPmtsBeforeFirstDueDate.push(Number(filteredList.length));
        copyOfRegularDates.shift();
        net_balances.push(
          Number(balancesList[i]) +
            Number(lateFees) +
            Number(monthlyAmt) -
            Number(regularAmt) * Number(numOfPmtsBeforeFirstDueDate[i] - 1)
        );
      } else if (regularDatesList[i] >= dueDatesList[c]) {
        c++;
        const filteredList = copyOfRegularDates.filter(function (dte) {
          return dte <= dueDatesList[c];
        });
        numOfPmtsBeforeFirstDueDate.push(filteredList.length);
        copyOfRegularDates.shift();
        net_balances.push(
          Number(balancesList[i]) +
            Number(lateFees) +
            Number(monthlyAmt) -
            Number(regularAmt) * (Number(numOfPmtsBeforeFirstDueDate[i]) - 1)
        );
      }
    }
    return [net_balances, numOfPmtsBeforeFirstDueDate];
  };
  //

  //

  //

  //

  //

  //

  //

  //

  //

  const [net_balances, numOfRegPmts] = cal_net_balances(
    overdue,
    regular_dates,
    due_dates,
    balances_list,
    monthlyInstalment,
    regular_amount,
    late_fees
  );

  //

  //    ----------------------------- ***** -------------------------- //

  // Additional amount
  let additional_amount = (
    Number(proposedArrangement) - Number(regular_amount)
  ).toFixed(2);
  //
  if (additional_amount < 0) {
    additional_amount = 0;
  }
  //
  // --
  let index_of_balance = net_balances.findIndex(function (balance, i) {
    return balance < 0;
  });

  if (overdue < 0) {
    index_of_balance -= 1;
  }

  //
  // arrangement_details -> Number of payment required   ------ --------//
  const arrangement_details = function (regularDatesList, indexOfBalance) {
    //
    if (indexOfBalance < 0) {
      indexOfBalance = 0;
    }
    // Arrangement end date
    const arr_end_date = regularDatesList[indexOfBalance];
    //
    // Payments resume on
    const paymentsResume = regularDatesList[indexOfBalance + 1];

    // Number of days
    const today_date = new Date(dateOfToday); /////////////////////
    //
    //
    let number_of_days =
      (arr_end_date.setHours(0, 0, 0, 0) - today_date.setHours(0, 0, 0, 0)) /
      (24 * 60 * 60 * 1000);
    //
    //
    return [arr_end_date, Math.round(number_of_days), paymentsResume];
  };
  //
  //
  //
  let [arrangement_end_date, numOf_days, Payments_resume] = arrangement_details(
    regularPaymentDates(freq, paymentStartDate),
    index_of_balance
  );
  //
  try {
    if (isNaN(numOf_days)) throw (numOf_days = 0);
  } catch (error) {
    //
  }
  //
  // ------------------ //
  // Number of payments
  let numOf_payments = index_of_balance + 1;
  try {
    if (typeof numOf_payments == "undefined") throw (numOf_payments = 0);
  } catch (error) {
    //
  }
  //-                 --            Display results             --                      -//

  // Number of payments
  document.getElementById("num_of_payments").innerText = numOf_payments;
  //
  // Number of days
  document.getElementById("num_of_days").innerText = numOf_days;
  if (numOf_days > 90) {
    alert(
      "Arrangement outside your delegations.. Approval from a lead is required "
    );
  }
  //
  document.getElementById(
    "additionalPaymentAmount"
  ).innerText = `$ ${additional_amount}`;
  //   --   --  //
  // Arragement end date
  const year = arrangement_end_date.toLocaleString("default", {
    year: "numeric",
  });
  const month = arrangement_end_date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = arrangement_end_date.toLocaleString("default", {
    day: "2-digit",
  });

  const endDate = day + " / " + month + " / " + year;
  document.getElementById("arrangement-end-date").innerText = endDate;
  //
  // Payments resume on
  const yearResume = Payments_resume.toLocaleString("default", {
    year: "numeric",
  });
  const monthResume = Payments_resume.toLocaleString("default", {
    month: "2-digit",
  });
  const dayResume = Payments_resume.toLocaleString("default", {
    day: "2-digit",
  });

  const resumeDate = dayResume + " / " + monthResume + " / " + yearResume;
  document.getElementById("regular-payments-resume").innerText = resumeDate;
  // Arrangement total
  // Arrangement total
  const arrangement_total = numOf_payments * proposedArrangement;
  document.getElementById(
    "arrangement-total"
  ).innerText = `$ ${new Intl.NumberFormat().format(
    arrangement_total.toFixed(2)
  )}`;
  //
  //
};

//
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //
// =-----_--_-_-_-_-_-_-_-_-_-_-_-_--_-_-_-_-_-_-_-_-_-_-_--_-_-_-_-_--_-_-__-_----= //
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- //

// Frequency toggle
document
  .querySelector(".frequency-input")
  .addEventListener("click", event_function);
//
//
document
  .getElementById("overdue-input")
  .addEventListener("keyup", event_function);
//
document
  .querySelector(".monthly-instalment")
  .addEventListener("keyup", event_function);
//
// "Billing day" tag value

document.querySelector(".wrapper").addEventListener("click", function () {
  if (document.getElementById("dropdown-list").value !== "Billing due day") {
    document.querySelector(".wrapper").classList.add("select-wrapper");
  }
});
document.querySelector(".select").addEventListener("click", event_function);
//
document
  .getElementById("toggle_checkBox")
  .addEventListener("click", event_function);
//
// date picker
// document.querySelector(".date-picker").addEventListener("input", function () {
//   datePicker.style.width = "125px";
// });
document
  .querySelector(".date-picker")
  .addEventListener("input", event_function);
//
document
  .getElementById("proposedArrangement")
  .addEventListener("keyup", event_function);

// Clear button
document.getElementById("clear_button").addEventListener("click", () => {
  document.getElementById("num_of_payments").innerText = "_ _ _";
  document.getElementById("num_of_days").innerText = "_ _ _";
  document.getElementById("arrangement-end-date").innerText = "_ _ _";
  document.getElementById("regular-payments-resume").innerText = "_ _ _";
  document.getElementById("additionalPaymentAmount").innerText = "_ _ _";
  document.getElementById("arrangement-total").innerText = "_ _ _";
  document.querySelector(".regular-payment-amount").innerText = "";
  document.querySelector(".min-pref-label").innerText = "Minimum";
});

/////////----------------------------------------///////////////
// QA date
document
  .getElementById("QA-checkbox")
  .addEventListener("change", event_function);
//
document
  .getElementById("QA-date-picker")
  .addEventListener("input", event_function);
