import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as shoppingListItemController from "./controllers/shoppingListItemController.js"


configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/") {
        return await shoppingListController.listCounts(request);
    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await shoppingListController.addShoppingList(request);       
    } else if (url.pathname === "/lists" && request.method === "GET") {
        return await shoppingListController.getShoppingLists(request);
    } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
        return await shoppingListController.postDeactivateList(request);
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
        return await shoppingListItemController.showShoppingList(request);
    } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
        return await shoppingListItemController.collectItem(request);
    } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
        return await shoppingListItemController.createItem(request);
    }
    
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });