# 🚀 Node.js and Redis Multi-Container Application

This repository contains a simple multi-container application built using **Node.js** and **Redis**. The application demonstrates how to interact with Redis for storing and retrieving key-value pairs. It also includes Kubernetes manifests to deploy the application in a Kubernetes cluster.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Folder Structure](#folder-structure)
4. [Application Code](#application-code)
5. [Building and Running Locally](#building-and-running-locally)
6. [Kubernetes Deployment](#kubernetes-deployment)
7. [Testing the Application](#testing-the-application)
8. [Clean Up](#clean-up)
9. [Contributing](#contributing)

---

## 🌟 Overview

The application consists of:

- A **Node.js** backend that exposes RESTful endpoints to set and get key-value pairs in Redis.
- A **Redis** instance used as a caching layer.
- Kubernetes manifests for deploying the application in a Kubernetes cluster.
- An **Ingress** resource to expose the application externally.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Docker**: To build and run containers locally.  
   ![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)  
   [Install Docker](https://docs.docker.com/get-docker/)

2. **Kubernetes**: A local Kubernetes cluster (e.g., Minikube, Kind, or Docker Desktop Kubernetes) or access to a remote cluster.  
   ![Kubernetes](https://img.shields.io/badge/Kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

   - [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
   - [Install Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)

3. **kubectl**: The Kubernetes CLI tool.  
   ![kubectl](https://img.shields.io/badge/kubectl-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)  
   [Install kubectl](https://kubernetes.io/docs/tasks/tools/)

4. **NGINX Ingress Controller**: Installed in your Kubernetes cluster.  
   ![NGINX](https://img.shields.io/badge/NGINX-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
   - For Minikube: `minikube addons enable ingress`
   - For other clusters: Follow the [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/).

---

## 📂 Folder Structure

```
nodejs-redis-app/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
├── k8s/
│   ├── redis/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── nodejs/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── ingress.yaml
└── README.md
```

- **app/**: Contains the Node.js application code and Dockerfile.  
  ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)

- **k8s/**: Contains Kubernetes manifests for Redis, Node.js, and Ingress.  
  ![Kubernetes](https://img.shields.io/badge/Kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

---

## 💻 Application Code

### Node.js Application

The Node.js application provides two RESTful endpoints:

1. **Set a Key-Value Pair**:

   - Endpoint: `GET /set/:key/:value`
   - Example: `/set/mykey/myvalue`
   - Description: Stores the key-value pair in Redis.

2. **Get a Value by Key**:
   - Endpoint: `GET /get/:key`
   - Example: `/get/mykey`
   - Description: Retrieves the value associated with the key from Redis.

#### Dependencies

- **Express**: Web framework for Node.js.  
  ![Express](https://img.shields.io/badge/Express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)

- **Redis**: Redis client for Node.js.  
  ![Redis](https://img.shields.io/badge/Redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)

---

## 🏗️ Building and Running Locally

1. **Build the Docker Image**:

   ```bash
   cd app
   docker build -t nodejs-redis-app:1.0 .
   ```

2. **Run Redis Locally**:

   ```bash
   docker run --name redis-container -d -p 6379:6379 redis
   ```

3. **Run the Node.js Application**:

   ```bash
   docker run --name nodejs-app -d -p 3000:3000 \
     -e REDIS_HOST=host.docker.internal \
     -e REDIS_PORT=6379 \
     nodejs-redis-app:1.0
   ```

4. **Test the Application**:
   - Set a key-value pair:
     ```bash
     curl "http://localhost:3000/set/mykey/myvalue"
     ```
   - Get the value:
     ```bash
     curl "http://localhost:3000/get/mykey"
     ```

---

## 🚢 Kubernetes Deployment

### Step 1: Apply Redis Resources

```bash
kubectl apply -f k8s/redis/deployment.yaml
kubectl apply -f k8s/redis/service.yaml
```

### Step 2: Apply Node.js Resources

```bash
kubectl apply -f k8s/nodejs/deployment.yaml
kubectl apply -f k8s/nodejs/service.yaml
```

### Step 3: Apply Ingress Resource

```bash
kubectl apply -f k8s/ingress.yaml
```

### Step 4: Verify Resources

```bash
kubectl get pods
kubectl get svc
kubectl get ingress
```

---

## 🔧 Testing the Application

1. **Map the Hostname**:  
   Add an entry to your `/etc/hosts` file to map the hostname (`nodejs.local`) to the Ingress Controller's IP:

   ```
   <INGRESS_CONTROLLER_IP>   nodejs.local
   ```

   - For Minikube:
     ```bash
     minikube ip
     ```

2. **Access the Application**:

   - Open your browser and navigate to:

     ```
     http://nodejs.local/set/mykey/myvalue
     http://nodejs.local/get/mykey
     ```

   - Or use `curl`:
     ```bash
     curl "http://nodejs.local/set/mykey/myvalue"
     curl "http://nodejs.local/get/mykey"
     ```

---

## 🗑️ Clean Up

To delete all resources:

```bash
kubectl delete -f k8s/ingress.yaml
kubectl delete -f k8s/nodejs/service.yaml
kubectl delete -f k8s/nodejs/deployment.yaml
kubectl delete -f k8s/redis/service.yaml
kubectl delete -f k8s/redis/deployment.yaml
```

---

## 👥 Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.  
   ![GitHub](https://img.shields.io/badge/GitHub-%2312100E.svg?style=for-the-badge&logo=github&logoColor=white)

2. Create a new branch (`git checkout -b feature/your-feature`).  
   ![Git](https://img.shields.io/badge/Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white)

3. Commit your changes (`git commit -m 'Add some feature'`).  
   ![Git Commit](https://img.shields.io/badge/Git%20Commit-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white)

4. Push to the branch (`git push origin feature/your-feature`).  
   ![Git Push](https://img.shields.io/badge/Git%20Push-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white)

5. Open a pull request.  
   ![Pull Request](https://img.shields.io/badge/Pull%20Request-%232DA44E.svg?style=for-the-badge&logo=github&logoColor=white)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes

- If you encounter any issues during deployment, check the logs of the pods:

  ```bash
  kubectl logs <POD_NAME>
  ```

- Ensure the NGINX Ingress Controller is properly installed and running before applying the Ingress resource.
