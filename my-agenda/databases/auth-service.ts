import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth } from './firebaseConfig';

/**
 * Interface para a resposta de erro customizada
 */
interface AuthResponse {
  user: FirebaseAuthTypes.User | null;
  error: string | null;
}

/**
 * Cadastra um novo usuário com email e senha
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns {AuthResponse} - Objeto contendo o usuário ou uma mensagem de erro
 */
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await auth().createUserWithEmailAndPassword(email, password);
    return { user: response.user, error: null };
  } catch (error) {
    // Trata e retorna a mensagem de erro específica
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido ao cadastrar.";
    console.error("Erro no Cadastro:", errorMessage);
    return { user: null, error: errorMessage };
  }
};

/**
 * Faz login de um usuário com email e senha
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns {AuthResponse} - Objeto contendo o usuário ou uma mensagem de erro
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return { user: response.user, error: null };
  } catch (error) {
    // Trata e retorna a mensagem de erro específica
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido ao fazer login.";
    console.error("Erro no Login:", errorMessage);
    return { user: null, error: errorMessage };
  }
};

/**
 * Sai da sessão do usuário atual
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error("Erro ao fazer Logout:", error);
    throw error; // Re-lança o erro para ser tratado no componente
  }
};