import json
import os
from requests.exceptions import HTTPError

from flask import Flask, request
from porc import Client

from services import twitter

vault = json.load(open('vault.json'))
apikey = vault['orchestrate-key']
host = 'https://api.ctl-uc1-a.orchestrate.io/'
tableDef = 'tagsdef'
client = Client(apikey, host)
client.ping().raise_for_status()

app = Flask(__name__)

def getPrettyJSON(obj):
  return json.dumps(obj, sort_keys=True,
    indent=4, separators=(',', ': '))

def saveDefHashtag(hashtag, defn):
  response = client.put(tableDef, hashtag, {
    'hashtag': hashtag,
    'describe': defn,
    'type': 'hashtag'
  })
  response.raise_for_status()

def getDef(hashtag):
  obj = client.get(tableDef, hashtag)
  try:
    obj.raise_for_status()
  except HTTPError:
    return getPrettyJSON({'status': 1})
  response = dict(obj)
  response['status'] = 0
  return getPrettyJSON(response)

@app.route("/hashtag/def/q/<hashtag>")
def queryHashtagDef(hashtag):
  return getDef(hashtag)

@app.route("/hashtag/def/a/", methods=['POST'])
def addHashtagDef():
  hashtag = request.form['hashtag']
  describe = request.form['describe']
  saveDefHashtag(hashtag, describe)
  return getPrettyJSON({'status': 'success'})

@app.route("/tweets/hashtag/<hashtag>/<resultType>/<count>")
@app.route("/tweets/hashtag/<hashtag>/<resultType>/<count>/<maxId>")
def searchTweetsByHashtag(hashtag, resultType, count, maxId = None):
  result = twitter.search(hashtag, resultType, count, maxId)
  return getPrettyJSON(result['statuses'])

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=int(os.environ.get("PORT",3000)), debug=True)
