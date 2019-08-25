pipeline {
  // "Top-level" agent is assigned to docker slaves via Jenkins pipeline configuration
  agent none

  stages {
    stage('Docker node test') {
      agent {
        docker {
          image 'node:10-Alpine'
          args '--name docker-node' // list any args
        }
      }
      steps {
        sh 'node -v'
      }
    }

  }
}