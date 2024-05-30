# Matchif-AI

## Overview
Matchif-AI is a web application designed to assist users in finding job descriptions that closely match their resumes. Users can upload their resume in PDF format, which is processed and embedded into vector representations. These resume vectors are compared against a pre-existing vector database of job descriptions to find the best matches.

## Matchif-AI in Action
![Matchif-AI Demo](./Matchif-AI%20Demo.gif)
Note: This is a demo / proof-of-concept; the job descriptions are out-of-date. So, if you apply and don’t hear back, it’s not you—it’s them ;P

## Deployed Application
If you prefer not to run the application locally, you can access the deployed version on Google Cloud Run:
[Matchif-AI - Live Demo](https://matchif-ai-cloudrun-service-bf8a668-xkrlu6mwma-uc.a.run.app)
The infrastructure for this deployment is managed using Infrastructure as Code (IaC) with Pulumi.

## Workflow
### Preliminary Exploratory Data Analysis
Initial exploratory data analysis of the job listing dataset can be found in `backend/notebook`, which provides insight into the structure and contents of the data. The dataset can be found here: [LinkedIn Job Postings Dataset](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings).

### Data Preprocessing
1. Preprocess the job listing data to:
   - Remove unnecessary columns.
   - Handle missing data via removal or imputation.
   - Remove duplicates.
   - Remove HTML tags in descriptions.
   - Normalise spacing and newlines in descriptions.
2. Create a `JobPosting` collection on Weaviate to store embedding vectors of the job descriptions.
3. Vectorise the data and store it in the `JobPosting` collection using Weaviate. These will be used for generative search later.

### Application Deployment
Once the Weaviate `JobPosting` collection is populated, the application is ready to be served.

**Run the Application**: Follow the setup instructions provided in the "Local Setup" section to build and run the application using Docker Compose.

### How it Works
1. **Resume Processing**:
   - When a user uploads their resume, the text is extracted.
   - This text is then vectorised and added to a Weaviate collection `UserProfile`.
2. **Finding Job Matches**:
   - Using the UUID of the user's resume, the corresponding vector is extracted from Weaviate.
   - Generative Search using Weaviate is then performed on the `JobPosting` collection with the user's resume vector to find job postings that are similar to the user's resume vector.
   - The application retrieves these similar job postings.
3. **Summarising Job Descriptions**:
   - For each retrieved job posting, Weaviate's generative search summarises a brief overview of the company and the role, followed by main responsibilities, required skills, and qualifications.
   - The summarised job descriptions are presented to the user for easier readability.

## Local Setup
Follow these steps to set up the Matchif-AI application locally.

### Prerequisites
- Docker and Docker Compose installed
- Download the LinkedIn Job Postings dataset and place the `postings.csv` inside the `data` directory in the `backend` directory. [LinkedIn Job Postings Dataset](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings)

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

## Potential Next Steps
- Integrate live scraping of job descriptions instead of using a static dataset.
- Enable filtering options for location, experience type, etc.
- Implement a more complex vector search that can take into account users' preferences in skills, industries, etc.
- Enhance the user interface to provide a more interactive and intuitive experience.
