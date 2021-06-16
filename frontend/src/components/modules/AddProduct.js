import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  addProducts,
  getAllProducts,
} from "../../configs/redux/actions/products";

function AddProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    purchase_price: "",
    selling_price: "",
    stock: "",
  });
  const [imgUrl, setImgUrl] = useState(null);
  const [dataImage, setDataImage] = useState({ image: null });
  const [loading, setLoading] = useState(false);
  const changeForm = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("purchase_price", product.purchase_price);
    formData.append("selling_price", product.selling_price);
    formData.append("stock", product.stock);
    if (dataImage.image !== null) {
      formData.append("image", dataImage.image);
    }
    setLoading(true);
    dispatch(addProducts(formData))
      .then((res) => {
        dispatch(getAllProducts());
        setLoading({
          name: "",
          purchase_price: "",
          selling_price: "",
          stock: "",
        });
        setDataImage({
          image: null,
        });
        setImgUrl(null);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  const handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const imgFiles = event.target.files[0];
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      setDataImage({
        image: imgFiles,
      });
    }
  };

  if (loading) {
    Swal.fire({
      title: "Loading..",
      icon: "info",
      showConfirmButton: false,
    });
  }

  return (
    <div
      className="modal fade"
      id="tambahProduk"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Tambah Produk Baru
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {imgUrl && (
              <img
                className="rounded mx-auto d-block py-2"
                style={{
                  width: "150px",
                  height: "200px",
                  backgroundImage: "cover",
                }}
                src={`${imgUrl}`}
                alt="new-product"
              ></img>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputName"
                  className="form-label fw-bold"
                >
                  Nama
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="name"
                  value={product.name}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputGambar"
                  className="form-label fw-bold"
                >
                  Foto
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputGambar"
                  onChange={handleChangeImage}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputHargaBeli"
                  className="form-label fw-bold"
                >
                  Harga beli
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="exampleInputHargaBeli"
                  name="purchase_price"
                  value={product.purchase_price}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputHargaJual"
                  className="form-label fw-bold"
                >
                  Harga Jual
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="exampleInputHargaJual"
                  name="selling_price"
                  value={product.selling_price}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputStok"
                  className="form-label fw-bold"
                >
                  Stok
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="exampleInputStok"
                  name="stock"
                  value={product.stock}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="col text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Keluar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
