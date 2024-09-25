public with sharing class TodoManager {
    @AuraEnabled
    public static string saveToDo(String title, Date dueDate){
        try {
            To_Do__c toDo = new To_Do__c();
            toDo.Title__c = title;
            toDo.Due_Date__c = dueDate;
            insert toDo;
            return 'Success';
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable =true)
    public static List<To_Do__c> getTodoList(String taskStatus){
        return [SELECT ID, Title__c, Due_Date__c FROM To_Do__c WHERE Status__c =:taskStatus
        ORDER BY Due_Date__c];
       }
    @AuraEnabled
    public static string updateToDo(Id todoId){
        try {
            To_Do__c todo = [SELECT Id, Status__c FROM To_Do__c WHERE Id=:todoId];
            todo.Status__c = 'Completed';
            update todo;
            return 'Success';
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}