({
    init : function(component, event, helper)
    {
        console.info('init ran');
    },
    
    //TODO: Might have to apply styles in hereoif the button clicks and other events do not work
    doneRendering: function (component, event, helper)
    {
        //This is here to prevent an infinite loop
        if(!component.get("v.isDoneRendering"))
        {
            component.set("v.isDoneRendering", true);
            //do something after component is first rendered
            if(false)
            {
                console.info('doneRendering ran');
                //This sort of works but what we need to do is apply it to the individual input field - not the label
                const css = 'custom-disabled'; //'slds-is-disabled';
                var level0 = component.find('level0');
                $A.util.addClass(level0, css);
                var level2 = component.find('level2');
                $A.util.addClass(level2, css);
            }
        }
    },

    //Use cases for level 0: input (beta) component
    disableLevel0 : function(component, event, helper)
    {
        console.info('disableLevel0 ran');
        helper.applyDisabled(component, helper, 0);
    },

    enableLevel0 : function(component, event, helper)
    {
        console.info('enableLevel0 ran');
        helper.removeDisabled(component, helper, 0);
    },

    requireLevel0 : function(component, event, helper)
    {
        console.info('requireLevel0 ran');
        helper.applyRequired(component, helper, 0);
    },

    permitLevel0 : function(component, event, helper)
    {
        console.info('doNotRequireLevel0 ran');
        helper.removeRequired(component, helper, 0);
    },

    errorLevel0  : function(component, event, helper)
    {
        console.info('errorLevel0 ran');
        helper.applyError(component, event, 0);
    },

    correctLevel0  : function(component, event, helper)
    {
        console.info('clearErrorLevel0 ran');
        helper.removeError(component, helper, 0);
    },

    //Use cases for level 1: inputField component
    disableLevel1 : function(component, event, helper)
    {
        console.info('disableLevel1 ran');
        helper.applyDisabled(component, helper, 1);
    },

    enableLevel1 : function(component, event, helper)
    {
        console.info('enableLevel1 ran');
        helper.removeDisabled(component, helper, 1);
    },

    requireLevel1 : function(component, event, helper)
    {
        console.info('requireLevel1 ran');
        helper.applyRequired(component, helper, 1);
    },

    permitLevel1 : function(component, event, helper)
    {
        console.info('doNotRequireLevel1 ran');
        helper.removeRequired(component, helper, 1);
    },

    errorLevel1  : function(component, event, helper)
    {
        console.info('errorLevel1 ran');
        helper.applyError(component, event, 1);
    },

    correctLevel1  : function(component, event, helper)
    {
        console.info('clearErrorLevel1 ran');
        helper.removeError(component, helper, 1);
    },
})