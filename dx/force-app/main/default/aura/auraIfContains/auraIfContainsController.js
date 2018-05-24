({
  doValidation : function(component, event, helper) {
    var myList = component.get('v.items');
    var myElement = component.get('v.element');
    var myElementIndex = myList.indexOf(myElement);
    //if myElementIndex is not equal to -1 it's means the list contains this element.
    if(myElementIndex != -1){
      component.set('v.condition', true);
    }else{
      component.set('v.condition', false);
    }
  },

  clearDisplay : function(component, event, helper) {
      component.set('v.condition', false);
  }
});