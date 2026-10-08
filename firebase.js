// ============================================================
// firebase.js — підключення Firebase (ЕТАП 1: заготовка)
// ------------------------------------------------------------
// Сюди потрібно буде вставити ВАШу конфігурацію Firebase
// (Firebase Console → Project settings → General →
//  Your apps → Web app → SDK setup and configuration).
//
// Це публічний web-config — він НЕ є секретом; безпеку
// забезпечують Firestore Security Rules (див. firestore.rules).
// Але НЕ вставляйте сюди service account keys / API secrets!
// ============================================================

export const firebaseConfig = {
  apiKey: "ВСТАВТЕ_ЗНАЧЕННЯ_FIREBASE_CONFIG",
  authDomain: "ВСТАВТЕ_ЗНАЧЕННЯ.firebaseapp.com",
  projectId: "ВСТАВТЕ_PROJECT_ID",
  storageBucket: "ВСТАВТЕ_BUCKET.appspot.com",
  messagingSenderId: "ВСТАВТЕ_SENDER_ID",
  appId: "ВСТАВТЕ_APP_ID"
};

// Прапорець: чи реальний config вже вставлено.
// Доки він не вставлено, сайт працює в автономному режимі
// (демо-товари з products.js, кошик у localStorage),
// щоб GitHub Pages не «ламався» через помилки Firebase.
export const isFirebaseConfigured =
  !firebaseConfig.apiKey.includes("ВСТАВТЕ");

let app = null;
let auth = null;
let db = null;

// Динамічне підключення модулів Firebase через CDN.
// Версії зафіксовані — це стабільно для GitHub Pages.
async function initFirebase() {
  if (!isFirebaseConfigured) return null;
  try {
    const [{ initializeApp }, { getAuth }, firestoreMod] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
    ]);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = firestoreMod.getFirestore(app);
    return { app, auth, db, firestore: firestoreMod };
  } catch (err) {
    console.error("Firebase init failed:", err);
    return null;
  }
}

export const firebaseReady = initFirebase();
