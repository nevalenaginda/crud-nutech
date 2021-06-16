import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  editProducts,
  getAllProducts,
} from "../../configs/redux/actions/products";

function EditProduct({ products }) {
  const dispatch = useDispatch();
  const urlApi = process.env.REACT_APP_API_URL;
  const [edit, setEdit] = useState(products);
  const [imgUrl, setImgUrl] = useState(`${urlApi}/images/${products.image}`);
  const [dataImage, setDataImage] = useState({ image: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEdit(products);
    setImgUrl(`${urlApi}/images/${products.image}`);
    setDataImage({
      image: null,
    });
  }, [products, urlApi]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = edit.id;
    const formData = new FormData();
    formData.append("name", edit.name);
    formData.append("purchase_price", edit.purchase_price);
    formData.append("selling_price", edit.selling_price);
    formData.append("stock", edit.stock);
    if (dataImage.image !== null) {
      formData.append("image", dataImage.image);
    }
    setLoading(true);
    dispatch(editProducts(id, formData))
      .then((res) => {
        dispatch(getAllProducts());
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
      id="editProduk"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Produk
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

              <div className="mb-3">
                <label htmlFor="InputName" className="form-label fw-bold">
                  Nama
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputGambar" className="form-label fw-bold">
                  Foto
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="InputGambar"
                  onChange={handleChangeImage}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputHargaBeli" className="form-label fw-bold">
                  Harga beli
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="InputHargaBeli"
                  value={edit.purchase_price}
                  onChange={(e) =>
                    setEdit({ ...edit, purchase_price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputHargaJual" className="form-label fw-bold">
                  Harga Jual
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="InputHargaJual"
                  value={edit.selling_price}
                  onChange={(e) =>
                    setEdit({ ...edit, selling_price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputStok" className="form-label fw-bold">
                  Stok
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="InputStok"
                  value={edit.stock}
                  onChange={(e) => setEdit({ ...edit, stock: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Keluar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
