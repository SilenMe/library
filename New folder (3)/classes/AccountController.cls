/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-08-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class AccountController {
@AuraEnabled(cacheable=true)
    public static List<Book__c> getBookListByname(String param,String type){
    String key = '%' + type + '%';
    String selectedID = string.escapeSingleQuotes(type);
    if (param=='Owner') return [select Id, Name, Book_Status__c,  Return_Date__c, Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where LastModifiedById =:selectedID];
    else if (param=='Id') return [select Id, Name, Book_Status__c,  Return_Date__c, Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where Name like :key];

    else if (param=='Name') return [select Id, Name, Book_Status__c,  Return_Date__c, Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where Book_Name__c like :key];

    
    else if (param=='Author') return [select Id, Name, Book_Status__c,  Return_Date__c, Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where Author__c like :key];
    
    else if (param=='Book Status') return [select Id, Name, Book_Status__c,  Return_Date__c, Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where Book_Status__c like :key];
    else return [select Id, Name, Book_Status__c,  Return_Date__c,Book_Name__c, Issue_Date__c, LastModifiedById, Author__c from Book__c where Name like :''];
    }
}