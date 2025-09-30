pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.55.0-jammy'
      args '-u root'
    }
  }
  options {
    timeout(time: 30, unit: 'MINUTES')
    ansiColor('xterm')
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Tests') {
      steps {
        sh 'npm test || true' // allow post actions even if tests fail
      }
    }
    stage('Allure Generate') {
      when { expression { fileExists('allure-results') } }
      steps {
        sh 'npx allure generate ./allure-results --clean -o ./allure-report || true'
        sh 'ls -l allure-report || true'
      }
    }
    stage('HTML Report Listing') {
      when { expression { fileExists('playwright-report') } }
      steps {
        // Ensure report index is present
        sh 'ls -l playwright-report || true'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*,test-results/**/*,allure-results/**/*,allure-report/**/*', fingerprint: true, allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
      // If Allure Jenkins plugin installed, uncomment:
      // allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
    failure {
      echo 'Build failed. Check reports.'
    }
    success {
      echo 'Tests completed.'
    }
  }
}

// NOTE: Do NOT hardcode credentials. In Jenkins, create a Username with password credential (ID: GIT_CRED) for Git if needed.
// Use withCredentials([usernamePassword(credentialsId: 'GIT_CRED', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) { ... }
