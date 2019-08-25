pipeline {
  agent {
    docker {
      image 'node:10.16.0'
    }

  }
  stages {
    stage('Test') {
      steps {
        sh 'npm -v'
        sh 'node -v'
      }
    }
  }
}