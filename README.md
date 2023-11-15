# test-express-app
Test app that publishes images to a private ECR repository, and updates a task definition to deploy the new docker image version to ECS.

The GitHub action is authentication and authorized using a role, which provides temporary credentials and is safer.
