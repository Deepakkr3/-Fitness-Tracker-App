# Start with a lightweight Java runtime
FROM openjdk:23-jdk-slim

# Set the working directory in the container
WORKDIR /server

# Copy the jar file into the container
COPY target/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8761

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
