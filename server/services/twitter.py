
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

def addHashSymbol(hashtag):
  if hashtag[0] != '#':
    return '#' + hashtag
  return hashtag

def searchByHashtag(hashtag, resultType, count, maxId):
  hashtag = addHashSymbol(hashtag)
  new_tweets = api.search(q=hashtag, result_type=resultType, count=count, max_id=maxId)
  return new_tweets

def searchByMultipleHashtags(hashtags, resultType, count, maxId):
  hashtags = map(addHashSymbol, hashtags)
  q = ' '.join(hashtags)
  new_tweets = api.search(q=q, result_type=resultType, count=count, max_id=maxId)
  return new_tweets
