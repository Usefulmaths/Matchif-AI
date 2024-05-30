# Resume Job Matcher

## Overview

Matchify-AI is an web application designed to assist users in finding job descriptions that closely match their resumes. The application allows users to upload their resumes in PDF format, which are then processed and embedded into vector representations. These resumé vectors are compared against a pre-existing vector database of job descriptions to find the best matches.

## Key Features

- **Resume Upload**: Users can upload their resumes in PDF format.
- **Vector Embedding**: The content of the uploaded resume is converted into a vector representation.
- **Vector Search**: The resume vector is compared against a vector database of job descriptions to find the most relevant matches.
- **Job Description Matching**: The application returns a list of job descriptions that are most aligned with the user's resume.

This project leverages Docker for containerization, allowing for easy setup and deployment. Users can run the application locally using Docker Compose, or deploy it on Google Cloud Run using provided Infrastructure as Code (IaC) scripts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
