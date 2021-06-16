const connection = require("../configs/db")

module.exports = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO products SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    readAll: (search, order, pages) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM products ${search} ${order} ${pages}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    readOne: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM products WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    readName: (name) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM products WHERE name = ?", name, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    total: (search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM products ${search}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE products set ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}