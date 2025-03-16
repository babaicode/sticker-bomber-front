def dockerRepository = 'sticker-bomber.ru:5001'
def imageName = 'bomber-front'

pipeline {
    agent any

    environment {
        IMAGE_TAG = "${dockerRepository}/${imageName}:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([url: "http://${dockerRepository}", credentialsId: 'docker-registry-credentials']) {
                        sh "docker push ${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        docker stop ${imageName} || true
                        docker rm ${imageName} || true
                        docker pull ${IMAGE_TAG}
                        docker run -d --name ${imageName} -p 3000:3000 ${IMAGE_TAG}
                    """
                }
            }
        }
    }
}
