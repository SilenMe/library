import { LightningElement, wire, track } from 'lwc';
import getbook from '@salesforce/apex/library.getbook';
import issuebook from '@salesforce/apex/library.issuebook';
import getBookListByname from '@salesforce/apex/library.getBookListByname';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
export default class Searchbook extends LightningElement {

    @track columns = [
        { label: 'Id', fieldName: 'Name' },
        { label: 'Book Name', fieldName: 'Book_Name__c' },
        { label: 'Book Status', fieldName: 'Book_Status__c' },
        { label: 'Return Date', fieldName: 'Return_Date__c' }
    ];

    @track BookList;

    @track lstSelectedLeads;
    @track m;



    searchType = 'Category'
    searchKey = ''
    searchValue = '' //passing value to button on click
    visibleContacts //pagination
    totalContacts //pagination


    @track BookList;

    @wire(getbook) wiredBooks({ data, error }) {
        if (data) {
            this.BookList = data;
            console.log(data);
        } else if (error) {
            console.log(error);
        }
    }


    getSelectedRec() {

        var selectedRecords =
            this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords are ', selectedRecords);
        this.lstSelectedLeads = selectedRecords;

        issuebook({ obj: this.lstSelectedLeads }).
        then(result => {
            this.m = result;
        }).
        catch(error => { this.b = error; })

        alert("Success");
        return refreshApex(this.refrextable);


    }


    handleRowSelection = event => {
        var selectedRows = event.detail.selectedRows;
        if (selectedRows.length > 2) {
            var el = this.template.querySelector('lightning-datatable');
            selectedRows = el.selectedRows = el.selectedRows.slice(1);
            this.showNotification();
            event.preventDefault();
            return;
        }
    }

    showNotification() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Only 3 Books Can be Issued at One Time',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(event);
    }




    @wire(getBookListByname, { param: '$searchType', type: '$searchKey' })

    wiredContact(value) { //pagination
        this.refrextable = value;
        const { error, data } = value;
        if (data) {
            this.totalContacts = data
            console.log(this.totalContacts)
        }
        if (error) {
            console.error(error)
        }
    }



    updateContactHandler(event) { //pagination
        this.visibleContacts = [...event.detail.records];
        console.log(event.detail.records);
    }


    handleData(response) {
        this.accounts = response.data;

    }



    getSearchValue(event) {
        this.searchValue = event.target.value;

    }

    handleSearchKeyChange(event) {

        this.searchKey = this.searchValue;

    }

    byName(event) {

        this.searchType = 'Name';

    }
    byid(event) { //to pass value from input to button

        this.searchType = 'id';

    }
    byCategory(event) { //to pass value from input to button

        this.searchType = 'Category';

    }
    byAuthor(event) { //to pass value from input to button

        this.searchType = 'Author';

    }






}