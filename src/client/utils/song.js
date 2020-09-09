export const minimumifySong = ({ album, artists, uri, name, id }) => {
    return {
        image: album.images[0].url,
        artist: artists[0].name,
        uri,
        name,
        id,
    };
};