import logojp from "../../assets/logo.jpg";
import { useState } from "react";
import * as yup from "yup";

export default function Login(props) {
  const [user, setUser] = useState({
    name: "",
    password: ""
  });
  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });
  const addUser = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;
    const url = "localhost:4000/login";

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
            mensagem: "Login realizado com sucesso!"
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro no login!"
          });
        }
      })
      .catch((error) => {
        setStatus({
          type: "error",
          mensagem: "Erro no login!"
        });
      });
  };
  async function validate() {
    let schema = yup.object().shape({
      password: yup
        .string("Erro: Necessário preencher o campo senha!")
        .required("Erro: Necessário preencher o campo senha!")
        .min(4, "Erro: A senha deve ter no mínimo 4 caracteres!"),
      name: yup
        .string("Erro: Necessário preencher o campo nome!")
        .required("Erro: Necessário preencher o campo nome!")
    });

    try {
      await schema.validate(user);
      return true;
    } catch (err) {
      console.log(err.errors[0]);
      setStatus({
        type: "error",
        mensagem: err.errors[0]
      });
      return false;
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">
              <img src={logojp} alt="One Blue" />
            </span>
            <div className="wrap-input">
              <input
                className={user.name !== "" ? "has-val input" : "input"}
                type="email"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                onKeyPress={(e) => e.key === "Enter" && addUser}
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
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={addUser}>
                Entrar
              </button>
              <span className="status-sucess"> {status.mensagem}</span>
            </div>
            <div className="text-center">
              <span className="text1">Não possui conta?</span>
              <a className="txt2" href="#" onClick={props.changePage}>
                criar conta.
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
