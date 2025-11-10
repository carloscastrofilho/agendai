---
marp: true;

---


alterações para implementação controle de usuarios via firebase


1 - criar conta no firebase 
2 - criar projeto
3 - criar acesso projeto via web
4 - instalar dependencias necessarias
"firebase": "^12.5.0",
npm install firebase


5 - criar codigo acesso ao firebase
6 - criar metodos login, register e logouf
7 - implantar variaveis de envelope para credencias;

---
### 6 - criar metodos login, register e logouf
database/

---

firebase-config.ts
```ts
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

```

--- 

auth-firebase.ts
```ts
// Importa as funções específicas do SDK web
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from './firebase-config';

/**
 * Interface para a resposta de erro customizada
 */
interface AuthResponse {
  user: User | null; // Note que o tipo agora é 'User' do 'firebase/auth'
  error: string | null;
}

/**
 * Cadastra um novo usuário com email e senha
 */
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Usa a função do SDK web
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return { user: response.user, error: null };
  } catch (error: any) { // Use 'any' para capturar erros complexos do Firebase
    // O FirebaseError do SDK web tem um 'code' e 'message'
    const errorMessage = error.message || "Ocorreu um erro desconhecido ao cadastrar.";
    console.error("Erro no Cadastro:", errorMessage);
    return { user: null, error: errorMessage };
  }
};

/**
 * Faz login de um usuário com email e senha
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Usa a função do SDK web
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { user: response.user, error: null };
  } catch (error: any) {
    const errorMessage = error.message || "Ocorreu um erro desconhecido ao fazer login.";
    console.error("Erro no Login:", errorMessage);
    return { user: null, error: errorMessage };
  }
};

/**
 * Sai da sessão do usuário atual
 */
export const signOutUser = async (): Promise<void> => {
  try {
    // Usa a função do SDK web
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer Logout:", error);
    throw error;
  }
};
```
---

7 - implantar variaveis de envelope para credencias;
coloque no seu gitignore o arquivo .env para não ser enviado ao repositorio do git.
raiz do projeto;
.env
```js
# chaves de acesso ao firebase
EXPO_PUBLIC_APIKEY=AIzaSyB5RIm_Cn7
EXPO_PUBLIC_AUTHDOMAIN=agendai-23d4b.
EXPO_PUBLIC_PROJECTID=agendai-
EXPO_PUBLIC_STORAGEBUCKET=agendai-23d4b.firebasesto
EXPO_PUBLIC_MESSAGINGSENDERID=64640894
EXPO_PUBLIC_APPID=1:646408940213:web:a2a02bee06cfc
```
lembre-se de caira o arquivo de exemplo das variaves, como abaixo:

.env.exemple
```js
# chaves de acesso ao firebase
EXPO_PUBLIC_APIKEY=
EXPO_PUBLIC_AUTHDOMAIN=
EXPO_PUBLIC_PROJECTID=
EXPO_PUBLIC_STORAGEBUCKET=
EXPO_PUBLIC_MESSAGINGSENDERID=
EXPO_PUBLIC_APPID=
```