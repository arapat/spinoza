
import json
import tweepy

vault = json.load(open('vault.json'))
API_KEY = vault['twitter']['API_KEY']
API_SECRET = vault['twitter']['API_SECRET']
ACCESS_TOKEN = vault['twitter']['ACCESS_TOKEN']
ACCESS_TOKEN_SECRET = vault['twitter']['ACCESS_TOKEN_SECRET']

auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

def search(hashtag, resultType, count, maxId):
  if hashtag[0] != '#':
    hashtag = '#' + hashtag
  new_tweets = api.search(q=hashtag, result_type=resultType, count=count, max_id=maxId)
  return new_tweets
