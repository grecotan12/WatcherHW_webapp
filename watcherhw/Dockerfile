# Stage 1: Build the Spring Boot application
FROM maven:3.8.1-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install

# Stage 2: Create the runtime image with Java and Python
# https://stackoverflow.com/questions/25845538/how-to-use-sudo-inside-a-docker-container
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y openjdk-17-jre-headless python3 python3-pip
RUN apt-get -y install sudo
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
USER docker
CMD /bin/bash
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
COPY ./scripts ./scripts
RUN pip install psutil 
RUN pip install lib-platform 
RUN pip install py-cpuinfo 
RUN pip install PyLibreHardwareMonitor 
RUN pip install speedtest-cli
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]