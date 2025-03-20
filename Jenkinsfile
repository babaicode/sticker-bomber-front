def dockerRepository = 'sticker-bomber.ru:5001'
def imageName = 'bomber-front'

pipeline {
    agent any

    environment {
        REACT_APP_API_URL = "https://sticker-bomber.ru/api"
    }

    environment {
        dockerRepository = 'sticker-bomber.ru:5001'
        imageName = 'bomber-front'
        imageTag = "${dockerRepository}/${imageName}:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${imageTag} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([url: "http://${dockerRepository}", credentialsId: 'docker-registry-credentials']) {
                        sh "docker push ${imageTag}"
                        sh "docker tag ${imageTag} ${dockerRepository}/${imageName}:latest"
                        sh "docker push ${dockerRepository}/${imageName}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        docker rm -f sticker-bomber-front || true
                        docker-compose down --remove-orphans
                        docker-compose pull frontend
                        docker-compose up -d
                        docker restart nginx
                    """
                }
            }
        }
    }
}
