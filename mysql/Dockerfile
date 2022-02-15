FROM mysql:latest

WORKDIR /var/

ENV MYSQL_ROOT_PASSWORD 5366987S
ENV MYSQL_USER root

COPY ./scripts /var/
COPY ./schemes /var/
# RUN chmod +x /var/scripts/scripts.sh
# RUN /var/scirpts/scripts.sh

ENTRYPOINT ["sudo"]
CMD ["/var/scripts/scripts.sh"]

# RUN /scripts/scripts.sh

EXPOSE 3306