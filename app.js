/* =========================================================
   SUPABASE AUTH
   ========================================================= */

const SUPABASE_URL =
  "https://dzdmiddosrcimfszeryf.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_vOfWaD399LyEffAN220Ehw_rBKdLQ4N";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

let currentUser = null;


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "finansia:v1";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultData = {

  profile: {
    name: "Pengguna",
    currency: "IDR"
  },

  transactions: [],

  budgets: [],

  goals: [],

  bills: [],

  debts: [],

};


/* =========================================================
   DEMO DATA
   ========================================================= */

const demoData = {

  profile: {
    name: "Pengguna",
    currency: "IDR"
  },

  transactions: [

    tx(
      "2026-08-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      12500000
    ),

    tx(
      "2026-08-02",
      "expense",
      "Belanja bulanan",
      "Makanan",
      "Bank",
      1850000
    ),

    tx(
      "2026-08-03",
      "expense",
      "Transport kerja",
      "Transportasi",
      "E-wallet",
      420000
    ),

    tx(
      "2026-08-04",
      "expense",
      "Internet rumah",
      "Utilitas",
      "Bank",
      350000
    ),

    tx(
      "2026-08-06",
      "expense",
      "Kopi dan makan luar",
      "Hiburan",
      "E-wallet",
      275000
    ),

    tx(
      "2026-08-08",
      "income",
      "Freelance landing page",
      "Freelance",
      "Bank",
      2800000
    ),

    tx(
      "2026-07-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      12000000
    ),

    tx(
      "2026-07-04",
      "expense",
      "Sewa rumah",
      "Rumah",
      "Bank",
      3500000
    ),

    tx(
      "2026-07-08",
      "expense",
      "Groceries",
      "Makanan",
      "Bank",
      1600000
    ),

    tx(
      "2026-06-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      12000000
    ),

    tx(
      "2026-06-05",
      "expense",
      "Asuransi",
      "Kesehatan",
      "Bank",
      700000
    ),

    tx(
      "2026-05-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      11800000
    ),

    tx(
      "2026-05-12",
      "expense",
      "Service motor",
      "Transportasi",
      "Tunai",
      650000
    ),

    tx(
      "2026-04-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      11800000
    ),

    tx(
      "2026-03-01",
      "income",
      "Gaji bulanan",
      "Gaji",
      "Bank",
      11500000
    ),

  ],


  budgets: [

    {
      id: uid(),
      category: "Makanan",
      limit: 2500000
    },

    {
      id: uid(),
      category: "Transportasi",
      limit: 900000
    },

    {
      id: uid(),
      category: "Hiburan",
      limit: 700000
    },

    {
      id: uid(),
      category: "Utilitas",
      limit: 800000
    },

  ],


  goals: [

    {
      id: uid(),
      name: "Dana darurat",
      target: 50000000,
      current: 22000000,
      deadline: "2027-02-28"
    },

    {
      id: uid(),
      name: "Liburan keluarga",
      target: 18000000,
      current: 6500000,
      deadline: "2026-12-20"
    },

  ],


  bills: [

    {
      id: uid(),
      name: "Internet rumah",
      amount: 350000,
      dueDate: "2026-08-25",
      status: "unpaid"
    },

    {
      id: uid(),
      name: "Kartu kredit",
      amount: 1450000,
      dueDate: "2026-08-19",
      status: "unpaid"
    },

    {
      id: uid(),
      name: "Asuransi",
      amount: 700000,
      dueDate: "2026-08-10",
      status: "paid"
    },

  ],


  debts: [

    {
      id: uid(),
      type: "receivable",
      person: "Andi",
      amount: 750000,
      dueDate: "2026-08-30",
      note: "Pinjaman laptop"
    },

    {
      id: uid(),
      type: "payable",
      person: "Koperasi",
      amount: 1250000,
      dueDate: "2026-09-05",
      note: "Cicilan"
    },

  ],

};


/* =========================================================
   STATE
   ========================================================= */

let state = loadState();


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const els = {

  monthFilter:
    document.querySelector("#monthFilter"),

  searchInput:
    document.querySelector("#searchInput"),

  categoryFilter:
    document.querySelector("#categoryFilter"),

  totalBalance:
    document.querySelector("#totalBalance"),

  monthlyIncome:
    document.querySelector("#monthlyIncome"),

  monthlyExpense:
    document.querySelector("#monthlyExpense"),

  netSavings:
    document.querySelector("#netSavings"),

  incomeChange:
    document.querySelector("#incomeChange"),

  expenseChange:
    document.querySelector("#expenseChange"),

  savingRate:
    document.querySelector("#savingRate"),

  recentTransactions:
    document.querySelector("#recentTransactions"),

  transactionTable:
    document.querySelector("#transactionTable"),

  budgetList:
    document.querySelector("#budgetList"),

  goalList:
    document.querySelector("#goalList"),

  billList:
    document.querySelector("#billList"),

  debtList:
    document.querySelector("#debtList"),

  alerts:
    document.querySelector("#alerts"),

  ratioReport:
    document.querySelector("#ratioReport"),

  topCategories:
    document.querySelector("#topCategories"),

  projectionText:
    document.querySelector("#projectionText"),

  cashHealth:
    document.querySelector("#cashHealth"),

  cashHealthText:
    document.querySelector("#cashHealthText"),

  cashflowChart:
    document.querySelector("#cashflowChart"),

  categoryChart:
    document.querySelector("#categoryChart"),

  toast:
    document.querySelector("#toast"),

};


/* =========================================================
   AUTH DOM
   ========================================================= */

const authScreen =
  document.querySelector("#authScreen");

const loginBox =
  document.querySelector("#loginBox");

const registerBox =
  document.querySelector("#registerBox");

const authMessage =
  document.querySelector("#authMessage");


/* =========================================================
   TRANSACTION
   ========================================================= */

function tx(
  date,
  type,
  description,
  category,
  account,
  amount
) {

  return {

    id: uid(),

    date,

    type,

    description,

    category,

    account,

    amount

  };

}


/* =========================================================
   UUID
   ========================================================= */

function uid() {

  return crypto.randomUUID
    ? crypto.randomUUID()
    : String(
        Date.now() + Math.random()
      );

}


/* =========================================================
   LOAD STATE
   ========================================================= */

function loadState() {

  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw) {

    return structuredClone(
      defaultData
    );

  }

  try {

    return {

      ...structuredClone(
        defaultData
      ),

      ...JSON.parse(raw)

    };

  } catch {

    return structuredClone(
      defaultData
    );

  }

}


/* =========================================================
   SAVE STATE
   ========================================================= */

function saveState() {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(state)

  );

}


/* =========================================================
   MONEY
   ========================================================= */

function money(value) {

  return new Intl.NumberFormat(
    "id-ID",
    {

      style: "currency",

      currency:
        state.profile.currency,

      maximumFractionDigits: 0,

    }
  ).format(
    Number(value || 0)
  );

}


/* =========================================================
   PERCENT
   ========================================================= */

function percent(value) {

  if (!Number.isFinite(value)) {

    return "0%";

  }

  return `${Math.round(value)}%`;

}


/* =========================================================
   SELECTED MONTH
   ========================================================= */

function selectedMonth() {

  return (

    els.monthFilter.value ||

    new Date()
      .toISOString()
      .slice(0, 7)

  );

}


/* =========================================================
   MONTH
   ========================================================= */

function monthOf(date) {

  return date.slice(0, 7);

}


function inMonth(date, month) {

  return monthOf(date) === month;

}


/* =========================================================
   SUM
   ========================================================= */

function sum(
  list,
  predicate = () => true
) {

  return list

    .filter(predicate)

    .reduce(

      (total, item) =>
        total +
        Number(item.amount || 0),

      0

    );

}


/* =========================================================
   MONTHLY TRANSACTIONS
   ========================================================= */

function monthlyTransactions(
  month = selectedMonth()
) {

  return state.transactions.filter(

    (item) =>
      inMonth(
        item.date,
        month
      )

  );

}


/* =========================================================
   FILTERED TRANSACTIONS
   ========================================================= */

function filteredTransactions() {

  const query =
    els.searchInput.value
      .trim()
      .toLowerCase();

  const category =
    els.categoryFilter.value;

  return state.transactions

    .filter(

      (item) =>

        !query ||

        [
          item.description,
          item.category,
          item.account
        ]

          .join(" ")

          .toLowerCase()

          .includes(query)

    )

    .filter(

      (item) =>
        !category ||
        item.category === category

    )

    .sort(

      (a, b) =>
        b.date.localeCompare(
          a.date
        )

    );

}


/* =========================================================
   RENDER
   ========================================================= */

function render() {

  saveState();

  renderCategoryOptions();

  renderDashboard();

  renderTransactions();

  renderBudgets();

  renderGoals();

  renderBills();

  renderDebts();

  renderReports();

}


/* =========================================================
   CATEGORY OPTIONS
   ========================================================= */

function renderCategoryOptions() {

  const selectedCategory =
    els.categoryFilter.value;

  const categories = [

    ...new Set(

      state.transactions

        .map(
          (item) =>
            item.category
        )

        .filter(Boolean)

    )

  ].sort();


  els.categoryFilter.innerHTML =

    `<option value="">Semua kategori</option>` +

    categories

      .map(

        (cat) =>
          `<option>${escapeHtml(
            cat
          )}</option>`

      )

      .join("");


  els.categoryFilter.value =

    categories.includes(
      selectedCategory
    )

      ? selectedCategory

      : "";


  document.querySelector(
    "#categoryOptions"
  ).innerHTML =

    categories

      .map(

        (cat) =>
          `<option value="${escapeHtml(
            cat
          )}"></option>`

      )

      .join("");

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  const month =
    selectedMonth();

  const prevMonth =
    shiftMonth(
      month,
      -1
    );

  const current =
    monthlyTransactions(
      month
    );

  const previous =
    monthlyTransactions(
      prevMonth
    );


  const totalIncome =
    sum(
      state.transactions,
      (item) =>
        item.type === "income"
    );


  const totalExpense =
    sum(
      state.transactions,
      (item) =>
        item.type === "expense"
    );


  const income =
    sum(
      current,
      (item) =>
        item.type === "income"
    );


  const expense =
    sum(
      current,
      (item) =>
        item.type === "expense"
    );


  const prevIncome =
    sum(
      previous,
      (item) =>
        item.type === "income"
    );


  const prevExpense =
    sum(
      previous,
      (item) =>
        item.type === "expense"
    );


  const net =
    income - expense;


  const rate =
    income
      ? (net / income) * 100
      : 0;


  els.totalBalance.textContent =
    money(
      totalIncome -
      totalExpense
    );


  els.monthlyIncome.textContent =
    money(income);


  els.monthlyExpense.textContent =
    money(expense);


  els.netSavings.textContent =
    money(net);


  els.incomeChange.textContent =
    compareText(
      income,
      prevIncome,
      "dari bulan lalu"
    );


  els.expenseChange.textContent =
    compareText(
      expense,
      prevExpense,
      "dari bulan lalu"
    );


  els.savingRate.textContent =
    `Saving rate ${percent(
      rate
    )}`;


  els.cashHealth.textContent =
    rate >= 20
      ? "Sehat"
      : rate >= 0
      ? "Perlu dijaga"
      : "Defisit";


  els.cashHealthText.textContent =
    rate >= 20
      ? "Tabungan bersih kuat."
      : rate >= 0
      ? "Masih positif, ruang optimasi ada."
      : "Pengeluaran melebihi pemasukan.";


  renderRecentTransactions();

  renderAlerts(
    income,
    expense,
    rate
  );

  drawCashflowChart();

  drawCategoryChart(
    current
  );

}


/* =========================================================
   COMPARE
   ========================================================= */

function compareText(
  now,
  before,
  suffix
) {

  if (!before && !now) {

    return "Belum ada data";

  }

  if (!before) {

    return "Data baru bulan ini";

  }

  const diff =
    ((now - before) /
      before) *
    100;

  const sign =
    diff >= 0
      ? "+"
      : "";

  return `${sign}${percent(
    diff
  )} ${suffix}`;

}


/* =========================================================
   RECENT TRANSACTIONS
   ========================================================= */

function renderRecentTransactions() {

  const rows =
    filteredTransactions()

      .slice(0, 10)

      .map(

        (item) =>

          `<tr>

            <td>
              ${formatDate(
                item.date
              )}
            </td>

            <td>
              ${escapeHtml(
                item.description
              )}
            </td>

            <td>
              <span class="pill">
                ${escapeHtml(
                  item.category
                )}
              </span>
            </td>

            <td class="right ${
              item.type === "income"
                ? "positive"
                : "negative"
            }">

              ${
                item.type === "income"
                  ? "+"
                  : "-"
              }

              ${money(
                item.amount
              )}

            </td>

          </tr>`

      )

      .join("");


  els.recentTransactions.innerHTML =

    rows ||

    `<tr>
      <td colspan="4" class="empty">
        Belum ada transaksi.
      </td>
    </tr>`;

}


/* =========================================================
   TRANSACTIONS TABLE
   ========================================================= */

function renderTransactions() {

  const rows =
    filteredTransactions()

      .map(

        (item) =>

          `<tr>

            <td>
              ${formatDate(
                item.date
              )}
            </td>

            <td>

              <span class="pill ${
                item.type === "income"
                  ? "green"
                  : "red"
              }">

                ${
                  item.type === "income"
                    ? "Pemasukan"
                    : "Pengeluaran"
                }

              </span>

            </td>

            <td>
              ${escapeHtml(
                item.description
              )}
            </td>

            <td>
              ${escapeHtml(
                item.category
              )}
            </td>

            <td>
              ${escapeHtml(
                item.account || "-"
              )}
            </td>

            <td class="right">
              ${money(
                item.amount
              )}
            </td>

            <td class="actions">

              <button
                class="small-btn"
                data-edit-transaction="${item.id}"
              >
                Edit
              </button>

              <button
                class="small-btn danger"
                data-delete="transactions:${item.id}"
              >
                Hapus
              </button>

            </td>

          </tr>`

      )

      .join("");


  els.transactionTable.innerHTML =

    rows ||

    `<tr>
      <td colspan="7" class="empty">
        Belum ada transaksi.
      </td>
    </tr>`;

}


/* =========================================================
   BUDGETS
   ========================================================= */

function renderBudgets() {

  const current =
    monthlyTransactions()

      .filter(
        (item) =>
          item.type === "expense"
      );


  els.budgetList.innerHTML =

    state.budgets

      .map(

        (budget) => {

          const spent =
            sum(
              current,
              (item) =>
                item.category ===
                budget.category
            );


          const ratio =
            budget.limit
              ? (spent /
                  budget.limit) *
                100
              : 0;


          const statusClass =
            ratio >= 100
              ? "danger"
              : ratio >= 80
              ? "warn"
              : "";


          return `

            <article class="card item-card">

              <header>

                <div>

                  <h3>
                    ${escapeHtml(
                      budget.category
                    )}
                  </h3>

                  <p class="muted">
                    ${money(
                      spent
                    )}
                    dari
                    ${money(
                      budget.limit
                    )}
                  </p>

                </div>


                <button
                  class="small-btn danger"
                  data-delete="budgets:${budget.id}"
                >
                  Hapus
                </button>

              </header>


              <div
                class="progress ${statusClass}"
              >

                <span
                  style="width:${Math.min(
                    ratio,
                    100
                  )}%"
                ></span>

              </div>


              <div class="item-meta">

                <span>
                  Terpakai
                  ${percent(
                    ratio
                  )}
                </span>

                <strong>
                  Sisa
                  ${money(
                    Math.max(
                      budget.limit -
                        spent,
                      0
                    )
                  )}
                </strong>

              </div>

            </article>

          `;

        }

      )

      .join("") ||

    `<div class="card empty">
      Belum ada anggaran.
    </div>`;

}


/* =========================================================
   GOALS
   ========================================================= */

function renderGoals() {

  els.goalList.innerHTML =

    state.goals

      .map(

        (goal) => {

          const ratio =
            goal.target
              ? (goal.current /
                  goal.target) *
                100
              : 0;


          return `

            <article class="card item-card">

              <header>

                <div>

                  <h3>
                    ${escapeHtml(
                      goal.name
                    )}
                  </h3>

                  <p class="muted">

                    Target
                    ${money(
                      goal.target
                    )}

                    ${
                      goal.deadline
                        ? ` · ${formatDate(
                            goal.deadline
                          )}`
                        : ""
                    }

                  </p>

                </div>


                <button
                  class="small-btn danger"
                  data-delete="goals:${goal.id}"
                >
                  Hapus
                </button>

              </header>


              <div class="progress">

                <span
                  style="width:${Math.min(
                    ratio,
                    100
                  )}%"
                ></span>

              </div>


              <div class="item-meta">

                <span>
                  ${percent(
                    ratio
                  )}
                  tercapai
                </span>

                <strong>
                  Kurang
                  ${money(
                    Math.max(
                      goal.target -
                        goal.current,
                      0
                    )
                  )}
                </strong>

              </div>

            </article>

          `;

        }

      )

      .join("") ||

    `<div class="card empty">
      Belum ada tujuan.
    </div>`;

}


/* =========================================================
   BILLS
   ========================================================= */

function renderBills() {

  els.billList.innerHTML =

    state.bills

      .sort(
        (a, b) =>
          a.dueDate.localeCompare(
            b.dueDate
          )
      )

      .map(

        (bill) => {

          const overdue =
            bill.status !== "paid" &&
            new Date(
              bill.dueDate
            ) <
              startOfToday();


          return `

            <article class="card item-card">

              <header>

                <div>

                  <h3>
                    ${escapeHtml(
                      bill.name
                    )}
                  </h3>

                  <p class="muted">

                    ${formatDate(
                      bill.dueDate
                    )}

                    ·

                    ${money(
                      bill.amount
                    )}

                  </p>

                </div>


                <span
                  class="pill ${
                    bill.status === "paid"
                      ? "green"
                      : overdue
                      ? "red"
                      : ""
                  }"
                >

                  ${
                    bill.status ===
                    "paid"
                      ? "Lunas"
                      : overdue
                      ? "Terlambat"
                      : "Belum dibayar"
                  }

                </span>

              </header>


              <div class="actions">

                <button
                  class="small-btn"
                  data-toggle-bill="${bill.id}"
                >

                  ${
                    bill.status ===
                    "paid"
                      ? "Tandai belum"
                      : "Tandai lunas"
                  }

                </button>


                <button
                  class="small-btn danger"
                  data-delete="bills:${bill.id}"
                >
                  Hapus
                </button>

              </div>

            </article>

          `;

        }

      )

      .join("") ||

    `<div class="card empty">
      Belum ada tagihan.
    </div>`;

}


/* =========================================================
   DEBTS
   ========================================================= */

function renderDebts() {

  els.debtList.innerHTML =

    state.debts

      .map(

        (debt) =>

          `

          <article class="card item-card">

            <header>

              <div>

                <h3>
                  ${escapeHtml(
                    debt.person
                  )}
                </h3>

                <p class="muted">

                  ${
                    debt.type ===
                    "receivable"
                      ? "Piutang"
                      : "Hutang"
                  }

                  ·

                  ${
                    debt.dueDate
                      ? formatDate(
                          debt.dueDate
                        )
                      : "Tanpa jatuh tempo"
                  }

                </p>

              </div>


              <span
                class="pill ${
                  debt.type ===
                  "receivable"
                    ? "green"
                    : "red"
                }"
              >

                ${money(
                  debt.amount
                )}

              </span>

            </header>


            <p class="muted">

              ${escapeHtml(
                debt.note ||
                  "Tidak ada catatan"
              )}

            </p>


            <button
              class="small-btn danger"
              data-delete="debts:${debt.id}"
            >
              Hapus
            </button>

          </article>

          `

      )

      .join("") ||

    `<div class="card empty">
      Belum ada hutang/piutang.
    </div>`;

}


/* =========================================================
   REPORTS
   ========================================================= */

function renderReports() {

  const month =
    selectedMonth();

  const current =
    monthlyTransactions(
      month
    );


  const income =
    sum(
      current,
      (item) =>
        item.type === "income"
    );


  const expense =
    sum(
      current,
      (item) =>
        item.type === "expense"
    );


  const netWorth =

    sum(
      state.transactions,
      (item) =>
        item.type === "income"
    )

    -

    sum(
      state.transactions,
      (item) =>
        item.type === "expense"
    );


  const unpaidBills =
    sum(
      state.bills,
      (item) =>
        item.status !== "paid"
    );


  const payable =
    sum(
      state.debts,
      (item) =>
        item.type === "payable"
    );


  const receivable =
    sum(
      state.debts,
      (item) =>
        item.type ===
        "receivable"
    );


  const ratios = [

    [
      "Saving rate",

      income
        ? percent(
            ((income -
              expense) /
              income) *
              100
          )
        : "0%"
    ],

    [
      "Expense ratio",

      income
        ? percent(
            (expense /
              income) *
              100
          )
        : "0%"
    ],

    [
      "Saldo bersih",

      money(netWorth)
    ],

    [
      "Kewajiban terbuka",

      money(
        unpaidBills +
          payable
      )
    ],

    [
      "Piutang tercatat",

      money(receivable)
    ],

  ];


  els.ratioReport.innerHTML =

    ratios

      .map(

        ([label, value]) =>

          `

          <div class="metric-row">

            <span>
              ${label}
            </span>

            <strong>
              ${value}
            </strong>

          </div>

          `

      )

      .join("");


  const byCategory =
    groupExpenseByCategory(
      current
    ).slice(0, 5);


  els.topCategories.innerHTML =

    byCategory

      .map(

        ([category, amount]) =>

          `

          <div class="metric-row">

            <span>
              ${escapeHtml(
                category
              )}
            </span>

            <strong>
              ${money(
                amount
              )}
            </strong>

          </div>

          `

      )

      .join("") ||

    `<p class="muted">
      Belum ada pengeluaran bulan ini.
    </p>`;


  const lastThree =
    getMonthRange(
      selectedMonth(),
      -2,
      0
    );


  const avgNet =

    lastThree.reduce(

      (total, monthKey) => {

        const list =
          monthlyTransactions(
            monthKey
          );


        return (

          total +

          sum(
            list,
            (item) =>
              item.type ===
              "income"
          ) -

          sum(
            list,
            (item) =>
              item.type ===
              "expense"
          )

        );

      },

      0

    ) / 3;


  els.projectionText.textContent =

    `Jika pola 3 bulan terakhir berlanjut, saldo bersih diperkirakan berubah sekitar ${money(
      avgNet * 3
    )} dalam 3 bulan ke depan.`;

}


/* =========================================================
   ALERTS
   ========================================================= */

function renderAlerts(
  income,
  expense,
  rate
) {

  const alerts = [];


  if (
    income &&
    expense > income
  ) {

    alerts.push([

      "danger",

      "Defisit bulan ini",

      "Pengeluaran lebih besar dari pemasukan."

    ]);

  }


  if (
    income &&
    rate < 20
  ) {

    alerts.push([

      "warn",

      "Saving rate rendah",

      "Target praktis: sisihkan minimal 20% pemasukan."

    ]);

  }


  state.budgets.forEach(
    (budget) => {

      const spent =
        sum(

          monthlyTransactions(),

          (item) =>

            item.type ===
              "expense" &&

            item.category ===
              budget.category

        );


      if (
        budget.limit &&
        spent / budget.limit >=
          0.8
      ) {

        alerts.push([

          spent >
          budget.limit
            ? "danger"
            : "warn",

          `Anggaran ${budget.category}`,

          `${percent(
            (spent /
              budget.limit) *
              100
          )} sudah terpakai.`

        ]);

      }

    }
  );


  state.bills

    .filter(
      (bill) =>
        bill.status !== "paid"
    )

    .forEach(
      (bill) => {

        const days =
          daysBetween(

            startOfToday(),

            new Date(
              bill.dueDate
            )

          );


        if (days <= 7) {

          alerts.push([

            days < 0
              ? "danger"
              : "warn",

            `Tagihan ${bill.name}`,

            days < 0

              ? `Terlambat ${Math.abs(
                  days
                )} hari.`

              : `Jatuh tempo ${days} hari lagi.`

          ]);

        }

      }
    );


  els.alerts.innerHTML =

    alerts.length

      ? alerts

          .slice(0, 6)

          .map(

            ([type, title, text]) =>

              `

              <div class="alert ${type}">

                <strong>
                  ${title}
                </strong>

                <br>

                <span>
                  ${text}
                </span>

              </div>

              `

          )

          .join("")

      : `

        <div class="alert">

          <strong>
            Aman
          </strong>

          <br>

          <span>
            Tidak ada alarm keuangan prioritas.
          </span>

        </div>

      `;

}


/* =========================================================
   CASHFLOW CHART
   ========================================================= */

function drawCashflowChart() {

  const labels =
    getMonthRange(
      selectedMonth(),
      -5,
      0
    );


  const income =
    labels.map(

      (m) =>

        sum(

          monthlyTransactions(
            m
          ),

          (item) =>
            item.type ===
            "income"

        )

    );


  const expense =
    labels.map(

      (m) =>

        sum(

          monthlyTransactions(
            m
          ),

          (item) =>
            item.type ===
            "expense"

        )

    );


  drawBarChart(

    els.cashflowChart,

    labels.map(
      shortMonth
    ),

    [

      {
        label:
          "Pemasukan",

        values:
          income,

        color:
          "#10945b"
      },

      {
        label:
          "Pengeluaran",

        values:
          expense,

        color:
          "#d92d20"
      }

    ]

  );

}


/* =========================================================
   CATEGORY CHART
   ========================================================= */

function drawCategoryChart(
  transactions
) {

  const rows =
    groupExpenseByCategory(
      transactions
    );


  drawDonutChart(

    els.categoryChart,

    rows

  );

}


/* =========================================================
   BAR CHART
   ========================================================= */

function drawBarChart(
  canvas,
  labels,
  series
) {

  const ctx =
    prepareCanvas(
      canvas
    );


  const {
    width,
    height
  } =
    canvas.getBoundingClientRect();


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  const max =
    Math.max(

      1,

      ...series.flatMap(
        (item) =>
          item.values
      )

    );


  const padding = 34;

  const chartHeight =
    height -
    padding * 2;


  const groupWidth =
    (width -
      padding * 2) /
    labels.length;


  const barWidth =
    Math.min(
      24,
      groupWidth /
        (series.length +
          1.8)
    );


  ctx.font =
    "12px system-ui";

  ctx.fillStyle =
    "#667085";


  labels.forEach(
    (label, index) => {

      const x =
        padding +
        index *
          groupWidth +
        groupWidth / 2;


      ctx.fillText(

        label,

        x - 16,

        height - 10

      );


      series.forEach(
        (item, sIndex) => {

          const value =
            item.values[
              index
            ];


          const barHeight =
            (value / max) *
            chartHeight;


          const bx =
            x -
            barWidth +
            sIndex *
              (barWidth +
                5);


          const by =
            height -
            padding -
            barHeight;


          ctx.fillStyle =
            item.color;


          roundRect(

            ctx,

            bx,

            by,

            barWidth,

            barHeight,

            6

          );


          ctx.fill();

        }
      );

    }
  );

}


/* =========================================================
   DONUT CHART
   ========================================================= */

function drawDonutChart(
  canvas,
  rows
) {

  const ctx =
    prepareCanvas(
      canvas
    );


  const {
    width,
    height
  } =
    canvas.getBoundingClientRect();


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  if (!rows.length) {

    ctx.fillStyle =
      "#667085";

    ctx.font =
      "14px system-ui";

    ctx.fillText(

      "Belum ada pengeluaran bulan ini",

      24,

      height / 2

    );

    return;

  }


  const colors = [

    "#176bff",

    "#15b79e",

    "#f79009",

    "#d92d20",

    "#7a5af8",

    "#667085"

  ];


  const total =
    rows.reduce(

      (acc, [, amount]) =>
        acc + amount,

      0

    );


  const cx =
    width * 0.32;


  const cy =
    height / 2;


  const radius =
    Math.min(
      width,
      height
    ) * 0.28;


  let start =
    -Math.PI / 2;


  rows.forEach(
    ([category, amount], index) => {

      const slice =
        (amount / total) *
        Math.PI *
        2;


      ctx.beginPath();

      ctx.moveTo(
        cx,
        cy
      );


      ctx.arc(

        cx,

        cy,

        radius,

        start,

        start + slice

      );


      ctx.closePath();


      ctx.fillStyle =
        colors[
          index %
            colors.length
        ];


      ctx.fill();


      start += slice;

    }
  );


  ctx.beginPath();

  ctx.arc(

    cx,

    cy,

    radius * 0.55,

    0,

    Math.PI * 2

  );


  ctx.fillStyle =
    "#fff";


  ctx.fill();


  ctx.font =
    "12px system-ui";


  rows

    .slice(0, 6)

    .forEach(
      ([category, amount], index) => {

        const y =
          34 +
          index * 26;


        ctx.fillStyle =
          colors[
            index %
              colors.length
          ];


        ctx.fillRect(

          width * 0.58,

          y - 10,

          12,

          12

        );


        ctx.fillStyle =
          "#172033";


        ctx.fillText(

          `${category} · ${percent(
            (amount / total) *
              100
          )}`,

          width * 0.58 +
            20,

          y

        );

      }
    );

}


/* =========================================================
   CANVAS
   ========================================================= */

function prepareCanvas(
  canvas
) {

  const rect =
    canvas.getBoundingClientRect();


  const dpr =
    window.devicePixelRatio ||
    1;


  canvas.width =
    rect.width * dpr;


  canvas.height =
    rect.height * dpr;


  const ctx =
    canvas.getContext(
      "2d"
    );


  ctx.scale(
    dpr,
    dpr
  );


  return ctx;

}


/* =========================================================
   ROUND RECT
   ========================================================= */

function roundRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {

  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.lineTo(
    x +
      width -
      radius,
    y
  );

  ctx.quadraticCurveTo(

    x + width,

    y,

    x + width,

    y + radius

  );

  ctx.lineTo(

    x + width,

    y + height

  );

  ctx.lineTo(

    x,

    y + height

  );

  ctx.lineTo(

    x,

    y + radius

  );

  ctx.quadraticCurveTo(

    x,

    y,

    x + radius,

    y

  );

  ctx.closePath();

}


/* =========================================================
   GROUP EXPENSE
   ========================================================= */

function groupExpenseByCategory(
  transactions
) {

  const grouped =
    new Map();


  transactions

    .filter(
      (item) =>
        item.type ===
        "expense"
    )

    .forEach(
      (item) =>

        grouped.set(

          item.category,

          (
            grouped.get(
              item.category
            ) || 0
          ) +

          Number(
            item.amount || 0
          )

        )

    );


  return [

    ...grouped.entries()

  ].sort(

    (a, b) =>
      b[1] - a[1]

  );

}


/* =========================================================
   SHIFT MONTH
   ========================================================= */

function shiftMonth(
  month,
  delta
) {

  const [
    year,
    monthIndex
  ] =
    month
      .split("-")
      .map(Number);


  const date =
    new Date(

      year,

      monthIndex -
        1 +
        delta,

      1

    );


  return date
    .toISOString()
    .slice(0, 7);

}


/* =========================================================
   MONTH RANGE
   ========================================================= */

function getMonthRange(
  anchor,
  startOffset,
  endOffset
) {

  const months = [];


  for (

    let offset =
      startOffset;

    offset <=
      endOffset;

    offset += 1

  ) {

    months.push(

      shiftMonth(
        anchor,
        offset
      )

    );

  }


  return months;

}


/* =========================================================
   SHORT MONTH
   ========================================================= */

function shortMonth(
  month
) {

  const [
    year,
    monthIndex
  ] =
    month
      .split("-")
      .map(Number);


  return new Intl.DateTimeFormat(

    "id-ID",

    {
      month: "short"
    }

  ).format(

    new Date(
      year,
      monthIndex - 1,
      1
    )

  );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(
  date
) {

  return new Intl.DateTimeFormat(

    "id-ID",

    {

      day: "2-digit",

      month: "short",

      year: "numeric"

    }

  ).format(
    new Date(date)
  );

}


/* =========================================================
   TODAY
   ========================================================= */

function startOfToday() {

  const now =
    new Date();


  return new Date(

    now.getFullYear(),

    now.getMonth(),

    now.getDate()

  );

}


/* =========================================================
   DAYS BETWEEN
   ========================================================= */

function daysBetween(
  a,
  b
) {

  return Math.ceil(

    (b - a) /
      86400000

  );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(
  value
) {

  return String(
    value ?? ""
  )

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   DOWNLOAD
   ========================================================= */

function download(
  filename,
  content,
  type
) {

  const blob =
    new Blob(
      [content],
      { type }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    filename;


  link.click();


  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  message
) {

  els.toast.textContent =
    message;


  els.toast.classList.add(
    "show"
  );


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
    setTimeout(

      () =>
        els.toast.classList.remove(
          "show"
        ),

      2200

    );

}


/* =========================================================
   RESET TRANSACTION
   ========================================================= */

function resetTransactionForm() {

  document
    .querySelector(
      "#transactionForm"
    )
    .reset();


  document
    .querySelector(
      "#transactionId"
    )
    .value = "";


  document
    .querySelector(
      "#transactionDate"
    )
    .value =
      new Date()
        .toISOString()
        .slice(0, 10);


  document
    .querySelector(
      "#transactionAccount"
    )
    .value =
      "Bank";

}


/* =========================================================
   EVENTS
   ========================================================= */

function attachEvents() {

  document
    .querySelectorAll(
      ".nav-link"
    )
    .forEach(

      (link) => {

        link.addEventListener(

          "click",

          (event) => {

            event.preventDefault();

            activateSection(

              link
                .getAttribute(
                  "href"
                )
                .slice(1)

            );

          }

        );

      }

    );


  document.addEventListener(

    "click",

    (event) => {

      const modalId =
        event.target.dataset
          .openModal;


      if (modalId) {

        if (
          modalId ===
          "transactionModal"
        ) {

          resetTransactionForm();

        }


        document
          .querySelector(
            `#${modalId}`
          )
          .showModal();

      }


      if (
        event.target.dataset
          .closeModal !==
        undefined
      ) {

        event.target
          .closest(
            "dialog"
          )
          .close();

      }


      if (
        event.target.dataset
          .section
      ) {

        activateSection(

          event.target
            .dataset
            .section

        );

      }


      if (
        event.target.dataset
          .delete
      ) {

        deleteEntity(

          event.target
            .dataset
            .delete

        );

      }


      if (
        event.target.dataset
          .toggleBill
      ) {

        toggleBill(

          event.target
            .dataset
            .toggleBill

        );

      }


      if (
        event.target.dataset
          .editTransaction
      ) {

        editTransaction(

          event.target
            .dataset
            .editTransaction

        );

      }

    }

  );


  [
    els.monthFilter,
    els.searchInput,
    els.categoryFilter
  ]

    .forEach(

      (input) =>

        input.addEventListener(
          "input",
          render
        )

    );


  document
    .querySelector(
      "#transactionForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        const id =

          document
            .querySelector(
              "#transactionId"
            )
            .value ||

          uid();


        const payload = {

          id,

          date:
            document
              .querySelector(
                "#transactionDate"
              )
              .value,

          type:
            document
              .querySelector(
                "#transactionType"
              )
              .value,

          description:
            document
              .querySelector(
                "#transactionDescription"
              )
              .value
              .trim(),

          category:
            document
              .querySelector(
                "#transactionCategory"
              )
              .value
              .trim(),

          account:
            document
              .querySelector(
                "#transactionAccount"
              )
              .value
              .trim(),

          amount:
            Number(
              document
                .querySelector(
                  "#transactionAmount"
                )
                .value
            ),

        };


        state.transactions =

          state.transactions

            .filter(
              (item) =>
                item.id !== id
            )

            .concat(
              payload
            );


        event.target
          .closest(
            "dialog"
          )
          .close();


        showToast(
          "Transaksi disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#budgetForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        state.budgets.push({

          id: uid(),

          category:
            document
              .querySelector(
                "#budgetCategory"
              )
              .value
              .trim(),

          limit:
            Number(
              document
                .querySelector(
                  "#budgetLimit"
                )
                .value
            ),

        });


        event.target.reset();


        event.target
          .closest(
            "dialog"
          )
          .close();


        showToast(
          "Anggaran disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#goalForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        state.goals.push({

          id: uid(),

          name:
            document
              .querySelector(
                "#goalName"
              )
              .value
              .trim(),

          target:
            Number(
              document
                .querySelector(
                  "#goalTarget"
                )
                .value
            ),

          current:
            Number(
              document
                .querySelector(
                  "#goalCurrent"
                )
                .value
            ),

          deadline:
            document
              .querySelector(
                "#goalDeadline"
              )
              .value,

        });


        event.target.reset();


        event.target
          .closest(
            "dialog"
          )
          .close();


        showToast(
          "Tujuan disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#billForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        state.bills.push({

          id: uid(),

          name:
            document
              .querySelector(
                "#billName"
              )
              .value
              .trim(),

          amount:
            Number(
              document
                .querySelector(
                  "#billAmount"
                )
                .value
            ),

          dueDate:
            document
              .querySelector(
                "#billDueDate"
              )
              .value,

          status:
            document
              .querySelector(
                "#billStatus"
              )
              .value,

        });


        event.target.reset();


        event.target
          .closest(
            "dialog"
          )
          .close();


        showToast(
          "Tagihan disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#debtForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        state.debts.push({

          id: uid(),

          type:
            document
              .querySelector(
                "#debtType"
              )
              .value,

          person:
            document
              .querySelector(
                "#debtPerson"
              )
              .value
              .trim(),

          amount:
            Number(
              document
                .querySelector(
                  "#debtAmount"
                )
                .value
            ),

          dueDate:
            document
              .querySelector(
                "#debtDueDate"
              )
              .value,

          note:
            document
              .querySelector(
                "#debtNote"
              )
              .value
              .trim(),

        });


        event.target.reset();


        event.target
          .closest(
            "dialog"
          )
          .close();


        showToast(
          "Catatan disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#profileForm"
    )
    .addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        state.profile.name =

          document
            .querySelector(
              "#profileName"
            )
            .value
            .trim() ||

          "Pengguna";


        state.profile.currency =

          document
            .querySelector(
              "#currency"
            )
            .value;


        showToast(
          "Profil disimpan."
        );


        render();

      }

    );


  document
    .querySelector(
      "#seedDemoBtn"
    )
    .addEventListener(

      "click",

      () => {

        state =
          structuredClone(
            demoData
          );


        hydrateSettings();


        showToast(
          "Data demo dimuat."
        );


        render();

      }

    );


  document
    .querySelector(
      "#resetBtn"
    )
    .addEventListener(

      "click",

      () => {

        if (

          !confirm(
            "Reset semua data Finansia di browser ini?"
          )

        ) {

          return;

        }


        state =
          structuredClone(
            defaultData
          );


        hydrateSettings();


        showToast(
          "Data direset."
        );


        render();

      }

    );


  document
    .querySelector(
      "#exportJsonBtn"
    )
    .addEventListener(

      "click",

      () =>

        download(

          "backup-finansia.json",

          JSON.stringify(
            state,
            null,
            2
          ),

          "application/json"

        )

    );


  document
    .querySelector(
      "#exportCsvBtn"
    )
    .addEventListener(

      "click",
      exportCsv

    );


  document
    .querySelector(
      "#importJsonInput"
    )
    .addEventListener(

      "change",

      importJson

    );


  window.addEventListener(
    "resize",
    render
  );

}


/* =========================================================
   SECTION
   ========================================================= */

function activateSection(
  id
) {

  document
    .querySelectorAll(
      ".section"
    )
    .forEach(

      (section) =>

        section.classList.toggle(

          "active",

          section.id === id

        )

    );


  document
    .querySelectorAll(
      ".nav-link"
    )
    .forEach(

      (link) =>

        link.classList.toggle(

          "active",

          link.getAttribute(
            "href"
          ) === `#${id}`

        )

    );


  history.replaceState(

    null,

    "",

    `#${id}`

  );

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteEntity(
  payload
) {

  const [
    collection,
    id
  ] =
    payload.split(":");


  state[collection] =

    state[collection].filter(

      (item) =>
        item.id !== id

    );


  showToast(
    "Data dihapus."
  );


  render();

}


/* =========================================================
   TOGGLE BILL
   ========================================================= */

function toggleBill(
  id
) {

  const bill =
    state.bills.find(

      (item) =>
        item.id === id

    );


  if (!bill) return;


  bill.status =

    bill.status === "paid"

      ? "unpaid"

      : "paid";


  showToast(
    "Status tagihan diperbarui."
  );


  render();

}


/* =========================================================
   EDIT TRANSACTION
   ========================================================= */

function editTransaction(
  id
) {

  const item =
    state.transactions.find(

      (transaction) =>
        transaction.id === id

    );


  if (!item) return;


  document
    .querySelector(
      "#transactionId"
    )
    .value =
      item.id;


  document
    .querySelector(
      "#transactionDate"
    )
    .value =
      item.date;


  document
    .querySelector(
      "#transactionType"
    )
    .value =
      item.type;


  document
    .querySelector(
      "#transactionDescription"
    )
    .value =
      item.description;


  document
    .querySelector(
      "#transactionCategory"
    )
    .value =
      item.category;


  document
    .querySelector(
      "#transactionAccount"
    )
    .value =
      item.account;


  document
    .querySelector(
      "#transactionAmount"
    )
    .value =
      item.amount;


  document
    .querySelector(
      "#transactionModal"
    )
    .showModal();

}


/* =========================================================
   EXPORT CSV
   ========================================================= */

function exportCsv() {

  const header = [

    "tanggal",

    "jenis",

    "deskripsi",

    "kategori",

    "akun",

    "nominal"

  ];


  const rows =
    state.transactions.map(

      (item) => [

        item.date,

        item.type,

        item.description,

        item.category,

        item.account,

        item.amount

      ]

    );


  const csv =

    [header, ...rows]

      .map(

        (row) =>

          row

            .map(

              (cell) =>

                `"${String(
                  cell ?? ""
                ).replaceAll(
                  '"',
                  '""'
                )}"`

            )

            .join(",")

      )

      .join("\n");


  download(

    "transaksi-finansia.csv",

    csv,

    "text/csv"

  );

}


/* =========================================================
   IMPORT JSON
   ========================================================= */

function importJson(
  event
) {

  const file =
    event.target.files[0];


  if (!file) return;


  const reader =
    new FileReader();


  reader.onload = () => {

    try {

      const parsed =
        JSON.parse(
          reader.result
        );


      state = {

        ...structuredClone(
          defaultData
        ),

        ...parsed

      };


      hydrateSettings();


      showToast(
        "Data berhasil diimport."
      );


      render();

    } catch {

      showToast(
        "File JSON tidak valid."
      );

    }

  };


  reader.readAsText(
    file
  );


  event.target.value = "";

}


/* =========================================================
   HYDRATE SETTINGS
   ========================================================= */

function hydrateSettings() {

  document
    .querySelector(
      "#profileName"
    )
    .value =
      state.profile.name;


  document
    .querySelector(
      "#currency"
    )
    .value =
      state.profile.currency;

}


/* =========================================================
   AUTH MESSAGE
   ========================================================= */

function showAuthMessage(
  message,
  type = ""
) {

  if (!authMessage) return;


  authMessage.textContent =
    message;


  authMessage.className =
    `auth-message ${type}`;

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLogin() {

  loginBox.hidden =
    false;

  registerBox.hidden =
    true;

  showAuthMessage("");

}


/* =========================================================
   SHOW REGISTER
   ========================================================= */

function showRegister() {

  loginBox.hidden =
    true;

  registerBox.hidden =
    false;

  showAuthMessage("");

}


/* =========================================================
   LOGIN
   ========================================================= */

async function handleLogin(
  event
) {

  event.preventDefault();


  const email =
    document
      .querySelector(
        "#loginEmail"
      )
      .value
      .trim();


  const password =
    document
      .querySelector(
        "#loginPassword"
      )
      .value;


  if (
    !email ||
    !password
  ) {

    showAuthMessage(
      "Email dan password wajib diisi.",
      "error"
    );

    return;

  }


  showAuthMessage(
    "Sedang login...",
    "loading"
  );


  const {
    data,
    error
  } =
    await supabaseClient.auth
      .signInWithPassword({

        email,

        password

      });


  if (error) {

    console.error(
      error
    );


    showAuthMessage(

      error.message ||
        "Login gagal.",

      "error"

    );


    return;

  }


  currentUser =
    data.user;


  showAuthMessage(
    "Login berhasil.",
    "success"
  );


  setTimeout(

    () => {

      authScreen.classList.add(
        "hidden"
      );

    },

    300

  );

}


/* =========================================================
   REGISTER
   ========================================================= */

async function handleRegister(
  event
) {

  event.preventDefault();


  const email =
    document
      .querySelector(
        "#registerEmail"
      )
      .value
      .trim();


  const password =
    document
      .querySelector(
        "#registerPassword"
      )
      .value;


  const confirmPassword =
    document
      .querySelector(
        "#registerConfirmPassword"
      )
      .value;


  if (
    !email ||
    !password ||
    !confirmPassword
  ) {

    showAuthMessage(
      "Semua field wajib diisi.",
      "error"
    );

    return;

  }


  if (
    password.length < 6
  ) {

    showAuthMessage(
      "Password minimal 6 karakter.",
      "error"
    );

    return;

  }


  if (
    password !==
    confirmPassword
  ) {

    showAuthMessage(
      "Konfirmasi password tidak sama.",
      "error"
    );

    return;

  }


  showAuthMessage(
    "Membuat akun...",
    "loading"
  );


  const {
    data,
    error
  } =
    await supabaseClient.auth
      .signUp({

        email,

        password

      });


  if (error) {

    console.error(
      error
    );


    showAuthMessage(

      error.message ||
        "Register gagal.",

      "error"

    );


    return;

  }


  /*
    Jika Email Confirmation aktif,
    user harus konfirmasi email.
  */

  if (!data.session) {

    showAuthMessage(

      "Akun berhasil dibuat. Silakan cek email untuk konfirmasi akun.",

      "success"

    );

    return;

  }


  currentUser =
    data.user;


  showAuthMessage(
    "Register berhasil.",
    "success"
  );


  setTimeout(

    () => {

      authScreen.classList.add(
        "hidden"
      );

    },

    500

  );

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function handleLogout() {

  const {
    error
  } =
    await supabaseClient.auth
      .signOut();


  if (error) {

    console.error(
      error
    );

    showAuthMessage(
      "Logout gagal.",
      "error"
    );

    return;

  }


  currentUser =
    null;


  authScreen.classList.remove(
    "hidden"
  );


  showLogin();


  document
    .querySelector(
      "#loginForm"
    )
    ?.reset();


  showAuthMessage(
    "Berhasil logout.",
    "success"
  );

}


/* =========================================================
   CHECK AUTH
   ========================================================= */

async function checkAuth() {

  const {
    data: {
      session
    }
  } =
    await supabaseClient.auth
      .getSession();


  if (
    session?.user
  ) {

    currentUser =
      session.user;


    authScreen.classList.add(
      "hidden"
    );


    console.log(

      "Login sebagai:",

      currentUser.email

    );


    return true;

  }


  currentUser =
    null;


  authScreen.classList.remove(
    "hidden"
  );


  return false;

}


/* =========================================================
   AUTH EVENTS
   ========================================================= */

function attachAuthEvents() {

  document
    .querySelector(
      "#loginForm"
    )
    ?.addEventListener(

      "submit",

      handleLogin

    );


  document
    .querySelector(
      "#registerForm"
    )
    ?.addEventListener(

      "submit",

      handleRegister

    );


  document
    .querySelector(
      "#showRegisterBtn"
    )
    ?.addEventListener(

      "click",

      showRegister

    );


  document
    .querySelector(
      "#showLoginBtn"
    )
    ?.addEventListener(

      "click",

      showLogin

    );


  document
    .querySelector(
      "#logoutBtn"
    )
    ?.addEventListener(

      "click",

      handleLogout

    );


  supabaseClient.auth.onAuthStateChange(

    (_event, session) => {

      currentUser =
        session?.user ||
        null;


      if (
        currentUser
      ) {

        authScreen.classList.add(
          "hidden"
        );

      } else {

        authScreen.classList.remove(
          "hidden"
        );

      }

    }

  );

}


/* =========================================================
   INIT
   ========================================================= */

async function init() {

  els.monthFilter.value =
    new Date()
      .toISOString()
      .slice(0, 7);


  document
    .querySelector(
      "#transactionDate"
    )
    .value =
      new Date()
        .toISOString()
        .slice(0, 10);


  hydrateSettings();


  attachAuthEvents();


  attachEvents();


  if (

    location.hash &&

    document.querySelector(
      location.hash
    )

  ) {

    activateSection(

      location.hash.slice(
        1
      )

    );

  }


  render();


  await checkAuth();

}


init();