({
	//Disabled and Required use custom CSS classes s they can be applied at a CSS selector level
	//The error can be applied using the stock CSS class from the lightning design system
	cssForDisabled : 'custom-disabled',
	cssForRequired : 'custom-required',
	cssForError : 'slds-has-error',
	
	applyDisabled  : function(component, helper, level)
    {
        console.info('applyDisabledToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForDisabled);
	},

	removeDisabled : function(component, helper, level)
    {
        console.info('removeDisabledFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForDisabled);
	},

	applyRequired : function(component, helper, level)
    {
        console.info('applyRequiredToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForRequired);
	},

	removeRequired : function(component, helper, level)
    {
	    console.info('removeRequiredFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForRequired);	
	},

	applyError  : function(component, helper, level)
    {
        console.info('applyErrorToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForError);
	},

	removeError : function(component, helper, level)
    {
        console.info('removeErrorFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForError);
	}
})