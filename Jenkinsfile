pipeline {
  // Assign to docker slave(s) label, could also be 'any'
  agent {
    label 'docker' 
  }

  stages {
    stage('Docker node test') {
      agent {
        docker {
          // Set both label and image
          label 'docker'
          image 'node:7-Alpine'
          args '--name docker-node' // list any args
        }
      }
      steps {
        // Steps run in node:7-Alpine docker container on docker slave
        sh 'node --version'
      }
    }
  }
} 