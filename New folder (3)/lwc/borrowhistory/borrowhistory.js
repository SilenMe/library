import { LightningElement, track, wire } from 'lwc';
import getborrowhistory from '@salesforce/apex/library.getborrowhistory';
import { refreshApex } from '@salesforce/apex';
export default class Borrowhistory extends LightningElement {



    @track columns = [
        { label: 'Id', fieldName: 'Name' },
        { label: 'Book ID', fieldName: 'Book_ID__c' },
        { label: 'Book Name', fieldName: 'Book_Name__c' },
        { label: 'Book Status', fieldName: 'Book_Status__c' },
        { label: 'Issue Date', fieldName: 'Issue_Date__c' },
        { label: 'Actual Return Date', fieldName: 'Actual_Return_Date__c' },
        { label: 'Return Date', fieldName: 'Return_Date__c' },
        { label: 'Due Amount', fieldName: 'Due_Amount_Paid__c' }

    ];

    @track BookList;

    @wire(getborrowhistory) wiredBooks(value) {
        this.refrextable = value;
        const { error, data } = value;
        if (data) {
            this.BookList = data;
            console.log(data);
        } else if (error) {
            console.log(error);
        }
    }

    renderedCallback()

    {

        return refreshApex(this.refrextable);

    }

    connectedCallback() {
        return refreshApex(this.refrextable);
    }



}