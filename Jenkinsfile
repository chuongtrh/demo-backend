pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    environment {
      registry = "demo-ci-cd/backend"
      registryCredential = 'aws-dev-ops'
      dockerImage = ''
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

        stage('Build image') {
            steps{
              script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
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