pipeline {
    agent any

    environment {
        MAVEN_HOME = tool 'MAVEN'       // Name of Maven installation in Jenkins
        
        JAVA_HOME = tool 'JAVA'          // Name of Java installation in Jenkins
       
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/Sonika1510/book-management.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('src') {  // your frontend is inside 'src'
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
                    bat "xcopy /E /I /Y src\\build\\* \"${tomcatPath}\""  // assuming build output is in src/build
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
