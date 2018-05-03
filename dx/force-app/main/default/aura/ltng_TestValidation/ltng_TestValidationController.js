({
	init : function(component, event, helper) {
        console.info('init ran');
        
		/*
		var options = [
            { value: "new", label: "New" },
            { value: "in-progress", label: "In Progress" },
            { value: "finished", label: "Finished" }
        ];
        component.set("v.comboOptions", options);
        */

        //Load initial record
        //helper.loadRecord(component, helper);

        $A.util.addClass(component.find('level2'), 'slds-is-disabled');
        $A.util.addClass(component.find('level2'), 'JABRA');

        component.set('v.level2Classes', 'custom-disabled');
	},
})