pipeline {
  environment {
    registry = "demo-ci-cd/backend"
    registryCredential = 'aws-dev-ops'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Install package') {
      agent {
        docker { image 'node:10-alpine' }
      }
      steps {
        sh 'npm config ls'
        sh 'npm install'
        stash includes: 'node_modules/', name: 'node_modules'
      }
    }
    stage('Unit Test') {
      agent {
        docker { image 'node:10-alpine' }
      }
      steps {
        unstash 'node_modules'
        sh './script/unitTest.sh'
        junit 'build/reports/**/*.xml'
      }
    }
    stage('Smoke Test') {
      agent {
        docker { image 'node:10-alpine' }
      }
      steps {
        unstash 'node_modules'
        sh './script/smokeTest.sh'
        junit 'build/reports/**/*.xml'
      }
    }
    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
            // withDockerRegistry(credentialsId: 'ecr:ap-southeast-1:aws-dev-ops', url: '311429916512.dkr.ecr.ap-southeast-1.amazonaws.com/demo-ci-cd/backend') {
            //     // some block
            // }
            docker.withRegistry( '311429916512.dkr.ecr.ap-southeast-1.amazonaws.com/demo-ci-cd/backend', registryCredential ) {
              dockerImage.push()
            }
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