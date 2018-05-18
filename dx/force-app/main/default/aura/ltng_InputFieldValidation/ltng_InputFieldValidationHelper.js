({
    //Disabled and Required use custom CSS classes so they can be applied at a CSS selector level
	//The error can be applied using the stock CSS class from the lightning design system
	cssForDisabled : 'custom-disabled',
	cssForRequired : 'custom-required',
	cssForError : 'slds-has-error',
        
    /**
	 * Boolean for Whether level1 is unlocked
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @return (Boolean) - true if unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper)
    {
        console.info('isLevel1Unlocked ran');
        var doesComboBoxHaveValue = helper.doesComponentHaveValue(component, helper, 'comboBox');
        console.info("doesComboBoxHaveValue", doesComboBoxHaveValue);
        var doesLevel1HaveValue = helper.doesComponentHaveValue(component, helper, 'level1');
        console.info("doesLevel1HaveValue", doesLevel1HaveValue);
        return doesComboBoxHaveValue && doesLevel1HaveValue;
    },
    
    /**
     * Locks or Unlocks a specific level
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param levelName (String) - name of the level. ex: level1
     * @param isLocked (Boolean) - true for locked / false for not
     **/
    setLevelDisabled : function(component, helper, levelName, isLocked)
    {
        console.info('setLevelDisabled ran for levelName', levelName, isLocked);
        helper.disableInput(component, helper, component.find(levelName), isLocked);
        //If locking - clear out the value in the field
        if(isLocked)
        {
            var test = component.find(levelName).get('v.value');
            console.info('  test', test);
            component.find(levelName).set('v.value', null);
        }
    },
    
    /**
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param inputField (Object) - The form element in lightning we want to enable/disable
     * @param isDisabled (Bbolean) - Toggle for having field disabled or enabled
     **/
    disableInput : function(component, helper, inputField, isDisabled)
    {
        console.info('disableInput ran', inputField, isDisabled);
        if(isDisabled)
        {
            $A.util.addClass(inputField, this.cssForDisabled);
        }
        else
        {
            $A.util.removeClass(inputField, this.cssForDisabled);
        }
    },

    /**
     * Marks a field as required for input.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param inputField (Object) - The form element in lightning we want to require/allow
     * @param isRequired (Boolean) - Toggle for having the field required or permitted
     **/
    requireInput : function(component, helper, inputField, isRequired)
    {
        if(isRequired)
        {
            $A.util.addClass(inputField, this.cssForRequired);
        }
        else
        {
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
    lockByLevel : function(component, helper, level, isLocked)
    {
        console.info('lockByLevel ran');
        helper.setLevelDisabled(component, helper, "level" + level, isLocked);
        
        //if locking a lower level, lock the upper levels too via recursion
        if(isLocked)
        {
            if(level < 5)
            {
                helper.lockByLevel(component, helper, level + 1, true);
            }
        }
    },
    
	/**
	 * Whether a component has a value
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @param levelName (String) - name of the level. ex: level2
	 * @return (Boolean) - true if unlocked or false if otherwise
	 **/
    doesComponentHaveValue : function(component, helper, levelName)
    {
        console.info('doesComponentHaveValue ran for ', levelName);
        var levelValue = component.find(levelName).get('v.value');
        console.info('  levelValue', levelValue);
        var returnValue = !$A.util.isEmpty(levelValue);
        console.info('  returnValue', returnValue);
        return returnValue;
	},
    
    /**
     * Determines if the form is valid
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 * @return (Boolean) - true if valid / false if not
     **/
    isFormValid : function(component, helper)
    {
        console.info('isFormValid ran');
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
        
        //Array of fields on the form to validate
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
        
        var returnValue = true;
        var invalidFields = [];
        for(var i=0; i < myFormInputs.length; i++)
        {
            var myFormInput = myFormInputs[i];
            if(myFormInput.getLocalId() === "comboBox")
            {
                continue;
            }

            var isComponentRequired = $A.util.hasClass(myFormInput, this.cssForRequired);
            var isEmpty = $A.util.isEmpty(myFormInput.get('v.value'));
            var isValid = !isComponentRequired && isEmpty;
            
            //TODO: Implement something that mimics the showHelpMessageIfInvalid behavior from the input (beta) component
            //Something like this based on the realtime example:
            //<div class="slds-form-element__help" role="alert" id="829:0-message" data-aura-rendered-by="998:0">Complete this field</div>
            //myFormInput.showHelpMessageIfInvalid();
            //For now, just collect the invalid fields and then show some toast with a summary of the misses
            if(!isValid)
            {
                //If anything is bad the whole function return is bad
                returnValue = false;
                $A.util.addClass(myFormInput, this.cssForError);
                invalidFields.push(myFormInput);
                //invalidFieldNames.push(myFormInput.getLocald());
            }
        }
        
        //Show our misses with toast
        if(!returnValue)
        {
            helper.displayIncompleteFields(component, helper, invalidFields);
        }

        return returnValue;
    },
    
    /**
     * Display the required fields which do not have values
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param invalidFields (Array) - Lightning framework object
    **/
    displayIncompleteFields : function(component, helper, invalidFields)
    {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams
        (
            {
                "title": "Invalid Form",
                "message": "The following fields are required: " +
                invalidFields.map
                (
                    function(invalidField)
                    {
                        return invalidField.get('v.fieldLabel') || invalidField.get('v.fieldName')
                    }
                ).join(","),
            }
        );
        toastEvent.fire();
    },

    /**
     * Really, this can be anything now we know that the form is valid.
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 **/
    continueWithValidForm : function(component, helper)
    {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams
        (
            {
                "title": "Valid Form",
                "message": "Placeholder for any more actions."
            }
        );
        toastEvent.fire();
    },

     /**
     * Loads the first demo record from a custom object
     * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
	 **/
    loadRecord : function(component, helper)
    {
        console.info('loadRecord ran.');
        // create a one-time use instance of the getInitialRecord action
        // in the server-side controller
        var action = component.get("c.getInitialRecord");
        
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response)
        {
            console.info('Initial record called back.');
            var ERROR = "ERROR";
            var SUCCESS = "SUCCESS";
            var INCOMPLETE = "INCOMPLETE";
            var state = response.getState();
            
            if (state === SUCCESS)
            {
                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
                component.set('v.recordToEdit', response.getReturnValue());
                //-- disable the other components
                helper.lockByLevel(component, helper, 2, true);
            }
            else if (state === INCOMPLETE)
            {
                // do something
            }
            else if (state === ERROR)
            {
                var errors = response.getError();
                if (errors)
                {
                    if (errors[0] && errors[0].message)
                    {
                        console.log("Error message: " + errors[0].message);
                    }
                }
                else
                {
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
})