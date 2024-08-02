# Use the latest stable NGINX image
FROM nginx:1.23.4

# Copy custom NGINX configuration files
COPY ./conf /etc/nginx/conf.d

# Copy environment file if needed by other processes or scripts
COPY .env /etc/nginx/.env

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Set the default command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
