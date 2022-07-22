// eslint-disable-next-line no-unused-vars
import { Plugin } from "../Main";

import { IPluginFieldOptions, IPluginFieldParameter,IPluginFieldValue ,IPluginPrintParams} from "../Interfaces";

/** this is info delivered by the UI when rendering the control */
export interface IControlOptions extends IBaseControlOptions{
    placeholder:string
    controlState?:ControlState, 
    canEdit?: boolean, 
    help?: string,
    fieldType?:string,
    fieldId?:number,
    valueChanged?: () => unknown, 
    parameter?: IFieldParameter, 
    fieldValue?:string, // value as stored in DB
    isItem?:boolean,
    item?:IItem,
    isForm?:boolean,
    isPrint?:boolean,
    isTooltip?:boolean,
    id?:string,
    isHistory?:number, // version shown (if known)
    type?:string,
    isFolder?:boolean,
}

export abstract class ControlCore extends BaseControl implements IPrintFunction {

    protected settings: IControlOptions;
    protected editor:JQuery;
    protected controlConfig: IPluginFieldParameter;
    protected originalValue: IPluginFieldValue;
    
    static defaultOptions:IControlOptions = {
        placeholder: "",
        controlState: ControlState.FormView, // read only rendering
        canEdit: false, // whether data can be edited 
        valueChanged: () => console.debug("Value has changed"), // callback to call if value changes
        parameter: {
            readonly: false, // can be set to overwrite the default readonly status
            allowResize: true, // allow to resize control
            hideFullscreen:false, //  hide fullscreen
        }
    };
    
    constructor( control?:JQuery) {
        super(control?control:$("<div>"));
    } 
    
    
    // function called from the UI to render the control
    init( options:IControlOptions ) {
        
        // get (default) configuration + a field value
        this.settings = <IControlOptions> ml.JSON.mergeOptions(ControlCore.defaultOptions, options);
        
        // if it has been saved before get the value - if not remember null
        this.originalValue = this.settings.fieldValue? JSON.parse(this.settings.fieldValue):null;

        // render the control header and the container for the control
        this._root.append( super.createHelp(this.settings)); // render name of 
        const container = $("<div class='baseControl'>").appendTo( this._root ); // create a container

        // figure out if control should be editable
        if ( this.settings.controlState === ControlState.Print || this.settings.controlState === ControlState.Tooltip|| this.settings.controlState === ControlState.HistoryView 
            || !this.settings.canEdit /* no rights to edit */
            || this.settings.parameter.readonly /* disabled in admin*/ ) {

            // readonly display //

            $( this.renderControl( true, null)).appendTo( container );
        } else {

            this.editor = $( this.renderControl(  false, null)).appendTo( container ); // the actual UI
            
            this.initEditor();
        }
    }
    
    // --------------------------- the following methods must be overwritten
    
    /** method to call to initialize the editor, e.g. to attach handlers to checkboxes etc */
    protected initEditor() { /* to be implemented */ }

    /** this method is called by the UI to retrieve the string to be saved in the database */
    getValue():string { return "not yet implemented"; }

    // --------------------------- the following methods can be overwritten if needed
    
    /** this method renders a user input field in an item.  
    * @readOnly is set to true if the user cannot edit the data (e.g. in history or while printing)
    * @params are can be parameter added by the printing configuration, to configure how something should be printed
    */
    protected renderControl( readOnly:boolean, params?:IPluginPrintParams) {

        // this are the options saved in the field setting, configuring the control
        let config = <IPluginFieldParameter>this.settings.parameter;

        // here, we get the options defining the radio buttons
        let options:IPluginFieldOptions = null;
        if (config && config.options) {
            // something has been saved, we take that
            options=config.options;
        } else if (this.controlConfig) {
            options=this.controlConfig.options;
        }
        
        if (!options) {
            return `field ${this.settings.fieldId} is not (properly) configured: no options are defined.`;
        }

        // get the actual value / default value
        let value = <IPluginFieldValue>this.originalValue;
        
        // check if there is a value / and if not if there is a default value
        if (value) {
            // something has been saved before 
        } else if (config.initialContent) {
            value = config.initialContent?config.initialContent:null;
        }

        if (!value) {
            console.log( `field ${this.settings.fieldId} has no default value.`)
        }

        // do the rendering
        if (readOnly) {
            return this.renderPrint( "" + this.settings.fieldId, value, options,  params);
        } else {
            return this.renderEditor( "" + this.settings.fieldId, value, options);
        }
    }
    
    protected abstract renderPrint( fieldId:string, value:IPluginFieldValue, options:IPluginFieldOptions, params:IPluginPrintParams );
    protected abstract renderEditor(  fieldId:string, value:IPluginFieldValue, options:IPluginFieldOptions );
    
    /** this method is called by the UI to figure out if the control's value changed */
    hasChanged():boolean {
        if (this.editor) {
            // read the value from the UI and parse it
            let current =  JSON.parse(this.getValue());
            // there was no value stored before || it changed
            return  !this.originalValue || !this.isSame( this.originalValue, current);

        } else {
            return false;
        }
    }

    protected abstract isSame( a:IPluginFieldValue, b:IPluginFieldValue);

    refresh() {
        console.log("Refresh has been called");
    }
    setValue(newValue:string, reset?:boolean) {
        console.log("this could be called from the outside to force a change of value");
    }

    destroy () {
        if ( this.editor ) {
            this.editor = null;
        }
    }
    
    resizeItem() {
        console.log("resizeItem has been called");
    }



    /** CUSTOM SECTION  */

    getGroup() { return PrintProcessor.FIELD_FUNCTION_TYPE }

    getHelp() { return `<h2>${Plugin.config.field.title}</h2>
<p>Options</p>
<pre>
    
</pre>`;}
    getName() { return `${Plugin.config.field.title} field renderer`; }
        

    render(overwrites:IGlobalPrintFunctionParams,  paramsCaller:IPluginPrintParams, itemOrFolderRef:string, itemOrFolder:JQuery, mf:JQuery, globals:IPrintGlobals, possibleTargets:string[],  onError:(message:string)=> void) {

        let uid = PrintProcessor.getFieldFunctionId(Plugin.config.field.fieldType);
        const defaults:IPluginPrintParams = {
            class: ""
        }

        const params = ml.JSON.clone({...defaults, ...overwrites.customer[uid], ...paramsCaller, ...overwrites.project[uid], ...overwrites.section[uid]});
        
        if (!paramsCaller.fieldInfo || !paramsCaller.fieldInfo.field) {
            onError( "called a field rendering function without passing a field");
            return "";
        }

        // we are printing, save the configuration and field value, to be able to call the normal UI rendering
        this.settings = <IControlOptions>{
            fieldId: Number(paramsCaller.fieldInfo.fieldId),
            parameter: paramsCaller.fieldInfo.jsonConfig
        }
        this.originalValue = paramsCaller.fieldInfo.jsonValue;
        
        return this.renderControl( true, params );
    }
}
