// ============================================================
// auth.js — Firebase Authentication (ЕТАП 1: заготовка)
// ------------------------------------------------------------
// Реальна авторизація (email/пароль + Google) підключається
// на ЕТАПАХ 5–6, коли firebase.js отримає справжній config.
//
// Цей файл вже містить ГОТОВУ реалізацію — вона просто не
// активується, доки isFirebaseConfigured === false.
// Никаких фальшивих кнопок: Google-вхід використовує
// офіційний Firebase PopupProvider flow.
// ============================================================

import { firebaseReady, isFirebaseConfigured } from "./firebase.js";

// Переклад технічних помилок Firebase на людську українську.
const ERROR_MESSAGES_UK = {
  "auth/invalid-email": "Неправильний формат email-адреси.",
  "auth/user-not-found": "Користувача з такою адресою не знайдено.",
  "auth/wrong-password": "Неправильний пароль. Спробуйте ще раз.",
  "auth/invalid-credential": "Неправильна email-адреса або пароль.",
  "auth/email-already-in-use": "Ця email-адреса вже використовується.",
  "auth/weak-password": "Пароль занадто слабкий (мінімум 6 символів).",
  "auth/popup-closed-by-user": "Вікно Google не було завершено.",
  "auth/popup-blocked": "Браузер заблокував вікно входу. Дозвольте спливаючі вікна.",
  "auth/unauthorized-domain": "Домен сайту ще не додано в Firebase (Auth → Settings → Authorized domains).",
  "auth/network-request-failed": "Проблема з мережею. Перевірте з'єднання.",
  "auth/too-many-requests": "Забагато спроб. Зачекайте трохи та повторіть."
};

export function translateAuthError(err) {
  const code = (err && err.code) || "";
  if (ERROR_MESSAGES_UK[code]) return ERROR_MESSAGES_UK[code];
  console.error("Auth error:", err); // технічна інформація — лише в консоль
  return "Сталася помилка авторизації. Спробуйте ще раз пізніше.";
}

// ---------- Публічний API (використовується login.html / account.html) ----------

export async function signUpWithEmail(email, password) {
  if (!isFirebaseConfigured) throw new Error("DEMO_MODE");
  const f = await firebaseReady;
  const { createUserWithEmailAndPassword } = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
  );
  return createUserWithEmailAndPassword(f.auth, email, password);
}

export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured) throw new Error("DEMO_MODE");
  const f = await firebaseReady;
  const { signInWithEmailAndPassword } = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
  );
  return signInWithEmailAndPassword(f.auth, email, password);
}

// Офіційний Firebase Google sign-in (popup).
export async function signInWithGoogle() {
  if (!isFirebaseConfigured) throw new Error("DEMO_MODE");
  const f = await firebaseReady;
  const mod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
  const provider = new mod.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return mod.signInWithPopup(f.auth, provider);
}

export async function signOutUser() {
  if (!isFirebaseConfigured) return;
  const f = await firebaseReady;
  const { signOut } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
  await signOut(f.auth);
}

export function onAuthChange(callback) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  let unsubscribe = () => {};
  firebaseReady.then((f) => {
    if (!f) return callback(null);
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js").then((mod) => {
      unsubscribe = mod.onAuthStateChanged(f.auth, callback);
    });
  });
  return () => unsubscribe();
}
