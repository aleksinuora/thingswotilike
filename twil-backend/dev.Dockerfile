FROM python:3.9.20-alpine3.19

WORKDIR /usr/src/app

EXPOSE 8000

COPY . .

RUN source twil-backend/bin/activate

RUN pip install -r requirements.txt

WORKDIR /usr/src/app/twil-backend

CMD ["uvicorn", "app:app", "--proxy-headers", "--host", "0.0.0.0", "--reload"]