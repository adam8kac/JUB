FROM eclipse-temurin:21-alpine AS build

WORKDIR /app

COPY pom.xml ./

COPY src ./src

RUN apk add --no-cache maven && mvn package -DskipTests

FROM eclipse-temurin:21-alpine

WORKDIR /opt/app

COPY --from=build /app/target/*.jar /opt/app/hub-service.jar
 
EXPOSE 8080
 
CMD ["java", "-jar", "/opt/app/hub-service.jar"]