import json
import os
import random
import requests

f = open('defaulthouse.json')
data = json.load(f)

min_lat = 37.541175
max_lat = 37.553069

min_lon = -121.954793
max_lon = -121.939463
out = open('queries.txt', 'w')
print(os.environ['MAPS_API_KEY'])
visited = {}
for i in range(50):
  rand_lat = random.uniform(min_lat, max_lat)
  rand_lon = random.uniform(min_lon, max_lon)
  api_result = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + str(rand_lat) + ',' + str(rand_lon) + '&key=' + os.environ['MAPS_API_KEY'])
  api_response = api_result.json()
  # print(api_response['results'][0])
  # create json file
  dummy_address = {"candyflags":{}}
  dummy_address['houseaddress'] = api_response['results'][0]['formatted_address']
  if(dummy_address['houseaddress'] in visited):
    continue
  visited[dummy_address['houseaddress']] = True
  dummy_address['longitude'] = api_response['results'][0]['geometry']['location']['lng']
  dummy_address['latitude'] = api_response['results'][0]['geometry']['location']['lat']
  for key in data['candyflags']:
    dummy_address['candyflags'][key] = (random.randint(0, 99) <= 25)
  case = random.randint(0, 4)
  if case == 0:
    dummy_address['hascandy'] = False
    dummy_address['haslargecandy'] = False
    dummy_address['openbowl'] = False
  elif case == 1:
    dummy_address['hascandy'] = True
    dummy_address['haslargecandy'] = False
    dummy_address['openbowl'] = False
  elif case == 2:
    dummy_address['hascandy'] = True
    dummy_address['haslargecandy'] = True
    dummy_address['openbowl'] = False
  elif case == 3:
    dummy_address['hascandy'] = True
    dummy_address['haslargecandy'] = True
    dummy_address['openbowl'] = True
  else:
    dummy_address['hascandy'] = True
    dummy_address['haslargecandy'] = False
    dummy_address['openbowl'] = True
  # convert dummy_address to sql insert statement
  sql = "INSERT INTO houses (houseaddress, longitude, latitude, hascandy, haslargecandy, openbowl, candyflags) VALUES ('" + dummy_address['houseaddress'] + "', " + str(dummy_address['longitude']) + ", " + str(dummy_address['latitude']) + ", " + str(dummy_address['hascandy']) + ", " + str(dummy_address['haslargecandy']) + ", " + str(dummy_address['openbowl']) + ", '" + json.dumps(dummy_address['candyflags']) + "');"
  out.write(sql + "\n")

out.close()
f.close()