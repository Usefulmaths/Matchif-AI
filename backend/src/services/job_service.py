import logging

import pandas as pd
from weaviate.classes.query import MetadataQuery
from weaviate import Client
from weaviate.exceptions import UnexpectedStatusCodeException
from typing import List
import weaviate.classes as wvc

from src.clients.weaviate_client import WeaviateClient

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class JobService:
    """
    Service class to handle job postings related operations.
    """

    def __init__(self, client: Client):
        """
        Initializes the JobService with a Weaviate client.

        Args:
            client: An instance of a Weaviate client.
        """
        self.client = client

    def create_job_posting_collection(self):
        """
        Creates the JobPosting collection if it doesn't exist.
        """
        try:
            self.client.collections.create(
                name='JobPosting',
                vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(), 
                generative_config=wvc.config.Configure.Generative.openai() 
            )
            logging.info("Created JobPosting collection.")
        except UnexpectedStatusCodeException:
            logging.error("JobPosting collection already exists. Please remove it before creating a new one.")
            raise
        except Exception as e:
            logging.error(f"Error creating JobPosting collection: {e}")
            raise

    def populate_job_posting_collection(self, df: pd.DataFrame):
        """
        Populates the JobPosting collection with job listings.

        Args:
            df (pd.DataFrame): DataFrame containing job postings data.
        """
        job_listing_objs = df.to_dict(orient='records')

        try:
            job_postings = self.client.collections.get("JobPosting")
            job_postings.data.insert_many(job_listing_objs)
            logging.info(f"Successfully inserted {len(job_listing_objs)} job listings.")
        except UnexpectedStatusCodeException as e:
            logging.error(f"Error inserting job postings: {e}")
        except Exception as e:
            logging.error(f"Unexpected error: {e}")

    def get_job_postings_near_vector(self, vector: List[float], limit: int = 10):
        """
        Fetches job postings near a given vector with a limit on the number of postings.

        Args:
            vector (list): The vector near which job postings are to be fetched.
            limit (int): The maximum number of job postings to fetch.

        Returns:
            list: A list of job posting objects.
        """
        if limit == 0:
            return []

        try:
            job_postings = self.client.collections.get("JobPosting")
            response = job_postings.generate.near_vector(
                near_vector=vector,
                limit=limit,
                single_prompt="""
                Using the provided job description, generate a concise summary highlighting the main responsibilities, 
                required skills, and any other key points that would be of interest to a candidate. Make sure you order the skills 
                and responsibilities you think are most important.

                Job Description: {description}

                <b>Summary</b>:
                <short summary about the company and the role starting with '{company_name} is a...'>
                <br/>
                <b>Main Responsibilities</b>: 
                - <main responsibility 1>
                - <main responsibility 2>
                - <main responsibility 3>
                <br/>
                <b>Required Skills</b>:
                - <required skills 1>
                - <required skills 2>
                - <required skills 3>
                <br/>
                <b>Qualification</b>:
                - <required qualification e.g. degree>
                """,
                return_metadata=MetadataQuery(distance=True),
            )
            return response.objects
        except Exception as e:
            logging.error(f"Error fetching job postings: {e}")
            return []
