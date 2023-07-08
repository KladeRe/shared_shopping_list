import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListItemService from "../services/shoppingListItemService.js";
import * as shoppingListService from "../services/shoppingListItemService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showShoppingList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        shopping_list: await shoppingListService.findShoppingListById(urlParts[2]),
        uncollected_shopping_list_items: await shoppingListItemService.findAllUncollectedShoppingListItems(urlParts[2]),
        collected_shopping_list_items: await shoppingListItemService.findAllCollectedShoppingListItems(urlParts[2]),
    }


    return new Response(await renderFile("shoppingList.eta", data), responseDetails);
}

const createItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const formData = await request.formData();
    const name = formData.get("name");
    await shoppingListItemService.createNewItem(name, urlParts[2]);
    return redirectTo(`/lists/${urlParts[2]}`);
}

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListItemService.collectItemById(urlParts[4]);

    return redirectTo(`/lists/${urlParts[2]}`);
}

export {showShoppingList, collectItem, createItem}