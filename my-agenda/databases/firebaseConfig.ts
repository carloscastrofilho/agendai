// Importa o módulo principal do Firebase
import { initializeApp } from "firebase/app";

// Importa o AsyncStorage para ser usado como armazenamento de persistência
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORTAÇÃO CORRIGIDA: getReactNativePersistence vem de "firebase/auth/react-native"
import { initializeAuth, Auth } from "firebase/auth"; 
import { getAuth } from "@react-native-firebase/auth"; 


// Sua configuração do app Firebase (deixe-a como está)
const firebaseConfig = {
  apiKey: "AIzaSyB5RIm_Cn7aAkTJThdBVZ1Z-ouZrqOBYWY",
  authDomain: "agendai-23d4b.firebaseapp.com",
  projectId: "agendai-23d4b",
  storageBucket: "agendai-23d4b.firebasestorage.app",
  messagingSenderId: "646408940213",
  appId: "1:646408940213:web:a8039db27ae7756ce06cfc"
};

// 1. Inicializa o App
const app = initializeApp(firebaseConfig);

getAuth.

// 2. Inicializa o Auth com a persistência do React Native
// Usamos o initializeAuth para passar a persistência na inicialização.
const auth: Auth = initializeAuth(app, { 
    // getReactNativePersistence DEVE ser importado do subcaminho correto.
    persistence: getReactNativePersistence(AsyncStorage) 
});

export { auth };
