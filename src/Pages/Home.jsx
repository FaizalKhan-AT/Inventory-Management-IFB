import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PartCard from "../components/Cards/PartCard";
import Footer from "../components/Footer/Footer";
import FilterNav from "../components/Navbar/FilterNav";
import Navbar from "../components/Navbar/Navbar";
import { db } from "../Firebase/config";
import Spinner from "../components/Spinner/Spinner";
import Error from "../components/Error/Error";
const Home = () => {
  const partRef = collection(db, "parts");
  const [parts, setParts] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const fetchData = () => {
    getDocs(partRef)
      .then((snap) => {
        setParts(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
        setSearchData(
          snap.docs.map((post) => {
            return { ...post.data(), docid: post.id };
          })
        );
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  };
  const handleSearch = () => {
    setLoading(true);
    if (searchData.length < 1) fetchData();
    setParts(
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
  const handleFilter = () => {
    setLoading(true);
    if (searchData.length < 1) fetchData();
    if (filter === "All") {
      setParts(searchData);
      setLoading(false);
      return;
    }
    setParts(
      searchData.filter((item) => {
        if (item.category === filter.toLocaleLowerCase()) return item;
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {error ? <Error setError={setError} error={error} /> : ""}
      <br />
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        Stocks
      </div>
      <br />
      <FilterNav
        handleSearch={handleSearch}
        setSearch={setSearch}
        search={search}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : parts.length > 0 ? (
        <div className="px-5 row w-100 justify-content-center gap-3">
          {parts.map((item) => {
            return (
              <PartCard fetchData={fetchData} data={item} key={item.docid} />
            );
          })}
        </div>
      ) : (
        <div className="h2 text-center my-5">
          No parts are added till now...
        </div>
      )}
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Home;
