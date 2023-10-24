import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateJurusan() {
  const [jurusan, setJurusan] = useState({
    id_j: null,
    nama_jurusan: "",
  });
  const handleEditDataChange = (field, value) => {
    setJurusan((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const getJurusan = await axios.get(
        `http://127.0.0.1:1908/api/jurusan/${id}`
      );
      console.log(getJurusan.data.payload);
      setJurusan(getJurusan.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    const formData = {
      nama_jurusan: jurusan.nama_jurusan,
    };
    try {
      const updateData = await axios.patch(
        `http://127.0.0.1:1908/api/jurusan/update/${id}`,
        formData
      );
      console.log(updateData);
      navigate("/jurusan");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-screen px-10 py-5 flex flex-col justify-center items-center">
        <p className="font-bold text-2xl">Update Jurusan</p>
        <form
          className="w-1/2 flex flex-col gap-5 items-center"
          onSubmit={updateData}
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nrp</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={jurusan ? jurusan.nama_jurusan : ""}
              onChange={(e) => {
                handleEditDataChange("nama_jurusan", e.target.value);
              }}
            />
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
