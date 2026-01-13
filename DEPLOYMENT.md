# Deployment Guide

## Docker Deployment

### Prerequisites
- Docker installed on your machine
- Docker Compose (optional, but recommended)

### Quick Start

#### Option 1: Using Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/vishal-chavda-code/SD-Intuition.git
cd SD-Intuition

# Build and run
docker-compose up -d

# Access the app at http://localhost:8080
```

#### Option 2: Using Docker directly
```bash
# Build the image
docker build -t sd-intuition .

# Run the container
docker run -d -p 8080:80 --name sd-intuition-app sd-intuition

# Access the app at http://localhost:8080
```

### Management Commands

```bash
# Stop the container
docker-compose down
# or
docker stop sd-intuition-app

# View logs
docker-compose logs -f
# or
docker logs -f sd-intuition-app

# Rebuild after changes
docker-compose up -d --build
# or
docker build -t sd-intuition . && docker run -d -p 8080:80 --name sd-intuition-app sd-intuition

# Remove container
docker rm sd-intuition-app

# Remove image
docker rmi sd-intuition
```

### Sharing with Team

#### Option 1: Share via Docker Hub
```bash
# Tag the image
docker tag sd-intuition your-dockerhub-username/sd-intuition:latest

# Push to Docker Hub
docker push your-dockerhub-username/sd-intuition:latest

# Team members can pull and run
docker pull your-dockerhub-username/sd-intuition:latest
docker run -d -p 8080:80 your-dockerhub-username/sd-intuition:latest
```

#### Option 2: Share via Company Registry
```bash
# Tag for company registry
docker tag sd-intuition company-registry.com/sd-intuition:latest

# Push to company registry
docker push company-registry.com/sd-intuition:latest
```

#### Option 3: Export/Import Docker Image
```bash
# Save image to file
docker save sd-intuition > sd-intuition.tar

# Share the .tar file with team
# Team members load it:
docker load < sd-intuition.tar
docker run -d -p 8080:80 sd-intuition
```

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Access at http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

### Port Configuration

The default port is 8080. To use a different port, modify the port mapping:
```bash
# Use port 3000 instead
docker run -d -p 3000:80 sd-intuition
```

Or edit `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Change 8080 to your preferred port
```
