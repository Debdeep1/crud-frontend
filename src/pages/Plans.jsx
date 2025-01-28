import { useEffect, useState } from "react";
import Heading from "../components/common/Heading";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/common/Modal";
import { addPlans, setPlan } from "../redux/slices/planSlice";
import { toast } from "react-toastify";
import { fetchPlans } from "../apis/plans";

const Plans = () => {
  const [modal, setModal] = useState(false);
  const plans = useSelector((state) => state.plans.plans);
  const plan = useSelector((state) => state.plans.plan);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSetPlan = (plan) => {
    dispatch(setPlan(plan));
  };

  const openModal = () => {
    setModal(true);
  };

  const getPlans = async () => {
    try {
      const response = await fetchPlans();
      dispatch(addPlans(response));
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/plans/delete/${plan._id}`,
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
        toast.success("Plan deleted successfully!");
        getPlans();
      }
      setModal(false);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <Layout>
      <div className="bg-white p-2 shadow-md rounded-lg h-[calc(100vh-80px)] border">
        <div className="bg-white p-4 shadow-inner rounded-lg h-[calc(100vh-100px)] border">
          <Heading title="Plans" isPlan={true} />

          {/* Wrapper for the table with horizontal scrolling on small screens */}
          <div className="overflow-x-auto sm:overflow-hidden">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="p-2 uppercase">Plan Name</th>
                  <th className="p-2 uppercase">Amount</th>
                  <th className="p-2 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={plan._id}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{plan.name}</td>
                    <td className="p-2">{plan.price}</td>
                    <td className="p-2">
                      <div
                        className="dropdown"
                        onClick={() => handleSetPlan(plan)}
                      >
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-sm m-1"
                        >
                          <HiOutlineDotsVertical className="text-gray-500 cursor-pointer" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                        >
                          <li
                            className="mb-1 hover:text-sky-700"
                            onClick={() => navigate(`/plans/${plan._id}`)}
                          >
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
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title="Delete"
          desp={"Sure you want to delete this plan?"}
          isDelete={true}
          onClick={handleDelete}
        />
      )}
    </Layout>
  );
};

export default Plans;
