import { LightningElement, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex';   
import getOrdersWithItems from '@salesforce/apex/OrderController.getOrdersWithItems';

export default class OrderManager extends LightningElement {
    // 2. Wire the method to a property
    wiredOrdersResult;
    orders;
    errors;

    @wire(getOrdersWithItems)
    wiredOrders(result) {
        this.wiredOrdersResult = result; // Store the entire result for refresh
        const { data, error } = result;
        if (data) {
            this.orders = data;
            this.errors = undefined;
        } else if (error) {
            this.orders = undefined;
            this.errors = error;
        }
    }

    handleRefresh() {
        // Refresh the wired data to get the latest orders and line items
        refreshApex(this.wiredOrdersResult);
    }

    selectedOrder;
    handleOrderSelect(event) {
        const orderId = event.target.value;
        this.selectedOrder = this.orders.find(order => order.Id === orderId);
    }
}
