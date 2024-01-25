"use strict";

// <---------^ EVENT_FUNCTION ^-------------->
//  ------------------------------->
const event_function = function () {
  // start with  values
  let overdue = document.getElementById("overdue-input").value; //overdue value
  const monthlyInstalment = document.querySelector(".monthly-instalment").value; //monthly instalment value
  const monthlyDue_DAY = document.querySelector(".select").value; //billing due day
  const payCycle = document.querySelector(".frequency-input").checked; //frequency --->> fortnightly = true -- weekly = false
  const annualised = document.getElementById("toggle_checkBox").checked; //min|pref --->> pref = true -- min = false
  let dateOfFirstPayment = document.querySelector(".date-picker").value; //Start Date
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
  // new Date(paymentStartDate).max = new Date().toISOString().split("T")[5];

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
    if (typeof monthlyDue_DAY == "string") throw (monthlyDue_DAY = 0);
  } catch (error) {
    //
  }
  // ???? paymentStartDate
  //
  try {
    if (!dateOfFirstPayment) throw (dateOfFirstPayment = new Date());
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

  const [regular_amount, frequency] = CalculateRegularPayment(
    payCycle,
    annualised,
    monthlyInstalment
  );
  //

  //
  document.querySelector(".regular-payment-amount").innerHTML =
    regular_amount.toFixed(2); // DOM Regular Payment // Display the regular payment amount - user feedback
  //

  if (frequency == 7) {
    weeklyFortnightlyTag.textContent = "weekly";
    weeklyFortnightlyTag.classList.remove("fortnightly");
    weeklyFortnightlyTag.classList.add("weekly");
  } else if (frequency == 14) {
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
    // ------- //
    // Function that finds the range between 2 dats and place it in array ->  datesInRange[]... Should return 365 dates..
    // We need to find the range of dates between PaymentStartDate and same start date for next year.
    const getDatesInRange = function (startDate, endDate) {
      const datesInRange = [];
      const date_InRange = new Date(startDate);
      while (date_InRange <= endDate) {
        datesInRange.push(new Date(date_InRange));
        date_InRange.setDate(date_InRange.getDate() + 1);
      }
      return datesInRange;
    };
    //
    // ----------------------------Function that returns the paymentStartDate date next year.
    const getDateNextYear = function (dt) {
      let dateNextYear = new Date(dt);
      dateNextYear.setDate(dateNextYear.getDate() + 365);
      return dateNextYear;
    };
    // ------- //
    // ---------------------------create a list of dates using getDatesInRange function
    const oneYearDatesList = getDatesInRange(
      paymentStartDate,
      getDateNextYear(paymentStartDate)
    );
    //
    let paymentDates = [];
    //
    // for (let i = 0; i <= oneYearDatesList.length; i += interval) {
    // paymentDates.push(new Date(oneYearDatesList[i].setHours(0, 0, 0, 0)));
    // }
    // -------------------------- Use filter() method here to replace for loop:
    paymentDates = oneYearDatesList.filter((dte, i) => {
      return i % interval == 0;
    });
    //
    return paymentDates;
  };
  // ------------------------------------------------------------------------
  const regularWeeklyOrFortnightlyDates = regularPaymentDates(
    frequency,
    dateOfFirstPayment
  );
  //----------------------------------------------------- console logs ----------------------------------------
  // console.log(regularWeeklyOrFortnightlyDates);

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
    if (QACheckBox) {
      QADatePicker.style.display = "block";
      return new Date(todayDate.setHours(0, 0, 0, 0));
    } else {
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

  //
  // Convert due day to due full date - constructs a full due date dd-mm-yyyy
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  // in this function we need to check if the due-DAY is before or after today's date. we first create an arbitrary due date based on the month we are in \ eg. if due-Day is 15th, we create a due date = 15th-currentMonth-currentYear\
  // Then we check if the initial arbitrary date is greater than or less than today's date.
  //If the initial dtae is GREATER than today's date, then the next first due-DATE is THIS month and is later this month.
  //If the initial date is LESS than today's date, then the next first due-DATE is NEXT month.
  // We also need to account for leap years..
  //
  // IN THE ORIGIONAL Excel Sheet ALL MONTHS WERE 30 DAYS (NO 31 DAYS MONTHS) - - - -  MUST MATCH Excel Sheet
  //
  const MonthlyInstalementDueDate = function (instalementDueDay, dateOfToday) {
    // const today = new Date(); // -> test for  "2023-01-31" // // "2023-09-01"
    // let dueFullDate = new Date(); // -> test for  "2023-01-31"    // // "2023-09-01"

    const today = new Date(dateOfToday);
    let dueFullDate = new Date(dateOfToday);
    dueFullDate.setDate(Number(instalementDueDay));
    //
    // accounting for February and Leap years...
    if (
      Number(instalementDueDay) > 28 && // If due-DAY is GREATER than 28th of the month.
      Number(today.getMonth()) == 0 && // if in January and due-DATE is GREATER than 28th
      dueFullDate <= today // if arbitrary due-DATE is LESS than today's date
    ) {
      dueFullDate = new Date(today.getFullYear(), 2, 0);
    }
    //   // If we're in February and due-DAY is gretaer than 28th of the month.
    else if (
      Number(instalementDueDay) > 28 && // If due-DAY is GREATER than 28th of the month.
      Number(today.getMonth()) == 1 && // if in February and due-DATE is GREATER than 28th
      dueFullDate >= today // if arbitrary due-DATE is GREATER than or equal to today's date
    ) {
      dueFullDate = new Date(today.getFullYear(), 2, 0);
    }

    //
    else if (dueFullDate <= today) {
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
  const dueDate = MonthlyInstalementDueDate(monthlyDue_DAY, dateOfToday);
  //
  //----------------------------------------------------- console logs ----------------------------------------
  // console.log(dueDate);
  //

  //

  //

  //

  //

  //
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------

  // Due_Dates_List
  // Function that generates a list of 12 due dates for the whole year
  // This function starts with checking if the due-DAY is less than 28.. If less than 28, increment the months in the dates by 1 and add it to the dueDates list.
  // If due-Day is greater than 28, we need to acccout for February..
  // to account for February, we create an array where we store all the months in the initial dueDates list... we check if the list includes February - checking for index [1]-..
  // Then we find the index of January and plug it in to get the last date of February
  // We need to get the last date of March.
  // Using the splice() method we insert the last date of February and March after January in the dueDates list to have a full 12 months list..
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const ListOfMonthlyDueDates = function (dueDate) {
    // create an empty array to store the date in
    const dueDates = [];
    // Function to increment months by one and push into the ListOfDueDates
    const incrementMonthsInDueDate = () => {
      dueDates.push(dueDate); // Push the first due date into the array first
      const NUMBER_OF_MONTHS = 11;
      for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        dueDate = new Date(
          dueDate.getFullYear(),
          dueDate.getMonth() + 1,
          monthlyDue_DAY
        );
        dueDates.push(dueDate);
      }
      return dueDates;
    };
    // if monthlyDueDay is LESS than or == 28, increment the months by 1 and push into the list
    if (monthlyDue_DAY <= 28) {
      incrementMonthsInDueDate();
    }
    // if monthlyDueDay is GREATER than or == 28, we need to account for February when the due_DAY is greater than 28th
    else if (monthlyDue_DAY >= 28) {
      incrementMonthsInDueDate();
      // to make sure that February is in our list of due dates
      // Create a list of the months in the due dates list
      const months = [];
      for (let i = 0; i < dueDates.length; i++) {
        const month = dueDates[i].getMonth();
        months.push(month);
      }
      // Find out if months contains February or not
      if (!months.includes(1)) {
        // Find the January index to use in creating the last day in February
        const januaryIndex = months.indexOf(0);
        // find the last date of February
        const LastDateFebruary = new Date(
          dueDates[januaryIndex].getFullYear(),
          2,
          0
        );
        // find the last date of March
        const LastDateMarch = new Date(
          dueDates[januaryIndex].getFullYear(),
          2,
          Number(monthlyDue_DAY)
        );
        dueDates.splice(januaryIndex + 1, 1, LastDateFebruary); // use Splice() method to insert the last date in February after January
        dueDates.splice(januaryIndex + 2, 0, LastDateMarch); // use Splice() method to insert the last date in March after February
      }
    }
    return dueDates;
  };
  // -----------------------------------------------

  const due_dates = ListOfMonthlyDueDates(
    MonthlyInstalementDueDate(monthlyDue_DAY, dateOfToday)
  );

  console.log(due_dates);
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  //

  //
  const dueDATE = MonthlyInstalementDueDate(monthlyDue_DAY, dateOfToday);
  console.log(dueDATE);

  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------

  //
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------

  //

  //

  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------------------------

  // Calculate balances
  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////  //////-_-_-_-_---_-_--_-__-__-__-__-_-_--_--_-__-__----////////////
  const cal_balances = function (dueDatesList, regularDatesList) {
    const balances = [];

    // loop through paymentDates
    for (
      let index = 0, counter = 0, balance = Number(overdue);
      index < regularDatesList.length;
      index++
    ) {
      let due_date = dueDatesList[counter];

      // if payment date is LESS than due date
      if (regularDatesList[index].setHours(0, 0, 0, 0) < due_date) {
        balance -= Number(proposedArrangement);
        balances.push(balance);
      }
      // if payment date is GREATER than due date
      if (regularDatesList[index].setHours(0, 0, 0, 0) >= due_date) {
        balance =
          balance +
          late_fees +
          Number(monthlyInstalment) -
          Number(proposedArrangement);
        balances.push(balance);
        counter++;
      }
    }
    return balances;
  };

  const balances_list = cal_balances(
    due_dates,
    regularWeeklyOrFortnightlyDates
  );

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
    regularWeeklyOrFortnightlyDates,
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
    regularPaymentDates(frequency, dateOfFirstPayment),
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
