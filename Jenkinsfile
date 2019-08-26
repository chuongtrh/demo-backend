pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node -v'
                sh 'npm install'
                sh './script/test.sh'
            }
        }
        stage('Deploy - Staging') {
            steps {
                echo 'Deploy - Staging Ok'
            }
        }

        stage('Sanity check') {
            steps {
                input "Does the staging environment look ok?"
            }
        }

        stage('Deploy - Production') {
            steps {
                echo 'Deploy - Production Ok'
            }
        }
    }
    post {
        always {
            junit 'build/reports/**/*.xml'
        }
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