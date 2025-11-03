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