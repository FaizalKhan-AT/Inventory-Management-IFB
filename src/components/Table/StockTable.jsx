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
        </tr>
      </thead>
      <tbody>
        {stocks.map((item, idx) => (
          <tr key={item.docid + idx}>
            <td>{item.partName}</td>
            {item.category === "spares" ? (
              <td>{item.partCode}</td>
            ) : (
              <td>N/A</td>
            )}
            <td>{inventory ? item.stock : item.stockAmount}</td>
            <td>{item.sale ? item.sale : 0}</td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
