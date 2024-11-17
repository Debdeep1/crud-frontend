import { useEffect, useState } from "react";
import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addZones } from "../redux/slices/zoneSlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/common/Modal";

const Zone = () => {
  const [modal, setModal] = useState(false);
  const zones = useSelector((state) => state.zones.zones);
  const dispatch = useDispatch();

  const openModal = () => {
    setModal(true);
  };
  const fetchZones = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/zones/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      dispatch(addZones(data));
      console.log(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };
  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Zones" isZone={true} />
          <table className="table table-zebra">
            <thead>
              <tr>
                <th className="p-2 uppercase">Zone Name</th>
                <th className="p-2 uppercase">Zonal Number</th>
                <th className="p-2 uppercase">Zonal Landmark</th>
                <th className="p-2 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone._id}>
                  <td className="p-2">{zone.name}</td>
                  <td className="p-2">{zone.zonalNumber}</td>
                  <td className="p-2">{zone.zonalLandmark}</td>
                  <td className="p-2">
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">
                        <HiOutlineDotsVertical className="text-gray-500 cursor-pointer" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                      >
                        <li className="mb-1 hover:text-sky-700">
                          <Link>
                            {" "}
                            <FaEdit /> Edit
                          </Link>
                        </li>
                        <li className="hover:text-rose-600" onClick={openModal}>
                          <Link>
                            {" "}
                            <FaTrash /> Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title="Delete"
          desp={"Sure you want to delete this zone?"}
          isDelete={true}
        />
      )}
    </Layout>
  );
};

export default Zone;
