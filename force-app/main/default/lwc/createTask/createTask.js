import { api, LightningElement } from 'lwc';
import saveToDo from '@salesforce/apex/TodoManager.saveToDo';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateTask extends LightningElement {
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;
    @api targetParent

    connectedCallback(){
        console.log('##TargetedParent: ' + this.targetParent);
    }

    handleChange(event){
        const fieldName = event.target.name;

        if(fieldName === 'taskTitle'){
            this.taskTitle = event.target.value;
            if(this.taskTitle != ''){
                this.showDueDate = true;
            } else{
                this.showDueDate= false;
            }
        } else if(fieldName === 'dueDate'){
            this.dueDate = event.target.value;
            if(this.dueDate != '' && this.targetParent != true){
                this.showSave = true;
            } else{
                this.showSave = false;
            }
        }
    }
    handleClick(){
       saveToDo({title:this.taskTitle, dueDate:this.dueDate})
       .then(result =>{
         if(result === "Success"){
            this.taskTitle = "";
            this.dueDate = "";
            
            const evt = new ShowToastEvent({
                title : 'Success',
                message : 'A new Item has been added to the todo list',
                variant : 'success'
            });
            this.dispatchEvent(evt);
           //when we do parnet to child communication we use @api function
           //but for child to parent communication we use customEvent
           this.dispatchEvent(new CustomEvent("refreshtodo"));
           if(this.targetParent === true){
               const selectedEvent = new CustomEvent('closeaction',{
                 detail : result
               });
               this.dispatchEvent(selectedEvent);
           }

         }
       }).catch((error) =>{
           console.log("Error " , error);
           const evt = new ShowToastEvent({
             title : 'Error',
             message : error.body.message,
             variant : 'error'
           });
           this.dispatchEvent(evt);
        //    //enable the save button
        //    this.showSave = true;
       })
    }

    @api
    handleParentClick(){
        this.handleClick();
    }
}