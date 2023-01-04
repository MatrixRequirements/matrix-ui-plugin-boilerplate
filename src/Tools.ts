// eslint-disable-next-line no-unused-vars
import { Plugin } from "./Main";

export class Tool{
    
    /** callback to show or hide the menu for a selected item or folder
    * 
    * */ 
    showMenu(itemId:string) {
        return true;
    }

    /** callback when user executes the custom the menu entry added to items or folders 
     * 
     * */ 
    menuClicked(itemId:string) {
        /* Insert code here */
        alert(Plugin.config.menuToolItem.title)
    }
}
