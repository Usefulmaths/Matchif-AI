import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Create a new service account
const serviceAccount = new gcp.serviceaccount.Account(
  "matchifAiServiceAccount",
  {
    accountId: "matchif-ai-service-account",
    displayName: "Matchif AI Service Account",
  }
);

// Assign roles to the service account
const roles = [
  "roles/run.admin",
  "roles/iam.serviceAccountUser",
  "roles/secretmanager.secretAccessor",
];

roles.forEach((role, index) => {
  new gcp.projects.IAMMember(`serviceAccount-role-${index}`, {
    project: "matchif-ai",
    role: role,
    member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  });
});

// Define the environment variables from Secret Manager
const envs = [
  {
    name: "WCS_URL",
    valueFrom: {
      secretKeyRef: {
        name: "WCS_URL",
        key: "latest",
      },
    },
  },
  {
    name: "WCS_API_KEY",
    valueFrom: {
      secretKeyRef: {
        name: "WCS_API_KEY",
        key: "latest",
      },
    },
  },
  {
    name: "OPENAI_APIKEY",
    valueFrom: {
      secretKeyRef: {
        name: "OPENAI_APIKEY",
        key: "latest",
      },
    },
  },
];

// Deploy the Docker image to Cloud Run
const cloudRunService = new gcp.cloudrun.Service(
  "matchif-ai-cloudrun-service",
  {
    location: "us-central1",
    template: {
      spec: {
        containers: [
          {
            image: "gcr.io/matchif-ai/matchif-ai:latest",
            envs: envs,
            ports: [
              {
                containerPort: 8000,
              },
            ],
          },
        ],
        serviceAccountName: serviceAccount.email,
      },
    },
  }
);

// Grant public access to the Cloud Run service
const publicAccess = new gcp.cloudrun.IamMember("matchifAiPublicAccess", {
  location: cloudRunService.location,
  project: cloudRunService.project,
  service: cloudRunService.name,
  role: "roles/run.invoker",
  member: "allUsers",
});

// Optional IAM member if needed for internal access (can be removed if not required)
const cloudRunServiceIam = new gcp.cloudrun.IamMember(
  "matchifAiCloudRunServiceIam",
  {
    location: cloudRunService.location,
    project: cloudRunService.project,
    service: cloudRunService.name,
    role: "roles/run.invoker",
    member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  }
);
