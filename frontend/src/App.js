import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./configs/redux/actions/products";
import Tabel from "./components/modules/Tabel";
import AddProduct from "./components/modules/AddProduct";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./assets/Logo-Nutech.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { allProducts } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [rangeLimit] = useState(["5", "10", "15", "20"]);
  const [limit, setLimit] = useState(rangeLimit[0]);
  const [page, setPage] = useState("1");
  const [totalPage, setTotalPage] = useState("1");

  useEffect(() => {
    dispatch(getAllProducts(search, limit, page)).then((res) => {
      setPage(res.data.pagination.page);
      setTotalPage(res.data.pagination.totalPage);
    });
  }, [search, limit, page, dispatch]);
  if (allProducts) {
    console.log(allProducts);
  }
  return (
    <div className="container">
      <nav className="navbar navbar bg-white mb-3">
        <img
          src={logo}
          alt="logo"
          width="auto"
          height="90"
          className="d-inline-block align-text-top"
        />
      </nav>
      <h1 className="mb-5 text-center">Daftar Produk</h1>
      <div className="d-flex justify-content-end">
        <div
          className="input-group input-group mb-1"
          style={{ width: "250px" }}
        >
          <h5 className="mt-1 me-2">Pencarian: </h5>
          <input
            type="text"
            className="form-control"
            style={{ height: "40px" }}
            placeholder="Cari produk"
            onKeyUp={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end justify-content-md-between">
        <button
          className="btn btn-success mb-2 mt-1 d-none d-md-block"
          data-bs-toggle="modal"
          data-bs-target="#tambahProduk"
          style={{ height: "45px" }}
        >
          Tambah Produk
        </button>
        <div className="input-group mb-1 mt-2" style={{ width: "230px" }}>
          <h5 className="mt-1 me-2">Limit: </h5>
          <select
            className="form-select"
            style={{ height: "40px" }}
            aria-label=".form-select-lg example"
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
          >
            {rangeLimit.map((itm) => {
              return <option value={itm}>{itm}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end d-md-none ">
        <button
          className="btn btn-success mb-2 mt-2"
          data-bs-toggle="modal"
          data-bs-target="#tambahProduk"
          style={{ height: "45px" }}
        >
          Tambah Produk
        </button>
      </div>
      <Tabel listProducts={allProducts} />
      <div className="d-flex justify-content-end mb-5">
        <div className={classes.root}>
          <Pagination
            page={parseInt(page)}
            defaultPage={1}
            onChange={(item, i) => setPage(i)}
            count={parseInt(totalPage)}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
      {/* <!-- Modal Tambah Produk--> */}
      <AddProduct />
    </div>
  );
}

export default App;
