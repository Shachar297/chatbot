container_name=chatbot-sql
containerId=$(docker inspect --format="{{.Id}}" $container_name)
echo $containerId


docker cp ./scripts.sh $containerId:/var/

echo Files were copied into $container_name

docker cp schemes $containerId:/var/sql/

