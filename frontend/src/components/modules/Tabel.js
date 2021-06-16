import React, { useState } from "react";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import toRupiah from "../../helpers/toRupiah";
import {
  deleteProducts,
  getAllProducts,
} from "../../configs/redux/actions/products";
import EditProduct from "./EditProduct";

function Tabel({ listProducts }) {
  const dispatch = useDispatch();
  const urlApi = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({
    name: "",
    selling_price: 0,
    purchase_price: 0,
    stock: 0,
    image: `default.png`,
  });
  const deleteProduct = (e, id) => {
    e.preventDefault();
    swal
      .fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus produk ini!",
        cancelButtonText: "Batalkan",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          dispatch(deleteProducts(id))
            .then((res) => {
              setLoading(false);
              swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
              dispatch(getAllProducts());
            })
            .catch((err) => {
              setLoading(false);
              swal.fire("Gagal!", err.response.data.message, "error");
            });
        }
      });
  };
  if (loading) {
    swal.fire({
      title: "Loading..",
      icon: "info",
      showConfirmButton: false,
    });
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col" style={{ width: "300px" }}>
              Nama
            </th>
            <th scope="col" style={{ width: "200px" }}>
              Harga Beli
            </th>
            <th scope="col" style={{ width: "200px" }}>
              Harga Jual
            </th>
            <th scope="col" style={{ width: "200px" }}>
              Stock
            </th>
            <th scope="col" style={{ width: "300px" }}>
              Foto
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listProducts.data && listProducts.data.length > 0 ? (
            listProducts.data.map((itm, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td colSpan="1">{itm.name}</td>
                  <td>{toRupiah(itm.purchase_price)}</td>
                  <td>{toRupiah(itm.selling_price)}</td>
                  <td>{itm.stock} Buah</td>
                  <td>
                    <img
                      src={`${urlApi}/images/${itm.image}`}
                      // className="img-thumbnail"
                      style={{
                        width: "150px",
                        height: "160px",
                        backgroundImage: "cover",
                      }}
                      alt={itm.name}
                    />
                  </td>
                  <td>
                    <div className="d-inline-block" style={{ width: "150px" }}>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#editProduk"
                        className="btn btn-primary text-white me-2"
                        onClick={(e) => {
                          setEdit(itm);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => deleteProduct(e, itm.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="12" className="fw-bold text-center">
                Data not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <!-- Modal Edit Produk--> */}
      <EditProduct products={edit} />
    </div>
  );
}

export default Tabel;
