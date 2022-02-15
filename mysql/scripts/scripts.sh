ROOT_PASS=5366987S
ROOT=root

cd /var/
mkdir sql
cd sql



apt-get update
apt-get install iproute2
apt-get install vim

mysql -u root -p${ROOT_PASS} -e "DROP schema chat;"
mysql -u root -p${ROOT_PASS} -e "CREATE schema chat;"
mysql -u root -p${ROOT_PASS} -e "use chat;"
mysql -u root -p${ROOT_PASS} --database=chat< /var/sql/schemes/chat_messages.sql
mysql -u root -p${ROOT_PASS} --database=chat < /var/sql/schemes/chat_users.sql
