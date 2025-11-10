import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
    initializeAuth, 
    Auth,
    onAuthStateChanged, // Exportado para monitorar o estado
    User // Exportado para tipagem
} from 'firebase/auth'; 

import AsyncStorage from '@react-native-async-storage/async-storage'; 

// 1. WORKAROUND: Contorna o erro de importação do TypeScript/Tree-shaking.
// Usamos 'require' para acessar a função de persistência que o Firebase precisa.
// Isso evita o erro 'has no exported member' e a falha de persistência.
// O 'as any' é necessário para que o TypeScript aceite a tipagem dinâmica.
const getReactNativePersistence = require('firebase/auth').getReactNativePersistence as any;

// 2. Sua Configuração Firebase (a mesma que você já tinha)
// **SUBSTITUA PELOS SEUS VALORES REAIS**

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_APPID
};

console.log("Firebase Config:", firebaseConfig);

// 3. Inicialização do App Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// 4. Inicialização da Autenticação com Persistência
// Usamos initializeAuth (e não getAuth) para injetar o AsyncStorage
const firebaseAuth: Auth = initializeAuth(firebaseApp, {
    // A função injetada garante que o Firebase use o AsyncStorage corretamente.
    persistence: getReactNativePersistence(AsyncStorage)
});


// 5. Exportação da Instância de Autenticação e Funções Auxiliares
/**
 * Exporta a instância de autenticação do Firebase (SDK Web).
 */
export const auth = firebaseAuth;

/**
 * Exporta onAuthStateChanged e o tipo User para uso nos componentes.
 */
export { onAuthStateChanged, User };

// Opcional: exportar o app se for usar outros serviços (Firestore, Storage, etc.)
// export const app = firebaseApp;
