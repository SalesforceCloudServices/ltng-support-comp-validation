({
    init : function(component, event, helper)
    {
        console.info('init ran');
    },
    
    //Use cases for lightning:input (beta) component
    disableInput : function(component, event, helper)
    {
        console.info('disableInput ran');
        //input has a disabled property we can use
        component.find('input').set('v.disabled', true);
    },

    enableInput : function(component, event, helper)
    {
        console.info('enableInput ran');
        //input has a disabled property we can use
        component.find('input').set('v.disabled', false);
    },

    requireInput : function(component, event, helper)
    {
        console.info('requireInput ran');
        helper.applyRequired(component, helper, 'input');
    },

    permitInput : function(component, event, helper)
    {
        console.info('permitInput ran');
        helper.removeRequired(component, helper, 'input');
    },

    errorInput  : function(component, event, helper)
    {
        console.info('errorInput ran');
        helper.applyError(component, event, 'input');
    },

    correctInput  : function(component, event, helper)
    {
        console.info('correctInput ran');
        helper.removeError(component, helper, 'input');
    },

    allInput  : function(component, event, helper)
    {
        console.info('allInput ran');
        const auraId = 'input';
        helper.applyRequired(component, helper, auraId);
        helper.applyError(component, helper, auraId);
        //input has a disabled property we can use
        component.find('input').set('v.disabled', true);
    },

    removeAllInput  : function(component, event, helper)
    {
        console.info('removeAllInput ran');
        const auraId = 'input';
        helper.removeRequired(component, helper, auraId);
        helper.removeError(component, helper, auraId);
        //input has a disabled property we can use
        component.find('input').set('v.disabled', false);
    },

    //Use cases for lightning:inputField component
    disableInputField : function(component, event, helper)
    {
        console.info('disableInputField ran');
        //inputField does not have a disabled property so use a combination of CSS and JS with the emulateDisableInput functions
        helper.applyDisabled(component, helper, 'inputField');
    },

    enableInputField : function(component, event, helper)
    {
        console.info('enableInputField ran');
        //inputField does not have a disabled property so use a combination of CSS and JS with the emulateDisableInput functions 
        helper.removeDisabled(component, helper, 'inputField');
    },

    //A custom function to emulate the disabled behavior by checking for the disabled CSS being applied and ignorning changes 
    emulateDisabledInput: function(component, event, helper)
    {
        helper.emulateDisabledInput(component, event, helper, 'inputField', 'v.lightningInputFieldValue');
    },

    requireInputField : function(component, event, helper)
    {
        console.info('requireInputField ran');
        helper.applyRequired(component, helper, 'inputField');
    },

    permitInputField : function(component, event, helper)
    {
        console.info('doNotRequireInputField ran');
        helper.removeRequired(component, helper, 'inputField');
    },

    errorInputField  : function(component, event, helper)
    {
        console.info('errorInputField ran');
        helper.applyError(component, event, 'inputField');
    },

    correctInputField  : function(component, event, helper)
    {
        console.info('clearErrorInputField ran');
        helper.removeError(component, helper, 'inputField');
    },

    allInputField  : function(component, event, helper)
    {
        console.info('allInput ran');
        const auraId = 'inputField';
        helper.applyRequired(component, helper, auraId);
        helper.applyError(component, helper, auraId);
        //inputField does not have a disabled property so use a combination of CSS and JS
        helper.applyDisabled(component, helper, auraId);
    },

    removeAllInputField  : function(component, event, helper)
    {
        console.info('removeAllInput ran');
        const auraId = 'inputField';
        helper.removeRequired(component, helper, auraId);
        helper.removeError(component, helper, auraId);
       //inputField does not have a disabled property so use a combination of CSS and JS
        helper.removeDisabled(component, helper, auraId);
    },

})