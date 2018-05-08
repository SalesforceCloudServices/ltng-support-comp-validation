({
	//Disabled and Required use custom CSS classes so they can be applied at a CSS 'selector' level specifically
	//The stock CSS class from the lightning design system for error cn be applied
	cssForDisabled : 'custom-disabled',
	cssForRequired : 'custom-required',
	cssForError : 'slds-has-error',
	
	/**
	 * Apply disabled styles to an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	applyDisabled  : function(component, helper, level)
    {
        console.info('applyDisabledToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForDisabled);
	},

	/**
	 * Remove disabled styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	removeDisabled : function(component, helper, level)
    {
        console.info('removeDisabledFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForDisabled);
	},

	/**
	 * Apply required styles to an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	applyRequired : function(component, helper, level)
    {
        console.info('applyRequiredToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForRequired);
	},

	/**
	 * Remove required styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	removeRequired : function(component, helper, level)
    {
	    console.info('removeRequiredFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForRequired);	
	},

	/**
	 * Apply error styles to an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	applyError  : function(component, helper, level)
    {
        console.info('applyErrorToLevel ran');
        $A.util.addClass(component.find('level' + level), this.cssForError);
	},

	/**
	 * Remove error styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param level (Integer) - The level to change, i.e. aura id 'level0', 'level1', 'level2'...
	 * */
	removeError : function(component, helper, level)
    {
        console.info('removeErrorFromLevel ran');
        $A.util.removeClass(component.find('level' + level), this.cssForError);
	}
})