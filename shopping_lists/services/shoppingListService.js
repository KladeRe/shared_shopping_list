import { executeQuery } from "../database/database.js";

const findAllShoppingLists = async () => {
    let result = await executeQuery("SELECT * FROM shopping_lists WHERE active=TRUE;");
    return result.rows;
};

const createShoppingList = async(name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {
        name: name,
    })
};

const countShoppingLists = async () => {
    let result = await executeQuery("SELECT COUNT(*) FROM shopping_lists;")
    return result.rows[0].count;
};

const deactivateList = async (id) => {
    await executeQuery(`UPDATE shopping_lists SET active = FALSE WHERE id = ${id};`);
}

const findShoppingListById = async (id) => {
    let result = await executeQuery(`SELECT * FROM shopping_lists WHERE id = ${id};`);
    return result.rows[0];
}

export {findAllShoppingLists, createShoppingList, countShoppingLists, deactivateList, findShoppingListById}