import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jurusan() {
  const [jurusan, setJurusan] = useState([]);
  const fetchData = async () => {
    try {
      const getData = await axios.get("http://127.0.0.1:1908/api/jurusan");
      console.log(getData.data);
      setJurusan(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const deletedData = await axios.delete(
        `http://127.0.0.1:1908/api/jurusan/delete/${id}`
      );
      console.log(deletedData.data);
      fetchData();
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
          <h1 className="text-5xl font-bold text-center">Data Jurusan</h1>
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
                  <th>Nama Jurusan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jurusan.map((jrsn, idx) => (
                  <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{jrsn.nama_jurusan}</td>
                    <td className="">
                      <div className="flex w-full gap-5 justify-center">
                        <Link to={`${jrsn.id_j}`} className="btn btn-info">
                          Update
                        </Link>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteData(jrsn.id_j);
                          }}
                        >
                          Delete
                        </button>
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
