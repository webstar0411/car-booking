## eBookings POC

Project lear and test SpringBoot && Angular.

- Rest CRUD
- H2 in memory database
- RabbitMQ with Exchange's and Queue's
- FrontEnd in angular

### Instalation

    1. checkout repository
    2. build java modules (see commands list)
    3. run docker-compose to build and start containers (see commands list)

#### Commands list

1.Build java modules

```shell

# make provided script executeble
chmod +x ./build.sh

#run provided script
./build.sh


```

2. Docker compose

```shell

# build all containers managed by compose
docker-compose  -f docker-compose.yml build 

# start all containers managed by compose
docker-compose  -f docker-compose.yml up

# stop all containers managed by compose
docker-compose  -f docker-compose.yml down


```

### Playground

- Frontend: [http://localhost:8080](http://localhost:8080)
- H2 Console: [http://localhost:8081/h2-console](http://localhost:8081/h2-console)
    - driver: jdbc:h2:mem:test
- Rabbit Web Interface: [http://localhost:15672/](http://localhost:15672/)

<b>other ports and services</b>

- Rest Api CRUD: http://localhost:8081/api
- Rest Api for Producer: http://localhost:8082/AMQ
- Rabbit listener: http://localhost:5672

### Design

1. Backend, with Spring Boot
    - two micro-server's
        1. CORE -
            - Rest api for CRUD (server side pagination, sort, filter),
            - H2DB
            - consumers of RabbitMQ
            - create and populate H2 on init
            - configure Rabbit exchanges and queue's on init
        2. PRODUCER -
            - Rest api to receive request's
            - RabbitMQ producer to publish to Rabbit Exchange


2. RabbitMQ Configuration
    - MainExchange (producer will publish to this exchange)
        1. BookingExchange
        2. Audit Queue
    - BookingExchange will forward to delete, edit and create queue's, based on routing keys


3. Frontend, in Angular
    - Home page (user can select with protocol to use for delete/edit/create)
    - Table for listing
        - Paging
        - Sorting
        - Filter
        - store/state management (akita)
    - Page for editing (accessible from table), with actions:
        - update
        - delete
        - clone
    - Page for creating (accessible form navbar).
    - Akita as store/state management
