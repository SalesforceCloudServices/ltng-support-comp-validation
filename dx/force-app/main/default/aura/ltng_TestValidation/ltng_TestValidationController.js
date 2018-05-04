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

    disableLevel0 : function(component, event, helper)
    {
        console.info('disableLevel0 ran');
        const cssForDisable = 'custom-disabled';
        $A.util.addClass(component.find('level0'), cssForDisable);
    },

    enableLevel0 : function(component, event, helper)
    {
        console.info('enableLevel0 ran');
        const cssForDisable = 'custom-disabled';
        $A.util.removeClass(component.find('level0'), cssForDisable);
    },

    disableLevel1 : function(component, event, helper)
    {
        console.info('disableLevel1 ran');
        const cssForDisable = 'custom-disabled';
        $A.util.addClass(component.find('level1'), cssForDisable);
    },

    enableLevel1 : function(component, event, helper)
    {
        console.info('allowLevel0 ran');
        const cssForDisable = 'custom-disabled';
        $A.util.removeClass(component.find('level1'), cssForDisable);
    },

    requireLevel0 : function(component, event, helper)
    {
        console.info('requireLevel0 ran');
        const cssForRequired = 'custom-required';
        $A.util.addClass(component.find('level0'), cssForRequired);
    },

    allowLevel0 : function(component, event, helper)
    {
        console.info('allowLevel0 ran');
        const cssForRequired = 'custom-required';
        $A.util.removeClass(component.find('level0'), cssForRequired);
    },

    requireLevel1 : function(component, event, helper)
    {
        console.info('requireLevel0 ran');
        const cssForRequired = 'custom-required';
        $A.util.addClass(component.find('level1'), cssForRequired);
    },

    allowLevel1 : function(component, event, helper)
    {
        console.info('allowLevel1 ran');
        const cssForRequired = 'custom-required';
        $A.util.removeClass(component.find('level1'), cssForRequired);
    },

    errorLevel0  : function(component, event, helper)
    {
        console.info('errorLevel0 ran');
        const cssForError = 'slds-has-error';
        $A.util.addClass(component.find('level0'), cssForError);
    },

    removeErrorLevel0  : function(component, event, helper)
    {
        console.info('removeErrorLevel0 ran');
        const cssForError = 'slds-has-error';
        $A.util.removeClass(component.find('level0'), cssForError);
    },

    errorLevel1  : function(component, event, helper)
    {
        console.info('errorLevel1 ran');
        const cssForError = 'slds-has-error';
        $A.util.addClass(component.find('level1'), cssForError);
    },

    removeErrorLevel1  : function(component, event, helper)
    {
        console.info('removeErrorLevel1 ran');
        const cssForError = 'slds-has-error';
        $A.util.removeClass(component.find('level1'), cssForError);
    },
})