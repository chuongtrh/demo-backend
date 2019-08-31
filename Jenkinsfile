pipeline {
  environment {
    IMAGE_NAME = "demo-ci-cd/backend"
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
          dockerImage = docker.build IMAGE_NAME + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Push Image') {
      steps{
        script {
          docker.withRegistry( 'https://311429916512.dkr.ecr.ap-southeast-1.amazonaws.com/demo-ci-cd/backend', 'ecr:ap-southeast-1:aws-dev-ops' ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Sanity check') {
      steps {
          input "Do you want to deploy on Production?"
      }
    }
    stage('Deploy - Production') {
      steps {
          echo 'Deploy - Production Ok'
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