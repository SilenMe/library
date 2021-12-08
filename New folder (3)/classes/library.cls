/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-08-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class library {
  

 @AuraEnabled(cacheable=true)
 public static List<Book__c> getbook() {
                
return      
 [SELECT Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c  ];
        
            }


 
 @AuraEnabled(cacheable=true)
 public static List<Borrow__c> getborrow() {
                
return      
 [SELECT Name , Book_ID__c  , Book_Name__c, Issue_Date__c  , Return_Date__c FROM  Borrow__c where LastModifiedById=:UserInfo.getUserID()  ];
        
            }



            @AuraEnabled(cacheable=true)
            public static List<Borrow_History__c> getborrowhistory() {
                           
           return      
            [SELECT Name , Book_ID__c  , Book_Name__c, Book_Status__c ,Issue_Date__c  , Actual_Return_Date__c , Return_Date__c FROM  Borrow_History__c  ];
                   
                       }



                        







            @AuraEnabled
 public static Book__c issuebook(List<Book__c> obj)
 {
     
     List<Book__c> b1 = new List<Book__c>();
     Book__c up;
     Borrow__c g;
     
     for(Integer i=0 ; i < obj.size() ; i++){

         up = [select Issue_Date__c , Name , Book_Name__c ,Book_Status__c from Book__c where Name = : obj[i].Name  ];
         up.Book_Status__c = 'Borrowed';
         up.Issue_Date__c = system.today();
         update up;
         Borrow__c b = new Borrow__c(Book_ID__c = up.Name , Book_Name__c = up.Book_Name__c , Issue_Date__c = up.Issue_Date__c );
         insert b;
         g = [select Name from Borrow__c where Book_ID__c = : up.Name];
         Borrow_History__c e = new Borrow_History__c(Book_ID__c = up.Name , Book_Name__c = up.Book_Name__c , Name = g.Name , Issue_Date__c = up.Issue_Date__c , Book_Status__c = up.Book_Status__c  ) ;
         insert e;
         b1.add(up);
     }
       return up;

 }


 @AuraEnabled
 public static Integer returnbook(List<Borrow__c> obj)
 {
    Borrow__c up;
    Borrow_History__c e ;
    for(Integer i=0 ; i < obj.size() ; i++)
    {
        up = [select Name , Book_ID__c  , Book_Name__c, Issue_Date__c  , Return_Date__c from Borrow__c where Name = : obj[i].Name  ];
        Book__c dd = [SELECT Name , Book_Name__c , Book_Status__c , Return_Date__c , Issue_Date__c FROM  Book__c where Name = : up.Book_ID__c ] ; 
        dd.Book_Status__c = 'Available';
        dd.Issue_Date__c = null;
        
        e = [select Book_Status__c , Actual_Return_Date__c from Borrow_History__c where Name = : up.Name ];
        e.Book_Status__c = 'returned';
        e.Actual_Return_Date__c = system.today();
        update e;
        update dd;   
        delete up;
    }
     
     return 5;

 }
 
 @AuraEnabled(cacheable=true)
    public static List<Book__c> getBookListByname(String param,String type){
    String key = '%' + type + '%';
    if (param=='Name') return [select Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c where Book_Name__c like :key];

    else if (param=='id') 
    return [select Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c where Name like : key];

    
    else if (param=='Author') return [select Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c where Author__c like :key];

    else if (param=='Category') return [select Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c where Category__c like :key];
    else return [select Name , Book_Name__c , Book_Status__c , Return_Date__c FROM  Book__c where Name like :''];
    }


 



}