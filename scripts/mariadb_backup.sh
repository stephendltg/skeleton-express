#!/bin/bash
# =======
# version: 1
# author: sdeletang
# description: backup mariadb
# =======

docker exec maria-db /usr/bin/mysqldump -u root --password=stephendltgis100%MAGIC app_KkxSYT4V > backup.sql