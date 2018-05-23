({
	/**
	 * Whether level1 is unlocked
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @return (boolean) - true if unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper) {
        //console.info('isLevel1Unlocked ran');
        var check1 = helper.doesComponentHaveValue(component, helper, 'comboBox');
        //console.info("check1", check1);
        var check2 = helper.doesComponentHaveValue(component, helper, 'level1');
        //console.info("check2", check2);
        return (check1 && check2);
	},
    
    /**
     * Locks or Unlocks a specific level
     * @param levelName (String) - name of the level. ex: level1
     * @param isLocked (boolean) - true for locked / false for not
     **/
    setLevelDisabled : function(component, helper, levelName, isLocked){
        //console.info('setLevelDisabled ran for levelName', levelName);
        component.find(levelName).set("v.disabled", isLocked);
        
        //-- if locking - clear out the value
        if( isLocked ){
            component.find(levelName).set('v.value', null);
        }
    },
    
    /**
     * Unlocks a level, or sequentially locks subsequent levels.
     * @param component
     * @param helper
     * @param levelNum (integer)
     * @param isLocked (boolean)
     **/
    lockByLevel : function(component, helper, levelNum, isLocked){
        //console.info('lockByLevel ran');
        helper.setLevelDisabled(component, helper, "level" + levelNum, isLocked);
        
        //-- if locking a lower level, lock the upper levels too
        if( isLocked ){
            if( levelNum < 5 ){
                helper.lockByLevel(component, helper, levelNum+1, true);
            }
        }
    },
    
	/**
	 * Whether a component has a value
	 * @param component
	 * @param helper
	 * @param levelName (String) - name of the level. ex: level2
	 * @return (boolean) - true if unlocked or false if otherwise
	 **/
    doesComponentHaveValue : function(component, helper, levelName) {
        //console.info('doesComponentHaveValue ran for ', levelName);
        var levelValue = component.find(levelName).get('v.value');
        //console.info('  levelValue', levelValue);
        var returnValue = !$A.util.isEmpty(levelValue);
        //console.info('  returnValue', returnValue);
        return returnValue;
	},
    
    /**
     * Determines if the form is valid
     * @param component
     * @param helper
     * @return (boolean) - true if valid / false if not
     **/
    isFormValid : function(component, helper){
        //console.info('isFormValid ran');
        //-- NOTE: similar to the validation found in the
        //-- Handle Form Submission in an Action Handler section
        //-- https://trailhead.salesforce.com/modules/lex_dev_lc_basics/units/lex_dev_lc_basics_forms#Tdxn4tBKheading7
        //-- if aura:id is the same for all components,
        //-- then running component.find('nonUniqueAuraId')
        //-- will return an array of components
        
        //-- this is another example, as .reduce is a built in function
        //-- and this will hopefully clear things up for those not familiar
        
        //-- see here for more:
        //-- https://salesforce.stackexchange.com/questions/184525/help-me-to-undestand-this-lightning-helper-methods-reduce-showhelpmessageifin#answer-184535
        
        var myFormInputs = [
            component.find('comboBox'),
            component.find('level1'),
            component.find('level2'),
            component.find('level3'),
            component.find('level4'),
            component.find('level5')
        ];
        
        //-- please note this issue for clearing errors without clicking on them
        //-- https://success.salesforce.com/ideaView?id=0873A000000CTZOQA4
        
        var isValid = true;
        var isComponentValid;
        var myFormInput;
        for( var i = 0; i < myFormInputs.length; i++){
            myFormInput = myFormInputs[i];
            isComponentValid = myFormInput.get('v.validity').valid;
            isValid = isValid && isComponentValid;
            myFormInput.showHelpMessageIfInvalid();
        }
        
        return (isValid);
    },
    
    /**
     * Really, this can be anything now we know the form is valid.
     **/
    continueWithValidForm : function(component, helper){
        //console.info('continueWithValidForm ran');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Valid Form",
            "message": "Placeholder for any more actions."
        });
        toastEvent.fire();
    }
});