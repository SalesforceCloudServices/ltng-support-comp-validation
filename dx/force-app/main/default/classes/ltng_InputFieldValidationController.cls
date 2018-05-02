public with sharing class ltng_InputFieldValidationController
{
	@AuraEnabled
    public static List<ltng_InputFieldValidationData> getInputFieldValidationData()
    {
        // Perform isAccessible() check here
		
        // ltng_InputFieldValidationData is a simple "wrapper" Apex class for transport
        List<ltng_InputFieldValidationData> returnValue = new List<ltng_InputFieldValidationData>();
        List<ltng_CompValidationBase__c> items = [SELECT Id, Name, Status__c, Level1__c, Level2__c, Level3__c, Level4__c, Level5__c FROM ltng_CompValidationBase__c LIMIT 5];
        
        for (ltng_CompValidationBase__c item : items)
        {
            returnValue.add(new ltng_InputFieldValidationData(item.Id, item.Name, item.Status__c, item.Level1__c, item.Level2__c, item.Level3__c, item.Level4__c, item.Level5__c));
        }
        
        return returnValue;
    }
}