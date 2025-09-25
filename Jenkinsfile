pipeline {
    agent any

    tools {
        // Replace these names with the names you configured in Jenkins Global Tool Config
        jdk 'JDK11'      // Your installed JDK name
        maven 'Maven3'   // Your installed Maven name
    }

    environment {
        TOMCAT_PATH = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git 'https://github.com/Sonika1510/book-management.git'
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
                bat """
                    if exist "${TOMCAT_PATH}\\bookManagement" rmdir /S /Q "${TOMCAT_PATH}\\bookManagement"
                    mkdir "${TOMCAT_PATH}\\bookManagement"
                    xcopy /E /I /Y FRONTEND\\book-frontend\\dist\\* "${TOMCAT_PATH}\\bookManagement\\"
                """
            }
        }

        stage('Build Backend') {
            steps {
                dir('BACKEND/bookmanagement') {
                    // Runs mvn clean package using Maven and JDK configured in Jenkins tools
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                    if exist "${TOMCAT_PATH}\\bookManagement.war" del /Q "${TOMCAT_PATH}\\bookManagement.war"
                    if exist "${TOMCAT_PATH}\\bookManagement" rmdir /S /Q "${TOMCAT_PATH}\\bookManagement"
                    copy BACKEND\\bookmanagement\\target\\bookManagement.war "${TOMCAT_PATH}\\"
                """
            }
        }
    }

    post {
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
