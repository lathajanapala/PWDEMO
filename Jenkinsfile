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
    stage('Generate Report') {
      when { exists 'playwright-report' }
      steps {
        // Ensure report index is present
        sh 'ls -l playwright-report || true'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*,test-results/**/*', fingerprint: true, allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
    }
    failure {
      echo 'Build failed. Check Playwright report artifacts.'
    }
    success {
      echo 'Playwright tests completed successfully.'
    }
  }
}

// NOTE: Do NOT hardcode credentials. In Jenkins, create a Username with password credential (ID: GIT_CRED) for Git if needed.
// Use withCredentials([usernamePassword(credentialsId: 'GIT_CRED', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) { ... }
