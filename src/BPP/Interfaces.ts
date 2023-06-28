/* Setting interfaces */
/// <reference types="matrix-requirements-api" />

/**
 * This file defines all the data structures which might be shared between UI components and printing
 *
 */

/** Server setting for plugin.
 *
 * This you can use to save setting on an instance level (for all projects)
 * The user can edit these in the admin through the Server Setting Page
 */
export interface IServerSettings extends matrixApi.IServerSettingsBase {
    /** Server Setting example */
    myServerSetting: string;
}

/** Project setting for plugin
 *
 * This you can use to save setting for one specific project.
 * The user can edit these in the admin through the Project Setting Page
 */
export interface IProjectSettings extends matrixApi.IProjectSettingsBase {
    /** example of a project setting */
    myProjectSetting: string;
}

/** Setting for custom fields
 *
 * These allow a user to add parameters to custom field defined by the plugin
 * each time it is added to a category
 */
export interface IPluginFieldParameter extends matrixApi.IPluginFieldParameterBase<IPluginFieldOptions> {
    /** see below */
    options: IPluginFieldOptions;
}

/**  interface for the configuration options of field */
export interface IPluginFieldOptions {
    // to be defined
}

/** interface for the value to be stored by custom field */
export interface IPluginFieldValue {
    // to be defined
}

/** this allows to store parameters for printing
 *
 * This parameters can be overwritten in the layout and are used by the custom section printing
 */
export interface IPluginPrintParams extends matrixApi.IPluginPrintParamsBase {
    class: string // default:"". additional class for outermost container
}

export interface IHeader{
    title: string,
    showFullScreen: boolean,
}

export interface IDashboardContent {
    settings:IProjectSettings
}

export interface IDashboard{
    header:IHeader,
    dashboardContent:IDashboardContent;
}
export type DashboardProps = {
    dashboard: IDashboard,

};
export type DashboardState = {
    /* Nothing for the moment */
};

export interface IControlProp{
    print:boolean;
    valueChanged:(data:string)=>void;
    value:string;
}