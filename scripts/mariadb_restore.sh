#!/bin/bash
# =======
# version: 1
# author: sdeletang
# description: restore mariadb
# =======

cat backup.sql | docker exec -i maria-db /usr/bin/mysql -u root --password=stephendltgis100%MAGIC app_KkxSYT4V
