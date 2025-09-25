pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('FRONTEND/book-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement" (
                        rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement"
                    )
                    mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement"
                    xcopy /E /I /Y FRONTEND\\book-frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('BACKEND/bookmanagement') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement.war" (
                        del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement.war"
                    )
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement" (
                        rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookManagement"
                    )
                    copy "BACKEND\\bookmanagement\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
