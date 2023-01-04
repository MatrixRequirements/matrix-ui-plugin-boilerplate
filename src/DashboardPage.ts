import { IProjectSettings } from "./Interfaces";
import { Plugin } from "./Main";

// eslint-disable-next-line no-unused-vars
export class DashboardPage {
    settings: IProjectSettings;

    constructor() {
        this.settings = { ...Plugin.config.projectSettingsPage.defaultSettings, ...matrixApi.globalMatrix.ItemConfig.getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}) };
    }

    /** Customize static HTML here */
    private getDashboardDOM(): JQuery {
        return $(`
    <div class="panel-body-v-scroll fillHeight"> 
        <div class="panel-body">
            This is my content : ${this.settings.myProjectSetting}
        </div>
    </div>
    `);
    }

    /** Add interactive element in this function */
    renderProjectPage() {

        const control = this.getDashboardDOM();
        matrixApi.app.itemForm.append(
            matrixApi.ml.UI.getPageTitle(
                this.settings.myProjectSetting,
                () => {
                    return control;
                },
                () => {
                    this.onResize();
                }
            )
        );
        matrixApi.app.itemForm.append(control);
    }
    onResize() {
        /* Will be triggered when resizing. */
    }
}
