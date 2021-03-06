({
	/**
	 * Whether level1 is unlocked
	 * @return (boolean) - true if unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper) {
        return (
        	helper.doesComponentHaveValue(component, helper, 'comboBox') &&
            helper.doesComponentHaveValue(component, helper, 'level1')
        );
	},
    
    /**
     * Locks or Unlocks a specific level
     * @param levelName (String) - name of the level. ex: level1
     * @param isLocked (boolean) - true for locked / false for not
     **/
    setLevelDisabled : function(component, helper, levelName, isLocked){
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
        var levelValue = component.find(levelName).get('v.value');
		return(
            !$A.util.isEmpty(levelValue)
        );
	},
    
    /**
     * Determines if the form is valid
     * @param component
     * @param helper
     * @return (boolean) - true if valid / false if not
     **/
    isFormValid : function(component, helper){
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
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Valid Form",
            "message": "Placeholder for any more actions."
        });
        toastEvent.fire();
    }
})