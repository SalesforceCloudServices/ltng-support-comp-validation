({
    init : function(component, event, helper) {
        //console.info('init ran');
    },
    
    /**
     * Needed to emulate an initial load state of disabled but we are using it in this demo
     * to see if we can add a DOM level event handler like onclick/onfocus/onblur to prevent editing
     */
    doneRendering : function (component, event, helper) {
        if(component.get("v.doneRenderingIsComplete") === false) {
            //Set this first thing to prevent any potential racing or looping
            component.set("v.doneRenderingIsComplete", true);
            //console.info("doneRendering ran");
        }
    },

    //Use cases for lightning:input (beta) component
    toggleInputDisabled : function(component, event, helper) {
        //console.info('toggleInputDisabled');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        //input (beta) has an actual disabled property we can leverage
        component.find('input').set('v.disabled', myBoolean);
    },

    toggleInputRequired : function(component, event, helper) {
        //console.info('toggleInputRequired ran');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        if(myBoolean === true) {
            helper.applyRequired(component, helper, 'input');
        } else {
            helper.removeRequired(component, helper, 'input')
        }
    },

    toggleInputError : function(component, event, helper) {
        //console.info('toggleInputError ran');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        if(myBoolean === true) {
            helper.applyError(component, helper, 'input');
        } else {
            helper.removeError(component, helper, 'input')
        }
    },
    
    toggleInputFieldDisabled : function(component, event, helper) {
        //console.info('toggleInputFieldDisabled ran');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        if(myBoolean === true) {
            helper.applyDisabled(component, helper, 'inputField');
        } else {
            helper.removeDisabled(component, helper, 'inputField')
        }
    },

    toggleInputFieldRequired : function(component, event, helper) {
        //console.info('toggleInputFieldRequired ran');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        if(myBoolean === true) {
            helper.applyRequired(component, helper, 'inputField');
        } else {
            helper.removeRequired(component, helper, 'inputField')
        }
    },

    toggleInputFieldError : function(component, event, helper) {
        //console.info('toggleInputFieldError ran');
        var myBoolean = helper.parseBoolean(event.getParam('value'));
        if(myBoolean === true) {
            helper.applyError(component, helper, 'inputField');
        } else {
            helper.removeError(component, helper, 'inputField')
        }
    }
});