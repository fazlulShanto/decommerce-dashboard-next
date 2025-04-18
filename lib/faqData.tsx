export const faqData = {
  commands: {
    products: {
      title: "Product Management",
      description: "Commands for managing your store's products and inventory",
      commands: [
        {
          name: "add-product",
          description: "Add a new product to your store",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/add-product",
          details:
            "Opens a form with the following fields to fill out:<br>- **Product Name**: The name of your product<br>- **Product Description**: Detailed description of the product<br>- **Price**: Numerical price value (e.g., 99.99)<br>- **Is Available**: Enter 'yes' or 'no' to set product availability",
        },
        {
          name: "list-products",
          description: "View all products in your store",
          permissions: ["Server Only"],
          premium: true,
          example: "/list-products",
          details:
            "Displays a list of all products with their names, prices, and availability status. Users can navigate through multiple products if there are many items in your inventory.",
        },
        {
          name: "delete-product",
          description: "Remove a product from your store",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/delete-product",
          details:
            "Provides an autocomplete dropdown of existing products. Select the product you want to delete and confirm the deletion. This action permanently removes the product from your inventory.",
        },
        {
          name: "update-product",
          description: "Modify an existing product's details",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/update-product",
          details:
            "First select a product via autocomplete, then a form opens with these pre-filled fields:<br>- **Product Name**: Edit the product name<br>- **Product Description**: Modify the product description<br>- **Price**: Update the product price<br>- **Is Available**: Change availability status ('yes' or 'no')",
        },
        {
          name: "product-details",
          description: "View detailed information about a specific product",
          permissions: ["Server Only"],
          premium: true,
          example: "/product-details",
          details:
            "Select a product from the autocomplete dropdown to view its comprehensive details including name, description, price, availability status, and when it was added or last updated.",
        },
      ],
    },
    utility: {
      title: "Utility Commands",
      description: "Basic utilities and bot information commands",
      commands: [
        {
          name: "ping",
          description: "Check if the bot is online and responsive",
          permissions: ["Administrator"],
          premium: false,
          example: "/ping",
          response: "Bot is up and running!🚀",
        },
        {
          name: "server-info",
          description: "Display information about the current Discord server",
          permissions: ["Server Only"],
          premium: false,
          example: "/server-info",
          response:
            "Shows server name, creation date, member count, and other server details",
        },
        {
          name: "premium",
          description:
            "Check the server's premium status and trial information",
          permissions: ["Server Only"],
          premium: false,
          example: "/premium",
          details:
            "Shows premium status, trial information, and expiry dates. Displays remaining time for trial/premium subscription and when they started/expire.",
        },
        {
          name: "health-check",
          description: "Check the bot's system health and performance",
          permissions: ["Administrator"],
          premium: false,
          example: "/health-check",
          response:
            "Displays bot uptime, memory usage, and system performance metrics",
        },
        {
          name: "sales-stats",
          description: "View sales statistics and analytics for your store",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/sales-stats",
          details:
            "Shows comprehensive sales data including total revenue, most popular products, transaction counts, and sales trends over time. Useful for tracking store performance.",
        },
      ],
    },

    payments: {
      title: "Payment Management",
      description: "Commands for setting up and managing payment methods",
      commands: [
        {
          name: "add-payment-method",
          description: "Add a new payment method to your store",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/add-payment-method",
          details:
            "Opens a form with the following fields:<br>- **Payment Method Name**: Name of the payment method (e.g., PayPal, Bank Transfer)<br>- **Payment Method Emoji** (Optional): An emoji to represent the payment method<br>- **QR Code Image Link** (Optional): URL to a QR code image for scanning payments<br>- **Phone Number**: Contact number associated with the payment method",
        },
        {
          name: "delete-payment-method",
          description: "Remove an existing payment method",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/delete-payment-method",
          details:
            "Select a payment method from the autocomplete dropdown and confirm to permanently remove it from your available payment options.",
        },
        {
          name: "list-payment-methods",
          description: "View all configured payment methods",
          permissions: ["Server Only"],
          premium: true,
          example: "/list-payment-methods",
          details:
            "Displays all payment methods available in your store with their names, associated phone numbers, and QR codes if available.",
        },
        {
          name: "payment-method-details",
          description:
            "View detailed information about a specific payment method",
          permissions: ["Server Only"],
          premium: true,
          example: "/payment-method-details",
          details:
            "Select a payment method from the dropdown to view its full details including name, contact information, QR code, and when it was added or last updated.",
        },
        {
          name: "update-payment-method",
          description: "Modify an existing payment method's details",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/update-payment-method",
          details:
            "First select a payment method, then edit any of its properties in the form including name, emoji, QR code link, and phone number. All fields are pre-filled with current values.",
        },
      ],
    },
    sales: {
      title: "Sales Commands",
      description: "Commands for handling purchase transactions",
      commands: [
        {
          name: "buy",
          description: "Purchase a product from the store",
          permissions: ["Server Only"],
          premium: true,
          example: "/buy",
          details:
            "Starts the purchase process with these steps:<br>1. Select a product from the autocomplete dropdown<br>2. View product details and price<br>3. Choose a payment method from buttons that appear<br>4. Receive payment instructions and order confirmation<br>5. The order is tracked in the system for fulfillment",
        },
      ],
    },
    order: {
      title: "Order Management",
      description: "Commands for tracking and managing customer orders",
      commands: [
        {
          name: "list-orders",
          description: "View all orders in the system",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/list-orders",
          details:
            "Displays a paginated list of all orders with order IDs, customer names, products purchased, and current status (pending, confirmed, delivered, or canceled).",
        },
        {
          name: "order-details",
          description: "View detailed information about a specific order",
          permissions: ["Server Only"],
          premium: true,
          example: "/order-details",
          details:
            "Select an order ID to view comprehensive details including customer information, product details, payment method, transaction amount, payment status, and delivery status.",
        },
        {
          name: "cancel-order",
          description: "Cancel a pending order",
          permissions: ["Server Only"],
          premium: true,
          example: "/cancel-order",
          details:
            "Select an order from the dropdown and provide a reason for cancellation. Only orders in 'pending' status can be canceled. Both customers and admins can cancel orders, but customers can only cancel their own orders.",
        },
        {
          name: "confirm-order",
          description: "Confirm payment receipt for an order",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/confirm-order",
          details:
            "After verifying payment, admins can select an order to mark it as confirmed. This updates the order status and notifies the customer that their payment has been received and the order is being processed.",
        },
      ],
    },
    delivery: {
      title: "Delivery Management",
      description: "Commands for handling product delivery",
      commands: [
        {
          name: "delivery-product",
          description: "Mark a product as delivered to the customer",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/delivery-product",
          details:
            "After fulfilling an order, admins select the order ID from the dropdown and can add optional delivery notes or tracking information. This marks the order as 'delivered' and sends a notification to the customer. Completes the order lifecycle.",
        },
      ],
    },
    setup: {
      title: "Store Setup",
      description: "Commands for configuring your store settings",
      commands: [
        {
          name: "config-store",
          description: "Configure initial store settings",
          permissions: ["BotAdmin", "Server Only"],
          premium: true,
          example: "/config-store",
          details:
            "Sets up your store with the following required options:<br>- **Bot Admin Role**: Select a Discord role that will have administrative access to the bot<br>- **Currency**: Specify the currency for your store (e.g., USD, EUR, GBP)<br>Note: This command can only be run by the server owner or server administrators.",
        },
        {
          name: "view-store-config",
          description: "View current store configuration",
          permissions: ["Server Only"],
          premium: true,
          example: "/view-store-config",
          details:
            "Displays all current store settings including currency, bot admin role, and other configuration details. Useful for verifying your store setup.",
        },
      ],
    },
  },
  permissions: {
    Administrator:
      "Discord administrator permission - User must have the Administrator permission in the Discord server",
    ServerOnly:
      "Command can only be used in a server, not in direct messages with the bot",
    BotAdmin:
      "User must have the configured Bot Admin role in the server - This role is set using the /config-store command",
    BotDevAdmin:
      "User must be a bot developer or administrator - This is configured at the bot level and not within servers",
    PremiumOrTrial:
      "Server must have an active premium subscription or be in the trial period to use these features",
  },
  premium_features: {
    title: "Premium Features",
    description:
      "Features available only with a premium subscription or during trial period",
    features: [
      "Full e-commerce functionality for selling products on Discord",
      "Comprehensive product management system with inventory tracking",
      "Multiple payment method processing options",
      "Complete order tracking and management system",
      "Detailed sales statistics and analytics for business insights",
      "Custom store configuration with currency settings",
      "Digital product delivery system",
      "Customer order management and notifications",
    ],
    trial_info:
      "All new servers get a 3-day free trial of premium features. Use /premium to check your trial status.",
  },
};
