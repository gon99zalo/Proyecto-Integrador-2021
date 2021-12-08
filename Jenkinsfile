image: node:10

stages:          # List of stages for jobs, and their order of execution
  - build
  - test
  - deploy

build:       # This job runs in the build stage, which runs first.
  stage: build
  only:
    - main
  script:
    - echo "Ejecutando build "
    - cd Frontend/auto-app
    - npm cache clean --force
    - rm -rf node_modules && rm ./package-lock.json && npm install --force
    - npm run build --serverTimeout 60000
  artifacts:
    paths:
      - Frontend/auto-app/build/

test:   # This job runs in the test stage.
  stage: test    # It only starts when the job in the build stage completes successfully.
  only:
    - main
  before_script:
    - echo "Running unit tests... This will take about 60 seconds."
  script:
    - cd Frontend/auto-app


deploy:      # This job runs in the deploy stage.
  stage: deploy 
  only: 
    - main # It only runs when both jobs in the test stage complete successfully.
  image: 
    name: amazon/aws-cli
    entrypoint: [""]
  dependencies:
    - build
  script:
    - aws --version
    - aws s3 rm s3://$S3_BUCKET --recursive
    - aws s3 cp Frontend/auto-app/build/ s3://$S3_BUCKET --recursive --include "*"
