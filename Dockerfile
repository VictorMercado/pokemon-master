# Use the official Python image as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN apt-get update && apt-get install -y unzip && \
    pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://bun.sh/install | bash && \
    export PATH="$HOME/.bun/bin:$PATH" && \
    echo $PATH

# Copy the application code into the container
COPY ./backend .

COPY ./frontend ./frontend

# RUN cd frontend && ~/.bun/bin/bun install && ~/.bun/bin/bun run build 

# RUN mkdir static

# RUN cp -r frontend/dist/* static/


# Expose port 5000 for Flask app
EXPOSE 5000

# Command to run the Flask application
CMD ["bash", "-c", "python3 app.py"]
