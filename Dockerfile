# Stage 1: Build Backend
FROM python:3.10-slim as backend-builder

# Set the working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy the pyproject.toml and poetry.lock files to the container
COPY server/pyproject.toml server/poetry.lock ./

# Install the dependencies
RUN poetry install --no-dev

# Copy the backend code
COPY server /app

# Copy the .env file
COPY server/.env /app/.env

# Stage 2: Build Frontend
FROM node:18 as frontend-builder

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY frontend/package.json frontend/yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the frontend code
COPY frontend /app

# Build the frontend
RUN yarn build

# Stage 3: Final Image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the backend and frontend builds from previous stages
COPY --from=backend-builder /app /app
COPY --from=frontend-builder /app/build /app/frontend/build

# Install the backend dependencies
RUN pip install poetry && poetry install --no-dev

# Expose the port the app runs on
EXPOSE 8000

# Command to run the backend
CMD ["poetry", "run", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
