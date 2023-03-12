import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import AdminNav from "../components/Navbar/AdminNav";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";
import StockTable from "../components/Table/StockTable";
import { db } from "../Firebase/config";

const Inventory = () => {
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const techRef = collection(db, "parts");
    getDocs(techRef)
      .then((snap) => {
        setStocks(snap.docs.map((doc) => doc.data()));
        setSearchData(snap.docs.map((doc) => doc.data()));
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
        Inventory
      </div>
      <br />
      <br />
      <div className="container w-100 justify-content-center gap-3">
        {loading ? (
          <Spinner />
        ) : stocks.length > 0 ? (
          <StockTable inventory stocks={stocks} />
        ) : (
          <div className="h2 text-center my-5">
            You don't have any stocks in the inventory till now...
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

export default Inventory;
