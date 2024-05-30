import pandas as pd

from src.preprocessor.preprocessor import PreprocessorBuilder, PreprocessorDirector
from src.services.job_service import JobService
from src.clients.weaviate_client import WeaviateClient

if __name__ == "__main__":
    # Create client and job service to interact with Weaviate
    client = WeaviateClient().get_client()
    job_service = JobService(client)

    # Create the builder and director for preprocessing the dataset
    builder = PreprocessorBuilder()
    director = PreprocessorDirector(builder)

    # Create JobPosting collection if it doesn't exist
    job_service.create_job_posting_collection()

    # Load the dataset
    df = pd.read_csv("./data/postings.csv")

    # Select relevant columns
    selected_columns = [
        "title",
        "company_name",
        "description",
        "location",
        "max_salary",
        "min_salary",
        "currency",
        "pay_period",
        "compensation_type",
        "formatted_work_type",
        "remote_allowed",
        "application_url",
        "application_type",
        "formatted_experience_level",
    ]

    # Create a subset dataframe with the selected columns
    df_selected = df[selected_columns].copy()

    # Process the dataframe
    df_cleaned = director.construct(df_selected)

    # Sample the dataframe
    df_cleaned = df_cleaned.sample(10000)

    # Populate the JobPosting collection
    job_service.populate_job_posting_collection(df_cleaned)
