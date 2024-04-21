const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Arlen Project",
    password: "Arlen",
    port: 5432,
});
const getUser = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM users", (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};
const createUser = (body) => {
    return new Promise(function (resolve, reject) {
        const { name, password, email, role } = body;
        pool.query(
            "INSERT INTO users (name, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, password, email, role],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(
                        `A new user has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};
const deleteUser = (iduser) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            "DELETE FROM users WHERE iduser = $1",
            [iduser],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`User deleted with ID: ${iduser}`);
            }
        );
    });
};
const updateUser = (iduser, body) => {
    return new Promise(function (resolve, reject) {
        const { name, password, email, role } = body;
        pool.query(
            "UPDATE users SET name = $1, password = $2, email = $3, role = $4, WHERE iduser = $4 RETURNING *",
            [name, password, email, role],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};
module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser
};