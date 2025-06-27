# MoviesInfo
A frontend application for browsing, adding, deleting, and sorting movies. Built with Vite + React + TypeScript using Redux Toolkit and Axios. The API endpoint is configurable via environment variables to support deployment flexibility.

## Technologies Used
-  React
-  TypeScript
-  Vite
-  Redux Toolkit
-  Axios
-  CSS with custom variables
-  Docker
-  NGINX (for production image)
```plaintext
## 📁 Project Structure
MoviesInfo/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── Forms/
│   │   ├── MovieDetails/
│   │   ├── MoviesImport/
│   │   ├── MoviesList/
│   │   ├── OptionalElements/
│   │   ├── ...
│   ├── pages/
│   ├── store/
│   └── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
```
## ⚙️ Running in Development Mode

> Prerequisites: `Node.js`, `npm`, and `Docker` installed.

1. Run the backend server:
```powershell
docker run --name movies -p 8000:8000 webbylabhub/movies
```
2. Copy the repository
3. Install dependencies
```powershell
npm i
```
4. Create .env.local at the root of your project
```env
VITE_API_URL=endpoint_url
```
5.  Run the development server
```powershell
npm run dev
```

## 🐳 Running via Docker

1. Start the backend container
```powershell
docker run --name movies -p 8000:8000 webbylabhub/movies
```
2. Run frontend Docker container
```powershell
docker run --rm -p 3000:80 -e API_URL=http://localhost:8000/api/v1 viacheslavhirshev/movies
```
