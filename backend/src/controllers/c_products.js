const m_products = require("../models/m_products")
const fs = require("fs")

module.exports = {
    create: async (req, res) => {
        const {
            name,
            purchase_price,
            selling_price,
            stock
        } = req.body
        const checkName = await m_products.readName(name)
        if (checkName.length > 0) {
            const response = {
                status: 400,
                message: "Produk sudah ada. Nama produk harus unik (tidak boleh sama).",
                error: "client error",
                data: null
            }
            return res.status(400).json(response)
        } else {
            if (name && purchase_price && selling_price && stock) {
                const image = req.file ? `${req.file.filename}` : "default.png";
                const data = {
                    name,
                    purchase_price,
                    selling_price,
                    stock,
                    image,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
                m_products.create(data).then((result) => {
                    const response = {
                        status: 201,
                        message: "Sukses menambahkan produk",
                        error: null,
                        data: result
                    }
                    return res.status(201).json(response)
                }).catch((error) => {
                    const response = {
                        status: 500,
                        message: "Internal server error",
                        error: error.message,
                        data: null
                    }
                    return res.status(500).json(response)
                })
            } else {
                const response = {
                    status: 401,
                    message: "Semua data harus diisi",
                    error: "client error",
                    data: null
                }
                return res.status(401).json(response)
            }
        }

    },
    readAll: async (req, res) => {
        try {
            // sort && methode (ASC, DESC)
            const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
            const order = req.query.order ? req.query.order : "ASC";
            const sort = sortby ? `ORDER BY ${sortby} ${order}` : "";

            // searcing name
            const searchby = req.query["search-by"];
            const item = req.query.item;
            const search = item && searchby ? `WHERE ${searchby} LIKE '%${item}%'` : " ";

            // pagination
            const page = req.query.page ? req.query.page : 1;
            const limit = req.query.limit ? req.query.limit : 10;
            const start = page === 1 ? 0 : (page - 1) * limit;
            const pages = page ? `LIMIT ${start}, ${limit}` : "";

            const totalPage = await m_products.total(search)

            m_products.readAll(search, sort, pages).then((result) => {
                const response = {
                    status: 200,
                    message: "Sukses mendapatkan  data seluruh produk",
                    error: null,
                    pagination: {
                        page: page,
                        limit: limit,
                        total: totalPage[0].total,
                        totalPage: Math.ceil(totalPage[0].total / limit),
                    },
                    data: result
                }
                return res.status(200).json(response)
            }).catch((error) => {
                const response = {
                    status: 500,
                    message: "Internal server error",
                    error: error.message,
                    data: null
                }
                return res.status(500).json(response)
            })
        } catch (error) {
            const response = {
                status: 500,
                message: "Internal server error",
                error: error.message,
                data: null
            }
            return res.status(500).json(response)
        }
    },
    readOne: (req, res) => {
        const id = req.params.id
        m_products.readOne(id).then((result) => {
            if (result.length > 0) {
                const response = {
                    status: 200,
                    message: "Sukses mendapatkan detail produk",
                    error: null,
                    data: result[0]
                }
                return res.status(200).json(response)
            } else {
                const response = {
                    status: 404,
                    message: "Produk tidak ditemukan",
                    error: 'Client error',
                    data: null
                }
                return res.status(404).json(response)
            }
        }).catch((error) => {
            const response = {
                status: 500,
                message: "Internal server error",
                error: error.message,
                data: null
            }
            return res.status(500).json(response)
        })
    },
    update: async (req, res) => {
        const id = req.params.id
        const {
            name,
            purchase_price,
            selling_price,
            stock
        } = req.body
        if (name && purchase_price && selling_price && stock) {
            try {
                const checkProduct = await m_products.readOne(id)
                if (checkProduct.length > 0) {
                    const checkName = await m_products.readName(req.body.name)
                    if (checkName.length > 0 && checkProduct[0].name !== name) {
                        const response = {
                            status: 400,
                            message: "Nama produk yang dipakai sama dengan produk lain. Pilih nama produk yang berbeda.",
                            error: "client error",
                            data: null
                        }
                        return res.status(400).json(response)
                    } {
                        if (req.file) {
                            if (checkProduct[0].image !== "default.png") {
                                const path = "./public/images/" + checkProduct[0].image;
                                if (fs.existsSync(path)) {
                                    fs.unlinkSync(path);
                                }
                            }
                            const data = req.body
                            data.image = `${req.file.filename}`;
                            m_products.update(id, data).then((result) => {
                                const response = {
                                    status: 200,
                                    message: "Sukses update produk",
                                    error: null,
                                    data: result
                                }
                                return res.status(200).json(response)
                            }).catch((error) => {
                                const response = {
                                    status: 500,
                                    message: "Internal server error",
                                    error: error.message,
                                    data: null
                                }
                                return res.status(500).json(response)
                            })
                        } else {
                            const data = req.body
                            m_products.update(id, data).then((result) => {
                                const response = {
                                    status: 200,
                                    message: "Sukses update produk",
                                    error: null,
                                    data: result
                                }
                                return res.status(200).json(response)
                            }).catch((error) => {
                                const response = {
                                    status: 500,
                                    message: "Internal server error",
                                    error: error.message,
                                    data: null
                                }
                                return res.status(500).json(response)
                            })
                        }
                    }
                } else {
                    const response = {
                        status: 404,
                        message: "Product tidak ditemukan",
                        error: "Client error",
                        data: null
                    }
                    return res.status(404).json(response)
                }
            } catch (error) {
                console.log('disini');
                console.log(error)
                const response = {
                    status: 500,
                    message: "Internal server error",
                    error: error.message,
                    data: null
                }
                return res.status(500).json(response)
            }
        } else {
            const response = {
                status: 401,
                message: "Semua data harus diisi",
                error: "client error",
                data: null
            }
            return res.status(401).json(response)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const checkProduct = await m_products.readOne(id)

            if (checkProduct.length > 0) {
                const delImage = checkProduct[0].image
                console.log(delImage);
                if (delImage !== "default.png") {
                    const path = "./public/images/" + delImage;
                    if (fs.existsSync(path)) {
                        fs.unlinkSync(path);
                    }
                    m_products.delete(id).then((result) => {
                        const response = {
                            status: 201,
                            message: "Sukses menghapus produk",
                            error: null,
                            data: result
                        }
                        return res.status(201).json(response)
                    }).catch((error) => {
                        const response = {
                            status: 500,
                            message: "Internal server error",
                            error: error.message,
                            data: null
                        }
                        return res.status(500).json(response)
                    })
                } else {
                    m_products.delete(id).then((result) => {
                        const response = {
                            status: 201,
                            message: "Sukses menghapus produk",
                            error: null,
                            data: result
                        }
                        return res.status(201).json(response)
                    }).catch((error) => {
                        const response = {
                            status: 500,
                            message: "Internal server error",
                            error: error.message,
                            data: null
                        }
                        return res.status(500).json(response)
                    })
                }
            } else {
                const response = {
                    status: 404,
                    message: "Produk tidak ditemukan",
                    error: 'Client error',
                    data: null
                }
                return res.status(404).json(response)
            }
        } catch (error) {
            const response = {
                status: 500,
                message: "Internal server error",
                error: error.message,
                data: null
            }
            return res.status(500).json(response)
        }
    }
}