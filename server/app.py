import json
import os
from requests.exceptions import HTTPError

from flask import Flask, request
from porc import Client

vault = json.load(open('vault.json'))
apikey = vault['orchestrate-key']
host = 'https://api.ctl-uc1-a.orchestrate.io/'
tableDef = 'tagsdef'
client = Client(apikey, host)
client.ping().raise_for_status()

app = Flask(__name__)

def saveDefHashtag(hashtag, defn):
    response = client.put(tableDef, hashtag, {
        'describe': defn,
        'type': 'hashtag'
    })
    response.raise_for_status()


def getDef(hashtag):
    obj = client.get(tableDef, hashtag)
    try:
        obj.raise_for_status()
    except HTTPError:
        return json.dumps({'status': 1})
    response = dict(obj)
    response['status'] = 0
    return json.dumps(response)

@app.route("/hashtag/def/q/<hashtag>/")
def queryHashtagDef(hashtag):
    return getDef(hashtag)

@app.route("/hashtag/def/a/", methods=['POST'])
def addHashtagDef():
    hashtag = request.form['hashtag']
    describe = request.form['describe']
    saveDefHashtag(hashtag, describe)
    return json.dumps({'status': 'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT",3000)))
