import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMahasiswa() {
  const [dataJurusan, setDataJurusan] = useState([]);
  const [nama, setNama] = useState("");
  const [nrp, setNrp] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoKtm, setFotoKtm] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const getData = await axios.get("http://127.0.0.1:1908/api/jurusan");
      console.log(getData.data);
      setDataJurusan(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("nrp", nrp);
    formData.append("jurusan", jurusan);
    formData.append("foto", foto);
    formData.append("foto_ktm", fotoKtm);
    try {
      const createData = await axios.post(
        "http://127.0.0.1:1908/api/mhs/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(createData);
      navigate("/mhs");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full px-10 py-5 flex justify-center items-center">
        <form
          className="w-4/5 flex flex-col gap-5 items-center"
          onSubmit={createData}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nrp</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setNrp(e.target.value);
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Jurusan</span>
            </label>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={(e) => {
                setJurusan(e.target.value);
              }}
            >
              <option value={""}>Jurusan</option>
              {dataJurusan.map((jur, idx) => {
                return (
                  <option key={idx} value={jur.id_j}>
                    {jur.nama_jurusan}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Foto</span>
            </label>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600"
                accept="image/*"
                onChange={(e) => {
                  setFoto(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Foto KTM</span>
            </label>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-500 file:text-white
                    hover:file:bg-red-600"
                onChange={(e) => {
                  setFotoKtm(e.target.files[0]);
                }}
                accept="image/*"
              />
            </label>
          </div>
          <div className="w-full px-10 flex justify-end">
            <button className={"btn btn-secondary"} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
