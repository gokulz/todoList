import { LightningElement } from 'lwc';

export default class TodoManager extends LightningElement {
    refreshToDo(){
        this.refs.pendingToDo.refreshList();
        this.refs.completedToDo.refreshList();
    }
}