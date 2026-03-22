FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN go build -o gateway .

FROM alpine:3.21

WORKDIR /app

COPY --from=builder /app/gateway .

EXPOSE 8082

CMD ["./gateway"]
