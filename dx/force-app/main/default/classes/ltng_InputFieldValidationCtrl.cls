/**
 * This is the controller to load the initial record for the demo
 * @author Tom Zarr
 **/
public with sharing class ltng_InputFieldValidationCtrl
{
    @AuraEnabled
    public static Id getInitialRecord()
    {
        Id result = null;
        ltng_CompValidationBase__c record = null;
        try
        {
            record = [SELECT Id FROM ltng_CompValidationBase__c LIMIT 1];
            result = record.Id;
        }
        catch(Exception ex)
        {
            system.debug('unable to retireve initial record.');
            system.debug(ex.getMessage());
            throw new AuraHandledException('unable to retireve initial record.');
        }
        return result;
    }
}
