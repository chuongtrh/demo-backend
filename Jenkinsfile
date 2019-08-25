pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}