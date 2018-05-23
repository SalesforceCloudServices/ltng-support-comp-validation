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
        console.info('  and returned', result);
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
        var originalValue = component.find(levelName).get('v.value');
        console.info('  originalValue', originalValue);
        var originalValue2 = event.getParams().value;
        console.info('  originalValue2', originalValue2);
        if(isDisabled === true) {
            //TODO: Fix the bug in here preventing the cascading field clearing from working
            component.find(levelName).set('v.value', null);
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
     * Unlocks a level, or sequentially locks subsequent levels.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param level (Integer)
     * @param isLocked (Boolean)
     **/
    lockByLevel : function(component, event, helper, level, isLocked) {
        console.info('lockByLevel', level, isLocked);
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
        console.info('doesComponentHaveValue', levelName);
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
        console.info('isFormValid');
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
            
            //TODO: Implement something that mimics the showHelpMessageIfInvalid behavior from the input (beta) component
            //Something like this based on the realtime example:
            //<div class="slds-form-element__help" role="alert" id="829:0-message" data-aura-rendered-by="998:0">Complete this field</div>
            //myFormInput.showHelpMessageIfInvalid();
            //For now, just collect the invalid fields and then show some toast with a summary of the misses
            if(!isValid) {
                //If anything is bad the whole function return is bad
                returnValue = false;
                //Apply the visual styles indicating which fields are invalid...
                $A.util.addClass(myFormInput, this.cssForError);
                //...and track them in the array
                invalidFields.push(myFormInput);
            } else {
                //Remove the visual styles when the component is valid
                $A.util.removeClass(myFormInput, this.cssForError);
            }
        }
        
        //Show our misses when the form is invalid
        if(!returnValue) {
            helper.displayIncompleteFields(component, helper, invalidFields);
        }

        return returnValue;
    },
    
    /**
     * Display the required fields which do not have values.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param invalidFields (Array) - Lightning framework object
    **/
    displayIncompleteFields : function(component, helper, invalidFields) {
        //TODO: Put this into a lightning message or inline
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams
        (
            {
                "title": "Invalid Form",
                "message": "The following fields are required: " +
                invalidFields.map
                (
                    function(invalidField) {
                        return invalidField.get('v.fieldLabel') || invalidField.get('v.fieldName')
                    }
                ).join(","),
            }
        );
        toastEvent.fire();
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
    },

     /**
     * Loads the first demo record from a custom object
     * @param component (Object) - Lightning framework object
     * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 **/
    //TODO: Gut this and use the normal load thing from the lightning:recordEditForm
    loadRecord : function(component, event, helper) {
        console.info('loadRecord ran.');
        // create a one-time use instance of the getInitialRecord action
        // in the server-side controller
        var action = component.get("c.getInitialRecord");
        
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response) {
            console.info('Initial record called back.');
            var ERROR = "ERROR";
            var SUCCESS = "SUCCESS";
            var INCOMPLETE = "INCOMPLETE";
            var state = response.getState();
            
            if (state === SUCCESS) {
                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
                component.set('v.recordToEdit', response.getReturnValue());
                //-- disable the other components
                helper.lockByLevel(component, event, helper, 2, true);
            } else if (state === INCOMPLETE) {
                // do something
            } else if (state === ERROR) {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events,
        // which could trigger other events and
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    }
});