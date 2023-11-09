import { Plugin } from "../Plugin";
import { IPluginFieldValue, IProjectSettings, IServerSettings } from "../Interfaces";
import { IPluginConfig, IPluginFieldHandler } from "matrix-requirements-sdk/client";

export class FieldHandler implements IPluginFieldHandler<IPluginFieldValue> {
    private data: IPluginFieldValue;

    constructor(
        private fieldType: string,
        private config: IPluginConfig<IServerSettings, IProjectSettings>,
    ) {}

    getData() {
        return JSON.stringify(this.data);
    }
    async getValueAsync() {
        return this.data;
    }

    getFieldType(): string {
        return Plugin.config.field.fieldType;
    }

    initData(serializedFieldData: string): any {
        try {
            this.data = JSON.parse(serializedFieldData);
        } catch (e) {
            console.warn(`Failed to parse data for field  ${this.getFieldType()} with data ${serializedFieldData}`);
        }
        if (!this.data) {
            this.data = { value: "", html: "" };
        }
    }

    setValue(data: IPluginFieldValue) {
        this.data = data;
    }
}
