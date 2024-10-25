"""
Prerequisites

    pip3 install spotipy Flask Flask-Session

    // from your [app settings](https://developer.spotify.com/dashboard/applications)
    export SPOTIPY_CLIENT_ID="ad0141f89eb449d48ae64db2bec8172a"
    export SPOTIPY_CLIENT_SECRET="0ac9c574296249d888be47f4d2527dc1"
    export SPOTIPY_REDIRECT_URI="http://127.0.0.1:8080"

    // SPOTIPY_REDIRECT_URI must be added to your [app settings](https://developer.spotify.com/dashboard/applications)
    OPTIONAL
    // in development environment for debug output
    export FLASK_ENV=development
    // so that you can invoke the app outside the file's directory include
    export FLASK_APP=/path/to/spotipy/examples/app.py

    // on Windows, use `SET` instead of `export`

Run app.py

    python3 app.py OR python3 -m flask run
    NOTE: If receiving "port already in use" error, try other ports: 5000, 8090, 8888, etc...
        (will need to be updated in your Spotify app and SPOTIPY_REDIRECT_URI variable)
"""

import os
from flask import Flask, session, request, redirect
from flask_session import Session
import spotipy
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
import json


client_id = "86048bd10ece4b4db37d5243e8e96d4d"
client_secret = "cffc72a5bd9f44e786fd6d1ea0bbf46b"
redirect_uri = "http://127.0.0.1:8080"
scope = "user-read-currently-playing playlist-modify-private user-top-read user-read-recently-played user-library-read user-follow-read playlist-modify-public"

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

firebase = firebase.FirebaseApplication('https://algorizzm-backend-b7ec2-default-rtdb.firebaseio.com/', None)

# Function to load JSON file and return a dictionary
def load_json(file_name):
    with open(file_name, 'r') as file:
        data = json.load(file)
    return data

json_file = 'backend/db/credentials.json'  # Replace with your JSON file name
json_dict = load_json(json_file)


# Initialize the Firebase Admin SDK using the credentials JSON file
cred = credentials.Certificate(json_file)
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://algorizzm-backend-b7ec2-default-rtdb.firebaseio.com/"
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
            f'<a href="/test">test</a> | ' \
            f'<a href="/test2">test2</a> | ' \
            f'<a href="/submit">submit</a> | ' \
        f'<a href="/current_user">me</a>' \

@app.route('/sign_up')
def sign_up():
    """ 
    The sign up method is gonna generate all the needed user data and store it in the database as a profile json
    We also need a helper method that refreshes user data that changes (mainly spotify based)
    This method needs to receive demographic data from the frontend sign up page, combine it with spotify data and generate the profile json
    """
  
    return None
@app.route('/generate_spotify_user_profile')
def gen_spotify_user_profile():    
    user = {}
    user["current_user"] = current_user()
    user["top_tracks"] = current_user_top_tracks()
    user["top_artists"] = current_user_top_artists()
    user["recent_tracks"] = current_user_recently_played()
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
    #do top 5 as well here
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_handler=cache_handler)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    top_artists = spotify.current_user_top_artists(limit = 1)
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

@app.route('/test')
def test():
  result = firebase.get('/language', None)
  return str(result)

@app.route('/test2')
def test2():
  result = firebase.get('/videos', None)
  return str(result)

@app.route('/submit', methods=['GET', 'POST'])
def submit():
  #submit user data to User_info
    firebase.post('/User_info', {'name': 'Kihoon Alan Kang', 'URI': 'hello'})
    return 'Success'

'''
Following lines allow application to be run more conveniently with
`python app.py` (Make sure you're using python3)
(Also includes directive to leverage pythons threading capacity.)
'''
if __name__ == '__main__':
    #run threaded on port http://localhost:8080/
    app.run(threaded=True, port=8080, debug=True)
