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
        sh "sed -i='' 's/<BUILD_NUMBER>/${BUILD_NUMBER}/' version.json"
        sh "sed -i='' 's/<BUILD_ID>/${BUILD_ID}/' version.json"
        sh "sed -i='' 's/<GIT_COMMIT>/${GIT_COMMIT}/' version.json"
        sh "sed -i='' 's/<GIT_BRANCH>/${GIT_BRANCH}/' version.json"
        sh "sed -i='' 's/<BUILD_TAG>/${BUILD_TAG}/' version.json"
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
    stage('Deploy STAGING') {
      steps {
        sh "sed -i='' 's/<BUILD_NUMBER>/${BUILD_NUMBER}/' Dockerrun.aws.json"
        step([$class: 'AWSEBDeploymentBuilder', applicationName: 'demo-backend', awsRegion: 'ap-southeast-1', bucketName: 'demo-backend-elasticbeanstalk-deployment', checkHealth: false, credentialId: 'aws-dev-ops', environmentName: 'demo-backend-dev', excludes: '"build/**, node_modules/**, tests/**"', includes: 'Dockerrun.aws.json', keyPrefix: '', maxAttempts: 10, rootObject: '', sleepTime: 15, versionDescriptionFormat: '', versionLabelFormat: 'dev-${BUILD_NUMBER}', zeroDowntime: false])
      }
    }
    stage('Sanity check') {
      steps {
        input "Do you want to deploy on UAT?"
      }
    }
    stage('Deploy UAT') {
      steps {
        sh "sed -i='' 's/<BUILD_NUMBER>/${BUILD_NUMBER}/' Dockerrun.aws.json"
        step([$class: 'AWSEBDeploymentBuilder', applicationName: 'demo-backend', awsRegion: 'ap-southeast-1', bucketName: 'demo-backend-elasticbeanstalk-deployment', checkHealth: false, credentialId: 'aws-dev-ops', environmentName: 'demo-backend-staging', excludes: '"build/**, node_modules/**, tests/**"', includes: 'Dockerrun.aws.json', keyPrefix: '', maxAttempts: 10, rootObject: '', sleepTime: 15, versionDescriptionFormat: '', versionLabelFormat: 'staging-${BUILD_NUMBER}', zeroDowntime: false])
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