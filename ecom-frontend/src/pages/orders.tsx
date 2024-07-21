import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { DataRouteMatch, Link } from "react-router-dom";
import { Column } from "react-table";
import Header from "../components/header";

type DataType ={
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const column: Column<DataType>[]=[
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
]

const Orders = () => {

    const [rows, setRows] = useState<DataType[]>([
        {
            _id: "asdas",
            amount: 123,
            quantity: 22,
            discount: 1234,
            status: <span className="red"> Processing</span>,
            action: <Link to={`/order/asdas`}> View </Link>,
        }
    ])
    const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length > 6
    )();
  return (
    <div className="containers">
      <h1>MY ORDERS</h1>
      {Table}
    </div>
  )
}

export default Orders;
