from flask import Flask, request, redirect, session, jsonify
from spotipy import SpotifyOAuth, Spotify
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)  # Secure session management
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'

# Spotify API credentials


SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')


# Set up Spotipy OAuth
sp_oauth = SpotifyOAuth(
    client_id=SPOTIPY_CLIENT_ID,
    client_secret=SPOTIPY_CLIENT_SECRET,
    redirect_uri=SPOTIPY_REDIRECT_URI,
    scope="user-read-recently-played user-top-read playlist-read-private"
)

@app.route('/login')
def login():
    # Redirect user to Spotify's login page
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    # Handle Spotify's response
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session['token_info'] = token_info
    return redirect('/fetch_data')

@app.route('/fetch_data')
def fetch_data():
    # Ensure token is valid
    token_info = sp_oauth.get_cached_token()
    if not token_info:
        return redirect('/login')

    spotify = Spotify(auth=token_info['access_token'])

    # Fetch data
    recently_played = spotify.current_user_recently_played(limit=5)['items']
    top_tracks = spotify.current_user_top_tracks(limit=5)['items']
    top_artists = spotify.current_user_top_artists(limit=5)['items']

    # Extract relevant data
    data = {
        "recently_played": [
            {
                "thumbnail": track['track']['album']['images'][0]['url'],
                "title": track['track']['name'],
                "artist": ", ".join([artist['name'] for artist in track['track']['artists']]),
                "link": track['track']['external_urls']['spotify']
            } for track in recently_played
        ],
        "top_tracks": [track['name'] for track in top_tracks],
        "top_artists": [artist['name'] for artist in top_artists],
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)