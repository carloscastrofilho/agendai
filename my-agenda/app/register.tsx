import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Link, useNavigation } from "expo-router";
import { useState } from "react";

import { Eye, EyeOff } from 'lucide-react-native';

const logoApp = require('@/assets/images/logoagendei.png');

import { signUpWithEmail } from '../database/auth-firebase'

export default function Register() {
  const [nome, setNome] = useState<string | null>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [password2, setPassword2] = useState<string | null>(null);
  const [viewPassword, setViewPassord] = useState<boolean>(false);
  const [ celular, setCelular] = useState<string | null>(null);

  async function onClickRegistrar() {
    console.log("clicou para fazer registro");
    console.log(nome);
    console.log(login);
    console.log(password);
    console.log(password2);
    console.log( celular );

    if ( password != password2 ){
      Alert.alert(" senhas não coincidem ...")
      return
    }
      

    if ( ! login ) {
      Alert.alert(" informe um email valido ...")
      return
    }
      
    const user = await signUpWithEmail( login || "", password || "" );
    console.log("user registrado:", user);

    if ( user.error ) {
      Alert.alert(" erro ao registrar : " + user.error );
      return
    }
  }
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header} >

        <Image
          height={50}
          width={100}
          source={logoApp}
          style={styles.logo}
        />
        <Text style={styles.inputText}>Criar Conta</Text>

      </View>

      <View style={styles.main}>

        <View style={styles.containerInput}>
          <Text style={styles.inputText}>Nome</Text>
          <TextInput style={styles.input}
            placeholder=" informe o seu nome completo ..."
            onChangeText={(value) => { setNome(value) }}
            value={nome || ""}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.inputText}>Login</Text>
          <TextInput style={styles.input}
            placeholder=" informe o email de acesso ..."
            onChangeText={(value) => { setLogin(value) }}
            value={login || ""}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.inputText}>Celular:</Text>
          <TextInput style={styles.input}
            placeholder=" informe o numero do celular ..."
            onChangeText={(value) => { setCelular(value) }}
            value={celular || ""}
            maxLength={14}
            inputMode="tel"
          />
        </View>

        <View style={styles.containerInput}>

          <Text style={styles.inputText}> Senha:</Text>

          <View style={styles.containerSenha}>

            <TextInput style={styles.input}
              placeholder="informe a senha de acesso ..."
              onChangeText={(value) => { setPassword(value) }}
              value={password || ""}
              secureTextEntry={viewPassword}
              maxLength={15}
            />

            <TouchableOpacity
              onPress={() => { setViewPassord(!viewPassword) }}
              style={[styles.iconPassword]}
            >
              { ( ! viewPassword ) ? (<EyeOff size={30} color={"red"} />) :
              ( <Eye size={30} color={"blue"} />) }
              

            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.inputText}> Confirmar Senha:</Text>
          <TextInput style={styles.input}
            placeholder="informe a senha de acesso ..."
            onChangeText={(valor) => { setPassword2(valor) }}
            value={password2 || ""}
            secureTextEntry={true}
            maxLength={15}
          />
        </View>


        <TouchableOpacity
          style={[styles.button]}
          onPress={() => (onClickRegistrar())}>
          <Text style={[styles.buttonText]} >
            Criar Conta
          </Text>
        </TouchableOpacity>

      </View>
      <View style={styles.footer}>

        <Text>
          Já tenho conta.
        </Text>

        <Link href="/login">
          <Text style={styles.link}>
            Fazer Login.
          </Text>
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 45,
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
  },

  header: {
    flex: 3 / 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },

  main: {
    flex: 5 / 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,

  },

  footer: {
    flex: 2 / 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: "row",
    gap: 5,

  },

  logo: {
    width: 200,
    height: 50,
  },

  containerInput: {
    width: "100%",
    padding: 5,
    borderWidth: 0,
    borderColor: "gray",
    borderRadius: 15,
    paddingLeft: 10,


  },

  inputText: {
    fontWeight: "bold",

  },
  input: {
    backgroundColor: '#F1F5F4',
    width: '100%',
    borderColor: "gray",
    marginTop: 4,
    borderRadius: 5,
    fontSize: 16,


  },

  link: {
    color: "#0D6EFD",
    fontWeight: "bold",
  },

  button: {
    marginTop: 45,
    backgroundColor: "#0D6EFD",
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  }
  ,
  containerSenha: {
    flexDirection: "row",
    gap: 3,
  }
  , 
  iconPassword :{
    alignItems : "center",
    justifyContent: "center"
  }
});
