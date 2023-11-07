import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Mahasiswa from "../pages/Mahasiswa";
import Jurusan from "../pages/Jurusan";
import CreateMahasiswa from "../pages/CreateMahasiswa";
import UpdateMahasiswa from "../pages/UpdateMahasiswa";
import CreateJurusan from "../pages/CreateJurusan";
import UpdateJurusan from "../pages/UpdateJurusan";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
export default function Routing() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logout berhasil !");
    window.location.reload();
  };
  return (
    <>
      <Router>
        <div className="navbar bg-base-100 px-3">
          <div className="flex-1">
            <Link to={"/"} className="btn btn-ghost normal-case text-xl">
              daisyUI
            </Link>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <ul className=" w-max flex gap-5">
                <li className="">
                  <Link to={"/mhs"}>Mahasiswa</Link>
                </li>
                <li className="">
                  <Link to={"/jurusan"}>Jurusan</Link>
                </li>
                {isLoggedIn ? (
                  <li className="">
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <li className="">
                    <Link to={"/login"}>Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/mhs" element={<Mahasiswa />} />
          <Route path="/mhs/create" element={<CreateMahasiswa />} />
          <Route path="/mhs/:id" element={<UpdateMahasiswa />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/jurusan/create" element={<CreateJurusan />} />
          <Route path="/jurusan/:id" element={<UpdateJurusan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
