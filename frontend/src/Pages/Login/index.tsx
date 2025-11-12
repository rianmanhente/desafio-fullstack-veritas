import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginUser";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userName = localStorage.getItem("userName")

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({email, password});

      if (res) {
        console.log("Login bem-sucedido:", res);

              Swal.fire({
                  icon: "success",
                  title: `${userName} Logando ... `,
                  text: "Direcionando para página de login",
                  confirmButtonColor: "#3085d6",
                })

        // redirecionar
        navigate("/board");
      } else {

          Swal.fire({
                icon: "error",
                title: "Senha Incorreta",
                text: "Credenciais inválidas",
                confirmButtonColor: "#d33",
              });
      }
    } catch (error) {
      console.error("Erro no login:", error);

        Swal.fire({
                icon: "error",
                title: "Erro no login",
                text: "Erro no login. Tente novamente",
                confirmButtonColor: "#d33",
              });
    }
  };

  return (
    <FormContainer title={"Faça login!"}>
      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Login" type="submit" />
      </form>
      <Button label="Voltar para Cadastro" onClick={() => navigate("/register")} />
    </FormContainer>
  );
}
