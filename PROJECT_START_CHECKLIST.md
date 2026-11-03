# LEGO Ecommerce Project: Four-Week Starting Plan

This plan is based on the structure and lessons from the CSE340 practice project. It uses the same general Express, EJS, MVC-style organization, but applies it to a LEGO ecommerce site.

The goal of these four weeks is to create a clean, navigable store foundation. The site will use placeholder product data at first. Database creation, accounts, persistent carts, checkout, and payments are intentionally deferred until this foundation is working.

## How to use this plan

- Work through the weeks in order, but adjust the pace to your class schedule.
- Mark a task complete only after testing it in the browser.
- Commit after each meaningful milestone.
- Keep a short notes file for decisions, questions, and problems.
- Keep the scope small. A complete, understandable foundation is more valuable than many unfinished features.

## End-of-month goal

At the end of four weeks, the project should:

- Start with a documented development command.
- Have a clear LEGO-store concept and visual direction.
- Use a predictable Express/MVC-style folder structure.
- Render shared EJS header and footer partials.
- Have working home, catalog, product detail, cart, about, and contact pages.
- Display several example products using temporary data.
- Load CSS and image assets correctly.
- Include a friendly 404 page and basic 500/error handling.
- Work at both mobile and desktop widths.
- Be documented well enough to continue into database planning.

---

# Week 1: Plan the store and build the application foundation

## Week 1 outcome

By the end of Week 1, the project should start successfully and have an organized application shell with placeholder pages.

## 1. Define the smallest version of the store

- Write the project idea in one paragraph. StudHub is the place to find hidden LEGO gems. Whether it's the minifigure you've always wanted or the nostalgic set you never got, search for it on the Hub. Users can buy items, but they can also apply to sell. If they are approved, they can list their lego and sell it. Admins will have the ability to delete listings and approve sellers.
- Decide what the store sells: LEGO sets, themes, accessories, or a specialty collection.
- Decide who the store is for.
- Choose a temporary project and store name.
- Choose 6–12 example products to use during development.
- Decide what information each product needs:
  - Listing name
  - Short description
  - Price
  - Condition
  - Completion %
  - Product image
- Write the basic visitor journey: home page → catalog → product detail → future cart → store/contact information.

## 2. Create the project foundation

- Create the new project folder.
- Initialize the Node project.
- Use the basic stack from the practice project: Node.js, Express, EJS, and Nodemon.
- Decide whether to use ES modules, matching the practice project if appropriate.
- Add development and start commands.
- Confirm the local port.
- Create the local environment file.
- Verify that environment files and generated folders are ignored by version control.
- Create the initial repository commit after the empty app starts successfully.

## 3. Create the folder structure

Use the practice project as a starting pattern:

- `server.js` — application startup and server configuration.
- `src/controllers/` — route handlers and page-level request logic.
- `src/models/` — reserved for data access and business rules later.
- `src/middleware/` — shared request/response behavior.
- `src/views/` — EJS templates.
- `src/views/partials/` — shared header, navigation, and footer.
- `public/css/` — stylesheets.
- `public/images/` — product and brand images.
- `public/js/` — browser-side JavaScript only when needed.
- `notes.txt` or another planning file — decisions and questions.

Do not build database models yet. Reserve the location, but avoid unused infrastructure.

## 4. Configure the Express application

- Create the Express application.
- Serve the `public` directory for CSS and images.
- Configure EJS as the view engine.
- Point Express to the `src/views` directory.
- Enable parsing for normal form submissions.
- Register the main router after basic application configuration.
- Keep startup configuration separate from route-specific logic.
- Confirm that one test page renders.

## 5. Create the shared layout pieces

- Build a header partial with the store name, home link, catalog link, cart link, and about/contact link.
- Build a footer partial with the store name, basic copyright text, and useful links.
- Decide how page titles are passed into views.
- Check the header and footer on the first test page.

## Week 1 review

- Can the app start with one documented command?
- Is the folder structure easy to explain?
- Are secrets and local configuration protected?
- Does one page render with the shared header and footer?
- Have the project idea and first product list been written down?

---

# Week 2: Build the main store pages and browsing flow

## Week 2 outcome

By the end of Week 2, a visitor should be able to move from the home page to the catalog and then to an individual product detail page.

## 6. Create the route map

Plan and add placeholder routes for:

- `/` — home page
- `/catalog` — all products
- `/catalog/:productId` — product details
- `/cart` — cart placeholder
- `/about` — store/about page
- `/contact` — contact page or contact placeholder

For each route, decide which controller owns it, which view it renders, what title it needs, what information it needs, and how an invalid URL should behave.

Keep route registration separate from controller functions, as in the practice project.

## 7. Build the home page

- Add a clear store introduction.
- Add one primary call to action leading to the catalog.
- Add a featured-products section using temporary data.
- Add a short explanation of the store’s purpose or specialty.
- Make the page useful without a database.

## 8. Build the catalog page

- Show several example product cards.
- Give every card a consistent layout.
- Include the product image, name, category/theme, price, and detail link.
- Add a visible plan for an empty catalog.
- Leave room for future filtering and sorting without implementing complex filtering yet.

## 9. Build the product detail page

- Show a larger product image.
- Show all important product information.
- Include the price and availability label.
- Include a quantity concept and an add-to-cart control as a visual starting point.
- Add a link back to the catalog.
- Decide how an invalid product identifier should behave.

## 10. Add the first visual foundation

- Choose a small color palette inspired by LEGO without copying a specific brand layout.
- Choose readable heading and body fonts.
- Decide on spacing, border radius, button style, and card style.
- Create one main stylesheet for shared layout and reusable styles.
- Use page-specific stylesheets only when a page truly needs one.
- Style the header, navigation, footer, buttons, and product cards.

## Week 2 review

- Can a visitor navigate from home to catalog to product details?
- Do catalog links lead to the correct product pages?
- Are the product cards consistent?
- Do all pages use the shared header and footer?
- Do CSS and images load correctly?

---

# Week 3: Add cart, information pages, forms, and responsive polish

## Week 3 outcome

By the end of Week 3, the store should feel like a coherent ecommerce prototype, even though cart persistence and checkout are not implemented.

## 11. Build the cart placeholder

- Show the intended cart layout.
- Include product name, quantity, price, subtotal, and total concepts.
- Include an empty-cart message.
- Include a clear checkout placeholder or disabled state.
- Make it clear in the project notes that checkout is not implemented.
- Do not add persistent cart storage yet.

## 12. Build the about page

- Explain the store concept and intended audience.
- Describe the store’s specialty or point of view.
- Include basic store information.
- Make the page fit the same visual system as the rest of the site.

## 13. Build the contact page

- Add basic contact information or a contact form layout.
- Decide which fields a future form will need.
- Decide what validation, success, and error messages will eventually be needed.
- If the form does not submit anywhere yet, record that limitation clearly.

## 14. Improve visual consistency

- Apply the chosen colors, spacing, typography, and button styles across every page.
- Make product images use consistent dimensions and cropping.
- Keep class names descriptive and consistent.
- Add useful alternative text to meaningful images.
- Use development images that you are allowed to use.
- Record which images will need to be replaced or credited before deployment.

## 15. Check responsive behavior

- Test the site at a narrow mobile width.
- Test the site at a normal desktop width.
- Make sure navigation remains usable.
- Make sure product cards do not become too narrow or too wide.
- Make sure forms and buttons remain easy to use.
- Make sure text remains readable at every tested width.

## Week 3 review

- Does the site feel like one store rather than separate practice pages?
- Is the cart layout understandable even without persistence?
- Are the about and contact pages useful?
- Does the site work at mobile and desktop widths?
- Are placeholder features clearly distinguished from completed features?

---

# Week 4: Add reliability, test the project, and prepare for the next phase

## Week 4 outcome

By the end of Week 4, the foundation should be dependable, documented, and ready for database planning.

## 16. Add the error-page foundation

Based on the practice project:

- Create a friendly 404 page.
- Create a basic 500/server-error page.
- Add a final not-found handler after the normal routes.
- Add a final error handler after the not-found handler.
- Avoid exposing detailed internal errors to normal visitors.
- Add a development-only way to see enough information to debug problems.
- Test a deliberately invalid URL.

## 17. Test every page manually

For each route, verify that the page loads directly and through navigation, the title and heading are correct, the header and footer appear consistently, CSS and images load, links point to the correct paths, invalid product URLs have an intentional result, and the page works at mobile and desktop widths.

## 18. Check backend fundamentals

- Confirm that routes, controllers, views, and public assets have clear responsibilities.
- Confirm that route handlers do not contain unrelated markup or styling.
- Confirm that request data is not trusted blindly.
- Confirm that user-facing errors are understandable.
- Confirm that secrets and local configuration are not committed.
- Confirm that the server can restart cleanly after a change.
- Remove unused files, routes, and experiments that are no longer part of the project.

## 19. Write the project documentation

- Add the project name and purpose to the README.
- Document the development and start commands.
- Document required environment variable names without exposing secrets.
- Describe the folder structure briefly.
- List the currently working routes.
- List features that are placeholders.
- Record known problems and questions for class.
- Record which images or content need replacement before deployment.

## 20. Plan the database phase without implementing it

Before creating a database, write down:

- What information a product record will need.
- Whether categories or themes should be separate records.
- What information a future cart will need.
- What information an order will need.
- Which values must be validated.
- Which routes will eventually read or change data.
- Which parts of the current placeholder data can be replaced by database queries.

Do not create the database until the model and required relationships are understandable.

## 21. Create a final milestone commit

- Run through the full site once more.
- Confirm the README instructions work on a clean start.
- Review the repository for accidental secrets or generated files.
- Commit the completed four-week foundation.
- Write the next three features in priority order.

## Week 4 review

- Can another person start and understand the project?
- Can a visitor browse from home page to catalog to product detail?
- Are 404 and 500 errors handled intentionally?
- Are the limitations of the prototype documented?
- Is the project ready for database design?

---

# Features intentionally deferred past these four weeks

These are important, but should come after the foundation is working:

- PostgreSQL database creation and schema implementation.
- Seed scripts and database migrations.
- Product administration tools.
- User registration and login.
- Password hashing and session storage.
- Persistent carts.
- Checkout and payment processing.
- Order history.
- Inventory updates.
- Email notifications.
- Deployment configuration.
- Production security hardening beyond basic safe defaults.

Before starting each deferred feature, write down the data it needs, the routes involved, the validation rules, and the success/error states.

## Final question before moving forward

What is the next smallest feature that makes the store more useful while still keeping the project understandable?
