import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Mahasiswa from "../pages/Mahasiswa";
import Jurusan from "../pages/Jurusan";
import CreateMahasiswa from "../pages/CreateMahasiswa";
import UpdateMahasiswa from "../pages/UpdateMahasiswa";
export default function Routing() {
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
              </ul>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/mhs" element={<Mahasiswa />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/mhs/create" element={<CreateMahasiswa />} />
          <Route path="/mhs/:id" element={<UpdateMahasiswa />} />
        </Routes>
      </Router>
    </>
  );
}
