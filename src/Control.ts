/// <reference types="matrixrequirements-type-declarations" />
/// <reference types="matrix-requirements-api" />
import { IPluginFieldOptions, IPluginFieldParameter, IPluginFieldValue, IPluginPrintParams } from "./Interfaces";
/**
 * This implements a field which can be added to a category to be displayed when editing an item.
 * 
 * These fields can be printed in using the custom print sections.
 * 
 */
export class Control extends matrixApi.ControlCore<IPluginFieldOptions> {


    /** default configuration of control */
    protected controlConfig : IPluginFieldParameter = {
        options: {}
    };

    /** interactive radio control */
    protected renderEditor(  fieldId:string, value:IPluginFieldValue, options:IPluginFieldOptions ) {

        let editor = "<div>";
        editor += "TODO code to render value with UI controls to edit";
        editor += "</div>";
        
        return editor;
    }
    
    /**  readonly printing for custom section, tooltip, zen or user without right to edit */
    protected renderPrint( fieldId:string, value:IPluginFieldValue, options:IPluginFieldOptions, params:IPluginPrintParams) {
        
        let rendered = `<span class='${(params && params.class)?params.class:""} ${fieldId?fieldId:""}'>`;
        
        rendered += "TODO code to render value readonly";

        rendered += "</span>";
        return rendered;   
    }
    
    /** method to call to initialize the editor, e.g. to attach handlers to checkboxes etc */
    initEditor(  ) {
        let that = this;

        // react on changes to the value. the ui will pass a call function which will enable/disable the save 

        // example implementation
        $('input', this.editor).on( "change", () => {
            that.settings.valueChanged.apply(null);
        });
    }
            
    /** this method compares the to value of the control to another previous value */
    protected isSame( a:IPluginFieldValue, b:IPluginFieldValue) {

        // TODO compare the values as stored in the DB with the one from UI
        return true;
    }

    /** this method is called by the UI to retrieve the string to be saved in the database */
    getValue():string {
        if (this.editor) {
            // convert the displayed value to a JSON string
            
            let current :IPluginFieldValue = {};

            // TODO read the value from the UI
            
            // return the value (as string to be saved to db)
            return JSON.stringify(current);
        } else {
            // nothing changed so we return exactly the same thing saved in the database
            return this.settings.fieldValue;
        }
    }


}