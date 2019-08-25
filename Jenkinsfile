pipeline {
  agent {
      agent { dockerfile true }
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