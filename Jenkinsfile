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

        stage('Deploy - Staging') {
            steps {
                echo 'Deploy - Staging Ok'
            }
        }
        stage('Smoke Test') {
            steps {
                sh './script/smokeTest.sh'
                junit 'build/reports/**/*.xml'
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