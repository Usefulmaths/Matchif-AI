import weaviate
from weaviate.auth import AuthApiKey
from src.config.config import Config


class WeaviateClient:
    """
    Singleton client class for interacting with Weaviate.
    """

    _instance = None

    def __new__(cls):
        """
        Creates a new instance of WeaviateClient if one does not exist.
        Uses the Singleton pattern to ensure only one instance of WeaviateClient is created.
        """
        if cls._instance is None:
            cls._instance = super(WeaviateClient, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        """
        Initializes the Weaviate client with configuration settings.
        """
        config = Config()
        self.client = weaviate.connect_to_wcs(
            cluster_url=config.get_wcs_url(),
            auth_credentials=AuthApiKey(api_key=config.get_wcs_api_key()),
            headers={"X-OpenAI-Api-Key": config.get_openai_api_key()},
        )

    def get_client(self):
        """
        Returns the Weaviate client instance.

        Returns:
            weaviate.Client: The Weaviate client instance.
        """
        return self.client
