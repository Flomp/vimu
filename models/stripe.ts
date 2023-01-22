interface StripeInvoice {
    id: string;
    total: number;
    status: "draft" | "open" | "paid" | "uncollectible" | "void"
    created: number;
    hosted_invoice_url: string
    number: string
}

export { StripeInvoice }