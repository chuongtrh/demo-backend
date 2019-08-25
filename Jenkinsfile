pipeline {
  // Assign to docker slave(s) label, could also be 'any'
  agent {
    label 'docker' 
  }

  stages {
    stage('Docker node test') {
      agent {
        docker {
          label 'docker'
          image 'node:10-alpine'
          args '--name docker-node' // list any args
        }
      }
      steps {
        sh 'node -v'
        sh 'docker -v'
      }
    }
  }
} 