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

        //$A.util.addClass(component.find('level2'), 'slds-is-disabled');
        //$A.util.addClass(component.find('level2'), 'JABRA');

        //var myInputField = component.find('level2');
        //var level0 = component.find('level0');
        //$A.util.addClass(level0, 'slds-has-error');
        
        //var level2 = component.find('level2');
        //$A.util.addClass(level2, 'slds-has-error');

        //debugger;

        //$A.util.addClass(myInputField, 'slds-input[disabled]');
        //$A.util.addClass(myInputField, 'slds-input');
        //$A.util.addClass(myInputField, 'slds-input custom-disabled');
                
        //component.set('v.level2Classes', '');
    },
    
    onRender : function(cmp, helper) {
        //var ret = this.superRender();
        //do custom rendering here
        console.info('render ran');
        //return ret;
    },

    onAfterRender: function (component, helper) {
        //this.superAfterRender();
        //interact with the DOM here
        console.info('afterRender ran');
    },

    doneRendering: function (component, event, helper)
    {
        if(!component.get("v.isDoneRendering"))
        {
            component.set("v.isDoneRendering", true);
            //do something after component is first rendered
          
            console.info('doneRendering ran');
            //This sort of works but what we need to do is apply it to the individual input field - not the label
            const css = 'custom-disabled'; //'slds-is-disabled';
            var level0 = component.find('level0');
            $A.util.addClass(level0, css);
            var level2 = component.find('level2');
            $A.util.addClass(level2, css);

            //console.info(component.find('level0').getElements());

            //component.find('level0')

            //debugger;

            //component.getElement().querySelector("input").style.setProperty('background-color','#ff0000');
            //document.getElementByName('level0').style.setProperty('background-color','#ff0000');
            
            var level2 = component.find('level2');
            $A.util.addClass(level2, css);
            /*
            this.superAfterRender();
            // interact with the DOM here
            var level0 = component.find('level0');
            $A.util.addClass(level0, 'slds-is-disabled');
            
            var level2 = component.find('level2');
            $A.util.addClass(level2, 'slds-is-disabled');

            //Something else to try
            var element = component.getElement('level0').classList.add("slds-active");
            */
        }
    },

    blah : function(component, event, helper)
    {
        console.info('onRender ran');
        
        var level0 = component.find('level0');
        $A.util.addClass(level0, css);
        var level2 = component.find('level2');
        $A.util.addClass(level2, css);

        /*
        //console.log("component.getElements(): ", component.getElements());
        
        //if(!component.get("v.isDoneRendering"))
        //{
            //component.set("v.isDoneRendering", true);
            
            var level0 = component.find('level0');
            $A.util.addClass(level0, 'slds-is-disabled');
            
            var level2 = component.find('level2');
            $A.util.addClass(level2, 'slds-is-disabled');
        //}
        */
    }
})