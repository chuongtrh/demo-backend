pipeline {
  agent {
    docker {
      image 'lastest'
    }

  }
  stages {
    stage('Test') {
      steps {
        sh '.script/test.sh'
      }
    }
  }
}