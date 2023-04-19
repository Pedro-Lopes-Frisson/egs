import datetime
from os import kill

from flask import Flask, request
from flask_redis import FlaskRedis
import requests
import json
import jwt
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_pyfile('config.py')

redis_client = FlaskRedis(app)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from app import redis_client


@app.route("/api/v1/login", methods=["POST"])
@cross_origin()
def login():
    """
    -----------------------------

    Verify the user's credentials agaisnt the provider i am working with for example

    parse-server
    or password for in loco

    """
    if not request.is_json or request.headers["Content-Type"] != 'application/json':
        return {"error": "Only json is supported"}, 400

    data = request.json

    try:
        username = data["username"]
        password = data["password"]
        provider = data["provider"]
    except KeyError as k:
        return {"error": "There were required fields which were not provided."}, 400

    if provider.upper() == "PARSE":
        r = requests.post("http://parse:1337/parse/login", headers={
            "X-Parse-Application-Id": "myappID",
            "X-Parse-REST-API-Key": "mymasterKey",
            "X-Parse-Revocable-Session": "1",
            "Content-Type": "application/json"
        }, data=json.dumps({
            "username": username,
            "password": password
        }))

        app.logger.info(r.json())

        if r.status_code != 200:
            return {"error": "Error validating credentials"}, 401

        resp = get_token_and_refresh_token(username, r.json()["objectId"], provider)
        resp["provider"] = provider
        resp["id"] = r.json()["objectId"]

    else:
        return {"error": "Provider not yet implemented"}, 501

    redis_client.set(name=username, value=r.json()["sessionToken"])

    return resp, 200


@app.route("/api/v1/logout", methods=["POST"])
@cross_origin()
def logout():
    if not request.headers["Authorization"]:
        return {}, 400

    token = request.headers["Authorization"].split("Bearer ")[1]
    app.logger.info(token)
    decoded_token = jwt.decode(token,key="NqxwnqXe4GMIW0hmnHTvkOhGbopi6sC7",algorithms="HS256")
    app.logger.info(decoded_token)

    if decoded_token.get("provider") == "parse":
        sessionToken = redis_client.get(name=decoded_token["username"])
        r = requests.post('http://parse:1337/parse/logout', headers={
            "X-Parse-Application-Id": "myappID",
            "X-Parse-REST-API-Key": "mymasterKey",
            "X-Parse-Session-Token": sessionToken
        })

        app.logger.info(r.text)

        if r.status_code != 200:
            return {"Error": "Logout was not possible"}
    else:
        return {"error": "provider not yet implemented"}, 501

    return {}, 200

@app.route("/api/v1/refresh")
@cross_origin()
def refresh():
    # check if refresh_token is valid
    token = request.headers["Authorization"].split("Bearer ")[1]
    decoded_token = jwt.decode(token,key="NqxwnqXe4GMIW0hmnHTvkOhGbopi6sC7",algorithms="HS256")
    username = decoded_token["username"]

    r_token = request.json()["refresh_token"]
    decoded_r_token = jwt.decode(token,key="NqxwnqXe4GMIW0hmnHTvkOhGbopi6sC7",algorithms="HS256")
    uid = decoded_r_token["uid"]
    exp = decoded_r_token["exp"]

    if exp <= datetime.datetime.now():
        return {"message" : "Refresh token Expired"}, 403

    # check if sessionToken exists in parse server

    redis_client.get(username)
    



    # return new token and new refresh token
    pass


@app.route("/api/v1/signup", methods=["POST"])
@cross_origin()
def signup():
    if not request.is_json or request.headers["Content-Type"] != 'application/json':
        return {"error": "Only json is supported"}, 400

    data = request.json

    try:
        username = data["username"]
        email = data["email"]
        password = data["password"]
        provider = data["provider"]
    except KeyError as k:
        return {"error": "There were required fields which were not provided."}, 400

    user = {
        "username": username,
        "email": email,
        "password": password,
    }

    if "phone_number" in data:
        user["phone"] = data["phone_number"]
    print(user)

    if provider.upper() == "PARSE":
        r = requests.post("http://parse:1337/parse/users", data=json.dumps(user), headers={
            "X-Parse-Application-Id": "myappID",
            "X-Parse-REST-API-Key": "mymasterKey",
            "X-Parse-Revocable-Session": "1",
            "Content-Type": "application/json"
        })

        app.logger.info(r.text)
        print(r.text)

        if r.status_code != 201:
            app.logger.error(r.json())
            return {"error": "Some error has occured"}, 400

        # build jwt token
        resp = get_token_and_refresh_token(username, r.json()["objectId"], provider)
        resp["provider"] = provider
        resp["id"] = r.json()["objectId"]

    else:
        return {"error": "Provider not yet available"}

    redis_client.set(name=username, value=r.json()["sessionToken"])

    return resp, 200


def get_token_and_refresh_token(username, uid, provider):
    # build jwt token
    exp = (datetime.datetime.now() + (datetime.timedelta(hours=1))).timestamp()
    token = jwt.encode(payload={"username": username, "exp": int(exp), "provider": provider},
                       key="NqxwnqXe4GMIW0hmnHTvkOhGbopi6sC7",
                       algorithm="HS256",
                       headers={"alg": "HS256", "typ": "JWT", "kid": "0jphHBdV5tXrQR9xIt8RDGjcHFSUptPm"})

    refresh_exp = (datetime.datetime.now() + (datetime.timedelta(days=1))).timestamp()
    refresh_token = jwt.encode(payload={"uid": uid, "exp": int(refresh_exp), "provider": provider},
                               key="NqxwnqXe4GMIW0hmnHTvkOhGbopi6sC7",
                               algorithm="HS256",
                               headers={"alg": "HS256", "typ": "JWT", "kid": "0jphHBdV5tXrQR9xIt8RDGjcHFSUptPm"})

    return {"token": token, "refresh_token": refresh_token}


if __name__ == "__main__":
    app.run(host='0.0.0.0')
