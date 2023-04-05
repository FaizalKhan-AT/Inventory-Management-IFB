import React from "react";

const StockTable = ({ inventory, stocks }) => {
  return (
    <table style={{ overflow: "scroll" }} className="w-100">
      <thead>
        <tr>
          <th>Part Name</th>
          <th>Part Code</th>
          <th>Stocks</th>
          <th>Sale</th>
          <th>Category</th>
          {inventory ? "" : <th>Returns</th>}
          {inventory ? "" : <th>Sales</th>}
        </tr>
      </thead>
      <tbody>
        {stocks.map((item, idx) => {
          if (+item.stockAmount > 0 || inventory) {
            return (
              <tr key={item.docid + idx + item.partName}>
                <td>{item.partName}</td>
                {item.category === "spares" ? (
                  <td>{item.partCode}</td>
                ) : (
                  <td>N/A</td>
                )}
                <td>{inventory ? item.stock : item.stockAmount}</td>
                <td>{item.sale ? item.sale : 0}</td>
                <td>{item.category}</td>
                {inventory ? (
                  ""
                ) : (
                  <td style={{ overflowY: "auto" }}>
                    <div
                      style={{
                        height: "35px",
                      }}
                    >
                      {item.returns && item.returns.length > 0
                        ? item.returns.map((r, i) => (
                            <div key={r.date + i} className="py-2 d-flex gap-1">
                              <span>{r.number},</span>
                              <span>{r.date}</span>
                            </div>
                          ))
                        : "N / A"}
                    </div>
                  </td>
                )}
                {inventory ? (
                  ""
                ) : (
                  <td style={{ overflowY: "auto" }}>
                    <div
                      style={{
                        height: "35px",
                      }}
                    >
                      {item.sales && item.sales.length > 0
                        ? item.sales.map((r, i) => (
                            <div key={r.date + i} className="py-2 d-flex gap-1">
                              <span>{r.number},</span>
                              <span>{r.date}</span>
                            </div>
                          ))
                        : "N / A"}
                    </div>
                  </td>
                )}
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default StockTable;
