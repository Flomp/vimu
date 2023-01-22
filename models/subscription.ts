interface Subscription {
    id: string;
    stripe_subscription_id: string;
    stripe_customer_id: string;
    status: string;
    user: string;
}

export { Subscription }