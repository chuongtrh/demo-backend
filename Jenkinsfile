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
    
    stage('Deploy') {
      agent {
        docker { image 'mesosphere/aws-cli' }
      }
      steps {
        sh 'aws --version'
        zip zipFile: 'deployment-${BUILD_NUMBER}.zip' glob: 'build/**, node_modules/**, tests/**'
        // sh 'zip -r deployment-${BUILD_NUMBER}.zip . -x "*test*" "*build*" "*node_modules*"'
        sh 'aws s3 cp deployment-${BUILD_NUMBER}.zip s3://demo-backend-elasticbeanstalk-deployment --region ap-southeast-1'
        sh 'aws elasticbeanstalk create-application-version --application-name demo-backend --version-label ${BUILD_NUMBER} --source-bundle S3Bucket="demo-backend-elasticbeanstalk-deployment",S3Key="deployment-${BUILD_NUMBER}.zip" --region ap-southeast-1'
        sh 'aws elasticbeanstalk update-environment --application-name demo-backend --environment-name demo-backend-dev --version-label ${BUILD_NUMBER} --region ap-southeast-1'
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