/// <reference path="api/Matrix.Labels.ts" />

// Version : <PLUGIN_VERSION_PLACEHOLDER>
// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins

// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    
    export class Plugin implements IPlugin {
        public isDefault = true;
        currentFolder: IItem;
        popupModeOrControl: boolean;
        public static fieldType = "plugin_boiler_plate";
        public static projectSettingName = "plugin_boiler_plate";
        public static serverSettingName = "plugin_boiler_plate";

        static PLUGIN_NAME = "<PLUGIN_NAME_PLACEHOLDER>";
        static PLUGIN_VERSION = "<PLUGIN_VERSION_PLACEHOLDER>";
    
    
        static settingName = "plugin_boiler_plater_settings";

        static defaultProjectSettings: IProjectSettings = {
            content: "boiler plate",
        }; 


        static defaultServerSettings: IServerSettings = {
            content: "boiler plate",
        };

        constructor() {
            console.debug(`Contructing ${Plugin.PLUGIN_NAME}`);
            
        }

        initItem(_item: IItem, _jui: JQuery) {
            if (_item.id.indexOf("F-") == 0) {
                this.currentFolder = _item;
                this.popupModeOrControl = true;
            } else {
                this.currentFolder = undefined;
                this.popupModeOrControl = false;
            }
        }
        static canBeDisplay(_cat: string): boolean {
            return true;
        }

        updateMenu(ul: JQuery, _hook: number) {
            const li = $(`<li>PluginBoilerPlate </li>`).on("click",() => {
                alert("Plugin boiler plate");
            });

            ul.append(li);
        }
        supportsControl(fieldType: string): boolean {
            return fieldType == Plugin.fieldType;
        }
        createControl(ctrlObj: JQuery, settings: IBaseControlOptions) {
            if (settings && settings.fieldType == Plugin.fieldType) {
                const baseControl = new Control(ctrlObj);
                ctrlObj.getController = () => { return baseControl; }
                baseControl.init(settings);
            }
        }
        isEnabled() {
            return true;
        }
        getPluginName() {
            return Plugin.PLUGIN_NAME;
        }

        getPluginVersion() {
            return Plugin.PLUGIN_VERSION;
        }
        getProjectSettingPages(): ISettingPage[] {
            const pbpi = ProjectSettingsPage();
            return [
                {
                    id: "BPP_customerSettings",
                    title: "Boiler plate plugin project settings page",
                    render: (_ui: JQuery) => {
                        pbpi.renderSettingPage();
                    },
                    saveAsync: () => {
                        return pbpi.saveAsync()
                    }
                },
            ];
        }
        getCustomerSettingPages(): ISettingPage[] {
            const pbpi = ServerSettingsPage();

            return [
                {
                    id: "BPP_ProjectSettings",
                    title: "Boiler plate plugin customer settings page",
                    render: (_ui: JQuery) => {
                        pbpi.renderSettingPage();
                    },
                    saveAsync: () => {
                        return pbpi.saveAsync()
                    }
                },
            ];
        }

        getProjectPages(): IProjectPageParam[] {
            const pages: IProjectPageParam[] = [];
            pages.push({
                id: "BOILERPLATE",
                title: "Boiler plater plugins",
                folder: "DASHBOARDS",
                order: 7000,
                icon: "fa fa-cog",
                usesFilters: true,
                render: (_options: IPluginPanelOptions) => {
                    const gd = new DashboardPage();
                    gd.renderProjectPage();
                },
            });
            return pages;
        }
    }
}

// Register the plugin
$(function () {
    plugins.register(new BoilerPlate.Plugin());
});

