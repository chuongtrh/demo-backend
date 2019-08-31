pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Unit Test') {
            steps {
                sh './script/unitTest.sh'
                junit 'build/reports/**/*.xml'
            }
        }

        stage('Smoke Test') {
            steps {
                sh './script/smokeTest.sh'
                junit 'build/reports/**/*.xml'
            }
        }

        stage('Build Image') {
            steps {
                docker.withRegistry('311429916512.dkr.ecr.ap-southeast-1.amazonaws.com/demo-ci-cd/backend', 'aws-dev-ops') {
                  def customImage = docker.build("demo-backend:${env.BUILD_ID}")
                  customImage.push()
                }
            }
        }

        stage('Sanity check') {
            steps {
                input "Do you want to deploy on Production?"
            }
        }
        stage('Deploy - Production') {
            steps {
                echo 'Deploy - Production Ok'
            }
        }
    }
    post {
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }
}