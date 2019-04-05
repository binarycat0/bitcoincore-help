# bitcoincore help

WEB-UI for bitcoincore jsonRPC api

## Required:

- docker
    - [Mac OS](https://docs.docker.com/docker-for-mac/install/)
    - [Windows](https://docs.docker.com/docker-for-windows/install/)
    - [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
    - [Centos](https://docs.docker.com/install/linux/docker-ce/centos/#install-docker-ce)
    
## START
    
    docker-compose build
    docker-compose -p bitcoincore_help up
    
    ## daemononize 
    # docker-compose -p bitcoincore_help up -d

Then open in your browser  
- https://localhost:3000

## STOP
    
    docker-compose -p bitcoincore_help stop
    docker-compose down --rmi local
    
    
## BINDING

For example, before start this project you already ran your `bitcoin-testnet-box` container with name `bitcoin-privatenode`

For binding `bitcoincore_help` middle container and your `bitcoin-testnet-box` you should execute next command:
    
    docker network connect bitcoincore_help_net bitcoin-privatenode