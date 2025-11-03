// // Importa o módulo principal do Firebase
// import { initializeApp } from "firebase/app";

// // Importa o AsyncStorage para ser usado como armazenamento de persistência
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // IMPORTAÇÃO CORRIGIDA: getReactNativePersistence vem de "firebase/auth/react-native"
// import { Auth, initializeAuth } from "firebase/auth";
// // import { getAuth } from "@react-native-firebase/auth"; 


// // Sua configuração do app Firebase (deixe-a como está)
// const firebaseConfig = {
//   apiKey: "AIzaSyB5RIm_Cn7aAkTJThdBVZ1Z-ouZrqOBYWY",
//   authDomain: "agendai-23d4b.firebaseapp.com",
//   projectId: "agendai-23d4b",
//   storageBucket: "agendai-23d4b.firebasestorage.app",
//   messagingSenderId: "646408940213",
//   appId: "1:646408940213:web:a8039db27ae7756ce06cfc"
// };

// // 1. Inicializa o App
// const app = initializeApp(firebaseConfig);

// // 2. Inicializa o Auth com a persistência do React Native
// // Usamos o initializeAuth para passar a persistência na inicialização.
// const auth: Auth = initializeAuth(app, { 
//     // getReactNativePersistence DEVE ser importado do subcaminho correto.
//     persistence: getReactNativePersistence(AsyncStorage) 
// });

// export { auth };



import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'; // Importa o módulo de autenticação

// 1. Sua Configuração Firebase (chave de acesso web)
// Substitua pelos seus próprios valores!
const firebaseConfig = {
  apiKey: "AIzaSyB5RIm_Cn7aAkTJThdBVZ1Z-ouZrqOBYWY",
  authDomain: "agendai-23d4b.firebaseapp.com",
  projectId: "agendai-23d4b",
  storageBucket: "agendai-23d4b.firebasestorage.app",
  messagingSenderId: "646408940213",
  appId: "1:646408940213:web:a8039db27ae7756ce06cfc"
};

// 2. Inicialização do App Firebase
// Verificamos se o app já foi inicializado para evitar erros.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 3. Exportação da Instância de Autenticação
/**
 * Exporta a instância de autenticação do Firebase.
 * Isso permite usar os métodos de autenticação (email/senha, etc.) em outros módulos.
 */
export const auth = firebase.auth;

// Opcional: Você pode exportar o próprio app caso precise de outros serviços.
// export const firebaseApp = firebase.app();

