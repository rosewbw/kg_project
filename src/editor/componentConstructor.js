function ElementOptions(_videoUrl, _imgUrl, _Name, _Id, _x, _y, _Duration) {
    this.videoUrl = _videoUrl;
    this.imgUrl = _imgUrl;
    this.name = _Name;
    this.id = _Id;
    this.duration = _Duration;
    this.position = {
        x: _x,
        y: _y
    };
    this.button = [];
    this.isStart = false;
}

function ButtonConstructor(_TargetId, _Name) {
    this.targetId = _TargetId;
    this.buttonOptions = new ButtonOptions(_Name);
}

function ButtonOptions(_Name) {
    this.name = _Name;
    this.hideAnimationSpeed = 500;
    this.backgroundImage = null;
    this.position = {
        x: null,
        y: null
    };
    this.color = 'rgba(100,149,237,0.7)';
    this.size = {
        x: null,
        y: 40
    };
    this.fontSize = 18;
    this.radius = 5;
    this.borderWidth = '0';
    this.borderColor = '#ffffff';
    this.borderStyle = 'solid';
    // this.ButtonType = null ;
    this.fontColor = '#ffffff';
    this.start = 0;
    this.end = 0;
}

export {ElementOptions,ButtonConstructor,ButtonOptions}