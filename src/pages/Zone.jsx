import { useEffect, useState } from "react";
import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addZones, setZone } from "../redux/slices/zoneSlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/common/Modal";
import { toast } from "react-toastify";

const Zone = () => {
  const [modal, setModal] = useState(false);
  const zones = useSelector((state) => state.zones.zones);
  const zone = useSelector((state) => state.zones.zone);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setModal(true);
  };

  const handleSetZone = (zone) => {
    dispatch(setZone(zone));
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
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/zones/delete/${zone._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong");
        throw new Error(data.message || "Something went wrong");
      } else {
        toast.success("Zone deleted successfully!");
        fetchZones();
      }
      setModal(false);
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };
  useEffect(() => {
    fetchZones();
  }, []);

  console.log("Zone", zone);
  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Zones" isZone={true} />
          <table className="table">
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
                    <div className="dropdown" onClick={() => handleSetZone(zone)}>
                      <div tabIndex={0} role="button" className="btn btn-sm m-1">
                        <HiOutlineDotsVertical className="text-gray-500 cursor-pointer" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                      >
                        <li className="mb-1 hover:text-sky-700" onClick={() => navigate(`/zones/${zone._id}`)}>
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
          onClick={handleDelete}
        />
      )}
    </Layout>
  );
};

export default Zone;
