FROM httpd:2.4.46
COPY build /usr/local/apache2/htdocs/


# docker image build . -t arturocv/docanalyzer-frontend

# docker push arturocv/docanalyzer-frontend

# docker run -d -p 6413:80 docanalyzer-frontend