import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import { BeatLoader } from "react-spinners";

const Transactions = () => {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.vassetglobal.com/api/user/${userId}/transactions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Transactions Fetched Successfully");
          setTransactions(Array.isArray(response.data) ? response.data : []);
          setIsLoading(false);
        } else if (response.status === 401) {
          toast.error("Unauthorized access, please login");
          setIsLoading(false);
          logout();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
        } else {
          toast.error(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error(errorMessage(error));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authToken, logout, navigate, userId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "verified":
        return "bg-green-200 text-green-800";
      case "failed":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-2">
      <h1 className="text-[25px] text-[#007A86] lato-bold">Transactions</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-[85vh]">
          <BeatLoader color={"#007A86"} />
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[85vh]">
          <div className="flex justify-center align-middle pl-10 pr-10">
            <h1 className="text-[18px] text-[#036] lato-bold text-center">
              No transactions available yet, carry out a transaction to view
            </h1>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Asset</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-4">{transaction.id}</td>
                  <td className="p-4">{transaction.amount}</td>
                  <td className="p-4">{transaction.coin_type || "N/A"}</td>
                  <td className={`p-4 ${getStatusStyle(transaction.status)}`}>
                    {transaction.status}
                  </td>
                  <td className="p-4">{formatDate(transaction.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
