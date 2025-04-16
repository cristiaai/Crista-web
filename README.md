# Cristia Backend

This is the backend for the Cristia photo-sharing website.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/cristia_backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following configuration:
   ```bash
   MONGO_URI=your_mongo_url
   CLOUD_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_key
   API_SECRET=your_cloudinary_secret
   ```

4. Run the server:
   ```bash
   node server.js
   ```

The backend should now be running on `http://localhost:5000`.

## Deploy to Render

You can also deploy this backend to Render for easy hosting:
1. Create a new web service on [Render](https://render.com/).
2. Connect your GitHub repo.
3. Set the environment variables on the Render dashboard.
4. Deploy!

## API Routes

- `POST /memory` - Upload a new memory (image, title, description)
- `GET /memories` - Get all memories
