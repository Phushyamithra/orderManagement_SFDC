public with sharing class OrderController {
    
    @AuraEnabled(cacheable=true)
    public static List<Marketplace_Order__c> getOrdersWithItems() {
        try {
            // Note: Use the actual API names you created in Phase 0
            return [
                SELECT Id, Name, Status__c, Total_Amount__c, Order_Date__c,
                    (SELECT Id, Name, Quantity__c, Unit_Price__c 
                     FROM Order_Line_Items__r) // Using the Child Relationship Name
                FROM Marketplace_Order__c
                ORDER BY CreatedDate DESC
                LIMIT 50
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching orders: ' + e.getMessage());
        }
    }
}