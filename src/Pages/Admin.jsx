import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AdminCard from "../components/Cards/AdminCard";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import AdminNav from "../components/Navbar/AdminNav";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";
import { db } from "../Firebase/config";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const adminRef = collection(db, "admins");
  const fetchData = () => {
    getDocs(adminRef)
      .then((snap) => {
        setAdmins(
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
  const handleSearch = () => {
    setLoading(true);
    if (searchData.length < 1) fetchData();
    setAdmins(
      searchData.filter((item) => {
        if (
          item.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
          return item;
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
      <Navbar admin />
      <br />
      {error ? <Error setError={setError} error={error} /> : ""}
      <div
        style={{ textDecoration: "dotted underline red" }}
        className="text-center h2 fw-bold my-3 mt-5"
      >
        All Admins
      </div>
      <br />
      <AdminNav
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <br />
      <br />
      <div className="container d-flex flex-column gap-2">
        {loading ? (
          <Spinner />
        ) : admins.length > 0 ? (
          admins.map((item) => {
            return (
              <AdminCard fetchData={fetchData} key={item.docid} admin={item} />
            );
          })
        ) : (
          <div className="h2 text-center my-5">
            No admins were added till now...
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

export default Admin;
