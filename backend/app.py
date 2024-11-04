import os
from flask import Flask, session, request, redirect
from flask_session import Session
import spotipy
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
from dotenv import load_dotenv

load_dotenv()
scope = "user-read-currently-playing playlist-modify-private user-top-read user-read-recently-played user-library-read user-follow-read playlist-modify-public"

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

firebase = firebase.FirebaseApplication('https://harmonize-cs370-default-rtdb.firebaseio.com/', None)

#load env variables from .env file into variables
SPOTIPY_CLIENT_ID = os.getenv("SPOTIPY_CLIENT_ID")
SPOTIPY_CLIENT_SECRET = os.getenv("SPOTIPY_CLIENT_SECRET")
SPOTIPY_REDIRECT_URI = os.getenv("SPOTIPY_REDIRECT_URI")
type= os.getenv("type")
project_id= os.getenv("project_id")
private_key_id= os.getenv("private_key_id")
private_key= os.getenv("private_key")
client_email= os.getenv("client_email")
client_id= os.getenv("client_id")
auth_uri= os.getenv("auth_uri")
token_uri= os.getenv("token_uri")
auth_provider_x509_cert_url= os.getenv("auth_provider_x509_cert_url")
client_x509_cert_url= os.getenv("client_x509_cert_url")
universe_domain= os.getenv("universe_domain")
#make a dictionary of the env variables starting w type
cred_dict = {
    "type": type,
    "project_id": project_id,
    "private_key_id": private_key_id,
    "private_key": private_key,
    "client_email": client_email,
    "client_id": client_id,
    "auth_uri": auth_uri,
    "token_uri": token_uri,
    "auth_provider_x509_cert_url": auth_provider_x509_cert_url,
    "client_x509_cert_url": client_x509_cert_url
}

# Initialize the Firebase Admin SDK using the credentials dict from env variables
cred = credentials.Certificate(cred_dict)
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://harmonize-cs370-default-rtdb.firebaseio.com/"
})

@app.route('/')
def index():

    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope= "user-read-currently-playing playlist-modify-private user-top-read user-read-recently-played user-library-read user-follow-read playlist-modify-public",
                                               cache_handler=cache_handler,
                                               show_dialog=True)

    if request.args.get("code"):
        # Step 2. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 1. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 3. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)

    return  f'<h2>Hi {spotify.me()["display_name"]}, ' \
            f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
            f'<a href="/fetch_user_data">fetch user data</a> | ' \
            f'<a href="/matches">matches</a> | ' \
            f'<a href="/sign_up">[sign up]<a/> | '  \
            f'<a href="/blend">blend</a> | ' \
            f'<a href="/playlists">my playlists</a> | ' \
            f'<a href="/currently_playing">currently playing</a> | ' \
            f'<a href="/current_user_top_tracks">top tracks</a> | ' \
            f'<a href="/current_user_top_artists">top artists</a> | ' \
            f'<a href="/current_user_saved_albums">saved albums</a> | ' \
            f'<a href="/current_user_recently_played">recently played</a> | ' \
            f'<a href="/current_user_following_artists">following artists</a> | ' \
            f'<a href="/generate_spotify_user_profile">generate_spotify_user_profile</a> | ' \
        f'<a href="/current_user">me</a>' \



@app.route('/sign_up')
def sign_up():
    """ 
    The sign up method is gonna generate all the needed user data and store it in the database as a profile json
    We also need a helper method that refreshes user data that changes (mainly spotify based)
    This method needs to receive demographic data from the frontend sign up page, combine it with spotify data and generate the profile json
    """
    #get user data from spotify
    user = {}
    user["current_user"] = current_user()
    user["spotify_data"] = gen_spotify_user_profile()
    #pull data from signup on frontend
    #make a mockup of the data from frontend
    user["sign_up_data"] = { "Name": "John Pork", "Date of Birth": "01/01/2002", 
                            "Email": "john.pork@emory.edu", "Password": "password", 
                            "IG" : "johnpork"}
    #use "id" from current user as UUID when storing
    #have a way to check for duplicates and update if there is one
    user["matches"] = ["31w2orlgi47cga3gk4ueboxkvb74"]

    
    user_id = user["spotify_data"]['current_user']['id']

    db.reference("/").update({user_id: user})

    return "success"
  
@app.route('/fetch_user_data')
def fetch_user_data():
    #get user ID
    user = current_user()
    user_id = user['id']

    #get specific user data from database
    ref = "/"+user_id
    user_data = db.reference(ref).get()

    return user_data

@app.route('/matches')
def matches():
    #get user ID
    user = current_user()
    user_id = user['id']

    #get specific user data from database
    ref = "/"+user_id
    user_data = db.reference(ref).get()

    matches = user_data["matches"]
    matches_list = []
    for i in matches:
        match_data = fetch_other_user_data(i)
        matches_list.append(match_data)

    return matches_list


def fetch_other_user_data(UUID = "31w2orlgi47cga3gk4ueboxkvb74"):
    #get specific user data from database
    ref = "/"+UUID
    user_data = db.reference(ref).get()

    return user_data

@app.route('/generate_spotify_user_profile')
def gen_spotify_user_profile():    
    user = {}
    
    user["current_user"] = current_user()
    user["top_tracks"] = current_user_top_tracks()
    user["top_artists"] = current_user_top_artists()
    user["recent_tracks"] = current_user_recently_played()

    #TODO: check if none or len of 0 and remove (null protection)

    return user

@app.route('/blend')
def blend():
#john pork top 5 sample list
    pork_5 =  ["spotify:track:4BVL2QLF5QQLT15SpAWMVq", "spotify:track:7KVPsVMOK3NL7subwJ0dZj", "spotify:track:7KVPsVMOK3NL7subwJ0dZj", "spotify:track:6dOtVTDdiauQNBQEDOtlAB", "spotify:track:0IsIY8pfu1yaGkPUD7pkDx"]
    my_top5 = current_user_top_tracks()
    my_top5_uris = []

    for i in range(5):
        my_top5_uris.append(my_top5[i]['song_uris'])
    
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler, scope = scope)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    spotify.playlist_add_items("2GvcjQdDJYl3iKFGdPAnI1", my_top5_uris)
    spotify.playlist_add_items("2GvcjQdDJYl3iKFGdPAnI1", pork_5)
        


    return my_top5_uris

@app.route('/test_test')
def test_test():
    #get user ID
    user = current_user()
    user_id = user['id']

    spotify_data = gen_spotify_user_profile()

    db.reference("/").update({"language": "python"})

    #make new directory of user ID
    db.reference("/").update({user_id: spotify_data})

    return "success"


@app.route('/sign_out')
def sign_out():
    session.pop("token_info", None)
    return redirect('/')


@app.route('/playlists')
def playlists():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    playlist = spotify.current_user_playlists(limit = 1)

    # Extract relevant information from the playlist JSON
    playlist_name = playlist['items'][0]['name']
    description = playlist['items'][0]['description']
    playlist_url = playlist['items'][0]['external_urls']['spotify']
    image_url = playlist['items'][0]['images'][0]['url']
    total_tracks = playlist['items'][0]['tracks']['total']
    playlist_id = playlist['items'][0]['id']


    # Print the extracted information
    #print(f"Playlist Name: {playlist_name}")
    #print(f"Description: {description}")
    #print(f"Playlist URL: {playlist_url}")
    #print(f"Image URL: {image_url}")
    #print(f"Total Tracks: {total_tracks}")

    #get first public playlist from user as their first date playlist
    return {"playlist_name": playlist_name, "description": description, 
            "playlist_url": playlist_url, "image_url": image_url, "total_tracks": total_tracks, "playlist_id": playlist_id}


@app.route('/currently_playing')
def currently_playing():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    track = spotify.current_user_playing_track()
    if not track is None:

        song_name = track['item']['name']
        #print("Song: " + song_name)
        artists = [artist['name'] for artist in track['item']['artists']]
        #print("Artists: " + ", ".join(artists))
        image_url = track['item']['album']['images'][0]['url']
        #print("Image: " + image_url)
        song_link = track['item']['external_urls']['spotify']
        #print("Song Link: " + song_link)
        uri = track['context']['uri']

        progress_ms = track['progress_ms']  # progress in milliseconds
        duration_ms = track['item']['duration_ms']  # total song duration in milliseconds
        progress_minutes = progress_ms // 60000
        progress_seconds = (progress_ms % 60000) // 1000
        duration_minutes = duration_ms // 60000
        duration_seconds = (duration_ms % 60000) // 1000    
        progress_time = f"{progress_minutes}:{progress_seconds:02d}"
        duration_time = f"{duration_minutes}:{duration_seconds:02d}"
        #print(f"Progress: {progress_time} / {duration_time}")
        progress_string = f"{progress_time} / {duration_time}"

        popularity = track['item']['popularity']
        #print("Popularity (0-100): " + str(popularity))
        preview_url = track['item'].get('preview_url', "No preview available")
        #print("Preview URL: " + preview_url)


        #return dict of song name, artists, and image url
        return {"song_name": song_name, "artists": artists, "image_url": image_url, 
                "song_link": song_link, "progress_time": progress_string
                , "popularity": popularity, "preview_url": preview_url, "uri": uri}
    

    return "No track currently playing."


@app.route('/current_user')
def current_user():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    current_user = spotify.current_user()
    return current_user

#with spotipy, get the current user's top tracks
@app.route('/current_user_top_tracks')
def current_user_top_tracks():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    top_tracks = spotify.current_user_top_tracks(limit = 10)
    
    #multiple tracks logic
    tracks = top_tracks.get("items", [])
    track_list = []
    for track in tracks:
            track_data = {
            "track_name": track.get("name"),
            "track_url": track.get("external_urls", {}).get("spotify"),
            "track_id": track.get("id"),
            "preview_url": track.get("preview_url"),
            "artist_ids": [artist.get("id") for artist in track.get("artists", [])],
            "artist_names": [artist.get("name") for artist in track.get("artists", [])],
            "duration_ms": track.get("duration_ms"),
            "popularity": track.get("popularity"),
            "image_url": track.get("album", {}).get("images", [{}])[0].get("url"),  # Using the first image URL
            "song_uris": track.get("uri"), #added
            "artist_urls": [artist.get("external_urls", {}).get("spotify") for artist in track.get("artists", [])]
        }
            track_list.append(track_data)


    return track_list

@app.route('/current_user_top_artists')
def current_user_top_artists():
    #@TODO get the current user's top artists multiple
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    top_artists = spotify.current_user_top_artists(limit = 5)
    artist_info = top_artists['items'][0]
    artist_data = {
    'name': artist_info['name'],
    'id': artist_info['id'],
    'external_url': artist_info['external_urls']['spotify'],
    'popularity': artist_info['popularity'],
    'genres': artist_info['genres'],
    'image': artist_info['images'][0]['url'] if artist_info['images'] else None  # Using the first (largest) image
    }
    #print(artist_data)
    return artist_data

@app.route('/current_user_saved_albums')
def current_user_saved_albums():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user_saved_albums()

@app.route('/current_user_recently_played')
def current_user_recently_played():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    recent_tracks = spotify.current_user_recently_played(limit = 5)
    recents = []
    for track in recent_tracks['items']:
        recents.append({
            'name': track['track']['name'],
            "artists": [artist['name'] for artist in track["track"]['album']['artists']],
            'image': track['track']['album']['images'][0]['url'],
            "preview_url": track["track"]["preview_url"],
            "uri": track["track"]['uri'],
            "popularity": track["track"]['popularity']

        })

    return recents

@app.route('/current_user_following_artists')
def current_user_following_artists():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user_followed_artists()

'''
Following lines allow application to be run more conveniently with
`python app.py` (Make sure you're using python3)
(Also includes directive to leverage pythons threading capacity.)
'''
if __name__ == '__main__':
    #run threaded on port http://localhost:8080/
    app.run(threaded=True, port=8080, debug=True)
