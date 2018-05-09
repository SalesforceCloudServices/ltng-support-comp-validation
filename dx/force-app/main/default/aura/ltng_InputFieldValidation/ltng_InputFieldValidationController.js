({
    init : function(component, event, helper)
    {
        console.info('init ran');
		var options = [
            { value: "new", label: "New" },
            { value: "in-progress", label: "In Progress" },
            { value: "finished", label: "Finished" }
        ];
        component.set("v.comboOptions", options);
        
        /* Normally we would call this to disable the components:
        helper.lockByLevel(component, helper, 2, true)
        but we do not have access to the full cient DOM at this point so we use a doneRendering function to handle that with a boolean check to prevent
        an ifinite loop.
        */
        component.set("v.doneRenderingIsComplete", false);
	},
    
    /**
     * Needed to emulate an initial load state of disabled
     */
    doneRendering : function (component, event, helper)
    {
        if(component.get("v.doneRenderingIsComplete") === false)
        {
            //Set this first thing to prevent and potential racing
            component.set("v.doneRenderingIsComplete", true);
            console.info("doneRendering ran");
            //TODO: Set initial values so that we can check for changes later during functions like 'handleLevel1Changed'? I hope we won't need to
            helper.lockByLevel(component, helper, 2, true);
        }
    },

    /**
     * Handle when a particular level has been filled
     **/
    handleComboBoxChanged : function(component, event, helper)
    {
        console.info('combo box changed');
        var isLevelUnlocked = helper.isLevel1Unlocked(component, helper);
        helper.lockByLevel(component, helper, 2, !isLevelUnlocked);
        
        //-- ONLY make level1 required if the combo value is finished
        var comboValue = component.find('comboBox').get('v.value');
        var isLevelUnlocked = comboValue === 'finished';
        //component.find('level1').set('v.required', isLevel1Required);
        helper.requireInput(component, helper, component.find('level1'), isLevelUnlocked);
    },

    handleLevel1Changed : function(component, event, helper)
    {
        console.info('level 1 changed');
        var isLevelUnlocked = helper.isLevel1Unlocked(component, helper);
        console.info('isLevelUnlocked', isLevelUnlocked);
        helper.lockByLevel(component, helper, 2, !isLevelUnlocked);
    },

    handleLevel2Changed : function(component, event, helper)
    {
        console.info('level 2 changed');
        var isLevelUnlocked = helper.doesComponentHaveValue(component, helper, 'level2');
        helper.lockByLevel(component, helper, 3, !isLevelUnlocked);
    },

    handleLevel3Changed : function(component, event, helper)
    {
        console.info('level 3 changed');
        var isLevelUnlocked = helper.doesComponentHaveValue(component, helper, 'level3');
        helper.lockByLevel(component, helper, 4, !isLevelUnlocked);
    },

    handleLevel4Changed : function(component, event, helper)
    {
        console.info('level 4 changed');
        var isLevelUnlocked = helper.doesComponentHaveValue(component, helper, 'level4');
        helper.lockByLevel(component, helper, 5, !isLevelUnlocked);
    },
    
    /**
     * Handles the onclick of the validate form button.
     **/
    handleValidateFormClicked : function(component, event, helper)
    {
        console.info('validate form button clicked');
        var isValid = helper.isFormValid(component, helper);
        if(isValid)
        {
            helper.continueWithValidForm(component, helper);
        }
    }
})