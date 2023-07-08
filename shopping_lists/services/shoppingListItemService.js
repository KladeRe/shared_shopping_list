import { executeQuery } from "../database/database.js";

const countShoppingListItems = async () => {
    let result = await executeQuery("SELECT COUNT(name) FROM shopping_list_items;");
    return result.rows[0].count;
};

const findAllUncollectedShoppingListItems = async (id) => {
    let result = await executeQuery(`SELECT * FROM shopping_list_items WHERE collected = FALSE AND shopping_list_id = ${id} ORDER BY name;`);
    return result.rows;
}

const findAllCollectedShoppingListItems = async (id) => {
    let result = await executeQuery(`SELECT * FROM shopping_list_items WHERE collected = TRUE AND shopping_list_id = ${id} ORDER BY name;`);
    return result.rows;
}

const collectItemById = async (id) => {
    await executeQuery(`UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;`, {
        id: id,
    });
}

const createNewItem = async (name, shopping_list_id) => {
    await executeQuery(`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);`, {
        name: name,
        shopping_list_id: shopping_list_id,
    })
}

export {countShoppingListItems, findAllUncollectedShoppingListItems, findAllCollectedShoppingListItems, collectItemById, createNewItem}

