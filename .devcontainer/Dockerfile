FROM node:latest
WORKDIR /workspace
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN cd backend && npm install
RUN cd frontend && npm install

EXPOSE 3000 5000

RUN apt-get update && apt-get install -y \
    vim \
    curl \
    git \
    postgresql \
    && rm -rf /var/lib/apt/lists/*

CMD ["bash"]