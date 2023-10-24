import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Mahasiswa() {
  const [mhs, setMhs] = useState([]);
  const url = "http://127.0.0.1:1908/static/";
  const fetchData = async () => {
    try {
      const getData = await axios.get("http://127.0.0.1:1908/api/mhs");
      console.log(getData.data);
      setMhs(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-base-200">
        <div className="w-[98%] flex flex-col justify-center items-center gap-5">
          <h1 class="text-5xl font-bold text-center">Data Mahasiswa</h1>
          <div className="w-[90%] flex px-10 justify-end">
            <Link to={"create"} className="btn btn-accent">
              Create
            </Link>
          </div>
          <div className="overflow-x-auto w-[95%]">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Foto</th>
                  <th>NRP</th>
                  <th>Name</th>
                  <th>Jurusan</th>
                  <th>Foto KTM</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mhs.map((mh, idx) => (
                  <tr>
                    <td className="text-center">{idx + 1}</td>
                    <td>
                      <div className="flex justify-center items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={url + mh.foto}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{mh.nrp}</td>
                    <td className="text-center">{mh.nama}</td>
                    <td className="text-center">{mh.nama_jurusan}</td>
                    <td className="flex justify-center">
                      <div className="card w-36 bg-base-100 shadow-xl">
                        <figure>
                          <img src={url + mh.foto_ktm} />
                        </figure>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex w-full gap-5 justify-center">
                        <Link
                          to={`${mh.id_mahasiswa}`}
                          className="btn btn-info"
                        >
                          Update
                        </Link>
                        <button className="btn btn-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mahasiswa;
