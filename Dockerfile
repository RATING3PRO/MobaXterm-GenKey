# Stage 1: Build the frontend
FROM node:22-slim AS frontend-builder
WORKDIR /web
COPY web/package*.json ./
RUN npm install
COPY web/ ./
RUN npm run build

# Stage 2: Run the Flask backend
FROM python:3.11-slim
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Copy built frontend from Stage 1
COPY --from=frontend-builder /web/dist ./web/dist

# Expose port
EXPOSE 5000

# Run the application using gunicorn
CMD [ "gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app" ]
