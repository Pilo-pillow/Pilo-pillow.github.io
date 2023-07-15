const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    loop: 'all',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [{
        name: '90',
        artist: 'Pompeya',
        url: '/music/song/90-pompeya.mp3',
        cover: '/music/cover/Tropical.jpg',
        lrc: '/music/lrc/90.lrc',
    }, {
        name: '反方向的钟',
        artist: '周杰伦',
        url: '/music/song/反方向的钟.mp3',
        cover: '/music/cover/Jay.PNG',
        lrc: '反方向的钟.lrc'
    }]
})