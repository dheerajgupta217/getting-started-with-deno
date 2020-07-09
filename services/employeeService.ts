import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import Employee from "../interfaces/Employee.ts";


export default {
    doesExistById: async ({ id }: Employee) => {
        const [result] = await client.query(
            `SELECT COUNT(*) count FROM ${TABLE.EMPLOYEE} WHERE id = ? LIMIT 1`,
            [id],
        );
        return result.count > 0;
    },

    getAll: async () => {
        return await client.query(`SELECT * FROM ${TABLE.EMPLOYEE}`);
    },

    getById: async ({ id }: Employee) => {
        return await client.query(
            `SELECT * FROM ${TABLE.EMPLOYEE} WHERE id = ?`,
            [id],
        );
    },

    add: async ({name,department,isActive}: Employee,) => {
        return await client.query(
            `INSERT INTO ${TABLE.EMPLOYEE}(name, department,isActive) values(?, ?, ?)`,
            [
                name,
                department,
                isActive,
            ],
        );
    },

    updateById: async ({ id, name,department, isActive }: Employee) => {
        const result = await client.query(
            `UPDATE ${TABLE.EMPLOYEE} SET name=?, department=?, isActive=? WHERE id=?`,
            [
                name,
                department,
                isActive,
                id,
            ],
        );
        return result.affectedRows;
    },

    deleteById: async ({ id }: Employee) => {
        const result = await client.query(
            `DELETE FROM ${TABLE.EMPLOYEE} WHERE id = ?`, [id],
        );
        return result.affectedRows;
    },
};