#!/usr/bin/env bash


function build() {
  local basePath=$1

  pushd .
  cd "$basePath" || exit
  ./mvnw package && java -jar target/gs-spring-boot-docker-0.1.0.jar
  popd || exit
}

build "backend/core"
build "backend/amq-producer"

