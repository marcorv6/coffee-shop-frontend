# Maloca Coffee Shop - API Contracts

This folder contains all API contract definitions for the Maloca Coffee Shop management system.

## Structure

```
contracts/
├── schemas/                 # Data model definitions
│   ├── user.yaml
│   ├── staff.yaml
│   ├── menu.yaml
│   ├── order.yaml
│   ├── transaction.yaml
│   ├── inventory.yaml
│   └── location.yaml
│
├── endpoints/               # API endpoint definitions
│   ├── auth.yaml
│   ├── users.yaml
│   ├── staff.yaml
│   ├── menu.yaml
│   ├── orders.yaml
│   ├── transactions.yaml
│   ├── inventory.yaml
│   └── dashboard.yaml
│
└── openapi.yaml            # Main OpenAPI specification
```

## Backend Stack

- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage (for images)
- **Hosting**: Firebase Hosting

## Collections Summary

| Collection | Purpose |
|------------|---------|
| `users` | User accounts and roles |
| `staff` | Employee details and schedules |
| `categories` | Menu categories |
| `menuItems` | Menu products |
| `orders` | Customer orders |
| `transactions` | Payment records |
| `inventory` | Stock management |
| `locations` | Store locations |

## Endpoint Count by Module

| Module | Endpoints |
|--------|-----------|
| Auth | 5 |
| Users | 6 |
| Staff | 7 |
| Menu | 6 |
| Orders | 8 |
| Transactions | 5 |
| Inventory | 6 |
| Dashboard | 3 |
| **Total** | **46** |
