import FormContainer from "../../components/FormContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { createUser } from "../../services/createUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔒 Validação antes de enviar para a API
    if (form.name.trim() === "" || form.email.trim() === "" || form.password.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos antes de continuar.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (form.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Senha muito curta",
        text: "A senha deve ter pelo menos 6 caracteres.",
        confirmButtonColor: "#d33",
      });
      return; // impede o envio
    }

    try {
      const res = await createUser(form);
      console.log("foi");

      localStorage.setItem("userName", form.name);

      if (res) {
        Swal.fire({
          icon: "success",
          title: `Usuário ${form.name} cadastrado com sucesso!`,
          text: "Direcionando para página de login",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/login")
        })
              
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao criar usuário",
          text: "Não foi possível criar usuário. Tente novamente!",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("Erro na requisição:", err);

      Swal.fire({
        icon: "error",
        title: "Erro na requisição",
        text: "Não foi possível criar usuário. Tente novamente!",
        confirmButtonColor: "#d33",
      });
    }
  };


  return (
    <FormContainer title="Cadastre-se">
      <form onSubmit={handleRegister}>
        <Input label="Nome" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Senha" name="password" type="password" value={form.password} onChange={handleChange} />
        <Button label="Registrar" type="submit" />
      </form>
    </FormContainer>
  );
}
