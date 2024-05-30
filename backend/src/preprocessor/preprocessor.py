import pandas as pd
import re
import logging
from abc import ABC, abstractmethod

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Define an abstract base class for preprocessing steps
class PreprocessingStep(ABC):
    @abstractmethod
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        pass

# Concrete step to remove HTML tags from descriptions
class RemoveHtmlTagsStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Removing HTML tags from descriptions")
        df['description'] = df['description'].apply(lambda x: re.sub(r'<.*?>', '', x))
        return df

# Concrete step to normalize spacing in descriptions
class NormalizeSpacingStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Normalizing spacing in descriptions")
        df['description'] = df['description'].apply(lambda x: re.sub(r'\s+', ' ', x).strip())
        return df

# Concrete step to replace newlines with full stops in descriptions
class ReplaceNewlinesStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Replacing newlines with full stops in descriptions")
        df['description'] = df['description'].apply(lambda x: re.sub(r'\n+', '. ', x))
        return df

# Concrete step to handle missing values by dropping rows with critical missing information
class HandleMissingValuesStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Handling missing values by dropping rows with critical missing information")
        critical_columns = ['title', 'company_name', 'description', 'location', 'application_url']
        df = df.dropna(subset=critical_columns)
        return df

# Concrete step to impute missing values with default values
class ImputeMissingValuesStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Imputing missing values with default values")
        df['max_salary'] = df['max_salary'].fillna(0.0).astype(float)
        df['min_salary'] = df['min_salary'].fillna(0.0).astype(float)
        df['currency'] = df['currency'].fillna('Unknown')
        df['pay_period'] = df['pay_period'].fillna('Unknown')
        df['compensation_type'] = df['compensation_type'].fillna('Unknown')
        df['remote_allowed'] = df['remote_allowed'].fillna(0).astype(float)
        df['formatted_experience_level'] = df['formatted_experience_level'].fillna('Unknown')
        return df

# Concrete step to remove duplicate rows
class RemoveDuplicatesStep(PreprocessingStep):
    def apply(self, df: pd.DataFrame) -> pd.DataFrame:
        logging.info("Removing duplicate rows")
        df = df.drop_duplicates()
        return df

# Builder class to manage preprocessing steps
class PreprocessorBuilder:
    def __init__(self):
        self.steps = []

    # Add a preprocessing step to the builder
    def add_step(self, step: PreprocessingStep):
        self.steps.append(step)
        return self

    # Execute all added steps on the DataFrame
    def build(self, df: pd.DataFrame) -> pd.DataFrame:
        for step in self.steps:
            df = step.apply(df)
        return df

# Director class to construct the preprocessing pipeline
class PreprocessorDirector:
    def __init__(self, builder: PreprocessorBuilder):
        self.builder = builder

    # Construct the preprocessing pipeline with all necessary steps
    def construct(self, df: pd.DataFrame) -> pd.DataFrame:
        return self.builder\
            .add_step(RemoveDuplicatesStep())\
            .add_step(HandleMissingValuesStep())\
            .add_step(ImputeMissingValuesStep())\
            .add_step(RemoveHtmlTagsStep())\
            .add_step(NormalizeSpacingStep())\
            .add_step(ReplaceNewlinesStep())\
            .build(df)
