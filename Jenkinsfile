def dockerRepository = 'sticker-bomber.ru:5001'
def imageName = 'bomber-front'

pipeline {
    agent any

    environment {
        REACT_APP_API_URL = "https://sticker-bomber.ru/api"
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
                    def imageTag = "sticker-bomber.ru:5001/bomber-front:${env.BUILD_NUMBER}"
                    sh "docker build --build-arg REACT_APP_API_URL=${REACT_APP_API_URL} -t ${imageTag} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([url: "http://sticker-bomber.ru:5001", credentialsId: 'docker-registry-credentials']) {
                        sh "docker push sticker-bomber.ru:5001/bomber-front:${env.BUILD_NUMBER}"
                        sh "docker tag sticker-bomber.ru:5001/bomber-front:${env.BUILD_NUMBER} sticker-bomber.ru:5001/bomber-front:latest"
                        sh "docker push sticker-bomber.ru:5001/bomber-front:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        docker-compose down
                        docker rm -f \$(docker ps -aq) || true
                        docker-compose up -d
                    """
                }
            }
        }
    }
}
