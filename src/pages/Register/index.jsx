import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import * as yup from "yup";

import logojpg from "../../assets/logo.jpg";

export default function Register(props) {
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });
  const addUser = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;
    const url = "localhost:4000/user/cadaster";

    let login = {
      name: user.name,
      password: user.password
    };
    var request = new Request(url, {
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" }
    });
    fetch(request)
      .then(function (response) {
        if (response.status === 200) {
          setStatus({
            type: "success",
            mensagem: "Usuário cadastrado com sucesso!"
          });
          setUser({
            name: "",
            password: "",
            confirmPassword: ""
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro no cadastro!"
          });
        }
      })
      .catch((error) => {
        setStatus({
          type: "error",
          mensagem: "Erro no cadastro!"
        });
      });
  };
  async function validate() {
    let schema = yup.object().shape({
      password: yup
        .string("Erro: Necessário preencher o campo senha!")
        .required("Erro: Necessário preencher o campo senha!")
        .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
      confirmPassword: yup
        .string("Erro: Necessário preencher o campo confirmar senha!")
        .required("Erro: Necessário preencher o campo confirmar senha!"),
      name: yup
        .string("Erro: Necessário preencher o campo nome!")
        .required("Erro: Necessário preencher o campo nome!")
    });

    try {
      await schema.validate(user);
      if (user.password !== user.confirmPassword) {
        setStatus({
          type: "error",
          mensagem: "Senhas não conferem!"
        });
        return false;
      }
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors
      });
      return false;
    }
  }

  return (
    <LayoutComponents>
      <form className="login-form">
        <span className="login-form-title">
          <img src={logojpg} alt="One Blue" />
        </span>
        <span className="login-form-title"> Criar Conta </span>
        <div className="wrap-input">
          <input
            className={user.name !== "" ? "has-val input" : "input"}
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input
            className={user.password !== "" ? "has-val input" : "input"}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>
        <div className="wrap-input">
          <input
            className={user.confirmPassword !== "" ? "has-val input" : "input"}
            type="password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <span
            className="focus-input"
            data-placeholder="Confirmar Senha"
          ></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={addUser}>
            Cadastrar
          </button>
        </div>

        <span> {status.mensagem}</span>

        <div className="text-center">
          <span className="txt1">Já possui conta?</span>
          <a className="txt2" href="#" onClick={props.changePage}>
            Acessar com Nome e Senha.
          </a>
        </div>
      </form>
    </LayoutComponents>
  );
}
