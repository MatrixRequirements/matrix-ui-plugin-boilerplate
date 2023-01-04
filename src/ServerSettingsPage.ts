import { IServerSettings } from "./Interfaces";
import { Plugin } from "./Main";

// eslint-disable-next-line no-unused-vars
/* server Setting page closure*/
export class ServerSettingsPage extends matrixApi.ConfigPage implements matrixApi.IPluginSettingPage<IServerSettings> {
    settingsOriginal?: IServerSettings;
    settingsChanged?: IServerSettings;

    settings(): IServerSettings {
        return {
            ...Plugin.config.customerSettingsPage.defaultSettings,
            ...matrixApi.PluginCore.getServerSetting(Plugin.config.customerSettingsPage.settingName, {}),
            myServerSetting: 'example setting' 
        };
    }

    /** Customize this method to generate static HTML.  */
    getSettingsDOM(settings: IServerSettings): JQuery {
        return $(`
            <div class="panel-body-v-scroll fillHeight">
                <div>
                    This is my customer settings page 

                </div>
                <div id="controls"></div>
            </div>
        `);
    }

    /** Customize this method to add dynamic content*/
    showSimple() {
        this.settingsOriginal = { ...this.settings() };
        this.settingsChanged = { ...this.settingsOriginal };
        let dom = this.getSettingsDOM(this.settingsChanged);
        matrixApi.ml.UI.addTextInput($("#controls", dom), "My server setting", this.settingsChanged, "myServerSetting", this.paramChanged);
        matrixApi.app.itemForm.append(dom);
    }

    renderSettingPage() {

        this.initPage(
            `${Plugin.config.customerSettingsPage.title} - Server settings`,
            true,
            undefined,
            Plugin.config.customerSettingsPage.help,
            Plugin.config.customerSettingsPage.helpUrl,
            undefined
        );
        this.showSimple();
    }

    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), function (newCode: string) {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();
        });
    }
       
        
    saveAsync() {
        let def = this.configApp.setServerSettingAsync(Plugin.config.customerSettingsPage.settingName, JSON.stringify(this.settingsChanged));
        def.done(() => {
            this.settingsOriginal = { ...this.settingsChanged };
            this.renderSettingPage();
        })
        return def;
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
