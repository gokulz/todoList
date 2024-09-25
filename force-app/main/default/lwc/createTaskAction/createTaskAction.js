import { LightningElement } from 'lwc';
import {CloseActionScreenEvent} from 'lightning/actions';
export default class CreateTaskAction extends LightningElement {
    isAction=true;
    handleSave(){
        this.refs.createTodo.handleParentClick();
    }

     closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}