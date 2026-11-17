# StudHub Project Checklist

StudHub is a LEGO marketplace for finding hidden LEGO gems. Visitors can browse listings, buy items, and eventually apply to become sellers. Approved sellers will be able to list LEGO, while administrators will eventually manage listings and seller approvals.

The project uses Node.js, Express, EJS, PostgreSQL, and a simple MVC-style structure. The current priority is to finish a dependable prototype before adding authentication, seller workflows, uploads, checkout, or payments.

## Current project baseline

These pieces are working or substantially complete:

- Express application starts with the configured development command.
- ES modules are enabled.
- EJS is configured with `src/views` as the view directory.
- `public/` is served for CSS and other static assets.
- PostgreSQL is connected through `src/models/db.js` and `DATABASE_URL`.
- Startup tests the database connection.
- Shared header and footer partials are rendered on the pages.
- Shared CSS tokens and main layout styles exist.
- Page-specific CSS is loaded through middleware and route configuration.
- The current route map includes:
  - `/` - home page
  - `/products` - available product listings
  - `/cart` - cart placeholder
  - `/orders` - orders placeholder
- The `listings` table exists in PostgreSQL.
- The listings model retrieves available rows from PostgreSQL.
- The products controller passes database results to `products.ejs`.
- The products page renders listing names, descriptions, images, and prices.
- Git milestones have been committed.

## Current database model

The current `listings` table contains:

- `id`
- `seller_id`
- `listing_name`
- `description`
- `price`
- `condition`
- `completion_percent`
- `image_url`
- `status`
- `created_at`
- `updated_at`

The database currently uses temporary listing data. `seller_id` is present, but a real users table and seller relationship have not been implemented yet. Image URLs are currently temporary and will eventually be replaced or supplemented by S3/object storage.

## Week 3 goal

By the end of Week 3, StudHub should feel like one coherent marketplace prototype. Visitors should be able to browse real database listings, understand the planned cart and order experience, read about the marketplace, and find contact information. Persistent purchasing and seller accounts remain future work.

## Week 3 tasks

### 1. Finish the products browsing experience

- Confirm the products page works after a server restart.
- Confirm only listings with `status = 'available'` appear.
- Display condition and completion percentage on each listing card.
- Make sure price formatting is consistent.
- Make sure every image has useful alternative text.
- Decide what should happen when no available listings exist.
- Add a product detail route such as `/products/:productId`.
- Add a product detail model function that retrieves one listing by ID.
- Return an intentional not-found result for an invalid product ID.

### 2. Complete the cart placeholder

- Show the intended cart structure.
- Include product name, quantity, price, subtotal, and total concepts.
- Show an empty-cart state.
- Include a clear checkout placeholder or disabled state.
- Explain in project notes that the cart is not persistent yet.
- Do not add sessions or persistent cart storage yet.

### 3. Complete the orders placeholder

- Explain what users will eventually see on the orders page.
- Add an empty-order state.
- Show a clear message that order history is not implemented yet.
- Do not create order records until the user and checkout design is ready.

### 4. Add the information pages

- Add an `/about` route and view.
- Explain StudHub's purpose and intended audience.
- Explain the marketplace approach: buyers browse, sellers apply, and admins approve sellers.
- Add a `/contact` route and view.
- Include contact information or a nonfunctional contact form layout.
- Record which fields and validation rules a future contact form will need.

### 5. Improve route and middleware organization

- Keep `server.js` responsible for application startup and configuration.
- Keep route registration in `src/controllers/routes.js`.
- Keep page handlers in feature-specific controller files.
- Keep database access in model files.
- Keep shared response behavior, such as page-specific CSS registration, in middleware.
- Confirm the default asset middleware is registered before the main router.
- Confirm route-specific CSS is only loaded on the pages that need it.
- Add error handling around database-backed controller operations.

### 6. Apply responsive visual polish

- Test the home and products pages at a narrow mobile width.
- Test the pages at a normal desktop width.
- Make sure navigation remains usable at both widths.
- Make sure product cards remain readable and consistent.
- Make sure images use consistent dimensions and cropping.
- Style the cart, orders, about, and contact pages with the same tokens.
- Keep the native nested CSS approach used by the project.

### 7. Add basic reliability

- Add a friendly 404 page.
- Add a basic 500/server-error page.
- Add the final not-found handler after normal routes.
- Add the final error handler after the not-found handler.
- Avoid showing database details to normal visitors.
- Show useful diagnostic details only in development.
- Test an invalid URL directly in the browser.
- Test the products route while the database is unavailable and provide an understandable result.

## Week 3 review

- Does `/products` display data from PostgreSQL after a restart?
- Does an invalid product ID receive an intentional response?
- Are cart and orders clearly presented as prototype placeholders?
- Are about and contact pages available?
- Do all pages use the shared header and footer?
- Does page-specific CSS load correctly?
- Does the layout work on mobile and desktop widths?
- Are database errors handled without exposing sensitive details?

## Deferred until the prototype is stable

- Users table and account registration.
- Login, password hashing, and sessions.
- Seller applications and seller approval workflows.
- Admin listing management.
- Foreign-key enforcement from listings to users.
- S3 or other object storage for seller-uploaded images.
- Persistent carts.
- Orders, order items, checkout, and payments.
- Inventory updates and sold-listing workflows.
- Email notifications.
- Production security hardening.

Before beginning each deferred feature, document its data fields, routes, validation rules, permissions, and success/error states.

## Next three priorities

1. Add product detail pages using `/products/:productId`.
2. Finish the cart, orders, about, and contact placeholder pages.
3. Add 404/500 handling and complete responsive testing.

## Week 3 completion milestone

Commit the Week 3 prototype after the products flow, placeholder pages, error handling, and responsive checks have been tested in the browser.
