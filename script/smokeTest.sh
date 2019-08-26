#!/bin/sh
MOCHA_FILE=./build/reports/jenkins-smoke-test-results.xml ./node_modules/.bin/mocha tests/smoke/** --reporter mocha-junit-reporter --log-timer-events --exit