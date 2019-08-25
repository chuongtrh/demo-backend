pipeline {
    agent {
        docker { 
          image 'node:10-alpine' 
          args '-u root -p 8081:8081 -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'docker -v'
                sh 'node -v'
            }
        }
    }
}
