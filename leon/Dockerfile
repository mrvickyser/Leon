FROM fusuf/whatsasena:latest

RUN git clone https://github.com/TOXIC-DEVIL/Leon /root/Leon
WORKDIR /root/Leon/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
