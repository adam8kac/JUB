FROM eclipse-temurin:21-alpine

WORKDIR /opt/app

COPY /target/hub-service.jar /opt/app/

EXPOSE 8080

CMD ["java", "-jar", "/opt/app/hub-service.jar"]