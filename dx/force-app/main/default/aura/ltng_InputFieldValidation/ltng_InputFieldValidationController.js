({
    /**
     * The basic init function to set up the form.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    init : function(component, event, helper) {
        //console.info('init');
        //Populate the comboBox values
        var options = [
            { value: "new", label: "New" },
            { value: "in-progress", label: "In Progress" },
            { value: "finished", label: "Finished" }
        ];
        component.set("v.comboOptions", options);
        /* Normally we would call something like this to disable the components:
        helper.lockByLevel(component, event, helper, 2, true)
        but we do not have access to the DOM at this point for styles so we use a doneRendering function
        to handle that later with a boolean check to prevent looping..
        */
        component.set("v.doneRenderingIsComplete", false);
	},
    
    /**
     * This is needed to emulate styles on an initial load state such as a disabled. Init happens too soon to apply style
     * because rendering is not yet complete and the DOM is not accessible.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    doneRendering : function (component, event, helper) {
        if(component.get("v.doneRenderingIsComplete") === false){
            //Set this first thing to prevent any potential racing or looping
            component.set("v.doneRenderingIsComplete", true);
            //console.info("doneRendering ran");
            helper.lockByLevel(component, event, helper, 2, true);
        }
    },

    /**
     * Handle the combobox change.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    handleComboBoxChanged : function(component, event, helper) {
        //console.info('combo box changed');
        var isLevelUnlocked = helper.isLevel1Unlocked(component, helper);
        helper.lockByLevel(component, event, helper, 2, !isLevelUnlocked);
        //-- ONLY make level1 required if the combo value is finished
        var comboValue = component.find('comboBox').get('v.value');
        isLevelUnlocked = comboValue === 'finished';
        //component.find('level1').set('v.required', isLevel1Required);
        helper.requireInput(component, helper, component.find('level1'), isLevelUnlocked);
    },

    /**
     * Handle when a particular level has been filled 1 - 4.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     **/
    handleLevel1Changed : function(component, event, helper) {
        //console.info('handleLevel1Changed');
        var isLevelUnlocked = !$A.util.isEmpty(event.getParams().value);
        helper.lockByLevel(component, event, helper, 2, !isLevelUnlocked);
    },

    handleLevel2Changed : function(component, event, helper) {
        //console.info('handleLevel2Changed');
        var isLevelUnlocked = !$A.util.isEmpty(event.getParams().value);
        helper.lockByLevel(component, event, helper, 3, !isLevelUnlocked);
    },

    handleLevel3Changed : function(component, event, helper) {
        //console.info('handleLevel3Changed');
        var isLevelUnlocked = !$A.util.isEmpty(event.getParams().value);
        helper.lockByLevel(component, event, helper, 4, !isLevelUnlocked);
    },

    handleLevel4Changed : function(component, event, helper) {
        //console.info('handleLevel4Changed');
        var isLevelUnlocked = !$A.util.isEmpty(event.getParams().value);
        helper.lockByLevel(component, event, helper, 5, !isLevelUnlocked);
    },
    
    /**
     * Handles the onclick event on the validate form button. This is only a validation - not a save.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 **/
    handleValidateFormClicked : function(component, event, helper) {
        //console.info('handleValidateFormClicked');
        var isValid = helper.isFormValid(component, helper);
        if(isValid) {
            helper.continueWithValidForm(component, helper);
        }
    },

    /**
     * Handles the onsubmit event fired by the type="submit" button in aura markup per the lightning recordeEditForm spec.
     * Useful for manipulating values before the data is posted for save.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    onSubmit : function(component, event, helper) {
        //TODO: Find a workaround so the button continues to work since event.preventDefault() is killing it off
        //Stop the default submit behavior
        event.preventDefault();
        //Get a reference to fields and add the combobox value to the fields collection
        var eventFields = event.getParam("fields");
        var field = 'Status__c';
        if (eventFields.hasOwnProperty(field)) {
            eventFields[field] = component.find('comboBox').get('v.value');
            // assign the modified fields back to the event parameters
            event.setParam("fields", eventFields);
        }
                
        //Validate the data...
        var isValid = helper.isFormValid(component, helper);
        
        

        //...and if successful submit it
        if(isValid)
        {
            //Finish submitting the form (with the new field added) by using its aura id
            component.find('recordEditForm').submit(eventFields);
        }
    },

     /**
     * Handles the error event when the lightning:recordEditForm save operation fails. Useful for troubleshooting purposes if the save is unsuccessful.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    onError: function(component, event, helper){
        //TODO: Uncomment this code to troubleshoot the error in console
        //var myError = JSON.parse(JSON.stringify(event.getParams())).error;
        //The console call below will allow you to pry into the error for more details
        //console.error('myError', myError);
    },

    /**
     * Fired after the save operation of the lightning record edit form succeeds.
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     */
    onSuccess: function(component, event, helper){
        //Show Success message on upsertion of record
        var resultToast = $A.get("e.force:showToast");
        resultToast.setParams({
            "title": "Success!",
            "message": "Record Saved Successfully. You can do other things like navigate to a home screen from here."
        });
        resultToast.fire();
    }
});