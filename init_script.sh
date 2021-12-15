#!/bin/bash
cp .env.example .env
yarn
CI=true yarn start