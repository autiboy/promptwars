FROM nginx:alpine
COPY . /usr/share/nginx/html
# Cloud Run dynamic PORT configuration for Nginx
CMD sed -i -e 's/listen.*/listen '"$PORT"';/' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
