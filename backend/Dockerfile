FROM maven:3.6.1-alpine AS build

COPY src /app/src
COPY pom.xml /app

RUN mvn -f /app/pom.xml clean package -DskipTests

FROM adoptopenjdk/openjdk11:alpine-jre
COPY --from=build /app/target/opentrello-0.0.1-SNAPSHOT.jar /app/opentrello-0.0.1-SNAPSHOT.jar
LABEL maintainer=query-interface \
      version="1.0"
ARG springprofile=default
ENV env-profile=$springprofile
EXPOSE 8080  
ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=${env-profile}", "/app/opentrello-0.0.1-SNAPSHOT.jar"]