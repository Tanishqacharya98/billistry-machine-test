import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Auth() {

  const [isLogin, setIsLogin] =
    useState(true);

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (isLogin) {

        const { data } =
          await API.post(
            "/auth/login",
            {
              email: form.email,
              password: form.password
            }
          );

        localStorage.setItem(
          "token",
          data.token
        );

      } else {

        const { data } =
          await API.post(
            "/auth/signup",
            form
          );

        localStorage.setItem(
          "token",
          data.token
        );
      }

      navigate("/dashboard");
    };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>
          {isLogin
            ? "Login"
            : "Signup"}
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          {!isLogin && (
            <input
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value
                })
              }
            />
          )}

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value
              })
            }
          />

          <button>
            {isLogin
              ? "Login"
              : "Signup"}
          </button>

        </form>

        <p
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
          style={{
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          {isLogin
            ? "Create Account"
            : "Already have account?"}
        </p>

      </div>

    </div>
  );
}

export default Auth;