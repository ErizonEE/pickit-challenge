FROM node:14
WORKDIR /app
COPY init_script.sh /scripts/init_script.sh
RUN ["chmod", "+x", "/scripts/init_script.sh"]
ENTRYPOINT ["/scripts/init_script.sh"]