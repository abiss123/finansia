/* =========================================================
   FINANSIA AUTH
   Supabase Login / Register / Logout
   ========================================================= */

const SUPABASE_URL =
  "https://dzdmiddosrcimfszeryf.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_vOfWaD399LyEffAN220Ehw_rBKdLQ4N";


/* =========================================================
   SUPABASE CLIENT
   ========================================================= */

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================================
   ELEMENTS
   ========================================================= */

const authScreen =
  document.querySelector("#authScreen");

const appContainer =
  document.querySelector(".app");

const loginBox =
  document.querySelector("#loginBox");

const registerBox =
  document.querySelector("#registerBox");

const authMessage =
  document.querySelector("#authMessage");

const loginForm =
  document.querySelector("#loginForm");

const registerForm =
  document.querySelector("#registerForm");

const showRegisterBtn =
  document.querySelector("#showRegisterBtn");

const showLoginBtn =
  document.querySelector("#showLoginBtn");

const logoutBtn =
  document.querySelector("#logoutBtn");


/* =========================================================
   AUTH SCREEN
   ========================================================= */

function showDashboard() {

  if (authScreen) {
    authScreen.style.display = "none";
  }

  if (appContainer) {
    appContainer.style.display = "";
  }

}


function showAuth() {

  if (authScreen) {
    authScreen.style.display = "flex";
  }

  if (appContainer) {
    appContainer.style.display = "none";
  }

}


/* =========================================================
   MESSAGE
   ========================================================= */

function setAuthMessage(
  message = "",
  type = ""
) {

  if (!authMessage) {
    return;
  }

  authMessage.textContent = message;

  authMessage.className =
    "auth-message";

  if (type) {
    authMessage.classList.add(type);
  }

}


function clearAuthMessage() {

  setAuthMessage("");

}


/* =========================================================
   SWITCH LOGIN / REGISTER
   ========================================================= */

function showRegisterForm() {

  if (loginBox) {
    loginBox.hidden = true;
  }

  if (registerBox) {
    registerBox.hidden = false;
  }

  clearAuthMessage();

}


function showLoginForm() {

  if (registerBox) {
    registerBox.hidden = true;
  }

  if (loginBox) {
    loginBox.hidden = false;
  }

  clearAuthMessage();

}


/* =========================================================
   CHECK SESSION
   ========================================================= */

async function checkAuth() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {

      console.error(
        "Gagal mengecek session:",
        error
      );

      showAuth();

      return;

    }


    const session =
      data?.session;


    if (session) {

      showDashboard();

    } else {

      showAuth();

    }

  } catch (error) {

    console.error(
      "Auth check error:",
      error
    );

    showAuth();

  }

}


/* =========================================================
   LOGIN
   ========================================================= */

async function loginUser(
  email,
  password
) {

  setAuthMessage(
    "Sedang login...",
    "loading"
  );


  const {
    data,
    error
  } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });


  if (error) {

    throw error;

  }


  if (!data?.session) {

    throw new Error(
      "Login berhasil tetapi session belum tersedia."
    );

  }


  setAuthMessage(
    "Login berhasil.",
    "success"
  );


  showDashboard();

}


/* =========================================================
   REGISTER
   ========================================================= */

async function registerUser(
  email,
  password,
  confirmPassword
) {

  if (password !== confirmPassword) {

    throw new Error(
      "Konfirmasi password tidak sama."
    );

  }


  if (password.length < 6) {

    throw new Error(
      "Password minimal 6 karakter."
    );

  }


  setAuthMessage(
    "Membuat akun...",
    "loading"
  );


  const {
    data,
    error
  } =
    await supabaseClient.auth.signUp({
      email,
      password
    });


  if (error) {

    throw error;

  }


  /*
   * Jika Supabase langsung memberikan session,
   * user bisa langsung masuk dashboard.
   */

  if (data?.session) {

    setAuthMessage(
      "Akun berhasil dibuat.",
      "success"
    );

    showDashboard();

    return;

  }


  /*
   * Jika email confirmation aktif,
   * session belum tersedia.
   */

  setAuthMessage(
    "Akun berhasil dibuat. Silakan cek email untuk verifikasi, lalu login.",
    "success"
  );


  showLoginForm();


  /*
   * Email tetap diisi agar user tidak perlu
   * mengetik ulang.
   */

  const loginEmail =
    document.querySelector(
      "#loginEmail"
    );

  if (loginEmail) {

    loginEmail.value = email;

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logoutUser() {

  try {

    const {
      error
    } =
      await supabaseClient.auth.signOut();


    if (error) {

      throw error;

    }


    showAuth();

    showLoginForm();

    clearAuthMessage();


    const loginPassword =
      document.querySelector(
        "#loginPassword"
      );

    if (loginPassword) {

      loginPassword.value = "";

    }

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

    setAuthMessage(
      error.message ||
      "Gagal logout.",
      "error"
    );

  }

}


/* =========================================================
   LOGIN FORM
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const email =
        document
          .querySelector("#loginEmail")
          ?.value
          .trim();


      const password =
        document
          .querySelector("#loginPassword")
          ?.value;


      if (!email || !password) {

        setAuthMessage(
          "Email dan password wajib diisi.",
          "error"
        );

        return;

      }


      const submitButton =
        loginForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Login...";

      }


      try {

        await loginUser(
          email,
          password
        );

      } catch (error) {

        console.error(
          "Login error:",
          error
        );


        setAuthMessage(
          error.message ||
          "Email atau password salah.",
          "error"
        );

      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            "Login";

        }

      }

    }
  );

}


/* =========================================================
   REGISTER FORM
   ========================================================= */

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const email =
        document
          .querySelector("#registerEmail")
          ?.value
          .trim();


      const password =
        document
          .querySelector("#registerPassword")
          ?.value;


      const confirmPassword =
        document
          .querySelector(
            "#registerConfirmPassword"
          )
          ?.value;


      if (!email) {

        setAuthMessage(
          "Email wajib diisi.",
          "error"
        );

        return;

      }


      if (!password) {

        setAuthMessage(
          "Password wajib diisi.",
          "error"
        );

        return;

      }


      if (password.length < 6) {

        setAuthMessage(
          "Password minimal 6 karakter.",
          "error"
        );

        return;

      }


      if (
        password !==
        confirmPassword
      ) {

        setAuthMessage(
          "Konfirmasi password tidak sama.",
          "error"
        );

        return;

      }


      const submitButton =
        registerForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Membuat akun...";

      }


      try {

        await registerUser(
          email,
          password,
          confirmPassword
        );

      } catch (error) {

        console.error(
          "Register error:",
          error
        );


        setAuthMessage(
          error.message ||
          "Gagal membuat akun.",
          "error"
        );

      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            "Register";

        }

      }

    }
  );

}


/* =========================================================
   SWITCH BUTTONS
   ========================================================= */

if (showRegisterBtn) {

  showRegisterBtn.addEventListener(
    "click",
    () => {

      showRegisterForm();

    }
  );

}


if (showLoginBtn) {

  showLoginBtn.addEventListener(
    "click",
    () => {

      showLoginForm();

    }
  );

}


/* =========================================================
   LOGOUT BUTTON
   ========================================================= */

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      await logoutUser();

    }
  );

}


/* =========================================================
   AUTH STATE LISTENER
   ========================================================= */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    console.log(
      "Auth event:",
      event
    );


    if (session) {

      showDashboard();

    } else {

      showAuth();

    }

  }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    /*
     * Pastikan dashboard disembunyikan
     * sampai session selesai dicek.
     */

    showAuth();


    await checkAuth();

  }
);