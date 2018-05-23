({
	//Disabled and Required use custom CSS classes so they can be applied at a CSS 'selector' level specifically
	//The stock CSS class from the lightning design system for error cn be applied
	cssForDisabled : 'custom-disabled',
	cssForRequired : 'custom-required',
	cssForError : 'slds-has-error',
	
	/**
	 * Get a boolean from a string doing a case-insensitive comparison
	 * @param inputValue (String) - The string to parse into an actual boolean to avoid JS 'truthiness'
	 * @return (Boolean) - true if the string is actually parsed to a boolean value of true otherwise false.
	 * */
	parseBoolean : function(inputValue) {
		 return inputValue.toUpperCase() === 'TRUE';
	},

	/**
	 * Apply disabled styles to an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyDisabled  : function(component, helper, auraId) {
		console.info('applyDisabled ran', auraId);
		$A.util.addClass(component.find(auraId), this.cssForDisabled);
	},

	/**
	 * Remove disabled styles from an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeDisabled : function(component, helper, auraId) {
		//console.info('removeDisabled ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForDisabled);
	},

	/**
	 * Apply required styles to an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyRequired : function(component, helper, auraId) {
        //console.info('applyRequired ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForRequired);
	},

	/**
	 * Remove required styles from an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeRequired : function(component, helper, auraId) {
	    //console.info('removeRequired ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForRequired);
	},

	/**
	 * Apply error styles to an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyError  : function(component, helper, auraId) {
        //console.info('applyError ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForError);
	},

	/**
	 * Remove error styles from an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeError : function(component, helper, auraId) {
        //console.info('removeError ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForError);
	}
});