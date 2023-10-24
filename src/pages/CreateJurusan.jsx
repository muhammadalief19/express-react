import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateJurusan() {
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const createData = async (e) => {
    e.preventDefault();
    const formData = {
      nama_jurusan: nama,
    };
    try {
      const createData = await axios.post(
        "http://127.0.0.1:1908/api/jurusan/store",
        formData
      );
      console.log(createData);
      navigate("/jurusan");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen px-10 py-5 flex flex-col justify-center items-center">
        <p className="font-bold text-3xl">Create Jurusan</p>
        <form
          className="w-1/2 flex flex-col gap-5 items-center"
          onSubmit={createData}
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nama Jurusan</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
          </div>
          <div className="w-full  flex justify-end">
            <button className={"btn btn-secondary"} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
