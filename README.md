# Matchif-AI

## Overview

Matchif-AI is a web application designed to assist users in finding job descriptions that closely match their resumes. The application allows users to upload their resumé in PDF format, which is then processed and embedded into vector representations. These resumé vectors are compared against a pre-existing vector database of job descriptions to find the best matches.

## Deployed Application

If you prefer not to run the application locally, you can access the deployed version on Google Cloud Run:

[Matchif-AI - Live Demo](https://matchif-ai-cloudrun-service-bf8a668-xkrlu6mwma-uc.a.run.app)

The infrastructure for this deployment is managed using Infrastructure as Code (IaC) with Pulumi.

## Workflow

Here is the main workflow of the application:

- **Preliminary Exploratory Data Analysis**: Explore the job listing dataset found in the `notebooks` directory to gain insights into its structure and contents.

- **Data Preprocessing**:
  - Run a script to preprocess the job listings data. This script performs the following tasks:
    - Removes unnecessary columns.
    - Handles missing data via removal or imputation.
    - Removes duplicates.
    - Removes HTML tags.
    - Normalises spacing and newlines.
  - After preprocessing, the rows of data are vectorised and pushed to Weaviate collections called `JobListing`.

- **Application Deployment**:
  - Once the Weaviate collection is populated, the frontend and backend can be run to access the application locally or deploy it to a cloud platform.
  - Follow the setup instructions provided in the "Local Setup" section to build and run the application using Docker Compose.

- **How it works?**:
  1. **Resume Processing**:
     - When a user uploads their resumé, the text is extracted and preprocessed.
     - This preprocessed text is then vectorised and added to a Weaviate collection.
  
  2. **Finding Job Matches**:
     - Using the UUID of the user's resume, the corresponding vector is extracted from Weaviate.
     - Generative Search using Weaviate is then performed on the `JobPosting` collection with the user's resume vector to find job postings that are similar to the user's resume vector.
     - The application retrieves these similar job postings.
  
  3. **Summarising Job Descriptions**:
     - For each retrieved job posting, Weaviate's generative search summarised a brief overview of the company and the role, followed by main responsibilities, required skills, and qualifications. 
     - The summarised job descriptions are presented to the user for easier readability.

## Local Setup

Follow these steps to set up Matchif-AI application locally.

### Prerequisites

- Docker and Docker Compose installed

### Step-by-Step Instructions

#### 1. Set Up Environmental Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
WCS_URL=<your-weaviate-instance-url>
WCS_API_KEY=<your-weaviate-api-key>
OPENAI_APIKEY=<your-openai-api-key>
```

Replace `<your-weaviate-instance-url>`, `<your-weaviate-api-key>`, and `<your-openai-api-key>` with your actual Weaviate and OpenAI API details.

#### 2. Populate the Weaviate Collections with Job Posting Data
**Prerequisites**: Ensure that `poetry` is installed. You can install it using the following command:

```bash
pip install poetry
```

Navigate to the `backend` directory and run the following command to preprocess the job listing dataset. This step removes duplicates, handles missing values by imputing them, removes HTML tags, normalises spacing, and replaces new lines with full stops for better tokenisation:

```bash
cd backend
poetry install
poetry run python preprocess.py
```

This will preprocess the data and populate the Weaviate collections.

#### 3. Build and Run the Application Using Docker Compose

Navigate back to the root directory of the project and run the following command to build and start the Docker containers for both the frontend and backend:

```bash
docker-compose up --build
```

This command will:

- Build the frontend and backend Docker images.
- Start the containers and set up the environment to run the application.

#### 4. Access the Application

Once the Docker containers are up and running, you can access the web application on `http://localhost:3000`.
