# NEW COMPOMENT RESEARCH & PLANNING

Chosen component: In memory caching for Firestore
Poupose: This new component focus on reducing response times for providing
responses to client request by created a caching layer to frequently accessed data.
As in this weather project, the forecast is considered as a heavy and frequently visited
endpoint so this caching will work efficiently for this endpoint.

Implementation Plan:
Step 1: Creation of cache utility(This file handles all the cache related 
operations such as storing, retereving and expiring data after the fixed duration.)
Step 2: Integration of cache in services (Integrating cache within services to store the 
frequently accessed data.)
Step 3: Controller integration

Integration Plan: 
- add utility file
- Integrate caching in service layer
- Integration in controller if needed 
- testing
