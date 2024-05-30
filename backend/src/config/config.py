import os
from dotenv import load_dotenv

class Config:
    """
    Singleton class to manage configuration settings from environment variables.
    Ensures that required environment variables are set and provides access to them.
    """

    _instance = None

    def __new__(cls):
        """
        Creates a new instance of Config if one does not exist.
        Uses the Singleton pattern to ensure only one instance of Config is created.
        """
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        """
        Initializes configuration settings from environment variables.
        Validates that all required environment variables are set.
        """
        load_dotenv()  # Load environment variables here
        
        self.wcs_url = os.getenv('WCS_URL')
        self.wcs_api_key = os.getenv('WCS_API_KEY')
        self.openai_api_key = os.getenv('OPENAI_APIKEY')
        self.cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

        self.validate_config()

    def validate_config(self):
        """
        Validates that all required environment variables are set.
        Raises:
            ValueError: If any required environment variable is not set.
        """
        if not self.wcs_url:
            raise ValueError("WCS_URL environment variable is not set")
        if not self.wcs_api_key:
            raise ValueError("WCS_API_KEY environment variable is not set")
        if not self.openai_api_key:
            raise ValueError("OPENAI_APIKEY environment variable is not set")

    def get_wcs_url(self):
        """
        Returns the Weaviate Cloud Service URL.
        Returns:
            str: The Weaviate Cloud Service URL.
        """
        return self.wcs_url

    def get_wcs_api_key(self):
        """
        Returns the Weaviate Cloud Service API key.
        Returns:
            str: The Weaviate Cloud Service API key.
        """
        return self.wcs_api_key

    def get_openai_api_key(self):
        """
        Returns the OpenAI API key.
        Returns:
            str: The OpenAI API key.
        """
        return self.openai_api_key

    def get_cors_origins(self):
        """
        Returns the CORS origins.
        Returns:
            list: A list of allowed CORS origins.
        """
        return self.cors_origins
