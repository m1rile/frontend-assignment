# Front-end assignment

This assignment is intended to give you an opportunity to demonstrate your skills in building a web application. You are provided with a simple prototype app built with Next.js in order to avoid having to set up the project, but feel free to add or change any other libraries that might be useful for you.

The topic of this assignment is *Credit Limits*. A credit limit represents the maximum amount of financing we are able to provide a given company. Our users can request a credit limit for a company (asking for a specific amount), and we need to be able to approve or decline the request.

A credit limit can be modelled using the following type: 

```typescript
interface CreditLimit {
  id: string; // Unique identifier of the credit limit (UUID)
  name: string; // Name of the company
  amount: number; // Amount of the credit limit
  siren: string; // SIREN number (identifier) of the company
  status: 'APPROVED' | 'DECLINED' | 'PENDING'; // Status of the credit limit
}
```

## Instructions

As a front-end or full-stack software engineer, you are asked to improve the prototype app by adding the following features:
- Add a new page that allows the user to submit a credit limit request
- Add the ability for a user to delete a credit limit
- Add the ability for a user to change the status of credit limit

Feel free to implement to implement those features in any way you see fit. Feel also free to change / refactor / redesign anything in the app. You will be assessed on the following criteria:
- Code quality
- User experience
- Look and feel

**You are not expected to spend more than 2.5 hours on this assignment. If you are not able to complete all the tasks in that time, it's definitely OK! We'll take that into account in our discussion.**

### Notes
- For the purpose of this exercise we'll assume there's only one kind of user (no authentication or permissioning required)

## API

The application includes a fake API that you can use to fetch and update credit limits. The API is available at the following URL: `http://localhost:3000/api/credit-limits`.

You can use the following endpoints:
- `GET /api/credit-limits` to fetch all credit limits
- `POST /api/credit-limits` to create a new credit limit
- `PATCH /api/credit-limits/:id` to update a credit limit
- `DELETE /api/credit-limits/:id` to delete a credit limit

You do not need to understand how the API or the fake DB work, but you can have a look at the code if you are curious (`pages/api/**/*.ts`).

## Getting started and submitting your assignment
You should start by forking this repository and then cloning it locally. You can then install the dependencies and start the app:

```shell
npm install
npm dev
open localhost:3000
```

Once you are done, send us the link to your repository. We will review your code and get back to you as soon as possible. You may also deploy the application online on any hosting service (e.g. Vercel), but it is not required.
