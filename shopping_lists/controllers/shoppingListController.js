import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListService from "../services/shoppingListItemService.js";
import * as shoppingListItemService from "../services/shoppingListItemService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const listCounts = async (request) => {
    const data = {
        shopping_list_item_amount: await shoppingListItemService.countShoppingListItems(),
        shopping_list_amount: await shoppingListService.countShoppingLists(),
        
    }


    return new Response(await renderFile("mainPage.eta", data), responseDetails);
}

const getShoppingLists = async (request) => {
    const data = {
        shopping_lists: await shoppingListService.findAllShoppingLists(),
    }

    return new Response(await renderFile("listsPage.eta", data), responseDetails);
}

const addShoppingList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await shoppingListService.createShoppingList(name)
    return redirectTo("/lists");
}


const postDeactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListService.deactivateList(urlParts[2]);

    return redirectTo("/lists");
}



export {listCounts, getShoppingLists, addShoppingList,  postDeactivateList}