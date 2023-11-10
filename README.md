# mudda
# Node.js Video Compression API with AWS Integration

## Overview

This repository contains a Node.js API for video compression, integrated with AWS EC2 for processing efficiency and AWS S3 for storage. The API utilizes the `fluent-ffmpeg` library for video compression and AWS SDK for JavaScript to interact with AWS services.

## Features

- Video compression using FFmpeg
- Integration with AWS EC2 and S3 for processing and storage


## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- FFmpeg
- AWS account with EC2 and S3 access

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/amanansari247/mudda.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add your AWS credentials and S3 bucket name:

    ```env
    AWS_ACCESS_KEY_ID=your-access-key
    AWS_SECRET_ACCESS_KEY=your-secret-key
    AWS_REGION=your-region
    S3_BUCKET_NAME=your-s3-bucket-name
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Make a POST request to `http://localhost:3000/upload` with a video file attached.

