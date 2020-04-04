FROM maven:3.6.3 AS build

WORKDIR /app
# copy pom file
COPY pom.xml .
# install dependencies and plugins
RUN mvn -Pdb-postgres dependency:go-offline
# copy source code
COPY src src/
# build and package application
RUN mvn package -Pdb-postgres -DskipTests

FROM adoptopenjdk/openjdk11:alpine-jre
COPY --from=build /app/target/openkb-0.0.1-SNAPSHOT.jar /app/openkb-0.0.1-SNAPSHOT.jar
LABEL maintainer=query-interface \
      version="1.0"
ARG springprofile=default
ENV env-profile=$springprofile
EXPOSE 8080
ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=${env-profile}", "/app/openkb-0.0.1-SNAPSHOT.jar"]
