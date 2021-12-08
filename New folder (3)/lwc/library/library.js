import { LightningElement, wire, track } from 'lwc';
import getBookList from '@salesforce/apex/AccountController.getBookListByname';
import Create1 from '@salesforce/apex/InsertintoCart.Create1';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const actions = [
    { label: 'Borrow Book', name: 'borrow_book' },
];

export default class SearchBook extends LightningElement {

    @track accounts
    searchType = 'Name'
    searchKey = ''
    searchValue = '' //passing value to button on click
    visibleContacts //pagination
    totalContacts //pagination



    @track columns = [

        {
            label: 'BookId',
            fieldName: 'Name',
            type: 'text',
        },

        {
            label: 'Book Name',
            fieldName: 'Book_Name__c',
            type: 'text',
        },

        {
            label: 'Book Status',
            fieldName: 'Book_Status__c',
            type: 'text',
        },

        {
            label: 'Return Date',
            fieldName: 'Return_Date__c',
            type: 'text',
        },
        {
            label: 'Issue Date',
            fieldName: 'Issue_Date__c',
            type: 'text',
        },
        {
            label: 'User ID',
            fieldName: 'LastModifiedById',
            type: 'text',
        },
        {
            label: 'Author',
            fieldName: 'Author__c',
            type: 'text',
        },

        {
            type: 'action',

            typeAttributes: { rowActions: actions },
        },




    ]



    handleRowAction(event) {

        const actionName = event.detail.action.name;

        const row = event.detail.row;

        switch (actionName) {

            case 'borrow_book':



                break;



            default:

        }

    }



    @wire(getBookList, { param: '$searchType', type: '$searchKey' })

    wiredContact({ error, data }) { //pagination
        if (data) {
            this.totalContacts = data
            console.log('this.totalContacts')
            console.log(this.totalContacts);
            console.log(this.totalContacts[0]);
            console.log(this.totalContacts[0]["LastModifiedById"]);
            this.totalContacts[0]["Author__c"] = "newid";
            console.log(this.totalContacts[0]["LastModifiedById"]);

        }
        if (error) {
            console.error(error)
        }
        // console.log(this.totalContacts);
        // console.log(this.totalContacts[0]);
        // console.log(this.totalContacts[0]["LastModifiedById"]);
        // this.totalContacts[0]["LastModifiedById"] = "newid";
        // console.log(this.totalContacts[0]["LastModifiedById"]);
    }



    updateContactHandler(event) { //pagination
        this.visibleContacts = [...event.detail.records]
        console.log(event.detail.records)
        console.log('this.totalContacts')
    }


    handleData(response) {
        this.accounts = response.data

    }


    searchById(event) {



    }

    getSearchValue(event) { //to pass value from input to button

        this.searchValue = event.target.value

    }

    handleSearchKeyChange(event) {

        this.searchKey = this.searchValue //value passed to button from search input



    }
    byName(event) { //to pass value from input to button

        this.searchType = 'Name';
        this.flag5 = true;
        this.flag4 = false;

    }
    byId(event) { //to pass value from input to button

        this.searchType = 'Id';
        this.flag5 = true;
        this.flag4 = false;

    }
    byOwner(event) { //to pass value from input to button

        this.searchType = 'Owner';
        this.flag5 = true;
        this.flag4 = false;

    }
    byAuthor(event) { //to pass value from input to button

        this.searchType = 'Author';
        this.flag5 = true;
        this.flag4 = false;

    }
    byIssueDate(event) { //to pass value from input to button

        this.searchType = 'Issue Date';
        this.flag5 = true;
        this.flag4 = false;

    }
    byBookStatus(event) { //to pass value from input to button

        this.searchType = 'Book Status';
        this.flag5 = true;
        this.flag4 = false;

    }
    Author;
    BookName;
    Category;
    BookStatus;
    handleFormInputChange(event) {
        if (event.target.name == 'tag_name_0') {
            this.Author = event.target.value;
            console.log(this.Author);
        } else if (event.target.name == 'tag_name_1') {
            this.BookName = event.target.value;
        } else if (event.target.name == 'tag_name_2') {
            this.Category = event.target.value;
            this.BookStatus = 'Available';
        }


    }
    add(event) {
        console.log(this.Author);
        console.log(this.BookName);
        console.log(this.Category);
        console.log(this.BookStatus);
        const cart = {
            Author__c: this.Author,
            Book_Name__c: this.BookName,
            Book_Status__c: this.BookStatus,
            Category__c: this.Category

        }
        Create1({ con: cart })
            .then(() => {
                // this.rec={}; // Don't. You aren't clearing the value of rec properties, you're removing them. So everywhere you're using them you'll get an error because they will be now undefined properties.
                // this.cartName = null;
                // this.cartPrice = null;

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Added to Cart',
                        variant: 'success',
                    }),
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log('error', JSON.stringify(error));
            });


    }
    flag4 = false;
    flag5 = true;
    flag3(event) {
        this.flag4 = true;
        this.flag5 = false;
    }
}