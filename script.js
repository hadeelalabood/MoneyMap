// const Transactions = [];
const Transactions = [
  {
    id: 1,
    category: "Food",
    amount: 245.5,
    date: "2026-11-15",
    description: "Weekly groceries",
  },
  {
    id: 2,
    category: "Other",
    amount: 8500,
    date: "2026-11-16",
    description: "November salary",
  },
  {
    id: 3,
    category: "Entertainment",
    amount: 54.99,
    date: "2026-11-03",

    description: "Monthly subscription",
  },
  {
    id: 4,
    category: "Food",
    amount: 22,
    date: "2026-11-04",
    description: "Coffee with friends",
  },
  {
    id: 5,
    category: "Shopping",
    amount: 1200,
    date: "2026-11-05",
    description: "Website development",
  },
  {
    id: 6,
    category: "Transport",
    amount: 38.75,
    date: "2026-11-07",
    description: "Ride to work",
  },
  {
    id: 7,
    category: "Bills",
    amount: 320,
    date: "2026-11-09",
    description: "Monthly electricity bill",
  },
  {
    id: 8,
    category: "Transport",
    amount: 180.65,
    date: "2026-11-10",
    description: "Monthly gym membership",
  },
  {
    id: 9,
    category: "Shopping",
    amount: 450.7,
    date: "2026-11-12",
    description: "Clothes and accessories",
  },
  {
    id: 10,
    category: "Food",
    amount: 135,
    date: "2026-11-14",
    description: "Dinner with family",
  },
];
const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];
const amount = document.getElementById("amount");
const description = document.getElementById("description"); //.?#
const category = document.getElementById("category");
const date = document.getElementById("date");
let successMessage = document.querySelector(".success-message");
let tableFilter = "all";

//////

////////////////////////////////////////////ADD EXPENSE///////////////////////////
const setDefaultDate = function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  // console.log(mm, dd, yyyy);
  // console.log(today.getMonth());
  // console.log(today.getDate());
  document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;
};
setDefaultDate();
calculateTotalExpense();
totalTransactions();
changeCategoryPrizes();
for (let i = 0; i < categories.length; i++) {
  //APPEND CATEGORIES TO DROPDOWN MENU
  let el = document.createElement("option");
  el.textContent = categories[i];
  el.value = categories[i];
  document.getElementById("category").appendChild(el);
}

const resetForm = function () {
  document.getElementById("form").reset();
  setDefaultDate();
};
document.querySelector(".submit-btn").addEventListener("click", function () {
  event.preventDefault();
  let message = document.querySelector(".message");
  message.textContent = "";
  successMessage.textContent = "";
  if (
    amount.value &&
    amount.value !== "0" &&
    description.value &&
    category.value &&
    date.value
  ) {
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    // console.log(uid);
    // const object = {
    //   id: uid,
    //   amount: amount.value,
    //   description: description.value,
    //   category: category.value,
    //   date: date.value,
    // };
    Transactions.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2), //does it work?
      amount: amount.value,
      description: description.value,
      category: category.value,
      date: date.value,
    });
    // console.log(Transactions); //
    resetForm();
    createTransactionsTable();
    calculateTotalExpense();
    totalTransactions();
    changeCategoryPrizes();
    successMessage.textContent = "Transaction added succefully.";

    // document.querySelector(".class").reset();
    // document.forms["form"].reset();
    ////////reset
    //////confirmation dialog
    //////else
    // dialog(Transactions[uid]);
    // else{
    //   if(!amount.value || amount.value===0||){

    //   }
  } else {
    if (amount.value === "0" || !amount.value) {
      message.textContent = "Please enter Amount above 0.";
      return;
    }
    if (!description.value) {
      message.textContent = "Please add description.";
      return;
    }
    if (!category.value) {
      message.textContent = "Please select category.";
      return;
    }
    if (!date.value) {
      message.textContent = "Please select date.";
      return;
    }
  }
});
document.querySelector(".cancel-btn").addEventListener("click", resetForm);
document.querySelector(".form").addEventListener("focusin", function (event) {
  if (event.target.tagName === "INPUT") {
    // console.log(`You focused on: ${event.target.placeholder}`);
    successMessage.textContent = "";
  }
});
///////////////////////////////////////////////////TRANSACTIONS LIST////////////////////////////
const table = document.querySelector(".table");

function createTransactionsTable() {
  if (Transactions.length === 0) {
    table.classList.add("hidden");
    document.querySelector(".empty-list").classList.remove("hidden");
    document.querySelector(".empty-list-message").innerHTML =
      " <p>No Transactions yet.</p> ";
  } else {
    table.classList.remove("hidden");
    document.querySelector(".empty-list").classList.add("hidden");
    const tbody = document.querySelector(".tbody");
    tbody.innerHTML = "";
    const columns = [
      "id",
      "description",
      "category",
      "date",
      "amount",
      "delete",
    ];
    // console.log(columns);
    let newTransactions = [];
    if (tableFilter === "all") newTransactions = Transactions;
    else {
      newTransactions = Transactions.filter(
        (obj) => obj.category === tableFilter,
      );
      if (newTransactions.length === 0) {
        table.classList.add("hidden");
        document.querySelector(".empty-list").classList.remove("hidden");
        document.querySelector(".empty-list-message").innerHTML =
          `<p>No Transactions with <b>${tableFilter}</b> yet</p>`;
      }
      console.log(newTransactions, Transactions);
    }
    newTransactions.forEach((obj) => {
      const row = tbody.insertRow();
      columns.forEach((col) => {
        const cell = row.insertCell();
        cell.textContent =
          obj[col] !== undefined
            ? col === "date"
              ? formatDate(obj[col])
              : col === "amount"
                ? `-$${Number(obj[col]).toFixed(2)}`
                : // : col === "id"
                  //   ? ""
                  obj[col]
            : "";
        if (col === "amount") {
          cell.style.fontWeight = 500;
          cell.style.color = "black";
        }
        if (col === "delete")
          cell.innerHTML =
            "<button onClick='deletee(this)' class='delete'><ion-icon class='delete-icon' name='trash-outline'></ion-icon></button>";
        if (col === "id") cell.classList.add("hidden");
        console.log(obj);
      });
    });
  }
}
createTransactionsTable();
function formatDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. Expected yyyy-mm-dd.");
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date value.");
  }
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  // // Get yesterday's date at midnight
  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 1);

  // // Get input date at midnight
  // const inputMidnight = new Date(dateStr);
  // inputMidnight.setHours(0, 0, 0, 0);

  // // Compare
  // if (inputMidnight.getTime() === today.getTime()) {
  //   return "Today";
  // } else if (inputMidnight.getTime() === yesterday.getTime()) {
  //   return "Yesterday";
  // } else
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
///////////////////////////////table FILTER/////////////////////////
const allExpenseTag = document.getElementById("all-expense-tag");
const foodTag = document.getElementById("food-tag");
const transportTag = document.getElementById("transport-tag");
const shoppingTag = document.getElementById("shopping-tag");
const billsTag = document.getElementById("bills-tag");
const entertainmentTag = document.getElementById("entertainment-tag");
const otherTag = document.getElementById("other-tag");
const addNewTag = document.getElementById("add-new-tag");
allExpenseTag.addEventListener("click", function () {
  allExpenseTag.classList.add("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "all";
  createTransactionsTable();
});

foodTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.add("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Food";
  createTransactionsTable();
});
transportTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.add("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Transport";
  createTransactionsTable();
});
shoppingTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.add("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Shopping";
  createTransactionsTable();
});
billsTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.add("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Bills";
  createTransactionsTable();
});
entertainmentTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.add("tag-active");
  otherTag.classList.remove("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Entertainment";
  createTransactionsTable();
});
otherTag.addEventListener("click", function () {
  allExpenseTag.classList.remove("tag-active");
  foodTag.classList.remove("tag-active");
  transportTag.classList.remove("tag-active");
  shoppingTag.classList.remove("tag-active");
  billsTag.classList.remove("tag-active");
  entertainmentTag.classList.remove("tag-active");
  otherTag.classList.add("tag-active");
  addNewTag.classList.remove("tag-active");

  tableFilter = "Other";
  createTransactionsTable();
});
////////////////////////////////////DELET AN EXPENSE//////////////////
// document.querySelector(".deletee").addEventListener("click", function (event) {
//   console.log(event);
// });
function deletee(e) {
  let row = e.parentNode.parentNode;
  const id = row.cells[0].innerHTML;
  // console.log(e, row, id.innerHTML);
  // console.log(Transactions);
  // for (let i = 0; i < Transactions.length; i++) {
  //   if (Transactions[i].id == id) {
  //     console.log(Transactions[i + 1]);
  //     Transactions[i] = Transactions[i + 1] ? Transactions[i + 1] : {};
  //     i--;
  //     break;
  //     prompt("kbhjb");
  //   }
  // }
  const index = Transactions.findIndex((trans) => trans && trans.id == id);
  if (index !== -1) {
    Transactions.splice(index, 1);
    // console.log(Transactions);
    createTransactionsTable();
    calculateTotalExpense();
    totalTransactions();
    changeCategoryPrizes();
  }
}

///////////////////////////////total expense////////////////////
function calculateTotalExpense() {
  let sum = 0;
  Transactions.forEach((obj) => {
    const date = new Date(obj.date);
    const today = new Date();
    console.log(date.getMonth(), today.getMonth());
    if (date.getMonth() === today.getMonth()) {
      console.log(obj.amount);
      sum += parseFloat(obj.amount);
    }
  });
  const totalExpense = document.getElementById("total-expense");
  totalExpense.textContent = "$" + sum;
}
////////////////total-transactions////////
function totalTransactions() {
  document.getElementById("total-transactions").textContent =
    Transactions.length;
}
////////////////////////////////sidebar menu/////////////////////
const overview = document.getElementById("overview");
const addExpense = document.getElementById("add-expense");
const transactions = document.getElementById("transactions");
const insights = document.getElementById("insights");
const dashboard = document.querySelector(".dashboard");
const expenseForm = document.querySelector(".expense-form");
const transactionsList = document.querySelector(".transactions-list");
const insightsO = document.querySelector(".insightsO");
overview.addEventListener("click", function () {
  overview.classList.add("active");
  addExpense.classList.remove("active");
  transactions.classList.remove("active");
  insights.classList.remove("active");

  dashboard.classList.remove("hidden");
  expenseForm.classList.add("hidden");
  transactionsList.classList.add("hidden");
  insightsO.classList.add("hidden");
});
addExpense.addEventListener("click", function () {
  overview.classList.remove("active");
  addExpense.classList.add("active");
  transactions.classList.remove("active");
  insights.classList.remove("active");

  dashboard.classList.add("hidden");
  expenseForm.classList.remove("hidden");
  transactionsList.classList.add("hidden");
  insightsO.classList.add("hidden");
});
transactions.addEventListener("click", function () {
  overview.classList.remove("active");
  addExpense.classList.remove("active");
  transactions.classList.add("active");
  insights.classList.remove("active");

  dashboard.classList.add("hidden");
  expenseForm.classList.add("hidden");
  transactionsList.classList.remove("hidden");
  insightsO.classList.add("hidden");
});
insights.addEventListener("click", function () {
  overview.classList.remove("active");
  addExpense.classList.remove("active");
  transactions.classList.remove("active");
  insights.classList.add("active");

  dashboard.classList.add("hidden");
  expenseForm.classList.add("hidden");
  transactionsList.classList.add("hidden");
  insightsO.classList.remove("hidden");
});

////////////////////dashboard/////////////////

function changeCategoryPrizes() {
  const totFoodPrice = (document.getElementById(
    "total-food-price",
  ).textContent = `$${totalFood("Food")}`);
  console.log(totFoodPrice);
  const totTransPrice = (document.getElementById(
    "tot-trans-price",
  ).textContent = `$${totalFood("Transport")}`);
  const totShopPrice = (document.getElementById("tot-shop-price").textContent =
    `$${totalFood("Shopping")}`);
  const totBillPrice = (document.getElementById("tot-bill-price").textContent =
    `$${totalFood("Bills")}`);
  const totEnterPrice = (document.getElementById(
    "tot-enter-price",
  ).textContent = `$${totalFood("Entertainment")}`);
  const totOtherPrice = (document.getElementById(
    "tot-other-price",
  ).textContent = `$${totalFood("Other")}`);
}
function totalFood(type) {
  let sum = 0;
  let newTrans = Transactions.filter((obj) => obj.category === type);

  newTrans.forEach((obj) => {
    sum += Number(obj["amount"]);
  });
  return sum;
}
function topCategory() {
  const arr = [
    totalFood("Food"),
    totalFood("Transport"),
    totalFood("Shopping"),
    totalFood("Bills"),
    totalFood("Entertainment"),
    totalFood("Other"),
  ];
  for (const top of arr) {
  }
}
