/// <reference types="matrixrequirements-type-declarations" />
/// <reference types="matrix-requirements-api" />

import { Control } from "./Control";
import { DashboardPage } from "./DashboardPage";
import { ProjectSettingsPage } from "./ProjectSettingsPage";
import { ServerSettingsPage } from "./ServerSettingsPage";
import { Tool } from "./Tools";

/** This class is allows you to configure the features of your plugin.
 * 
 *  You can also implement functions to into the plugin (at start in the constructor, when loading a project, when loading an item)
 * 
     */
export class Plugin implements matrixApi.IExternalPlugin {

    core: matrixApi.PluginCore;

    /**This part enables which 
     * 
     * See IPluginConfig interface for explanation of parameters
    */
    
    static config: matrixApi.IPluginConfig = {
        /*  Page in admin client to configure settings across all projects - set enabled to false if not needed. 
            The page itself is implemented in the _ServerSettingsPage.ts 
        */
        customerSettingsPage: {
            id: "BPPCustomerSettings",
            title: "BPP customer settings page",
            type: "BPPcs",
            enabled: true,
            defaultSettings: {
                myServerSetting: "default value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings",
            help: "This is my help text",
            helpUrl:"https://docs23.matrixreq.com"
        },
        /*  Page in admin client to configure settings for one specific project - set enabled to false if not needed.
            The page itself is implemented in the _ProjectSetingsPage.ts 
        */
        projectSettingsPage: {
            id: "BPPprojectsettings",
            title: "BPP projectsettings page",
            type:"BPPps",
            enabled: true,
            defaultSettings: {
                myProjectSetting:  "default value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings",
            help: "This is my help text",
            helpUrl:"https://docs23.matrixreq.com"
        },
        /*  Add an entry in the tool menu of an item or folder - set enabled to false if not needed.
            The tool itself is implemented in the _Tool.ts 
        */
        menuToolItem: {
            enabled: true,
            title:"matrix-ui-plugin-boilerplate-menuitem",
        },
        /*  Add a custom field to enter some data in the UI - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts 
        */
        field: {
            enabled: true,
            fieldType: "matrix-ui-plugin-boilerplate",
            title: "matrix-ui-plugin-boilerplate-field",
            fieldConfigOptions: {
                id: "matrix-ui-plugin-boilerplate",
                capabilities: {
                    canBePublished: false,
                    canBeReadonly: true,
                    canBeXtcPreset: false,
                    canHideInDoc: false,
                    canBeUsedInDocs: false,
                    canRequireContent: true,
                },
                class: "",
                help: "",
                label: "matrix-ui-plugin-boilerplate-field",
            }
        },
        /*  Add a dashboard inside a project - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts 
        */
        dashboard: {        
            
            id:"BPP",
            title: "BPP dashboard page",
            enabled: true,
            icon: "fal fa-cog",
            parent: "DASHBOARDS",
            usefilter: true,
            order: 9999,
        }
    };

    /**
     * The constructor is loaded once after all the source code is loaded by the browser. 
     * Nothing is known about the instance, project, user etc.
     * You can use it to initialize things like callbacks after item changes
     */
    constructor() {
        // here is a good place to register callbacks for UI events (like displaying or saving items)
        this.core = new matrixApi.PluginCore(this);
    }

    PLUGIN_VERSION: any;
    PLUGIN_NAME: any;
    getDashboard(): matrixApi.IDashboardPage {
        return new DashboardPage();
    }
    getProjectSettingsPage(): matrixApi.IPluginSettingPage<matrixApi.IProjectSettingsBase> {

        if (matrixApi.app.isConfigApp()) {
            return new ProjectSettingsPage(<matrixApi.IConfigApp><unknown>matrixApi.app);
        }
        return null;
    }
    getServerSettingsPage(): matrixApi.IPluginSettingPage<matrixApi.IServerSettingsBase> {
        if (matrixApi.app.isConfigApp()) {
            return new ServerSettingsPage(<matrixApi.IConfigApp><unknown>matrixApi.app);
        }
        return null;
    }
    getControl(ctrlObj: JQuery): matrixApi.ControlCoreBase {
        return new Control(Plugin.config, ctrlObj);
    }
    getTool(): matrixApi.ITool {
        return new Tool();
    }
    getConfig(): matrixApi.IPluginConfig {
        return Plugin.config;
    }
    enableToolMenu(ul: JQuery, _hook: number): boolean {
        return this.core.enabledInContext;
    }

    /**
     * This method is called each time  a project has been loaded and initialized. 
     * At the time it is called, all project settings, categories etc are defined.
     * 
     * @param project // id of the loaded project
     */
    onInitProject(project:string) {

        // here is a good place to decide based on the project (maybe some project setting), whether the plugin should be enabled 
        
        // if not:
        // this.enabledInContext = false;
    }

    /** this method is called just before the rendering of an item is done
    * It is also called when opening the create item dialog.
    * 
    * @param _item: the item which is being loaded in the UI 
    */
    onInitItem(item: matrixApi.IItem) {
        
        // here is a good place to decide based on the selection in the tree, whether the plugin should be enabled 
        
        // if not:
        // this.enabledInContext = false;
    }
}

declare global {
    
    // eslint-disable-next-line no-unused-vars
    interface Window {
        plugins: unknown;
    }
}

$(() => {
    // Register the plugin
    $(function () {
        if (matrixApi.plugins["register"] != undefined) {
            matrixApi.plugins.register(new Plugin().core);
        }
    });
});
