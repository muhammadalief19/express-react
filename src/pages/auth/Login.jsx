import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_APIURL}/auth/login`,
        { username, password }
      );
      const token = response.data.token;
      console.log(response.data);

      if (token) {
        localStorage.setItem("token", token);
        navigate("/mhs");
        window.location.reload();
      } else {
        console.log("Token tidak diterima");
      }
    } catch (error) {
      //   if (error.response.status === 401) {
      //     console.log("username / password salah");
      //   } else {
      console.error(error);
      //   }
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-1/2 flex flex-col py-5 px-7 items-center gap-5">
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-full max-w-xs">
            <button
              className="btn btn-active btn-info w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="w-full max-w-xs">
            <p className="">
              Belum punya akun ? <Link to={"/register"}>Daftar</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
