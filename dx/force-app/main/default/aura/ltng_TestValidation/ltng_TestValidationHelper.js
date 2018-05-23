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
        console.info('removeDisabled ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForDisabled);
	},

	/**
	 * Apply required styles to an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyRequired : function(component, helper, auraId) {
        console.info('applyRequired ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForRequired);
	},

	/**
	 * Remove required styles from an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeRequired : function(component, helper, auraId) {
	    console.info('removeRequired ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForRequired);
	},

	/**
	 * Apply error styles to an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyError  : function(component, helper, auraId) {
        console.info('applyError ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForError);
	},

	/**
	 * Remove error styles from an inputField
	 * @param component (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeError : function(component, helper, auraId) {
        console.info('removeError ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForError);
	},

	/**
	 * This is a work-in-progress: Emulate disabled behavior on an inputField component by checking for disabled style and preventing changes.
	 * Note, that we are not exactly using the lightning editRecordForm properly here in this standalone tab.
	 * @param component (Object) - Lightning framework object
	 * @param event (Object) - Lightning framework object
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * @param valueProvider (String) - The value provider for the original attribute like 'v.lightningInputFieldValue' so we can determine the original value
	 * */
	emulateDisabledInput: function(component, event, helper, auraId, valueProvider) {
		console.info('emulateDisabledInput ran');
		//Get what we had originally on the attribute
		var attributeValue = component.get(valueProvider);
		console.info('  	attributeValue', attributeValue);
		//Get the unchanged value from the inputField
		var fieldValue = component.find(auraId).get('v.value');
		console.info('  	fieldValue', fieldValue);
		//Get the event value by peeling it off the event
		var eventValue = JSON.parse(JSON.stringify(event.getParams())).value;
        console.info('  	eventValue', eventValue);
		//Determine if CSS is applied for a disabled state
		var isDisabled = $A.util.hasClass(component.find(auraId), this.cssForDisabled);
		console.info('  	isDisabled', isDisabled);
		//Now that we know it is disabled by having the CSS class prevent any changes by setting the value on the field to the original
		if(isDisabled) {
			//Probably a good idea to stop anything else which may be observing this field for changes
			event.stopPropagation();
			console.info('event.stopPropagation() invoked');
			console.info('	Component disabled. Setting back to attributeValue ', attributeValue);
			component.find(auraId).set('v.value', attributeValue);
			var readback1 = component.find(auraId).get('v.value');
			console.info('		readback1', readback1);
			var readback2 = component.get(valueProvider);
			console.info('		readback2', readback2);
			//Do an overkill logical check here
			console.assert(attributeValue === fieldValue);
			console.assert(attributeValue === readback1);
			console.assert(attributeValue === readback2);
			//TODO: Get the browser display to update with the value or do
			console.info('We need to get the browser display to update here...');
		}
	}

});