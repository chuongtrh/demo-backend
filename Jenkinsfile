pipeline {
    environment {
      registry = "demo-ci-cd/backend"
      registryCredential = 'aws-dev-ops'
      dockerImage = ''
    }
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install package') {
            steps {
                sh 'npm config ls'
                sh 'npm install'
            }
        }
        stage('Unit Test') {
            steps {
                sh './script/unitTest.sh'
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