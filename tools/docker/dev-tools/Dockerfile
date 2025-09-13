# Development Tools Container
FROM node:18-alpine

# Install development tools
RUN apk add --no-cache \\\n    git \\\n    curl \\\n    wget \\\n    vim \\\n    nano \\\n    htop \\\n    postgresql-client \\\n    redis \\\n    docker-cli \\\n    docker-compose\n\n# Install global npm packages\nRUN npm install -g \\\n    @supabase/cli \\\n    turbo \\\n    pnpm \\\n    typescript \\\n    ts-node \\\n    nodemon \\\n    prettier \\\n    eslint\n\n# Set working directory\nWORKDIR /workspace\n\n# Keep container running\nCMD [\"tail\", \"-f\", \"/dev/null\"]