def dockerRepository = 'sticker-bomber.ru:5001'
def imageName = 'bomber-front'

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${dockerRepository}/${imageName}:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageTag} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([url: "http://${dockerRepository}", credentialsId: 'docker-registry-credentials']) {
                        sh "docker push ${dockerRepository}/${imageName}:${env.BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def imageTag = "${dockerRepository}/${imageName}:${env.BUILD_NUMBER}"
                    sh """
                        docker-compose down
                        docker-compose pull frontend
                        docker-compose up -d
                    """
                }
            }
        }
    }
}
