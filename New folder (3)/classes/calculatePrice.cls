/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-08-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class calculatePrice {
     @AuraEnabled(cacheable=true)

    public static Decimal getReturnList() {

        List<Borrow__c> books = [SELECT Id,Return_Date__c from Borrow__c WHERE OwnerId =:UserInfo.getUserID() ];
		Decimal a= 0;
        Decimal b= 0;
        for(Borrow__c book : books){ 
            Date startDate = book.Return_Date__c;

            Date endDate = date.today() ;
            
            Integer noOfDays = startDate.daysBetween( endDate );
            if(noOfDays >0){
            if(noOfDays <= 3){
                
                b = noOfDays * 20;
            }
            else {
                Integer days = noOfDays - 3;
                b = 60 + (days * 50);
            }
            a+=b;
            }
        }
        
        return a;
        }}