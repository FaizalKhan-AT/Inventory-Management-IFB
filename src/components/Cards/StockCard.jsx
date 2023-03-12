import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/config";
import Error from "../Error/Error";
import SaleModal from "../Modals/SaleModal";
const StockCard = ({ data, fetchData, stocks }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSaleOpen = () => setOpen(!open);
  const handleSale = (d) => {
    setLoading(true);
    const docRef = doc(db, "technicians", d.tid);
    if (+data.stockAmount < +d.stockSold) {
      setLoading(false);
      setError("stock Sold is higher than stock assigned");
      return;
    }
    if (+d.stockSold < 0) {
      setLoading(false);
      setError("stock Sold cannot be negative");
      return;
    }
    setError("");

    const f = stocks.map((item) => {
      if (item.docid === data.docid) {
        let ts = +d.stockSold + (item.sale ? +item.sale : 0);
        let sa = +item.stockAmount - +d.stockSold;
        return {
          ...item,
          sale: ts,
          stockAmount: sa,
        };
      } else return item;
    });
    const up = { stocks: [...f] };
    console.log(f);
    updateDoc(docRef, up)
      .then(() => {
        setLoading(false);
        setError("Sale marked");
        handleSaleOpen();
        fetchData();
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      {/* <SaleModal
        open={open}
        handleOpen={handleSaleOpen}
        data={data}
        loading={loading}
        saleFn={handleSale}
      /> */}
      {error ? <Error error={error} setError={setError} /> : ""}

      <div className="col-md-5 pointer card part px-2 py-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center flex-column gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Part name : </span>
            <span className="fw-">{data.partName}</span>
          </div>
          {data.category === "spares" ? (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">Part code : </span>
              <span className="fw-">{data.partCode}</span>
            </div>
          ) : (
            ""
          )}
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Assigned Stocks : </span>
            <span className="fw-">{data.stockAmount} Nos</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Category : </span>
            <span className="fw-">{data.category}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Sales : </span>
            <span className="fw-">{data.sale ? data.sale : 0} Nos</span>
          </div>
        </div>
        {/* <div className="d-flex gap-2 flex-wrap px-3 my-2 justify-content-center w-100">
          <div
            disabled={data.stockAmount > 0 ? false : true}
            onClick={handleSaleOpen}
            className="btn my-2 btn-outline-success"
          >
            Mark sale
          </div>
        </div> */}
      </div>
    </>
  );
};

export default StockCard;
