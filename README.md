# RentHub — Web client

React + Vite frontend for the [RentHub](https://github.com/carolain3472/RentHub_backend)
peer-to-peer rental marketplace.

## Screens

| Area | Screens |
|---|---|
| Public | Landing, About us, Register, Login |
| Listings | Create object, Modify object, Rental form |
| My activity | My objects, Objects I rented out, Objects I acquired |
| Account | Settings, Messages |
| Payment | Checkout form, Pay button — talks to the payment service |

The rental screens follow the two-sided handover protocol the API defines: each
side sees only the action that is theirs to take at that point in the rental.

## The rest of the system

| Repository | Role |
|---|---|
| [RentHub_backend](https://github.com/carolain3472/RentHub_backend) | Django REST API |
| **RentHub_frontend** (this one) | React + Vite client |
| [RentHub_pago_microservicio](https://github.com/carolain3472/RentHub_pago_microservicio) | Node payment service, Stripe |

## Running it

```bash
cd RentHub_frontend
npm install
npm run dev
```

The API base URL is configured in the client's API module; point it at a running
backend before logging in.

## Known limitations

- No automated tests
- API base URL is hardcoded rather than read from the environment
- No loading or error states on several forms
