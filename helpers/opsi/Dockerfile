FROM python:3.12

WORKDIR /app

COPY src/requirements.txt ./

RUN pip install -r requirements.txt

COPY src/ /app/

EXPOSE 50051

CMD [ "python3", "main.py" ]