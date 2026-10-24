Architecture

Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

Express requires predefined routing to navigate between pages and propagate information, whereas Angular allows for in-page interaction without forcing a reload, 
instead updating individual elements within the page's structure. This allows for interactions that would be more difficult to implement through traditional HTML pages, 
yet introduces additional complications when handling dynamic functionality.

Why did the backend use a NoSQL MongoDB database?

MongoDB was used for the backend because it utilizes a document-based structure which is conducive to many programming languages via import structure and is generally 
considered good practice to implement in simpler web applications so as to allow for horizontal scalability and overall usability. This also allows for Mongoose
interaction to be straightforward and direct via node implementation.

Functionality

How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?

JSON is a file format which holds generally readable information for a program or person to parse, whereas JavaScript is a programming language which is capable of utilizing 
such data.In this project, JSON was utilized to read and write information in order to enable the communication of such information throughout the entirety of the project's structure.

Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

An instance of refactoring involved replacing the original hardcoded trip information with records retrieved through the API, allowing changes to be reflected without manually updating 
individual pages. Likewise, the introduction of reusable components via Angular also meant that the same formatting and functionality could be applied to 
multiple trips without having to recreate the implementation for each one; this enabled aforementioned formatting consistencies via JSON to be dynamically updated and reflected.

Testing

Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

Endpoints ultimately determine where requests are sent, whether that be a physical device or machine, or software import/query/communication. Methods, such as GET, PUT, and POST,
establish what the application is intending to do with such requests. Testing in relation to endpoints and general security involves verifying endpoints, encoding where necessary so as to 
safely communicate information as needed, and ensuring input validation so as to maximize data safety.

Reflection

How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course has helped me understand how multiple architectures can exist and provide efficiency within a single development stack, as well as identify which existing architectures need to be 
modified to enable such interaction. I also gained experience working with Angular, Express, and MongoDB, alongside troubleshooting problems involving routing, authentication, and 
communication between different parts of the application.
