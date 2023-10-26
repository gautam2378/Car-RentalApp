#CarRentApp

#Project Description

CarRentApp is a car rental application that caters to both regular users and admin users, allowing them to interact with the system seamlessly. Whether you're a user looking for the perfect rental car or an admin managing the rental agreements and vehicle inspections, CarRentApp has you covered.

#Features

#Regular User Flow

User Authentication: Users can log in to the application using valid credentials.

Car Search: Regular users can search for available cars based on various filters, including the car's make, model, and rental price.

Car Listing: The system displays a list of cars that match the user's search criteria.

Car Selection: Users can select a car from the list and specify the rental duration.

Rental Agreement: Once the rental duration is provided, the system generates a comprehensive rental agreement, including car information, rental duration (in days), total cost, and user details.

Rental Agreement Management: Users can view all their rental agreements in the "My Rental Agreements" tab. They can also edit rental agreement details before accepting them.

Rental Agreement Acceptance: Once a user accepts a rental agreement, it becomes final and cannot be edited or deleted.

Car Return Request: If a user wants to return the rented car, they can mark it as a "request for return."

#Admin User Flow

Rental Agreement Management: Admin users can view all rental agreements and have the authority to update or delete any rental agreement.

Vehicle Inspection: Admin users can validate all cars marked as "request for return" for conducting inspections.

Car Return Management: After the inspection is completed, the admin can mark the car as returned.

#Technology Stack

Frontend: React, Redux, React Router
Backend: ASP.NET
IDE: Visual Studio Code
Hosting: Surge
Frontend Setup Instructions
Install the Dependencies from npm.

$ npm i
Run the Server and see the demo at http://localhost:3000/.

$ npm start
Backend Setup Instructions
Restore the application.

$ dotnet restore
Build the application.

$ dotnet build
Run the application.

$ dotnet run

With CarRentApp, we aim to provide a seamless car rental experience for users while giving admin users the tools they need to manage the rental process efficiently. Feel free to explore and contribute to this exciting project!
