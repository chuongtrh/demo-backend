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
    }
    post {
        always {
            junit 'build/reports/**/*.xml'
        }
    }
}