pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('Enviroment') {
      steps {
        sh 'npm -v'
        sh 'node -v'
      }
    }
  }
}