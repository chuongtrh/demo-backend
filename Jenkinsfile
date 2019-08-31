pipeline {
    agent {
      label 'dockerserver' 
    }
    environment {
      registry = "demo-ci-cd/backend"
      registryCredential = 'aws-dev-ops'
      dockerImage = ''
    }
    stages {
       
        stage('Build image') {
            steps{
              script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
              }
            }
        }

    }
    post {
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }
}