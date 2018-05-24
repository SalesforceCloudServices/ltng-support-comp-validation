({
    //Disabled and required use custom CSS classes so they can be applied at a CSS selector level.
	//The error appearance can be applied using the stock CSS class from the lightning design system.
	cssForDisabled : 'custom-disabled',
	cssForRequired : 'custom-required',
	cssForError : 'slds-has-error',
        
    /**
	 * Boolean for Whether level1 is unlocked
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @return (Boolean) - true if level is unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper) {
        //console.info('isLevel1Unlocked ran');
        var doesComboBoxHaveValue = helper.doesComponentHaveValue(component, helper, 'comboBox');
        var doesLevel1HaveValue = helper.doesComponentHaveValue(component, helper, 'level1');
        var result = doesComboBoxHaveValue && doesLevel1HaveValue;
        //coconnsole.info('  and returned', result);
        return result;
    },
    
    /**
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param levelName (String) - The form level we want to enable/disable like 'level1', 'level2', ...
     * @param isDisabled (Bbolean) - Toggle for having field disabled or enabled
     **/
    disableInput : function(component, event, helper, levelName, isDisabled) {
        console.info('disableInput', levelName, isDisabled);
        //TODO: Fix the bug in here preventing the cascading field clearing from working (when clearing 1 additional levels should clear)
        if(isDisabled === true) {
            component.find(levelName).set('v.value', '');
            $A.util.addClass(component.find(levelName), this.cssForDisabled);
        } else {
            $A.util.removeClass(component.find(levelName), this.cssForDisabled);
        }
    },

    /**
     * Marks a field as required by applying a CSS style change.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param inputField (Object) - The form element in lightning we want to require/allow
     * @param isRequired (Boolean) - Toggle for having the field required or permitted
     **/
    requireInput : function(component, helper, inputField, isRequired) {
        if(isRequired === true) {
            $A.util.addClass(inputField, this.cssForRequired);
        } else {
            $A.util.removeClass(inputField, this.cssForRequired);
        }
    },

    /**
     * Marks a field as being in error by applying a CSS style change.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param inputField (Object) - The form element in lightning we want to require/allow
     * @param isError (Boolean) - Toggle for having the field shown as an error or not
     **/
    errorInput : function(component, helper, inputField, isError) {
        if(isError === true) {
            $A.util.addClass(inputField, this.cssForError);
        } else {
            $A.util.removeClass(inputField, this.cssForError);
        }
    },

    /**
     * Unlocks a level, or sequentially locks subsequent levels.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param level (Integer)
     * @param isLocked (Boolean)
     **/
    lockByLevel : function(component, event, helper, level, isLocked) {
        //console.info('lockByLevel', level, isLocked);
        helper.disableInput(component, event, helper, "level" + level, isLocked);
        //if locking a level lock the higher levels (lower levels in the display)
        if(isLocked === true){
            for(var i = level + 1; i < 6; i++) {
                helper.disableInput(component, event, helper, "level" + i, isLocked);
            }
        }
    },
    
	/**
	 * Tests whether a component has a value
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param levelName (String) - name of the level. ex: level2
	 * @return (Boolean) - true if it has a value or false otherwise
	 **/
    doesComponentHaveValue : function(component, helper, levelName) {
        //console.info('doesComponentHaveValue', levelName);
        var levelValue = component.find(levelName).get('v.value');
        //console.info('  testing', "'" + levelValue + "'");
        var returnValue = levelValue !== null && !$A.util.isEmpty(levelValue) && !$A.util.hasClass(this.cssForDisabled);
        //console.info('  and returned ', returnValue);
        return returnValue;
	},
    
    /**
     * Determines if the form is valid
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @return (Boolean) - true if valid / false if not
     **/
    isFormValid : function(component, helper) {
        //console.info('isFormValid');
        //NOTE: similar to the validation found in the
        //Handle Form Submission in an Action Handler section
        //https://trailhead.salesforce.com/modules/lex_dev_lc_basics/units/lex_dev_lc_basics_forms#Tdxn4tBKheading7
        //if aura:id is the same for all components,
        //then running component.find('nonUniqueAuraId')
        //will return an array of components
        //this is another example, as .reduce is a built in function
        //and this will hopefully clear things up for those not familiar
        //see here for more:
        //https://salesforce.stackexchange.com/questions/184525/help-me-to-undestand-this-lightning-helper-methods-reduce-showhelpmessageifin#answer-184535
        
        //Array of fields on the form to validate
        var myFormInputs = [
            component.find('comboBox'),
            component.find('level1'),
            component.find('level2'),
            component.find('level3'),
            component.find('level4'),
            component.find('level5')
        ];
        
        //Please note this issue for clearing errors without clicking on them
        //https://success.salesforce.com/ideaView?id=0873A000000CTZOQA4
        
        //Overall validation status of the form
        var returnValue = true;
        //List for tracking the invalid fields as we loop through
        var invalidFields = [];
        for(var i=0; i < myFormInputs.length; i++) {
            var myFormInput = myFormInputs[i];
            
            //The comboBox always has a value even if it's just "New" so skip that one in our loop
            if(myFormInput.getLocalId() === "comboBox") {
                continue;
            }

            //Is the component in question required (by checking the CSS style)?
            var isComponentRequired = $A.util.hasClass(myFormInput, this.cssForRequired);
            //Is the component in question empty?
            var isEmpty = $A.util.isEmpty(myFormInput.get('v.value'));
            //If the component is not required -OR- the component is both required and populated (not empty) it is valid
            var isValid = !isComponentRequired || (isComponentRequired && !isEmpty);
            
            //Collect any invalid fields
            if(!isValid) {
                //If anything is bad the whole function return is bad
                returnValue = false;
                //Apply the visual styles indicating which fields are invalid...
                helper.errorInput(component, helper, myFormInput, true);
                //...and track them in the array
                invalidFields.push(myFormInput);
            } else {
                //Remove the visual styles when the component is valid
                helper.errorInput(component, helper, myFormInput, false);
            }
        }
        
        //Map a collection for error display at the component level to us by the fields
        //Do this last at the end of the routine so it can get cleared if validation passes
        var myIncompleteFields = invalidFields.map(
            function(invalidField) {
                return invalidField.getLocalId();
            }
        );
        component.set("v.requiredFields",  myIncompleteFields);
        helper.displayIncompleteFields(component, helper, invalidFields);
        return returnValue;
    },
    
    /**
     * Display the required fields which do not have values.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param invalidFields (Array) - Lightning framework object
    **/
    displayIncompleteFields : function(component, helper, invalidFields) {
        for(var i=0; i < invalidFields.length; i++){
            //Update inline messaging if the component is there
            var validationMsg = component.find(invalidFields[i].getLocalId() + 'Required');
            if(validationMsg !== null){
                validationMsg.updateDisplay();
            }
        }
    },

    /**
     * Really, this can be anything now that we know the form is valid.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 **/
    continueWithValidForm : function(component, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(
            {
                "title": "Valid Form",
                "message": "This can be a placeholder for any more actions or you can click Save Record."
            }
        );
        toastEvent.fire();
    }
});