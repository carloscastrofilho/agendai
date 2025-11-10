// Importa as funções específicas do SDK web
import { 
  User
} from 'firebase/auth';


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
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    // Usa a função do SDK web
    // const response = await  odmasodm (auth, email, password);
   const response = await fetch('http://192.168.13.243:3500/api/users' , {
        method: 'POST', // ou 'PUT', 'DELETE', etc.
        headers: {
            'Content-Type': 'application/json' // Indica o formato dos dados enviados
        },
        body: JSON.stringify({
            // Seus dados a serem enviados em formato de objeto
            login: email,
            password: password,
            name: email
        })
    });
    // Converter a resposta para JSON
    const data = await response.json();

    console.log("response:", data);
    //return { user: response, error: null };
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
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Usa a função do SDK web
    //const response = await signInWithEmailAndPassword(auth, email, password);
    const response = await fetch('http://192.168.13.243:3500/api/auth' , {
        method: 'POST', // ou 'PUT', 'DELETE', etc.
        headers: {
            'Content-Type': 'application/json' // Indica o formato dos dados enviados
        },
        body: JSON.stringify({
            // Seus dados a serem enviados em formato de objeto
            login: email,
            password: password
        })
    });
    // Converter a resposta para JSON
    const data = await response.json();

    console.log("response:", data);
    if (data.length == 0 ){
      return { user: null, error: "Usuário ou senha inválido." };
    }
    const user: User = {
      uid: data[0].id,
      email: data[0].name
    } as User;

    return { user: user, error: null };

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
    //await signOut();
  } catch (error) {
    console.error("Erro ao fazer Logout:", error);
    throw error;
  }
};