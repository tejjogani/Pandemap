from datetime import datetime
from .models import Place
# from .models import Place
from PIL import Image
import sqlalchemy

from watson_machine_learning_client import WatsonMachineLearningAPIClient
import cv2
import numpy as np
import pandas as pd
from credentials import *

cos_credentials = cos_credentials
deployment = deployment_data
engine = sqlalchemy.create_engine(CONN_LINK)

def get_prediction(http_ref):
    image = get_frame(http_ref)
    client = WatsonMachineLearningAPIClient(cos_credentials)
    prep = process_image(image).tolist()
    scoring_endpoint = client.deployments.get_scoring_url(deployment)
    scoring_payload = { 'values': prep }
    scores = client.deployments.score(scoring_endpoint, scoring_payload)
    return np.sum(np.array(scores['values']))


def process_image(img):
    data = []
    img = np.mean(img, axis=2)
    # img = cv2.imread(imga, 0)
    # img = np.array(img)
    img = (img - 127.5) / 128
    data.append([img])
    print('Image loaded!')
    print(img.shape)
    d = data[0]
    x_in = d[0]
    x_in = np.reshape(d[0], (1, d[0].shape[0], d[0].shape[1], 1))
    return x_in

def get_frame(http_ref):
    import cv2
    cap = cv2.VideoCapture(http_ref)
    ret, frame = cap.read()
    return frame


def payload():
    places = list(Place.objects.all())
    json = []
    for p in places:
        interval_count = round(float(get_prediction(p.http_ref)))
        print(interval_count)
        dict = {'place_id': p.id, 'timestamp' : datetime.now(), 'people_count': interval_count, 'user_info' : None}
        json.append(dict)
    json_df = pd.DataFrame(json)
    json_df.to_sql(con=engine, name='places_interval', if_exists='append', index=False)