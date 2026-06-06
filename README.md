Smart Urban Traffic Platform

A microservices-based traffic management system built with NestJS, GraphQL, Prisma, and PostgreSQL.

Architecture
One GraphQL API Gateway (port 4000)
5 backend services:
Auth (3001)
Vehicle (3002)
Traffic (3003)
Incident (3004)
Notification (3005)
All services use PostgreSQL

Clients communicate only with the gateway.

Run the project
docker-compose up --build

GraphQL endpoint:

http://localhost:4000/graphql
Auth
Register and login using JWT
Roles: ADMIN, OPERATOR

Example:

mutation {
login(input: {
email: "admin@traffic.tn",
password: "secret123"
}) {
accessToken
}
}
Main features
Vehicles
Add vehicles
Track GPS positions
View movement history
Traffic
Create zones
Measure congestion levels
Detect LOW / MEDIUM / HIGH traffic
Incidents
Report accidents, jams, roadworks
Update incident status
Notifications
Send alerts to users
Manage read/unread state
API Gateway

All requests go through:

http://localhost:4000/graphql

Add authentication:

{
"Authorization": "Bearer <token>"
}
Tech stack
NestJS (microservices)
GraphQL (Apollo)
Prisma ORM
PostgreSQL
Docker
