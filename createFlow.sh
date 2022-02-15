# Start the K8s cluster
minikube start

sleep 5

cd chatbot

kubectl apply -f Kube/

kubectl get po -A

kubectl get svc -A

kubectl port-forward svc/server -n chatbot 3005:3000