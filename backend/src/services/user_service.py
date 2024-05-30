class UserService:
    """
    Service class to handle user profile related operations.
    """

    def __init__(self, client):
        """
        Initializes the UserService with a Weaviate client.

        Args:
            client: An instance of a Weaviate client.
        """
        self.client = client

    def add_user_profile(self, user_description: str):
        """
        Adds a user profile to the UserProfile collection.

        Args:
            user_description (str): Description of the user.

        Returns:
            str: UUID of the newly created user profile.
        """
        try:
            user_object = {"description": user_description}
            collection = self.client.collections.get("UserProfile")
            uuid = collection.data.insert(user_object)
            return uuid

        except Exception as e:
            raise Exception(f"Error adding user profile: {e}")

    def fetch_user_profile_by_uuid(self, uuid: str):
        """
        Fetches a user profile by UUID.

        Args:
            uuid (str): The UUID of the user profile.

        Returns:
            dict: The user profile object.
        """
        try:
            collection = self.client.collections.get("UserProfile")
            data_object = collection.query.fetch_object_by_id(uuid, include_vector=True)
            return data_object

        except Exception as e:
            raise Exception(f"Error fetching user profile: {e}")
