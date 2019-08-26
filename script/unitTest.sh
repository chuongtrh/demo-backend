#!/bin/sh
MOCHA_FILE=./build/reports/jenkins-unit-test-results.xml ./node_modules/.bin/mocha tests/unit/** --reporter mocha-junit-reporter --log-timer-events --exit