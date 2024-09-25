import { api, LightningElement, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import getTodoList from '@salesforce/apex/TodoManager.getTodoList';
import updateToDo from '@salesforce/apex/TodoManager.updateToDo';

export default class TodoList extends LightningElement {
  toDoList;
 @api taskStatus;

  get pageTitle(){
     return this.taskStatus + 'Tasks';
  }
  get showButton(){
      return this.taskStatus === 'Pending' ? true : false;
  }

  @wire(getTodoList,{ taskStatus : '$taskStatus'})
  wiredTodoList(result){
     this.wiredTodoListResult = result;
     if(result.data){
        this.toDoList = result.data;
     } else if(result.error){
        const evt = new ShowToastEvent({
            title : 'Error',
            message : result.error.body.message,
            variant : 'error'
        });
        this.dispatchEvent(evt);
     }
  }
  @api 
  refreshList(){
    refreshApex(this.wiredTodoListResult);
  }

  handleClick(event){
     updateToDo({todoId: event.target.dataset.recordid})
     .then((result) =>{
        if(result === 'Success'){
            const evt = new ShowToastEvent({
                title : 'Success',
                message : 'Task Completed',
                variant : 'success'
            });
            this.dispatchEvent(evt);
            this.dispatchEvent(new CustomEvent("refreshtodo"));
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
    });
  }
}