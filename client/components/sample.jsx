import { images } from '../assets'

const sample = {
    pic1: images.lebron1,
    pic2: images.lebron2,
    pic3: images.lebron3,
    name: 'Kelsington Park',
    prompt1: {
        question: 'Currently stuck in my head...', //last listened to/currently playing
        thumbnail: images.btr,
        title: 'Boyfriend',
        artist: 'Big Time Rush',
        preview_link: '',
    },
    prompt2: {
        question: 'Song on repeat...', //choose random from on repeat playlist
        thumbnail: images.zb,
        title: 'Something in the Orange',
        artist: 'Zach Bryan',
        preview_link: '',
    },
    prompt3: {
        question: 'In 2016, this was my shit...', //choose random from throwback playlist
        thumbnail: images.yt,
        title: 'Digits',
        artist: 'Young Thug',
        preview_link: '',
    },
    top_artists: {
        artist1: 'LUCKI',
        artist2: 'Drake',
        artist3: 'John Mayer',
        artist4: 'Chris Stapleton',
        artist5: 'Peso Pluma',
    },
    top_songs: {
        song1: 'Almost Back',
        song2: 'Passionfruit',
        song3: 'Gravity',
        song4: 'Tennessee Whiskey',
        song5: 'La Bebe'
    }
}

export default sample;