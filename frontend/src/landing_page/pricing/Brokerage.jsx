import React from "react";

function Brokerage() {
  return (
    <div className="container my-5">
      <div className="mb-4 text-center">
        <h1 className="fw-bold">
          See how TradeBuddy stacks up against the competition.
        </h1>
      </div>

      <div className="table-responsive shadow rounded mb-5">
        <table className="table align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="text-center fw-semibold">Feature</th>
              <th className="text-center fw-semibold">TradeBuddy</th>
              <th className="text-center fw-semibold">Others</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">Equity Delivery</td>
              <td className="text-center fw-bold text-success">₹0</td>
              <td className="text-center">₹20/order</td>
            </tr>
            <tr>
              <td className="text-center">Intraday</td>
              <td className="text-center fw-bold text-success">₹0/order</td>
              <td className="text-center">₹30/order</td>
            </tr>
            <tr>
              <td className="text-center">Mutual Funds</td>
              <td className="text-center fw-bold text-success">₹0</td>
              <td className="text-center">₹10/order</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Brokerage;
