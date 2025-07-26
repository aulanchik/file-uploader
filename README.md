# File Upload Service

This is a robust and scalable file upload service built with Node.js, Express, and TypeScript.
It provides a simple API endpoint to handle single and multiple file uploads, storing them in a configurable backend. The initial implementation supports Google Cloud Storage (GCS).

## Features

*   **Multiple File Uploads**: Upload up to 5 files in a single request.
*   **Modular Storage**: Easily extendable to support other storage providers (e.g., AWS S3, Azure Blob Storage).
*   **Google Cloud Storage Integration**: Out-of-the-box support for GCS.
*   **TypeScript**: A fully typed codebase for better developer experience and robustness.
*   **Production Ready**: Includes security best practices using `helmet`.
*   **Testing**: Comes with a suite of unit tests using Jest and Supertest.
*   **Environment-Based Configuration**: Manage application settings with a simple `.env` file.

## Tech Stack

*   **Backend**: Node.js, Express.js
*   **Language**: TypeScript
*   **Storage**: Google Cloud Storage (`@google-cloud/storage`)
*   **File Handling**: Multer
*   **Testing**: Jest, Supertest
*   **Security**: Helmet
*   **Configuration**: Dotenv

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/aulanchik/file-uploader.git
    cd file-uploader
    ```

2.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Environment Configuration

1.  Create a `.env` file in the root of the project. You can copy the example:
    ```bash
    cp .env.example .env
    ```

2.  Populate the `.env` file with your configuration.

    ```bash
    # The port the server will run on
    PORT=3000

    # The storage provider to use. Currently only 'gcs' is supported.
    STORAGE_PROVIDER=gcs

    # Google Cloud Storage configuration
    GCS_BUCKET=your-gcs-bucket-name
    GCS_KEYFILE=path/to/your/gcs-keyfile.json
    ```

    *   `GCS_BUCKET`: The name of your Google Cloud Storage bucket.
    *   `GCS_KEYFILE`: The relative path to your GCS service account key file.

## Usage

### Development

To run the server in development mode with hot-reloading:

```bash
pnpm dev
```

The server will be available at `http://localhost:3000`.

### Production

To build the project for production and start the server:

```bash
# Build the TypeScript code
pnpm build

# Start the server
pnpm start
```

## API Endpoints

### Health Check

A simple endpoint to check if the service is running.

*   **Endpoint**: `GET /ping`
*   **Success Response** (200 OK):
    ```
    PONG
    ```

### File Upload

Upload one or more files.

*   **Endpoint**: `POST /api/upload`
*   **Request Body**: `multipart/form-data`
    *   The form field for files must be named `files`.
*   **Success Response** (200 OK):
    ```json
    {
      "files": [
        {
          "url": "https://storage.googleapis.com/your-bucket-name/example.txt",
          "name": "example.txt",
          "mimeType": "text/plain",
          "size": 12
        }
      ]
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: If no files are attached to the request.
    *   `500 Internal Server Error`: If there is an issue during the upload process.

#### Example `curl` Request

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "files=@/path/to/your/file1.txt" \
  -F "files=@/path/to/your/image.png"
```

## Testing

The project uses Jest for unit and integration testing. The storage provider is mocked to avoid actual file uploads during tests.

To run the test suite:

```bash
pnpm test
```

## License

This project is licensed under the MIT License.
