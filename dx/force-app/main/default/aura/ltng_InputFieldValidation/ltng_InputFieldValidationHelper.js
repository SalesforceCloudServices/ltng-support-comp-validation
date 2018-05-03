({
	/**
	 * Whether level1 is unlocked
	 * @return (boolean) - true if unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper) {
        console.info('isLevel1Unlocked ran');
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
    setLevelDisabled : function(component, helper, levelName, isLocked)
    {
        console.info('setLevelDisabled ran');    
        /*
        //From the realtime example - We need to emulate this behavior:
        component.find(levelName).set("v.disabled", isLocked);
        
        //-- if locking - clear out the value
        if( isLocked ){
            component.find(levelName).set('v.value', null);
        }
        */
        helper.disableInput(component, helper, component.find(levelName), true);
        
        //-- if locking - clear out the value
        if( isLocked ){
            component.find(levelName).set('v.value', null);
        }
    },
    
    disableInput : function(component, helper, inputField, isDisabled)
    {
        console.info('disableInput ran');
        return;
        /*
        if(isDisabled)
        {
            $A.util.addClass(inputField, 'slds-is-disabled');
        }
        else
        {
            $A.util.removeClass(inputField, 'slds-is-disabled');
        }
        */
    },


    requireInput : function(component, helper, inputField, isRequired)
    {
        if(isRequired)
        {
            $A.util.addClass(inputField, 'custom-required');
        }
        else
        {
            $A.util.removeClass(inputField, 'custom-required');
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
        console.info('lockByLevel ran');
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
        console.info('doesComponentHaveValue ran');
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
        //var isComponentValid;
        var myFormInput;
        const requiredCss = 'custom-required'; //'slds-required';
        const errorCss = 'slds-has-error';
        for(let i = 0; i < myFormInputs.length; i++)
        {
            myFormInput = myFormInputs[i];
            
            //TODO: Review these with Paul -I don't think they are needed at all
            //isComponentValid = myFormInput.get('v.validity').valid;
            //isValid = isValid && isComponentValid;
            
            //-- begin
            var isComponentRequired = $A.util.hasClass(myFormInput, requiredCss);
            var isEmpty = $A.util.isEmpty(myFormInput.get('v.value'));
            var isValid = !(isComponentRequired && isEmpty);
            if(!isValid)
            {
                $A.util.addClass(myFormInput, errorCss);
            }
            else
            {
                $A.util.removeClass(myFormInput, errorCss);
            }
            //-- end

            //TODO: Implement something that mimics the showHelpMessageIfInvalid behavior from the input (beta) component
            //Something like this based on the realtime example:
            //<div class="slds-form-element__help" role="alert" id="829:0-message" data-aura-rendered-by="998:0">Complete this field</div>
            
            
            //myFormInput.showHelpMessageIfInvalid();
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
    },
     /**
     * Loading the first record
     **/
    loadRecord : function(component, helper)
    {
                // create a one-time use instance of the serverEcho action
                // in the server-side controller
                var action = component.get("c.getInitialRecord");
                //action.setParams({ firstName : component.get("v.firstName") });
        
                // Create a callback that is executed after 
                // the server-side action returns
                action.setCallback(this, function(response) {
                    console.info('Initial record called back.');
                    var state = response.getState();
                    if (state === "SUCCESS")
                    {
                        // You would typically fire a event here to trigger 
                        // client-side notification that the server-side 
                        // action is complete
                        component.set('v.recordToEdit', response.getReturnValue());

                        //-- disable the other components
                        helper.lockByLevel(component, helper, 2, true);
                    }
                    else if (state === "INCOMPLETE") {
                        // do something
                    }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                         errors[0].message);
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
})