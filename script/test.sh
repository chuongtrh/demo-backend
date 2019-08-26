#!/bin/sh
#./node_modules/.bin/mocha ./tests/** --exit
MOCHA_FILE=./build/reports/jenkins-test-results.xml ./node_modules/.bin/mocha tests/** --reporter mocha-junit-reporter --exit