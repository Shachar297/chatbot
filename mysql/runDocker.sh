docker run \
    -v /Users/shacharovadia/Desktop/Projects/chatbot/mysql \
    -d --name chatbot-sql \
    -p 3306:3306 -e \
    MYSQL_ROOT_PASSWORD=5366987S mysql:latest