# Quick Demo of using real-time validation

**Please note: sample code (metadata API and dx formats) are available in the [mdapi](./mdapi) and [dx](./dx) folders above**

## Demo

![Gif Demo](doc/images/demo.gif)

In this validation, we do not require Validation Rules (as they compare only when sent to the server), but we want to make fields enabled or required as you use them.

![Demo Required](doc/images/demoRequired.gif)

Please see

* [Input Data Using Forms - Trailhead Module](https://trailhead.salesforce.com/modules/lex_dev_lc_basics/units/lex_dev_lc_basics_forms)
* [Performing Validation - Trailhead Module](https://trailhead.salesforce.com/modules/lex_dev_lc_basics/units/lex_dev_lc_basics_forms#Tdxn4tBKheading7)
* [lightning:inputField - Lightning Components Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/aura_compref_lightning_inputField.htm?search_text=lightning:inputField)
* [Adding CSS classes](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_styles.htm)

## TLDR How

You can mark components required at runtime by setting the `v.required` attribute:
```javascript
component.find(levelName).set("v.required", true);
```
You can make components enabled or not based on setting `v.disabled` attribute:
[See the helper for more details](dx/force-app/main/default/aura/ltng_RealtimeValidation/ltng_RealtimeValidationHelper.js)

```javascript
component.find(levelName).set("v.disabled", isLocked);
```

[See here for more on validating forms](https://trailhead.salesforce.com/modules/lex_dev_lc_basics/units/lex_dev_lc_basics_forms#Tdxn4tBKheading7)

[And additional breakdown of what exactly that means here](https://salesforce.stackexchange.com/questions/184525/help-me-to-undestand-this-lightning-helper-methods-reduce-showhelpmessageifin#answer-184535)

Additional documentation [found here](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_validate_fields.htm)

If push comes to shove, you can always add in Lightning Design System classes, through  [See Here for more details](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_styles.htm)

```javascript
$A.util.addClass(component.find('level1'), 'slds-required');
```
---
# Using inputField  with CSS and JavaScript for validation (when push comes to shove)

## Demo

### Basic demonstration

This is a basic demo of locking and unlocking fields based on input.

![Gif Demo](doc/images/demoInputField.gif)

### Demonstration with required field based on selection in comboBox

In this validation we also want to make fields required based on other input, i.e. the comboBox having value 'Finished'.

![Gif Demo](doc/images/demoInputFieldRequired.gif)

## Approach
In order to use the inputField approach you will need to use:
1. A few custom CSS classes
2. Some lightning JavaScript code
3. Possibly the aura:doneRendering event depending on your use cases
## Applying and detecting styles for the various states
__Note__: All of these examples can be seen in the demo tab called "Style Applications."
## Working with _error_ styles
The built-in ```slds-has-error``` CSS style can be applied to, removed from and detected on an individual input field. This is the appearance you see when a field is required but not completed - typically a red border around the field. No CSS file changes are needed, but JavaScript code is needed. You can read more about the styles [here](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_styles.htm).

This code using ```addClass``` applies the style:
```javascript
$A.util.addClass(component.find('auraIdForTheComponent'), 'slds-has-error');
```
Removing it can be done by calling the ```removeClass``` method.
```javascript
$A.util.removeClass(component.find('auraIdForTheComponent'), 'slds-has-error');
```
Detecting whether the inputField is in an error state can be done with the ```hasClass``` method. This is useful for validation routines such as when checking that a required field
has been completed.
```javascript
if($A.util.hasClass(component.find('auraIdForTheComponent'), 'slds-has-error')){
	//do something
}
```
Here is a single controller function example called ```toggleInputFieldError``` which applies or removes this style based on a radio button selection (effectively a boolean):
### Aura markup
```html
<aura:attribute name="options" type="List" default="[
{'label': 'True', 'value': true},
{'label': 'False', 'value': false}
]"/>
<lightning:radioGroup 
	aura:id="toggleInputFieldRequired" name="toggleInputFieldError"
	label="" options="{!v.options}" value="{! v.value }" type="button"
	onchange="{!c.toggleInputFieldError}"
/>
<lightning:inputField
	aura:id="inputField" fieldName="Level1__c" value="{!v.lightningInputFieldValue}"
/>
```
### Controller JavaScript
```javascript
toggleInputFieldError : function(component, event, helper) {
	//console.info('toggleInputFieldError ran');
	var myBoolean = helper.parseBoolean(event.getParam('value'));
	if(myBoolean === true) {
		helper.applyError(component, helper, 'inputField');
	} else {
		helper.removeError(component, helper, 'inputField')
	}
}
```
### Helper JavaScript
```javascript
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
```

### Supplying Inline Validation Messages
At time of this writing, aura expressions do not support checking collections for elements. However, the behavior of inline error messages can be emulated using the component contained in the source called ```auraIfContains``` which uses the native SLDS styles ```slds-required``` and ```slds-form-element__help```. Here is an example.
```html
<!--
This is one way validation can be handled inline by the fields...
Since there is no contains functionality exposed use another component
to check for each fields aura:id being present in the collection
-->
<c:auraIfContains items="{!v.requiredFields}" element="level1" aura:id="level1Required"> 
	<!-- Correct style recipe for the font: slds-required slds-form-element__help -->
	<div class="slds-required slds-form-element__help">Complete this field</div>
</c:auraIfContains>
```

## Applying and detecting _required_ styles
The lightning:inputField component does not have a ```v.required``` property. To apply a 'required' appearance to the element add a custom class to your CSS file. This is the appearance you see when a field is required but has not yet failed a validation - typically a red asterisk near the specific form input element. JavaScript code is also needed to apply the custom style. You can read more about the styles [here](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_styles.htm).

### CSS
```css
.THIS  
{  

}  
.THIS .custom-required  
{  
	font-weight: 400;  
}  
.THIS .custom-required:before  
{  
	content: "*";  
	margin: 0 0.125rem 0 0.125rem;  
	color: rgb(194, 57, 52);  
	float: left;  
}  
```
### JavaScript code
This code using ```addClass``` applies the style:
```javascript
$A.util.addClass(component.find('auraIdForTheComponent'), 'custom-required');
```
Removing it can be done by calling the ```removeClass``` method.
```javascript
$A.util.removeClass(component.find('auraIdForTheComponent'), 'custom-required');
```
Detecting whether the inputField is in a required state can be done with the ```hasClass``` method. This is useful for validation routines. If a field is required and incomplete
a custom validation routine can provide user guidance.
```javascript
if($A.util.hasClass(component.find('auraIdForTheComponent'), 'custom-required')){
	//do something
}
```
Here is a single controller function example called ```toggleInputFieldRequired``` which applies or removes the required style based on a radio button selection (effectively a boolean):
### Aura markup
```html
<aura:attribute name="options" type="List" default="[
{'label': 'True', 'value': true},
{'label': 'False', 'value': false}
]"/>
<lightning:radioGroup 
	aura:id="toggleInputFieldRequired" name="toggleInputFieldRequired"
	label="" options="{! v.options }" value="{! v.value }" type="button"
    onchange="{!c.toggleInputFieldRequired}"
/>
<lightning:inputField
	aura:id="inputField" fieldName="Level1__c" value="{!v.lightningInputFieldValue}"
/>
```
### Controller JavaScript
```javascript
toggleInputFieldError : function(component, event, helper) {
	//console.info('toggleInputFieldError ran');
	var myBoolean = helper.parseBoolean(event.getParam('value'));
	if(myBoolean === true) {
		helper.applyError(component, helper, 'inputField');
	} else {
		helper.removeError(component, helper, 'inputField')
	}
}
```
### Helper JavaScript
```javascript
cssForRequired : 'custom-required',

/**
 * Get a boolean from a string doing a case-insensitive comparison
 * @param inputValue (String) - The string to parse into an actual boolean to avoid JS 'truthiness'
 * @return (Boolean) - true if the string is actually parsed to a boolean value of true otherwise false.
 * */
parseBoolean : function(inputValue) {
	return inputValue.toUpperCase() === 'TRUE';
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
removeRequired : function(component, helper, auraId)
{
	console.info('removeRequired ran', auraId);
	$A.util.removeClass(component.find(auraId), this.cssForRequired);	
}
```
## Applying and detecting _disabled_ styles
___Many lightning components are not a single HTML element in the final markup.___ In order to apply a 'disabled' style to only the input element, a CSS selector approach is used. Case in point, see the class ```.THIS .custom-disabled input``` below. Note that there is no ```v.disabled``` property that can be set on a lightning:inputField component.
### CSS for disabled styles
```css
.THIS  
{  

} 
.THIS .custom-disabled input  
{ 
	background-color: rgb(242, 242, 242);  
	color: rgb(110,110,110);  
	cursor: not-allowed;  
} 
```
### JavaScript code
This code using ```addClass``` applies the style:
```javascript
$A.util.addClass(component.find('auraIdForTheComponent'), 'custom-disabled');
```
Removing it can be done by calling the ```removeClass``` method.
```javascript
$A.util.removeClass(component.find('auraIdForTheComponent'), 'custom-disabled');
```
Detecting whether the inputField is in a required state can be done with the ```hasClass``` method. This is useful for validation routines.
```javascript
if($A.util.hasClass(component.find('auraIdForTheComponent'), 'custom-disabled')){
	//do something
}
```
Here is a single controller function example called ```toggleInputFieldDisabled``` which applies or removes the disabled style based on a radio button selection (effectively a boolean):
### Aura markup
```html
<aura:attribute name="options" type="List" default="[
{'label': 'True', 'value': true},
{'label': 'False', 'value': false}
]"/>
<lightning:radioGroup 
	aura:id="toggleInputFieldDisabled" name="toggleInputFieldDisabled"
	label="" options="{! v.options }" value="{! v.value }" type="button"
    onchange="{!c.toggleInputFieldDisabled}"
/>
<lightning:inputField
	aura:id="inputField" fieldName="Level1__c" value="{!v.lightningInputFieldValue}"
/>
```
### Controller JavaScript
```javascript
toggleInputFieldDisabled : function(component, event, helper) {
	//console.info('toggleInputFieldDisabled ran');
	var myBoolean = helper.parseBoolean(event.getParam('value'));
	if(myBoolean === true) {
		helper.applyDisabled(component, helper, 'inputField');
	} else {
		helper.removeDisabled(component, helper, 'inputField')
	}
},
```
### Helper JavaScript
```javascript
cssForDisabled : 'custom-disabled',

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
removeDisabled : function(component, helper, auraId)
{
	console.info('removeDisabled ran', auraId);
	$A.util.removeClass(component.find(auraId), this.cssForDisabled);	
}
```  

## Caveats

### Setting an initial load state

To successfully apply styles on an initial load using the util class like this: ```$A.util.addClass(component.find('level1'), '.slds-required');``` we need to apply them once the components have been rendered in the DOM. This does not work during the init phase. doneRendering can facilitate behaviors like disabling a field on an initial load state.

Here is a basic example of how to apply the ```doneRendering``` to aura markup:
```html
<aura:attribute name="doneRenderingIsComplete" type="Boolean" default="false" />  
<!-- handlers -->  
<aura:handler name="init" value="{!this}" action="{!c.init}" />  
<!-- The aura:doneRendering event is needed to set the state of individual DOM elements on the  
	initial load when they are not available in the init phase -->  
<aura:handler event="aura:doneRendering" action="{!c.doneRendering}"/>  
```
#### Controller JavaScript  
___Note___: The check on ```v.doneRenderingIsComplete``` is necessary to prevent an infinite loop. [See here](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/ref_aura_doneRendering.htm) for more details.

```javascript
/**
 * This is needed to emulate styles on an initial load state such as a disabled. Init happens too soon to
 * apply style because rendering is not yet complete and the DOM is not accessible.
 * @param component (Object) - Lightning framework object
 * @param event (Object) - Lightning framework object
 * @param helper (Object) - Lightning framework object
 */
doneRendering : function (component, event, helper) {
	if(component.get("v.doneRenderingIsComplete") === false){
		//Set this first thing to prevent any potential racing or looping
		component.set("v.doneRenderingIsComplete", true);
		console.info("doneRendering ran");
		//Now you can Do something like this: $A.util.addClass(component.find('level1'), 'custom-disabled');
	}
}
```
## Known Issues
Although the disabled appearance is convincing (even showing a 'not allowed' icon on hover) users can still click on the field or type into it. A possible workaround is to check for a disabled state and ignore the input during validation or submission. Other workarounds are still being investigated to prevent or reverse changes made to the field.

## Can I see just the CSS/Style pieces in action?
Check out the tab in the demo app called "Style Applications" (installation instructions below). This provides a simple example of toggling styles for disabled/required/error states and shows you some boilerplate JavaScript code suitable for expansion.

## The styles look good but how is validation going to happen?
This is where JavaScript magic and your imagination comes in. If you look at the second tab called 'Input Field Val.' this is a style based approach which emulates the real-time demo but uses lightning:inputField instead of lightning:input components. A complete validation routine like this is used:
```javascript
/**
 * Determines if the form is valid
 * @param component (Object) - Lightning framework object
 * @param helper (Object) - Lightning framework object
 * @return (Boolean) - true if valid / false if not
 **/
isFormValid : function(component, helper) {
	//Array of fields on the form to validate
	var myFormInputs = [
		component.find('comboBox'),
		component.find('level1'),
		component.find('level2'),
		component.find('level3'),
		component.find('level4'),
		component.find('level5')
	];
	
	//Please note this issue for clearing errors without clicking on them
	//https://success.salesforce.com/ideaView?id=0873A000000CTZOQA4
	
	//Overall validation status of the form
	var returnValue = true;
	//List for tracking the invalid fields as we loop through
	var invalidFields = [];
	for(var i=0; i < myFormInputs.length; i++) {
		var myFormInput = myFormInputs[i];
		
		//The comboBox always has a value even if it's just "New" so skip that one in our loop
		if(myFormInput.getLocalId() === "comboBox") {
			continue;
		}

		//Is the component in question required (by checking the CSS style)?
		var isComponentRequired = $A.util.hasClass(myFormInput, this.cssForRequired);
		//Is the component in question empty?
		var isEmpty = $A.util.isEmpty(myFormInput.get('v.value'));
		//If the component is not required -OR- the component is both required and populated (not empty) it is valid
		var isValid = !isComponentRequired || (isComponentRequired && !isEmpty);
		
		//Collect any invalid fields
		if(!isValid) {
			//If anything is bad the whole function return is bad
			returnValue = false;
			//Apply the visual styles indicating which fields are invalid...
			helper.errorInput(component, helper, myFormInput, true);
			//...and track them in the array
			invalidFields.push(myFormInput);
		} else {
			//Remove the visual styles when the component is valid
			helper.errorInput(component, helper, myFormInput, false);
		}
	}
	
	//Map a collection for error display at the component level to us by the fields
	//Do this last at the end of the routine so it can get cleared if validation passes
	var myIncompleteFields = invalidFields.map(
		function(invalidField) {
			return invalidField.getLocalId();
		}
	);
	component.set("v.requiredFields",  myIncompleteFields);
	helper.displayIncompleteFields(component, helper, invalidFields);
	return returnValue;
},

/**
 * Display the required fields which do not have values.
 * @param component (Object) - Lightning framework object
 * @param helper (Object) - Lightning framework object
 * @param invalidFields (Array) - Lightning framework object
**/
displayIncompleteFields : function(component, helper, invalidFields) {
	for(var i=0; i < invalidFields.length; i++){
		//Update inline messaging if the component is there
		var validationMsg = component.find(invalidFields[i].getLocalId() + 'Required');
		if(validationMsg !== null){
			validationMsg.updateDisplay();
		}
	}
}
```
---

# Demo code overview

The metadata for this example can be found under the [mdapi](./mdapi) folder.

The Salesforce CLI version of this code can be found under the [dx](./dx) folder.

## Installing via the Salesforce CLI

This assumes you have already installed the [Salesforce CLI]() and [Connected the Salesforce CLI to your org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm).

However, the Salesforce CLI can be used with any org and does not require Salesforce DX to be enabled. (Although enabling the DX / Dev Hub would give some great benefits, and would only require care of [certain object permissions: Scratch Org Info, ActiveScratchOrg, NamespaceRegistry](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_add_users.htm) - as they are not available in all orgs)

**1.** Run the following command:

	sfdx force:mdapi:deploy -d mdapi -u [[orgAlias]] -w

**2.** Add the permission set to your user

	sfdx force:user:permset:assign -n requiredLightningComponentDemo -u [[orgAlias]]
	
**3.** That's it, you can now open the org, and find the 'Comp. Validation Demo' app in the 'all tabs' search.

	sfdx force:org:open -u [[orgAlias]]