import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import TechnicianCard from "../components/Cards/TechnicianCard";
import Error from "../components/Error/Error";
import FilterNav from "../components/Navbar/FilterNav";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";
import { db } from "../Firebase/config";
import Footer from "../components/Footer/Footer";
const Technicians = () => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const techRef = collection(db, "technicians");
  const [searchData, setSearchData] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    setLoading(true);
    if (searchData.length < 1) fetchData();
    setTechnicians(
      searchData.filter((item) => {
        if (
          item.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
          return item;
      })
    );
    setLoading(false);
  };
  const fetchData = () => {
    getDocs(techRef)
      .then((snap) => {
        setTechnicians(
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
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const handleClearSales = () => {
    const up = [];
    searchData.forEach((item) => {
      if (item.stocks && item.stocks.length > 0) {
        let st = [];
        item.stocks.forEach((s) => {
          if (s.sale && s.sale > 0) {
            s.sale = 0;
            st.push(s);
          }
        });
        if (st.length > 0) {
          const docRef = doc(db, "technicians", item.docid);
          updateDoc(docRef, { stocks: [...st] }).catch((err) =>
            setError("Something went wrong")
          );
        } else setError("Sales are already zero");
      }
    });
    setError("Sales cleared");
    fetchData();
  };
  return (
    <>
      <Navbar />
      {error ? <Error setError={setError} error={error} /> : ""}
      <br />
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        Technicians {technicians.length > 0 ? `(${technicians.length})` : ""}
      </div>
      <br />
      <FilterNav
        handleClearSales={handleClearSales}
        tech
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      <br />
      <br />
      <div className="container d-flex flex-column gap-2">
        {loading ? (
          <Spinner />
        ) : technicians && technicians.length > 0 ? (
          technicians.map((item, idx) => {
            return (
              <TechnicianCard
                fetchData={fetchData}
                key={item.docid}
                technician={item}
              />
            );
          })
        ) : (
          <div className="h2 text-center my-5">
            No technicians were added till now...
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

export default Technicians;
