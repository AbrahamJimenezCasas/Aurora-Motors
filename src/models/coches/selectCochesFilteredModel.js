import { getPool } from "../../db/getPool.js";

export const selectCochesFilteredModel = async (
    filtros,
    precio,
    order,
    limit,
    search
) => {
    const pool = await getPool();

    let query = `SELECT * FROM coches;`;
    let values = [];

    // FILTROS
    const filtrosKeys = Object.keys(filtros);
    let where = "";

    if (filtrosKeys.length > 0) {
        let wheres = [];

        filtrosKeys.map((key, id) => {
            values.push(filtros[filtrosKeys[id]]);
            wheres.push(`${filtrosKeys[id]} = ?`);
        });

        where = `AND ${wheres.join(" AND ")}`;
    }

    // PRECIO
    const precioKeys = Object.keys(precio);
    let range = "";

    if (precioKeys.length > 0) {
        let minMax = [];

        const [min] = await pool.query(
            `SELECT MIN(precio) AS minimo FROM coches;`
        );

        const [max] = await pool.query(
            `SELECT MAX(precio) AS maximo FROM coches;`
        );

        const minimo = precio.min || min[0].minimo;
        const maximo = precio.max || max[0].maximo;

        precioKeys.map((key, id) => {
            minMax.push(precio[precioKeys[id]]);
        });

        range = `AND precio BETWEEN ${minimo} AND ${maximo}`;
    }

    // ORDER BY
    let sort = "";
    if (order.by) {
        sort = `ORDER BY ${order.by} ${order.direction || ""} `;
    }

    // LIMIT
    let limite = "";
    if (limit.length) {
        limite = `LIMIT ${limit};`;
    }

    // SEARCH
    let searchLike = "";
    if (search.length) {
        searchLike = `AND modelo LIKE '%${search}%'`;
    }

    // QUERY FINAL
    query = `SELECT id, modelo, categoria, precio, descripcion, disponible FROM coches WHERE disponible = TRUE ${where} ${range} ${searchLike} ${sort} ${limite};`;

    const [coches] = await pool.query(query, values);

    return coches;
};
