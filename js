import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';


// datatable columns
const columns = [
    {
        label: 'Name',
        fieldName: 'ConName',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, {
        label: 'FirstName',
        fieldName: 'FirstName',
        type: 'text',
    }, {
        label: 'LastName',
        fieldName: 'LastName',
        type: 'text',
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    }
];

export default class HyperlinkNameInDatatable extends LightningElement {
    consData = [];
    columns = columns;

    @wire(getContacts)
    contacts({ error, data }) {

        if (data) {
            let tempConList = []; 
            
            data.forEach((record) => {
                let tempConRec = Object.assign({}, record);  
                tempConRec.ConName = '/' + tempConRec.Id;
                tempConList.push(tempConRec);
                
            });
            
            this.consData = tempConList;
            this.error = undefined;

            console.table(this.consData);

        } else if (error) {
            this.error = result.error;
        }
    }
}
