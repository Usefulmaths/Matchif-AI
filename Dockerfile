# Stage 1: Build React frontend
FROM node:16 as frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
COPY frontend/ .
RUN yarn build

# Stage 2: Build FastAPI backend
FROM python:3.10-slim as backend-builder
WORKDIR /app
COPY backend/pyproject.toml backend/poetry.lock ./
RUN pip install poetry && poetry install

# Copy the application code
COPY backend/ .

# Copy the built frontend files from the previous stage
COPY --from=frontend-builder /app/build /app/frontend/build

# Expose port 8000
EXPOSE 8000

# Run the FastAPI server
CMD ["poetry", "run", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
