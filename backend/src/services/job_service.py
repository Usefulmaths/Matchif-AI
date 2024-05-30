from weaviate.classes.query import MetadataQuery
from typing import List


class JobService:
    """
    Service class to handle job postings related operations.
    """

    def __init__(self, client):
        """
        Initializes the JobService with a Weaviate client.

        Args:
            client: An instance of a Weaviate client.
        """
        self.client = client

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
            print(f"Error fetching job postings: {e}")
            return []
