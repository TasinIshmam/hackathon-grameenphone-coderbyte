# Loaders
This is where you initialize everything in your application. For initializing things like database, network etc the code should go here. 

We also use this directory for loading up config files for the entire application.


**Conventions**
- For small applications a single config file is fine.
- For larger applications you might need to break them up into multiple files (At that point a separate config directory makes sense). 
- loaders should be called from app.js to initialize a specific thing (./loaders/network.js for network related initialization)
