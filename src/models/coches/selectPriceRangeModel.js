import { getPool } from "../../db/getPool.js";

export const selectPriceRangeModel = async () => {
    const pool = await getPool();

    const [prices] = await pool.query(
        `SELECT MAX(precio) AS max, MIN(precio) AS min FROM coches`
    );

    return prices;
};
