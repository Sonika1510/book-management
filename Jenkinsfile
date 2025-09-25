pipeline {
    agent any

    environment {
        // Update these to match your Jenkins tool installations
        MAVEN_HOME = tool 'Maven'       // Name of Maven installation in Jenkins
        NODEJS_HOME = tool 'NodeJS'     // Name of NodeJS installation in Jenkins
        JAVA_HOME = tool 'JDK'          // Name of Java installation in Jenkins
        PATH = "${env.MAVEN_HOME}/bin;${env.NODEJS_HOME}/bin;${env.JAVA_HOME}/bin;${env.PATH}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout from main branch - update if your branch name is different
                git branch: 'main', url: 'https://github.com/Sonika1510/book-management.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('FRONTEND/book-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def tomcatPath = 'C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/bookManagement'

                    bat "if exist \"${tomcatPath}\" rmdir /S /Q \"${tomcatPath}\""
                    bat "mkdir \"${tomcatPath}\""
                    bat "xcopy /E /I /Y FRONTEND\\book-frontend\\dist\\* \"${tomcatPath}\""
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('BACKEND/bookmanagement') {
                    bat "${MAVEN_HOME}\\bin\\mvn clean package"
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def tomcatWarPath = 'C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/bookManagement.war'
                    def warSource = 'BACKEND/bookmanagement/target/bookManagement.war'

                    bat "if exist \"${tomcatWarPath}\" del /Q \"${tomcatWarPath}\""
                    bat "copy /Y \"${warSource}\" \"C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/\""
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
