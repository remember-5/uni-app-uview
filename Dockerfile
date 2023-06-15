# 构建容器
FROM nginx:1.23-alpine
LABEL version='v1.0.0'
# 打包后的文件加入到docker
COPY /dist/build/h5 /usr/share/nginx/html
# 暴露80端口
EXPOSE 80
# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
