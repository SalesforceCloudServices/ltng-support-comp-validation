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
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyDisabled  : function(component, helper, auraId)
    {
        console.info('applyDisabled ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForDisabled);
	},

	/**
	 * Remove disabled styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeDisabled : function(component, helper, auraId)
    {
        console.info('removeDisabled ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForDisabled);
	},

	/**
	 * Emulate disabled behavior on an inputField component by checking for  disabled style and preventing changes
	 * @param component (Object) - Lightning framework object
	 * @param event (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * @param valueProvider (String) - The value provider like 'v.lightningInputFieldValue' so we can determine the original value
	 * */
	emulateDisabledInput: function(component, event, helper, auraId, valueProvider)
	{
		console.info('emulateDisabledInput ran', auraId, valueProvider);
		//Get the original value from the attribute, system or what have you using the valueProvider notation
		let originalValue = component.get(valueProvider);
        console.info('  originalValue', originalValue);
		//Get the new value
		let myValue = JSON.parse(JSON.stringify(event.getParams())).value;
        console.info('  myValue', myValue);
		//Determine if CSS is applied for a disabled state
		let isDisabled = $A.util.hasClass(component.find(auraId), this.cssForDisabled);
		//Now that we know it is disabled prevent any changes by setting the value on the field to the original
		if(isDisabled)
		{
			console.info('	Component has disabled styles so setting back to original value', originalValue);
			//component.set(valueProvider, originalValue);
			component.find(auraId).set('v.value', component.get(valueProvider));
			let readback1 = component.find(auraId).get('v.value');
			console.info('	readback1', readback1);
			let readback2 = component.get(valueProvider);
			console.info('	readback2', readback2);
			//JSON.parse(JSON.stringify(event.getParams())).value = 'Your mom';
			//console.info('	readback3', JSON.stringify(event));
			component.set('v.value', originalValue);
			let readback3 = component.find(auraId).get('v.value');
			console.info('	readback3', readback3);		
			//$A.component.clearReference('v.lightningInputFieldValue');
		}	
	},
	
	/**
	 * Apply required styles to an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyRequired : function(component, helper, auraId)
    {
        console.info('applyRequired ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForRequired);
	},

	/**
	 * Remove required styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeRequired : function(component, helper, auraId)
    {
	    console.info('removeRequired ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForRequired);	
	},

	/**
	 * Apply error styles to an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	applyError  : function(component, helper, auraId)
    {
        console.info('applyError ran', auraId);
        $A.util.addClass(component.find(auraId), this.cssForError);
	},

	/**
	 * Remove error styles from an inputField
	 * @param component (Object) - Lightning framework object 
     * @param helper (Object) - Lightning framework object
     * @param auraId (String) - The aura:id of the component to change like 'input' or 'inputField'
	 * */
	removeError : function(component, helper, auraId)
    {
        console.info('removeError ran', auraId);
        $A.util.removeClass(component.find(auraId), this.cssForError);
	}
})