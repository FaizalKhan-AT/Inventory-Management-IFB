import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import AdminNav from "../components/Navbar/AdminNav";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";
import StockTable from "../components/Table/StockTable";
import { db } from "../Firebase/config";
const Technician = () => {
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = JSON.parse(localStorage.getItem("user"));

  const fetchData = () => {
    if (!id) return;
    setLoading(true);
    const techRef = doc(db, "technicians", id);
    getDoc(techRef)
      .then((snap) => {
        setStocks(snap.data().stocks);
        setSearchData(snap.data().stocks);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  };
  const handleSearch = () => {
    setLoading(true);
    if (searchData.length < 1) fetchData();
    setStocks(
      searchData.filter((item) => {
        if (item.partName.includes(search.toLocaleLowerCase())) return item;
        else if (
          item.category === "spares" &&
          item.partCode.includes(search.toLocaleLowerCase())
        )
          return item;
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar tech />
      {error ? <Error setError={setError} error={error} /> : ""}
      <br />
      <br />
      <AdminNav
        tech
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        Your Stocks
      </div>
      <br />
      <br />
      <div
        style={{ overflowX: "auto" }}
        className="px-5 row w-100 justify-content-center gap-3"
      >
        {loading ? (
          <Spinner />
        ) : stocks.length > 0 ? (
          <StockTable stocks={stocks} />
        ) : (
          <div className="h2 text-center my-5">
            You don't have any stocks till now...
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Technician;
