
## Plunge - The solana retail solution

NOTE: This project is currently on devnet, and to actually run it locally you will need to setup supabase with tables.

Plunge is a decentralized web application solution built on Solana that allows retailers to create their own stores and manage their products. The solution is designed to be used as an in-real-life payment checkout method for customers who want to pay using Solana. The solution is focused on offering a seamless and secure payment experience for customers while providing retailers with an easy-to-use platform to manage their stores.

### Features

Plunge offers several features for retailers to create and manage their stores. These features include:

- **Multiple stores**: Retailers can create and manage multiple stores on the Plunge platform, each with its own set of products.
- **Product management**: Retailers can add products to their stores with a name, price, and icon. They can also manage the product quantity and add new products as needed.
- **Checkout**: Retailers can add products to the checkout for customers to purchase.
- **Store views**: Retailers can switch between the store owner (admin) view and public view using a toggle.
- **Analytics**: Plunge provides analytics for recent transactions, daily sales, and total revenue.
- **Transaction tracking**: When a payment is made, the order ID of the purchase is trackable on-chain.
- **Test checkout**: Retailers can test out checkout QR codes immediately to ensure they are working correctly.

### Checkout methods

**Store-checkout** ✅

When a customer wants to pay for a product, the retailer will select the product in the Plunge application, and a Solana-pay QR code will pop up for the customer to scan. The customer can then pay the amount using Solana, and the retailer will receive payment confirmation. Once payment is confirmed, the customer can leave the store.

**Self-checkout** ⏳

One of the options offers a self-checkout method for customers who prefer to select and pay for their products themselves. In this method, customers can use the Plunge application to select the products they want to purchase, and a Solana-pay QR code will appear that accepts Solana payments. Once payment is confirmed, the customer will receive a receipt in their wallet in the form of a compressed NFT, which can be used as evidence to leave the store.

**Online-checkout** ⏳

In addition to its offline and self-checkout options, Plunge also offers an online checkout solution that allows retailers to easily turn their store into a webshop. Plunge's online checkout option is designed to be user-friendly and intuitive, making it easy for retailers to set up and manage their online store.

### Tech-stack

- **NextJS**
- **Supabase**
- **SCSS**


### Resources

gitbook: https://plunge.gitbook.io/plunge/

### Application flow

![store-checkout-flow-final](https://user-images.githubusercontent.com/24295554/225170565-67b3e546-a781-48ab-a24b-7d89c1c6abd1.png)

## Getting Started

### .env

- Next Auth
- Supabase keys

NEXTAUTH_URL=*

NEXTAUTH_SECRET=*

NEXT_PUBLIC_SUPABASE_URL=*

NEXT_PUBLIC_SUPABASE_KEY=*

### Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
