# Docker Setup Guide

## Quick Start

### Development Mode
```bash
# Build and run development container
docker-compose --profile dev up --build

# Or run directly
docker build -f docker/dev.Dockerfile -t piii-cal-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules piii-cal-dev
```

### Production Mode
```bash
# Build and run production container
docker-compose --profile prod up --build

# Or run directly
docker build -f docker/prod.Dockerfile -t piii-cal-prod .
docker run -p 3000:3000 piii-cal-prod
```

### With Nginx (Production + Reverse Proxy)
```bash
# Run with nginx reverse proxy
docker-compose --profile nginx up --build
```

## Available Commands

### Development
- `docker-compose --profile dev up` - Start development server
- `docker-compose --profile dev up --build` - Rebuild and start
- `docker-compose --profile dev down` - Stop development server

### Production
- `docker-compose --profile prod up -d` - Start production server (detached)
- `docker-compose --profile prod logs -f` - View logs
- `docker-compose --profile prod down` - Stop production server

### Build Only
```bash
# Build development image
docker build -f docker/dev.Dockerfile -t piii-cal-dev .

# Build production image
docker build -f docker/prod.Dockerfile -t piii-cal-prod .
```

## Environment Variables

Create `.env.local` file for environment-specific variables:
```env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
# Add your custom environment variables here
```

## File Structure
```
├── docker/
│   ├── dev.Dockerfile      # Development container
│   ├── prod.Dockerfile     # Production container
│   └── nginx/              # Nginx configuration (optional)
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to ignore in Docker context
└── next.config.ts         # Next.js configuration with standalone output
```

## Production Optimizations

The production Dockerfile includes:
- **Multi-stage build** for smaller image size
- **Standalone output** for faster startup
- **Non-root user** for security
- **Alpine Linux** for minimal footprint
- **Automatic package manager detection**

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
docker run -p 3001:3000 piii-cal-prod
```

### Permission Issues
```bash
# Fix file permissions
chmod +x docker/prod.Dockerfile
```

### Build Cache Issues
```bash
# Clear Docker build cache
docker builder prune

# Force rebuild without cache
docker-compose --profile prod up --build --force-recreate
```
