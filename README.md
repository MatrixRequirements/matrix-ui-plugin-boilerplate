

![Plugin Build](https://github.com/MatrixRequirements/matrix-ui-plugin-boilerplate/actions/workflows/main.yml/badge.svg)

# Matrix Requirements Plugin Development Guide


Welcome to the Matrix Requirements plugin development guide! Here, we'll outline how to develop, build, and deploy plugins for the Matrix Requirements application using our TypeScript project template and our api.

## Table of Contents

1. [Introduction](#introduction)
2. [Building the Plugin](#building-the-plugin)
3. [Testing the Plugin](#testing-the-plugin)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
6. [Plugin Features](#plugin-features)
   * [Configuration](#configuration)
   * [Server Settings Page](#server-settings-page)
   * [Project Settings Page](#project-settings-page)
   * [Custom Field Control with FieldHandler](#custom-field-control-with-fieldhandler)
   * [Adding Menu Items](#adding-menu-items)
   * [Dashboard](#dashboard)
7. [Conclusion](#conclusion)

## Introduction

Matrix Requirements offers the ability to integrate custom plugins to expand its functionality and give users a custom experience. This guide will walk you through the development process using our TypeScript project template hosted on GitHub.

## Technology Stack

- **Language:** TypeScript
- **Framework/Libraries:** React, C3.js, matrix-requirements-api
- **Build Tool:** Webpack

## Getting Started

1. Navigate to the TypeScript project template repository on GitHub:
   [Matrix UI Plugin Boilerplate](https://github.com/MatrixRequirements/matrix-ui-plugin-boilerplate-24)

2. Click on the "Use this template" button to clone the repository into your personal account or organization.

3. Once cloned, clone your new repository to your local machine:

```bash
git clone [Your GitHub Repository URL]
cd [Your repository name]
```

4. Install the dependencies:

```bash
npm install
```


## Building the plugin

To build the plugin, run the following command:

```bash
npm run build
```
This will produce a js file in the dist folder.


## Testing the Plugin

(Not working yet)
This project contains a test proxy that can load your plugin in a running instance. To do
this it will modify the main page of the Matrix instance to include your script file
and then server the script file from your local disk. Everything else will be fetched from
your remote Matrix instance.

Setup:

* Copy Proxy.env.template to Proxy.env and set your instance name
* cd into dev-proxy and `npm install` to get all dependencies
* Make sure the plugin has been built
* Close Chrome (if running)
* In this directory, run `npm run proxy` to launch the proxy.

This should open a new Chrome and if you inspect the main page you should see
`<script src="/mypluginscript.js"></script>` at the end of the page. This URL
will load the local `dist/Main.js` script and will always be up to date with your
local build.

## Test the local build
This project contains a test proxy that can load your plugin in a running instance. To do
this it will modify the main page of the Matrix instance to include your script file
and then server the script file from your local disk. Everything else will be fetched from
your remote Matrix instance.

Setup:

* Copy Proxy.env.template to Proxy.env and set your instance name
* cd into dev-proxy and `npm install` to get all dependencies
* Make sure the plugin has been built
* Close Chrome (if running)
* In this directory, run `npm run proxy` to launch the proxy. 

This should open a new Chrome and if you inspect the main page you should see
`<script src="/mypluginscript.js"></script>` at the end of the page. This URL
will load the local `dist/Main.js` script and will always be up to date with your
local build.


## Plugin Features

### Configuration

The plugin is configured using the `Plugin` class. The `Plugin` class has an object that defines the plugin's name, description, and the features enabled. This boilerplate code can be used to enable the plugin's features based on context: e.g enabled only if the project has a specific category or settings.ƒ
The config object will be break down and explaind in the following section:

```typescript
const config = {
       customerSettingsPage: {
            /* Page in admin client to configure settings for all projects - set enabled to false if not needed.
            The page itself is implemented in the ServerSetingsPage/ServerSetingsPage.tsx
             */
        },
        projectSettingsPage: {
           /*  Page in admin client to configure settings for one specific project - set enabled to false if not needed.
            The page itself is implemented in the _ProjectSetingsPage/_ProjectSetingsPage.tsx
        */
        },
        menuToolItem: {
           /*  Add an entry in the tool menu of an item or folder - set enabled to false if not needed.
             The tool itself is implemented in the Tools/Tools.ts
         */
        },
        field: {
           /*  Add a custom field to enter some data in the UI - set enabled to false if not needed.
         The field itself is implemented in the Control/Control.tsx
     */
        },
        dashboard: {
           /*  Add a dashboard inside a project - set enabled to false if not needed.
           The field itself is implemented in the Dashboard/DashboardPage.tsx
       */
        }
    };
```


### Server Settings Page

```typescript
   customerSettingsPage: {
            id: "BPPCustomerSettings", // This is the id of the page in the admin client. It should be unique
            title: "BPP customer settings page", // This is the title of the page in the admin client
            type: "BPPcs", // This is the type of the page in the admin client (Used in URL)
            enabled: true, // Set this to false if you don't want to display this page
            defaultSettings: { // This is the default settings for the page.
                myServerSetting: "default value for setting defined in Interfaces.ts",
                mySecondValue: "second value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings", // This is the name of the setting when storing the settings using the REST api
            help: "This is my help text", // This is the help text displayed in the top right in the admin client
            helpUrl: "https://docs23.matrixreq.com",
        },

```
The server settings page is a page in the admin client that allows users to configure settings for all projects. The page is implemented using the `ServerSettingsPage` class. The `ServerSettingsPage` class takes in a `IServerSettingsPageParameters` object that holds parameters saved in the server settings. The `IServerSettings` object extends `IServerSettingsBase` and can be customized to hold any parameters needed for the page functionality. (See interfaces.ts for more details)
The boilerplate code contains "advanced button" implementation to edit the settings in the JSON format. It renders the component ```ProjectSettingsPageComponent``` that is defined in the ```ServerSettingsPageComponent.tsx``` file. This component is a React component that can be customized to display the settings in any way needed. 

### Project Settings Page

 ``` typescript
ProjectSettingsPage: {
id: "BPPProjectSettings", // This is the id of the page in the admin client per project. It should be unique
title: "BPP projectsettings settings page", // This is the title of the page in the admin client
type: "BPPps", // This is the type of the page in the admin client (Used in URL)
enabled: true, // Set this to false if you don't want to display this page
defaultSettings: { // This is the default settings for the page.
myProjectSetting: "default value for setting defined in Interfaces.ts",
},
settingName: "BPP_settings", // This is the name of the setting when storing the settings using the REST api
help: "This is my help text", // This is the help text displayed in the top right in the admin client
helpUrl: "https://docs23.matrixreq.com",
},

This is very similar to the ServerSetting page. The main difference is that the page is displayed per project and that the settings are stored per project. The page is implemented using the ProjectSettingsPage class. The ProjectSettingsPage class takes in a IProjectSettingsPageParameters object that holds parameters saved in the project settings. The IProjectSettings object extends IProjectSettingsBase and can be customized to hold any parameters needed for the page functionality. (See interfaces.ts for more details)

```   
   
### Adding Menu Items


 ```typescript
         menuToolItem: {
         enabled: true,
         title: "matrix-ui-plugin-boilerplate-menuitem",
         },
```
The menuToolItem is a menu item that can be added to the tool menu of an item or folder. The menu item is implemented using the `Tools` class.  
This class have 2 methods : ``` showMenu(itemId: string) ``` to decide whether showing the menu or not based on the itemId and ``` menuClicked(itemId: string)``` to handle the click event of the menu item. This can be used to open a popup or to modify the current item.

### Custom Field Control with FieldHandler
```typescript
        field: {
            enabled: true, // Set this to false if you don't want to display this field
            fieldType: "matrix-ui-plugin-boilerplate", // This is the type of the field  when adding a field to a category
            title: "matrix-ui-plugin-boilerplate-field", //this is the title of the field type.
            fieldConfigOptions: { // Capability of the field
                id: "matrix-ui-plugin-boilerplate",
                capabilities: {
                    canBePublished: false, // can be included in liveQMS publication
                    canBeReadonly: true, // can be set to readonly
                    canBeXtcPreset: false, // can be included in XTC
                    canHideInDoc: false, // can be hidden in document
                    canBeUsedInDocs: false, // can be used in document
                    canRequireContent: true, // can be required
                },
                class: "", // Field class (used to allow adding the field to a specific category or rule (see below))
                help: "",
                label: "matrix-ui-plugin-boilerplate-field",
            },
        },
  ```

#### Field class
This settings specify  in which categories it can be used. The field class can be one of the following values:

- docs : Documents only (DOC) - can be added to DOC items
- sign : Signable documents (SIGN) - can be added to SIGN items
- docsign : Documents only (DOC or SIGN) - can be added to SIGN or DOC items
- report : Reports (REPORT) - internal
- tests : Tests (TC,XTC) - required in tests and test results, to define sequences of test steps
- xtcs : Tests (TC,XTC) - can be added in XTCs to auto-summarize info from test tables
- sync : Sync Sources - must be added if a category is used by the agile sync module
- toolbar : Fields in toolbars
- super : Fields which should normally exists, once, coming from base project
- beta : Beta / experimental fields with unreleased functions

#### Field UI

The field UI is implemented using the `Control` class. The `Control` class takes in a `FieldHandler` object. See below. The ```Control``` class contains the boilerplate to render the React component ```ControlComponent```. 
The ```ControlComponent``` is a React component that can be customized to display the field in any way needed.
It uses those 3  interfaces  :
- IPluginFieldHandler<IPluginFieldValue> : The FieldHandler 
- IPluginFieldOptions : The parameters of the field (that can be configured in the admin client)
- IFieldValue : The value of the field 

#### FieldHandler

The field should offer a FieldHandler which knows how to validate the data of the field. For example, a “test steps” field is a table with two columns (“action” and “expected”). There is a dedicated FieldHandler class for manipulating this kind of field. It offers “table-like” functions to edit individual row and column data. It prevents the SDK user from adding data for non-existent columns, or from adding data that is not consistent with the configuration of an individual column, since a column might be expected to contain only a date, or a user, or a “pass”/”fail” string. The FieldHandler class is also responsible for converting the data to and from the JSON format used by the SDK. 
The value of the field is stored in the JSON format. The JSON format is defined in the ```Interface.ts``` file by the interface IPluginFieldValue that extends IPluginFieldValueBase. Basically, it contains 2 properties : value (can be anything) and html that is used for rendering the field in the document. The html property is not optional but can be empty if the field is not displayed in the document. 


### Dashboards
``` typescript
     dashboard: {
            id: "BPP", // This is the id of the dashboard in the client. It should be unique per dashboard
            title: "BPP dashboard page", // This is the title of the dashboard in the client
            enabled: true, // Set this to false if you don't want to display this dashboard
            icon: "fal fa-cog", // This is the icon of the dashboard in the client
            parent: "DASHBOARDS", // This is the parent of the dashboard in the client (Used to group dashboards)
            usefilter: true, // This is used to use the filters in the dashboard (see https://docs23.matrixreq.com/usv23/filters)
            order: 9999,
        },
  ```


The Matrix Requirements application allows users to create custom dashboards to display information from their projects. The dashboard is a React component that can be created and added to the application using the `DashboardPage` class.
The `DashboardPage` class is a wrapper for the React component that allows the application to render the component as a dashboard. The `DashboardPage` class takes in a `IDashboardParameters` object that hold parmeters saved in the project settings. The IDashboardParameters object extends IDashboardParametersBase and can be customized to hold any parameters needed for the dashboard.

## Conclusion
ith the steps in this guide, you're set to create, test, and deploy plugins to enhance the Matrix Requirements platform. Ensure to abide by the ESLint standards provided to maintain code quality. If you run into difficulties, consult the detailed documentation or engage with the Matrix Requirements community or support channels.

=======

Welcome to the Matrix Requirements plugin development guide! Here, we'll outline how to develop, build, and deploy plugins for the Matrix Requirements application using our TypeScript project template and our api.

## Table of Contents

1. [Introduction](#introduction)
2. [Building the Plugin](#building-the-plugin)
3. [Testing the Plugin](#testing-the-plugin)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
6. [Plugin Features](#plugin-features)
   * [Configuration](#configuration)
   * [Server Settings Page](#server-settings-page)
   * [Project Settings Page](#project-settings-page)
   * [Custom Field Control with FieldHandler](#custom-field-control-with-fieldhandler)
   * [Adding Menu Items](#adding-menu-items)
   * [Dashboard](#dashboard)
7. [Conclusion](#conclusion)

## Introduction

Matrix Requirements offers the ability to integrate custom plugins to expand its functionality and give users a custom experience. This guide will walk you through the development process using our TypeScript project template hosted on GitHub.

## Technology Stack

- **Language:** TypeScript
- **Framework/Libraries:** React, C3.js, matrix-requirements-api
- **Build Tool:** Webpack

## Getting Started

1. Navigate to the TypeScript project template repository on GitHub:
   [Matrix UI Plugin Boilerplate](https://github.com/MatrixRequirements/matrix-ui-plugin-boilerplate-24)

2. Click on the "Use this template" button to clone the repository into your personal account or organization.

3. Once cloned, clone your new repository to your local machine:

```bash
git clone [Your GitHub Repository URL]
cd [Your repository name]
```

4. Install the dependencies:

```bash
npm install
```


## Building the plugin

To build the plugin, run the following command:

```bash
npm run build
```
This will produce a js file in the dist folder.


## Testing the Plugin

(Not working yet)
This project contains a test proxy that can load your plugin in a running instance. To do
this it will modify the main page of the Matrix instance to include your script file
and then server the script file from your local disk. Everything else will be fetched from
your remote Matrix instance.

Setup:

* Copy Proxy.env.template to Proxy.env and set your instance name
* cd into dev-proxy and `npm install` to get all dependencies
* Make sure the plugin has been built
* Close Chrome (if running)
* In this directory, run `npm run proxy` to launch the proxy.

This should open a new Chrome and if you inspect the main page you should see
`<script src="/mypluginscript.js"></script>` at the end of the page. This URL
will load the local `dist/Main.js` script and will always be up to date with your
local build.




## Plugin Features

### Configuration

The plugin is configured using the `Plugin` class. The `Plugin` class has an object that defines the plugin's name, description, and the features enabled. This boilerplate code can be used to enable the plugin's features based on context: e.g enabled only if the project has a specific category or settings.ƒ
The config object will be break down and explaind in the following section:

```typescript
const config = {
       customerSettingsPage: {
            /* Page in admin client to configure settings for all projects - set enabled to false if not needed.
            The page itself is implemented in the ServerSetingsPage/ServerSetingsPage.tsx
             */
        },
        projectSettingsPage: {
           /*  Page in admin client to configure settings for one specific project - set enabled to false if not needed.
            The page itself is implemented in the _ProjectSetingsPage/_ProjectSetingsPage.tsx
        */
        },
        menuToolItem: {
           /*  Add an entry in the tool menu of an item or folder - set enabled to false if not needed.
             The tool itself is implemented in the Tools/Tools.ts
         */
        },
        field: {
           /*  Add a custom field to enter some data in the UI - set enabled to false if not needed.
         The field itself is implemented in the Control/Control.tsx
     */
        },
        dashboard: {
           /*  Add a dashboard inside a project - set enabled to false if not needed.
           The field itself is implemented in the Dashboard/DashboardPage.tsx
       */
        }
    };
```


### Server Settings Page

```typescript
   customerSettingsPage: {
            id: "BPPCustomerSettings", // This is the id of the page in the admin client. It should be unique
            title: "BPP customer settings page", // This is the title of the page in the admin client
            type: "BPPcs", // This is the type of the page in the admin client (Used in URL)
            enabled: true, // Set this to false if you don't want to display this page
            defaultSettings: { // This is the default settings for the page.
                myServerSetting: "default value for setting defined in Interfaces.ts",
                mySecondValue: "second value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings", // This is the name of the setting when storing the settings using the REST api
            help: "This is my help text", // This is the help text displayed in the top right in the admin client
            helpUrl: "https://docs23.matrixreq.com",
        },

```
The server settings page is a page in the admin client that allows users to configure settings for all projects. The page is implemented using the `ServerSettingsPage` class. The `ServerSettingsPage` class takes in a `IServerSettingsPageParameters` object that holds parameters saved in the server settings. The `IServerSettings` object extends `IServerSettingsBase` and can be customized to hold any parameters needed for the page functionality. (See interfaces.ts for more details)
The boilerplate code contains "advanced button" implementation to edit the settings in the JSON format. It renders the component ```ProjectSettingsPageComponent``` that is defined in the ```ServerSettingsPageComponent.tsx``` file. This component is a React component that can be customized to display the settings in any way needed. 

### Project Settings Page

 ``` typescript
ProjectSettingsPage: {
id: "BPPProjectSettings", // This is the id of the page in the admin client per project. It should be unique
title: "BPP projectsettings settings page", // This is the title of the page in the admin client
type: "BPPps", // This is the type of the page in the admin client (Used in URL)
enabled: true, // Set this to false if you don't want to display this page
defaultSettings: { // This is the default settings for the page.
myProjectSetting: "default value for setting defined in Interfaces.ts",
},
settingName: "BPP_settings", // This is the name of the setting when storing the settings using the REST api
help: "This is my help text", // This is the help text displayed in the top right in the admin client
helpUrl: "https://docs23.matrixreq.com",
},

This is very similar to the ServerSetting page. The main difference is that the page is displayed per project and that the settings are stored per project. The page is implemented using the ProjectSettingsPage class. The ProjectSettingsPage class takes in a IProjectSettingsPageParameters object that holds parameters saved in the project settings. The IProjectSettings object extends IProjectSettingsBase and can be customized to hold any parameters needed for the page functionality. (See interfaces.ts for more details)

```   
   
### Adding Menu Items


 ```typescript
         menuToolItem: {
         enabled: true,
         title: "matrix-ui-plugin-boilerplate-menuitem",
         },
```
The menuToolItem is a menu item that can be added to the tool menu of an item or folder. The menu item is implemented using the `Tools` class.  
This class have 2 methods : ``` showMenu(itemId: string) ``` to decide whether showing the menu or not based on the itemId and ``` menuClicked(itemId: string)``` to handle the click event of the menu item. This can be used to open a popup or to modify the current item.

### Custom Field Control with FieldHandler
```typescript
        field: {
            enabled: true, // Set this to false if you don't want to display this field
            fieldType: "matrix-ui-plugin-boilerplate", // This is the type of the field  when adding a field to a category
            title: "matrix-ui-plugin-boilerplate-field", //this is the title of the field type.
            fieldConfigOptions: { // Capability of the field
                id: "matrix-ui-plugin-boilerplate",
                capabilities: {
                    canBePublished: false, // can be included in liveQMS publication
                    canBeReadonly: true, // can be set to readonly
                    canBeXtcPreset: false, // can be included in XTC
                    canHideInDoc: false, // can be hidden in document
                    canBeUsedInDocs: false, // can be used in document
                    canRequireContent: true, // can be required
                },
                class: "", // Field class (used to allow adding the field to a specific category or rule (see below))
                help: "",
                label: "matrix-ui-plugin-boilerplate-field",
            },
        },
  ```

#### Field class
This settings specify  in which categories it can be used. The field class can be one of the following values:

- docs : Documents only (DOC) - can be added to DOC items
- sign : Signable documents (SIGN) - can be added to SIGN items
- docsign : Documents only (DOC or SIGN) - can be added to SIGN or DOC items
- report : Reports (REPORT) - internal
- tests : Tests (TC,XTC) - required in tests and test results, to define sequences of test steps
- xtcs : Tests (TC,XTC) - can be added in XTCs to auto-summarize info from test tables
- sync : Sync Sources - must be added if a category is used by the agile sync module
- toolbar : Fields in toolbars
- super : Fields which should normally exists, once, coming from base project
- beta : Beta / experimental fields with unreleased functions

#### Field UI

The field UI is implemented using the `Control` class. The `Control` class takes in a `FieldHandler` object. See below. The ```Control``` class contains the boilerplate to render the React component ```ControlComponent```. 
The ```ControlComponent``` is a React component that can be customized to display the field in any way needed.
It uses those 3  interfaces  :
- IPluginFieldHandler<IPluginFieldValue> : The FieldHandler 
- IPluginFieldOptions : The parameters of the field (that can be configured in the admin client)
- IFieldValue : The value of the field 

#### FieldHandler

The field should offer a FieldHandler which knows how to validate the data of the field. For example, a “test steps” field is a table with two columns (“action” and “expected”). There is a dedicated FieldHandler class for manipulating this kind of field. It offers “table-like” functions to edit individual row and column data. It prevents the SDK user from adding data for non-existent columns, or from adding data that is not consistent with the configuration of an individual column, since a column might be expected to contain only a date, or a user, or a “pass”/”fail” string. The FieldHandler class is also responsible for converting the data to and from the JSON format used by the SDK. 
The value of the field is stored in the JSON format. The JSON format is defined in the ```Interface.ts``` file by the interface IPluginFieldValue that extends IPluginFieldValueBase. Basically, it contains 2 properties : value (can be anything) and html that is used for rendering the field in the document. The html property is not optional but can be empty if the field is not displayed in the document. 


### Dashboards
``` typescript
     dashboard: {
            id: "BPP", // This is the id of the dashboard in the client. It should be unique per dashboard
            title: "BPP dashboard page", // This is the title of the dashboard in the client
            enabled: true, // Set this to false if you don't want to display this dashboard
            icon: "fal fa-cog", // This is the icon of the dashboard in the client
            parent: "DASHBOARDS", // This is the parent of the dashboard in the client (Used to group dashboards)
            usefilter: true, // This is used to use the filters in the dashboard (see https://docs23.matrixreq.com/usv23/filters)
            order: 9999,
        },
  ```


The Matrix Requirements application allows users to create custom dashboards to display information from their projects. The dashboard is a React component that can be created and added to the application using the `DashboardPage` class.
The `DashboardPage` class is a wrapper for the React component that allows the application to render the component as a dashboard. The `DashboardPage` class takes in a `IDashboardParameters` object that hold parmeters saved in the project settings. The IDashboardParameters object extends IDashboardParametersBase and can be customized to hold any parameters needed for the dashboard.

## Conclusion
ith the steps in this guide, you're set to create, test, and deploy plugins to enhance the Matrix Requirements platform. Ensure to abide by the ESLint standards provided to maintain code quality. If you run into difficulties, consult the detailed documentation or engage with the Matrix Requirements community or support channels.


For further queries or clarifications about this guide, please create an issue on the [GitHub repository](https://github.com/MatrixRequirements/matrix-ui-plugin-boilerplate-24) or contact us at support@matrixreq.com.