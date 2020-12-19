# Express Template

A template for medium sized express applications. Somewhat opinionated. 

### Stack

- MongoDB as Database
- EJS for Server Side Rendering
- Winston for Logging
- In memory cache (Change appropriately in production)
- In memory rate limiter (Change appropriately in production)



### Style Guide

- lowerCamelCase for variables/objects (lowerCamelCase should be the default pretty much everything)
- UpperCamelCase for class names
- kebab-case for file names 
- lowerCamelCase for mongodb collections, fields, models
- Reference: [Style Guide for NodeJS](https://github.com/felixge/node-style-guide)


### Conventions

- Store tests next to the code



### Logging To Console
 
* Import logger from services/logger.js. **Do not use console for logging, it becomes a mess in production**.  
* Use appropriate log levels. 
    * logger.error for error logging
    * logger.info for generic maintenance logs
    * logger.debug for debugging (won't show up in production logs)
    * Optionally, logger.warn for something between error and info. 
* [Read More about logging](https://www.twilio.com/blog/guide-node-js-logging)
    
    
### Thoughts on scaling

Ideally, you shouldn't be serving static assets from your express application. For production/performance sensitive applications, consider serving your static assets from a CDN of some kind instead (Eg - AWS Cloudfront).
[Read More](https://softwareontheroad.com/nodejs-scalability-issues/?utm_source=github&utm_medium=readme#jobs)


### Additional Reading

- [Style Guide for NodeJS](https://github.com/felixge/node-style-guide)
- [Structuring Express Applications](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme#configs)
- [Express Service Oriented Architecture](https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i)
    


### GP problem statement 



