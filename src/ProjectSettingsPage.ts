// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    /* project Setting page closure*/
    export function ProjectSettingsPage(settings: IProjectSettings):IPluginSettingPage {
        let self: IPluginSettingPage = { };
        if (window["ConfigPage"] !== undefined) {
            self = { ... Object.getPrototypeOf( new ConfigPage()) }
        }

        self.renderSettingPage = () => {
            self.settings = settings;
            self.initPage(
                settings.title,
                true,
                undefined,
                "My help",
                "https://docs23.matrixreq.com",
                undefined
            );
            self.showSimple();
        };
        self.showAdvanced = () => {
            console.debug("Show advanced clicked");
        };
        self.showSimple = () => {
            app.itemForm.append(self.getSettingsDOM());
        };
        self.getSettingsDOM = (): JQuery => {
            return $(`
                <div class="panel-body-v-scroll fillHeight">
                    This is my content : ${self.settings.projectSettingsTitle}
                </div>
                `);
        };
        return self;
    }
}
