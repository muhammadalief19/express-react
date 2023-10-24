import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateMahasiswa() {
  const [mhs, setMhs] = useState({
    id_mahasiswa: null,
    nama: "",
    nrp: "",
    id_jurusan: "",
  });
  const [dataJurusan, setDataJurusan] = useState([]);
  const handleEditDataChange = (field, value) => {
    setMhs((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const getData = await axios.get("http://127.0.0.1:1908/api/jurusan");
      const getMhs = await axios.get(`http://127.0.0.1:1908/api/mhs/${id}`);
      console.log(getData.data);
      console.log(getMhs.data.payload);
      setMhs(getMhs.data.payload);
      setDataJurusan(getData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", mhs.nama);
    formData.append("nrp", mhs.nrp);
    formData.append("jurusan", mhs.id_jurusan);

    if (mhs.foto) {
      formData.append("foto", mhs.foto);
    }
    if (mhs.foto_ktm) {
      formData.append("foto_ktm", mhs.foto_ktm);
    }
    try {
      const updateData = await axios.patch(
        `http://127.0.0.1:1908/api/mhs/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(updateData);
      navigate("/mhs");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full px-10 py-5 flex justify-center items-center">
        <form
          className="w-[4/5] flex flex-col gap-5 items-center"
          onSubmit={updateData}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nrp</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              defaultValue={mhs ? mhs.nrp : ""}
              onChange={(e) => {
                handleEditDataChange("nrp", e.target.value);
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
              defaultValue={mhs ? mhs.nama : ""}
              onChange={(e) => {
                handleEditDataChange("nama", e.target.value);
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Jurusan</span>
            </label>
            <select
              className="select select-primary w-full max-w-xs"
              defaultValue={mhs ? mhs.id_jurusan : ""}
              onChange={(e) => {
                handleEditDataChange("id_jurusan", e.target.value);
              }}
            >
              <option value={""}>Jurusan</option>
              {dataJurusan.map((jur, idx) => {
                return (
                  <option
                    key={idx}
                    value={jur.id_j}
                    selected={mhs.id_jurusan === jur.id_j ? true : false}
                  >
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
                  handleEditDataChange("foto", e.target.files[0]);
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
                  handleEditDataChange("id_jurusan", e.target.files[0]);
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
