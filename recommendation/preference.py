import pandas as pd
import json
import numpy as np
import requests
import sql
from math import radians, cos, sin, asin, sqrt
import psycopg2
import sqlalchemy

CONN = ### DB CONN
API = ### YELP API KEY

"""
Computes COVID-safe recommendations given user's location, latitude and longitude.

Sample call:

p = Preference("QUERY", LATITUDE, LONGITUDE)
p.returnTopThree() #To get the top three recommendations.
p.returnTop() #To get the top recommendation.
"""

class Preference:
    """ Class to compute preferences """
    def __init__(self, query, latitude, longitude):
        """
        Initializes a Preference search.

        query -- User's search
        latitude -- User's Latitude
        longitude -- User's Longitude
        """
        assert type(query) == str, "Query should be a string"
        assert type(latitude) == float, "Latitude should be a float"
        assert type(longitude) == float, "longitude should be a float"

        self.query = query
        self.latitude = latitude
        self.longitude = longitude
        #self.vocab = set(words.words())

        conn = psycopg2.connect(CONN)
        self.df = pd.read_sql("""SELECT * FROM places_place""", conn)
        conn.close()

        self.engine = sqlalchemy.create_engine(CONN)

        #print(self.df['longitude'].tolist())
        self.df['Distance'] = self.haversideND(self.df['longitude'].tolist(), self.df['latitude'].tolist(), longitude, latitude)

        self.id = max(self.df['id']) + 1

        df2 = self.df[self.__searchAndFilter(self.df)]
        #print(df2) #
        df2['Match_Score'] = self.boolToScore(df2['Direct_Match'])
        self.l = min(len(df2), 3)

        if self.l != 0:
            df2['Match_Score'] = df2['Match_Score']/max(df2['Match_Score'])
            df2['score'] = df2['Distance']/max(df2['Distance']) * 0.4 + df2['max_people']/max(df2['max_people']) * 0.4 + df2['Match_Score'] * 0.2
            df2 = df2.sort_values(by=['score'])
            df2 = df2.drop(columns = ['score'])

        df2 = df2.drop(columns = ['Match_Score','Direct_Match','Distance'])
        #print(df2)
        self.matches = df2[:3]

        self.people = 0
        if self.l:
            self.people = max(self.matches["max_people"])


        #self.top = self.recommendTop()
        self.topThree = self.recommendTopThree()

        self.close()

        #f = open("categories.json", "r")
        #j = json.load(f)

        #self.categories = [(i['title'],i['alias']) for i in j]

    def close(self):
        with self.engine.connect() as connection:
            connection.close()


    def haversideND(self, lon1, lat1, lon2, lat2, meters = True):
        assert len(lon1) == len(lat1), "Longitudes and latitudes should have same length"
        lst = []
        for i in range(len(lon1)):
            lst.append(self.haversine(lon1[i], lat1[i], lon2, lat2, meters))
        return lst

    def haversine(self, lon1, lat1, lon2, lat2, meters = True):
        """
        Calculate the great circle distance between two points
        on the earth (specified in decimal degrees)
        """
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        km = 6371* c
        if meters:
            return km * 1000
        return km

    def returnTop(self):
        return self.toptopThree[0]

    def returnTopThree(self):
        return self.topThree

    def boolToScore(self, l):
        return [(int(not i) + 0.5) * 1.5 for i in l]

    def __searchAndFilter(self, df):
        df2 = df
        name = df2['name'].str.lower().str.contains(self.query.lower())
        df2['Direct_Match'] = name
        return name
        #tags = df['tags'].str.lower().str.contains(self.query.lower())
        #name_and_tags = [name[i] or tags[i] for i in range(len(name))]
        #return df[name_and_tags]

    def __categories(self, txts):
        dirmatches = []
        close = []
        contains = []

        for i in self.categories:
            for j in txts:
                if j.lower() == i[1].lower() or j.lower()+"s" == i[1].lower()[:]:
                    dirmatches.append([j,i])
                elif j.lower() == i[1].lower()[:len(j)]:
                    close.append([j,i])
                elif j.lower() in i[1].lower() or j.lower() in i[0].lower():
                    contains.append([j,i])

        if len(dirmatches) > 0:
            return dirmatches
        if len(close) > 0:
            return close
        elif len(contains) > 0:
            return contains
        else:
            return 0

    def addToDb(self, data):
        df = pd.DataFrame([data])
        df.to_sql('places_place', if_exists='append', con=self.engine, index=False)

    def recommendTop(self):
        inDb = self.l > 0
        """ INSERT CODE TO TEST IF QUERY IS ALREADY IN DATABASE """

        if inDb:
          if self.matches.iloc()[0]['max_people'] < 80: ## CAN REMOVE
            return self.matches.iloc[0].to_json()
          else:
            return self.format(self.__inp(1))

        else:
            # Get recs from Yelp, add to DB, get location data, add to DB, and then recommend.
            return self.__inp(1) # TOP RECOMMENDATION

    def recommendTopThree(self):
        #print(self.matches)
        if self.l < 3:
            arr = []
            for i in range(self.l):
                arr.append(json.loads(self.matches.iloc[i].to_json()))

            resp = self.__inp(3 - self.l)
            for i in resp['businesses']:
                arr.append(self.format(i))

            d = pd.DataFrame(arr)
            d['Distance'] = self.haversideND(d['longitude'].tolist(), d['latitude'].tolist(), self.longitude, self.latitude)
            d['Direct_Match'] = d['name'] == self.query
            d['Match_Score'] = self.boolToScore(d['Direct_Match'])
            d['Match_Score'] = d['Match_Score']/max(d['Match_Score'])
            d['score'] = d['Distance']/max(d['Distance']) * 0.4 + d['max_people']/max(d['max_people']) * 0.4 + d['Match_Score'] * 0.2
            d = d.sort_values(by=['score'])
            d = d.drop(columns = ['Match_Score','Direct_Match','Distance','score'])

            return list(d.T.to_dict().values())
            #return [self.matches.to_json(), self.__inp(3 - self.l)]
        return [json.loads(self.matches.iloc[0].to_json()), json.loads(self.matches.iloc[1].to_json()), json.loads(self.matches.iloc[2].to_json())]


    def format(self, data, add = True):
        t = 2
        cat = ""
        for i in data['categories']:
            if "coffee" in i["alias"]:
                t = 3
            cat += i["alias"] + ","
        cat = cat[:-1]

        sp = {
            "id":self.id + 1,
            "name":data["name"],
            "type_of_place_id": t,
            "max_people": self.people,
            "http_ref":"",
            "latitude":data["coordinates"]["latitude"],
            "longitude":data["coordinates"]["longitude"],
            "yelp_business_id": data["id"],
            "tags":cat,
            "img_url":data['url']
            }

        #print(data)
        self.id += 1
        if add:
            if not data["id"] in self.df['yelp_business_id']:
                self.addToDb(sp)
        return sp

    def __inp(self, n = 3):
        """
        lower_words = self.query.lower().split()
        is_word = [i in self.vocab for i in lower_words]
        word_list = []
        names = []
        for idx, i in enumerate(lower_words):
            if is_word[idx]:
                word_list.append(i)
            else:
                names.append(i)

        cat_lst = self.__categories(word_list)

        if cat_lst != 0:
            categories = ""
            count = 0
            for i in cat_lst:
                if count:
                    categories += ","
                categories += i[1][1]
                count += 1
            if len(names) or n == 1:
                print("Called A")
                return self.__yelpSearchBoth(self.query, categories, n)
            else:
                print("Called B")
                return self.__yelpSearchCategory(categories, n)
        print("Called C")
        """

        return self.__yelpSearchName(self.query, n)

    def __yelpSearch(self, names, lim = 3):
        params = {
            'term': names,
            'limit': lim,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'sort_by':'best_match'
        }
        return self.__yelp(params)

    def __yelpSearchName(self, names, lim = 3):
        params = {
            'term': names,
            'limit': lim,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'sort_by':'best_match'
        }
        return self.__yelp(params)

    def __yelpSearchCategory(self, categories, lim = 3):
        params = {
            'limit': lim,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'categories': categories,
            'sort_by':'best_match'
        }
        return self.__yelp(params)

    def __yelpSearchBoth(self, names, categories, lim = 3):
        params = {
            'term': names,
            'limit': lim,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'categories': categories,
            'sort_by':'best_match'
        }
        return self.__yelp(params)

    def __yelp(self, params, lim = 3):
        filter = 'best_match'
        API_KEY = API
        ENDPOINT = "https://api.yelp.com/v3/businesses/search"
        HEADERS = {'Authorization': 'bearer %s' % API_KEY}

        response = requests.get(url = ENDPOINT, params = params, headers = HEADERS)
        return response.json()
