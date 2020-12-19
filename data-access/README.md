# Data Access Layer

This is what your application should use to access data. The DAL (Data Access Layer) abstracts away fetching data from multiple souces (Eg - Cache, Database, API, filesystem etc).

**Conventions**
- Separate files for each kind of data. Eg - accounts.js, blogposts.js, news.js etc 
- This is for data ACCESS. This should not be used to update data in database or other places.
- If the database queries are very complex, consider having a separate interface for databases queries (database-interface). 

