import axios from "axios";
import { useEffect, useState } from "react";

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
        <div className="w-4/5 flex flex-col justify-center gap-5">
          <h1 class="text-5xl font-bold text-center">Data Mahasiswa</h1>
          <div className="overflow-x-auto w-[90%]">
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
                </tr>
              </thead>
              <tbody>
                {mhs.map((mh, idx) => (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
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
                    <td>{mh.nrp}</td>
                    <td>{mh.nama}</td>
                    <td>{mh.nama_jurusan}</td>
                    <td>
                      <div className="card w-96 bg-base-100 shadow-xl image-full">
                        <figure>
                          <img src={url + mh.foto_ktm} alt="Shoes" />
                        </figure>
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
