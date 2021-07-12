function CTextButton(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize,oParentContainer) {

    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerPress;
    var _oListenerUp;
    
    var _oButton;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize) {

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oButtonBg = createBitmap(oSprite);

        var oText = new createjs.Text(szText, "bold " + iFontSize + "px " + szFont, szColor);
        oText.textAlign = "center";
        oText.textBaseline = "alphabetic";
        var oBounds = oText.getBounds();
        oText.x = oSprite.width / 2;
        oText.y = Math.floor((oSprite.height) / 2) + (oBounds.height / 3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.addChild(oButtonBg, oText);

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerPress);
        _oButton.off("pressup", _oListenerUp);

        _oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this._initListener = function () {
        _oListenerPress = _oButton.on("mousedown", this.buttonDown);
        _oListenerUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        playSound("click", 1, false);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };
    
    _oParentContainer=oParentContainer;
    
    this._init(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize);

    return this;

}