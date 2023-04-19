FROM python:3.7-alpine

RUN pip install --upgrade pip

WORKDIR /app_cont
COPY . /app_cont

RUN pip --no-cache-dir install -r requirements.txt

EXPOSE 8888

CMD ["python3", "app.py"]
