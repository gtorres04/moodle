/*
YUI 3.8.0 (build 5744)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/dd-drop/dd-drop.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-drop/dd-drop.js",
    code: []
};
_yuitest_coverage["build/dd-drop/dd-drop.js"].code=["YUI.add('dd-drop', function (Y, NAME) {","","","    /**","     * Provides the ability to create a Drop Target.","     * @module dd","     * @submodule dd-drop","     */","    /**","     * Provides the ability to create a Drop Target.","     * @class Drop","     * @extends Base","     * @constructor","     * @namespace DD","     */","","    var NODE = 'node',","        DDM = Y.DD.DDM,","        OFFSET_HEIGHT = 'offsetHeight',","        OFFSET_WIDTH = 'offsetWidth',","        /**","        * Fires when a drag element is over this target.","        * @event drop:over","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_DROP_OVER = 'drop:over',","        /**","        * Fires when a drag element enters this target.","        * @event drop:enter","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_DROP_ENTER = 'drop:enter',","        /**","        * Fires when a drag element exits this target.","        * @event drop:exit","        * @param {EventFacade} event An Event Facade object","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_DROP_EXIT = 'drop:exit',","","        /**","        * Fires when a draggable node is dropped on this Drop Target. (Fired from dd-ddm-drop)","        * @event drop:hit","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","","","    Drop = function() {","        this._lazyAddAttrs = false;","        Drop.superclass.constructor.apply(this, arguments);","","","        //DD init speed up.","        Y.on('domready', Y.bind(function() {","            Y.later(100, this, this._createShim);","        }, this));","        DDM._regTarget(this);","","        /* TODO","        if (Dom.getStyle(this.el, 'position') == 'fixed') {","            Event.on(window, 'scroll', function() {","                this.activateShim();","            }, this, true);","        }","        */","    };","","    Drop.NAME = 'drop';","","    Drop.ATTRS = {","        /**","        * Y.Node instanace to use as the element to make a Drop Target","        * @attribute node","        * @type Node","        */","        node: {","            setter: function(node) {","                var n = Y.one(node);","                if (!n) {","                    Y.error('DD.Drop: Invalid Node Given: ' + node);","                }","                return n;","            }","        },","        /**","        * Array of groups to add this drop into.","        * @attribute groups","        * @type Array","        */","        groups: {","            value: ['default'],","            getter: function() {","                if (!this._groups) {","                    this._groups = {};","                    return [];","                }","","                return Y.Object.keys(this._groups);","            },","            setter: function(g) {","                this._groups = Y.Array.hash(g);","                return g;","            }","        },","        /**","        * CSS style padding to make the Drop Target bigger than the node.","        * @attribute padding","        * @type String","        */","        padding: {","            value: '0',","            setter: function(p) {","                return DDM.cssSizestoObject(p);","            }","        },","        /**","        * Set to lock this drop element.","        * @attribute lock","        * @type Boolean","        */","        lock: {","            value: false,","            setter: function(lock) {","                if (lock) {","                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-locked');","                } else {","                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-locked');","                }","                return lock;","            }","        },","        /**","        * Controls the default bubble parent for this Drop instance. Default: Y.DD.DDM. Set to false to disable bubbling.","        * Use bubbleTargets in config.","        * @deprecated","        * @attribute bubbles","        * @type Object","        */","        bubbles: {","            setter: function(t) {","                this.addTarget(t);","                return t;","            }","        },","        /**","        * Use the Drop shim. Default: true","        * @deprecated","        * @attribute useShim","        * @type Boolean","        */","        useShim: {","            value: true,","            setter: function(v) {","                Y.DD.DDM._noShim = !v;","                return v;","            }","        }","    };","","    Y.extend(Drop, Y.Base, {","        /**","        * The default bubbleTarget for this object. Default: Y.DD.DDM","        * @private","        * @property _bubbleTargets","        */","        _bubbleTargets: Y.DD.DDM,","        /**","        * Add this Drop instance to a group, this should be used for on-the-fly group additions.","        * @method addToGroup","        * @param {String} g The group to add this Drop Instance to.","        * @return {Self}","        * @chainable","        */","        addToGroup: function(g) {","            this._groups[g] = true;","            return this;","        },","        /**","        * Remove this Drop instance from a group, this should be used for on-the-fly group removals.","        * @method removeFromGroup","        * @param {String} g The group to remove this Drop Instance from.","        * @return {Self}","        * @chainable","        */","        removeFromGroup: function(g) {","            delete this._groups[g];","            return this;","        },","        /**","        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.","        * @private","        * @method _createEvents","        */","        _createEvents: function() {","","            var ev = [","                EV_DROP_OVER,","                EV_DROP_ENTER,","                EV_DROP_EXIT,","                'drop:hit'","            ];","","            Y.Array.each(ev, function(v) {","                this.publish(v, {","                    type: v,","                    emitFacade: true,","                    preventable: false,","                    bubbles: true,","                    queuable: false,","                    prefix: 'drop'","                });","            }, this);","        },","        /**","        * Flag for determining if the target is valid in this operation.","        * @private","        * @property _valid","        * @type Boolean","        */","        _valid: null,","        /**","        * The groups this target belongs to.","        * @private","        * @property _groups","        * @type Array","        */","        _groups: null,","        /**","        * Node reference to the targets shim","        * @property shim","        * @type {Object}","        */","        shim: null,","        /**","        * A region object associated with this target, used for checking regions while dragging.","        * @property region","        * @type Object","        */","        region: null,","        /**","        * This flag is tripped when a drag element is over this target.","        * @property overTarget","        * @type Boolean","        */","        overTarget: null,","        /**","        * Check if this target is in one of the supplied groups.","        * @method inGroup","        * @param {Array} groups The groups to check against","        * @return Boolean","        */","        inGroup: function(groups) {","            this._valid = false;","            var ret = false;","            Y.Array.each(groups, function(v) {","                if (this._groups[v]) {","                    ret = true;","                    this._valid = true;","                }","            }, this);","            return ret;","        },","        /**","        * Private lifecycle method","        * @private","        * @method initializer","        */","        initializer: function() {","            Y.later(100, this, this._createEvents);","","            var node = this.get(NODE), id;","            if (!node.get('id')) {","                id = Y.stamp(node);","                node.set('id', id);","            }","            node.addClass(DDM.CSS_PREFIX + '-drop');","            //Shouldn't have to do this..","            this.set('groups', this.get('groups'));","        },","        /**","        * Lifecycle destructor, unreg the drag from the DDM and remove listeners","        * @private","        * @method destructor","        */","        destructor: function() {","            DDM._unregTarget(this);","            if (this.shim && (this.shim !== this.get(NODE))) {","                this.shim.detachAll();","                this.shim.remove();","                this.shim = null;","            }","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop');","            this.detachAll();","        },","        /**","        * Removes classes from the target, resets some flags and sets the shims deactive position [-999, -999]","        * @private","        * @method _deactivateShim","        */","        _deactivateShim: function() {","            if (!this.shim) {","                return false;","            }","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-valid');","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');","","            if (this.get('useShim')) {","                this.shim.setStyles({","                    top: '-999px',","                    left: '-999px',","                    zIndex: '1'","                });","            }","            this.overTarget = false;","        },","        /**","        * Activates the shim and adds some interaction CSS classes","        * @private","        * @method _activateShim","        */","        _activateShim: function() {","            if (!DDM.activeDrag) {","                return false; //Nothing is dragging, no reason to activate.","            }","            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {","                return false;","            }","            if (this.get('lock')) {","                return false;","            }","            var node = this.get(NODE);","            //TODO Visibility Check..","            //if (this.inGroup(DDM.activeDrag.get('groups')) && this.get(NODE).isVisible()) {","            if (this.inGroup(DDM.activeDrag.get('groups'))) {","                node.removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');","                node.addClass(DDM.CSS_PREFIX + '-drop-active-valid');","                DDM._addValid(this);","                this.overTarget = false;","                if (!this.get('useShim')) {","                    this.shim = this.get(NODE);","                }","                this.sizeShim();","            } else {","                DDM._removeValid(this);","                node.removeClass(DDM.CSS_PREFIX + '-drop-active-valid');","                node.addClass(DDM.CSS_PREFIX + '-drop-active-invalid');","            }","        },","        /**","        * Positions and sizes the shim with the raw data from the node,","        * this can be used to programatically adjust the Targets shim for Animation..","        * @method sizeShim","        */","        sizeShim: function() {","            if (!DDM.activeDrag) {","                return false; //Nothing is dragging, no reason to activate.","            }","            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {","                return false;","            }","            //if (this.get('lock') || !this.get('useShim')) {","            if (this.get('lock')) {","                return false;","            }","            if (!this.shim) {","                Y.later(100, this, this.sizeShim);","                return false;","            }","            var node = this.get(NODE),","                nh = node.get(OFFSET_HEIGHT),","                nw = node.get(OFFSET_WIDTH),","                xy = node.getXY(),","                p = this.get('padding'),","                dd, dH, dW;","","","            //Apply padding","            nw = nw + p.left + p.right;","            nh = nh + p.top + p.bottom;","            xy[0] = xy[0] - p.left;","            xy[1] = xy[1] - p.top;","","","            if (DDM.activeDrag.get('dragMode') === DDM.INTERSECT) {","                //Intersect Mode, make the shim bigger","                dd = DDM.activeDrag;","                dH = dd.get(NODE).get(OFFSET_HEIGHT);","                dW = dd.get(NODE).get(OFFSET_WIDTH);","","                nh = (nh + dH);","                nw = (nw + dW);","                xy[0] = xy[0] - (dW - dd.deltaXY[0]);","                xy[1] = xy[1] - (dH - dd.deltaXY[1]);","","            }","","            if (this.get('useShim')) {","                //Set the style on the shim","                this.shim.setStyles({","                    height: nh + 'px',","                    width: nw + 'px',","                    top: xy[1] + 'px',","                    left: xy[0] + 'px'","                });","            }","","            //Create the region to be used by intersect when a drag node is over us.","            this.region = {","                '0': xy[0],","                '1': xy[1],","                area: 0,","                top: xy[1],","                right: xy[0] + nw,","                bottom: xy[1] + nh,","                left: xy[0]","            };","        },","        /**","        * Creates the Target shim and adds it to the DDM's playground..","        * @private","        * @method _createShim","        */","        _createShim: function() {","            //No playground, defer","            if (!DDM._pg) {","                Y.later(10, this, this._createShim);","                return;","            }","            //Shim already here, cancel","            if (this.shim) {","                return;","            }","            var s = this.get('node');","","            if (this.get('useShim')) {","                s = Y.Node.create('<div id=\"' + this.get(NODE).get('id') + '_shim\"></div>');","                s.setStyles({","                    height: this.get(NODE).get(OFFSET_HEIGHT) + 'px',","                    width: this.get(NODE).get(OFFSET_WIDTH) + 'px',","                    backgroundColor: 'yellow',","                    opacity: '.5',","                    zIndex: '1',","                    overflow: 'hidden',","                    top: '-900px',","                    left: '-900px',","                    position:  'absolute'","                });","","                DDM._pg.appendChild(s);","","                s.on('mouseover', Y.bind(this._handleOverEvent, this));","                s.on('mouseout', Y.bind(this._handleOutEvent, this));","            }","","","            this.shim = s;","        },","        /**","        * This handles the over target call made from this object or from the DDM","        * @private","        * @method _handleOverTarget","        */","        _handleTargetOver: function() {","            if (DDM.isOverTarget(this)) {","                this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-over');","                DDM.activeDrop = this;","                DDM.otherDrops[this] = this;","                if (this.overTarget) {","                    DDM.activeDrag.fire('drag:over', { drop: this, drag: DDM.activeDrag });","                    this.fire(EV_DROP_OVER, { drop: this, drag: DDM.activeDrag });","                } else {","                    //Prevent an enter before a start..","                    if (DDM.activeDrag.get('dragging')) {","                        this.overTarget = true;","                        this.fire(EV_DROP_ENTER, { drop: this, drag: DDM.activeDrag });","                        DDM.activeDrag.fire('drag:enter', { drop: this, drag: DDM.activeDrag });","                        DDM.activeDrag.get(NODE).addClass(DDM.CSS_PREFIX + '-drag-over');","                        //TODO - Is this needed??","                        //DDM._handleTargetOver();","                    }","                }","            } else {","                this._handleOut();","            }","        },","        /**","        * Handles the mouseover DOM event on the Target Shim","        * @private","        * @method _handleOverEvent","        */","        _handleOverEvent: function() {","            this.shim.setStyle('zIndex', '999');","            DDM._addActiveShim(this);","        },","        /**","        * Handles the mouseout DOM event on the Target Shim","        * @private","        * @method _handleOutEvent","        */","        _handleOutEvent: function() {","            this.shim.setStyle('zIndex', '1');","            DDM._removeActiveShim(this);","        },","        /**","        * Handles out of target calls/checks","        * @private","        * @method _handleOut","        */","        _handleOut: function(force) {","            if (!DDM.isOverTarget(this) || force) {","                if (this.overTarget) {","                    this.overTarget = false;","                    if (!force) {","                        DDM._removeActiveShim(this);","                    }","                    if (DDM.activeDrag) {","                        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');","                        DDM.activeDrag.get(NODE).removeClass(DDM.CSS_PREFIX + '-drag-over');","                        this.fire(EV_DROP_EXIT, { drop: this, drag: DDM.activeDrag });","                        DDM.activeDrag.fire('drag:exit', { drop: this, drag: DDM.activeDrag });","                        delete DDM.otherDrops[this];","                    }","                }","            }","        }","    });","","    Y.DD.Drop = Drop;","","","","","}, '3.8.0', {\"requires\": [\"dd-drag\", \"dd-ddm-drop\"]});"];
_yuitest_coverage["build/dd-drop/dd-drop.js"].lines = {"1":0,"17":0,"69":0,"70":0,"74":0,"75":0,"77":0,"88":0,"90":0,"98":0,"99":0,"100":0,"102":0,"113":0,"114":0,"115":0,"118":0,"121":0,"122":0,"133":0,"144":0,"145":0,"147":0,"149":0,"161":0,"162":0,"174":0,"175":0,"180":0,"195":0,"196":0,"206":0,"207":0,"216":0,"223":0,"224":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"281":0,"289":0,"291":0,"292":0,"293":0,"294":0,"296":0,"298":0,"306":0,"307":0,"308":0,"309":0,"310":0,"312":0,"313":0,"321":0,"322":0,"324":0,"325":0,"326":0,"328":0,"329":0,"335":0,"343":0,"344":0,"346":0,"347":0,"349":0,"350":0,"352":0,"355":0,"356":0,"357":0,"358":0,"359":0,"360":0,"361":0,"363":0,"365":0,"366":0,"367":0,"376":0,"377":0,"379":0,"380":0,"383":0,"384":0,"386":0,"387":0,"388":0,"390":0,"399":0,"400":0,"401":0,"402":0,"405":0,"407":0,"408":0,"409":0,"411":0,"412":0,"413":0,"414":0,"418":0,"420":0,"429":0,"446":0,"447":0,"448":0,"451":0,"452":0,"454":0,"456":0,"457":0,"458":0,"470":0,"472":0,"473":0,"477":0,"485":0,"486":0,"487":0,"488":0,"489":0,"490":0,"491":0,"494":0,"495":0,"496":0,"497":0,"498":0,"504":0,"513":0,"514":0,"522":0,"523":0,"531":0,"532":0,"533":0,"534":0,"535":0,"537":0,"538":0,"539":0,"540":0,"541":0,"542":0,"549":0};
_yuitest_coverage["build/dd-drop/dd-drop.js"].functions = {"(anonymous 2):74":0,"Drop:68":0,"setter:97":0,"getter:112":0,"setter:120":0,"setter:132":0,"setter:143":0,"setter:160":0,"setter:173":0,"addToGroup:194":0,"removeFromGroup:205":0,"(anonymous 3):223":0,"_createEvents:214":0,"(anonymous 4):275":0,"inGroup:272":0,"initializer:288":0,"destructor:305":0,"_deactivateShim:320":0,"_activateShim:342":0,"sizeShim:375":0,"_createShim:444":0,"_handleTargetOver:484":0,"_handleOverEvent:512":0,"_handleOutEvent:521":0,"_handleOut:530":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-drop/dd-drop.js"].coveredLines = 150;
_yuitest_coverage["build/dd-drop/dd-drop.js"].coveredFunctions = 26;
_yuitest_coverline("build/dd-drop/dd-drop.js", 1);
YUI.add('dd-drop', function (Y, NAME) {


    /**
     * Provides the ability to create a Drop Target.
     * @module dd
     * @submodule dd-drop
     */
    /**
     * Provides the ability to create a Drop Target.
     * @class Drop
     * @extends Base
     * @constructor
     * @namespace DD
     */

    _yuitest_coverfunc("build/dd-drop/dd-drop.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-drop/dd-drop.js", 17);
var NODE = 'node',
        DDM = Y.DD.DDM,
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        /**
        * Fires when a drag element is over this target.
        * @event drop:over
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_OVER = 'drop:over',
        /**
        * Fires when a drag element enters this target.
        * @event drop:enter
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_ENTER = 'drop:enter',
        /**
        * Fires when a drag element exits this target.
        * @event drop:exit
        * @param {EventFacade} event An Event Facade object
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DROP_EXIT = 'drop:exit',

        /**
        * Fires when a draggable node is dropped on this Drop Target. (Fired from dd-ddm-drop)
        * @event drop:hit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */


    Drop = function() {
        _yuitest_coverfunc("build/dd-drop/dd-drop.js", "Drop", 68);
_yuitest_coverline("build/dd-drop/dd-drop.js", 69);
this._lazyAddAttrs = false;
        _yuitest_coverline("build/dd-drop/dd-drop.js", 70);
Drop.superclass.constructor.apply(this, arguments);


        //DD init speed up.
        _yuitest_coverline("build/dd-drop/dd-drop.js", 74);
Y.on('domready', Y.bind(function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "(anonymous 2)", 74);
_yuitest_coverline("build/dd-drop/dd-drop.js", 75);
Y.later(100, this, this._createShim);
        }, this));
        _yuitest_coverline("build/dd-drop/dd-drop.js", 77);
DDM._regTarget(this);

        /* TODO
        if (Dom.getStyle(this.el, 'position') == 'fixed') {
            Event.on(window, 'scroll', function() {
                this.activateShim();
            }, this, true);
        }
        */
    };

    _yuitest_coverline("build/dd-drop/dd-drop.js", 88);
Drop.NAME = 'drop';

    _yuitest_coverline("build/dd-drop/dd-drop.js", 90);
Drop.ATTRS = {
        /**
        * Y.Node instanace to use as the element to make a Drop Target
        * @attribute node
        * @type Node
        */
        node: {
            setter: function(node) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 97);
_yuitest_coverline("build/dd-drop/dd-drop.js", 98);
var n = Y.one(node);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 99);
if (!n) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 100);
Y.error('DD.Drop: Invalid Node Given: ' + node);
                }
                _yuitest_coverline("build/dd-drop/dd-drop.js", 102);
return n;
            }
        },
        /**
        * Array of groups to add this drop into.
        * @attribute groups
        * @type Array
        */
        groups: {
            value: ['default'],
            getter: function() {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "getter", 112);
_yuitest_coverline("build/dd-drop/dd-drop.js", 113);
if (!this._groups) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 114);
this._groups = {};
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 115);
return [];
                }

                _yuitest_coverline("build/dd-drop/dd-drop.js", 118);
return Y.Object.keys(this._groups);
            },
            setter: function(g) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 120);
_yuitest_coverline("build/dd-drop/dd-drop.js", 121);
this._groups = Y.Array.hash(g);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 122);
return g;
            }
        },
        /**
        * CSS style padding to make the Drop Target bigger than the node.
        * @attribute padding
        * @type String
        */
        padding: {
            value: '0',
            setter: function(p) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 132);
_yuitest_coverline("build/dd-drop/dd-drop.js", 133);
return DDM.cssSizestoObject(p);
            }
        },
        /**
        * Set to lock this drop element.
        * @attribute lock
        * @type Boolean
        */
        lock: {
            value: false,
            setter: function(lock) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 143);
_yuitest_coverline("build/dd-drop/dd-drop.js", 144);
if (lock) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 145);
this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-locked');
                } else {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 147);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-locked');
                }
                _yuitest_coverline("build/dd-drop/dd-drop.js", 149);
return lock;
            }
        },
        /**
        * Controls the default bubble parent for this Drop instance. Default: Y.DD.DDM. Set to false to disable bubbling.
        * Use bubbleTargets in config.
        * @deprecated
        * @attribute bubbles
        * @type Object
        */
        bubbles: {
            setter: function(t) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 160);
_yuitest_coverline("build/dd-drop/dd-drop.js", 161);
this.addTarget(t);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 162);
return t;
            }
        },
        /**
        * Use the Drop shim. Default: true
        * @deprecated
        * @attribute useShim
        * @type Boolean
        */
        useShim: {
            value: true,
            setter: function(v) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "setter", 173);
_yuitest_coverline("build/dd-drop/dd-drop.js", 174);
Y.DD.DDM._noShim = !v;
                _yuitest_coverline("build/dd-drop/dd-drop.js", 175);
return v;
            }
        }
    };

    _yuitest_coverline("build/dd-drop/dd-drop.js", 180);
Y.extend(Drop, Y.Base, {
        /**
        * The default bubbleTarget for this object. Default: Y.DD.DDM
        * @private
        * @property _bubbleTargets
        */
        _bubbleTargets: Y.DD.DDM,
        /**
        * Add this Drop instance to a group, this should be used for on-the-fly group additions.
        * @method addToGroup
        * @param {String} g The group to add this Drop Instance to.
        * @return {Self}
        * @chainable
        */
        addToGroup: function(g) {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "addToGroup", 194);
_yuitest_coverline("build/dd-drop/dd-drop.js", 195);
this._groups[g] = true;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 196);
return this;
        },
        /**
        * Remove this Drop instance from a group, this should be used for on-the-fly group removals.
        * @method removeFromGroup
        * @param {String} g The group to remove this Drop Instance from.
        * @return {Self}
        * @chainable
        */
        removeFromGroup: function(g) {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "removeFromGroup", 205);
_yuitest_coverline("build/dd-drop/dd-drop.js", 206);
delete this._groups[g];
            _yuitest_coverline("build/dd-drop/dd-drop.js", 207);
return this;
        },
        /**
        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        * @private
        * @method _createEvents
        */
        _createEvents: function() {

            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_createEvents", 214);
_yuitest_coverline("build/dd-drop/dd-drop.js", 216);
var ev = [
                EV_DROP_OVER,
                EV_DROP_ENTER,
                EV_DROP_EXIT,
                'drop:hit'
            ];

            _yuitest_coverline("build/dd-drop/dd-drop.js", 223);
Y.Array.each(ev, function(v) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "(anonymous 3)", 223);
_yuitest_coverline("build/dd-drop/dd-drop.js", 224);
this.publish(v, {
                    type: v,
                    emitFacade: true,
                    preventable: false,
                    bubbles: true,
                    queuable: false,
                    prefix: 'drop'
                });
            }, this);
        },
        /**
        * Flag for determining if the target is valid in this operation.
        * @private
        * @property _valid
        * @type Boolean
        */
        _valid: null,
        /**
        * The groups this target belongs to.
        * @private
        * @property _groups
        * @type Array
        */
        _groups: null,
        /**
        * Node reference to the targets shim
        * @property shim
        * @type {Object}
        */
        shim: null,
        /**
        * A region object associated with this target, used for checking regions while dragging.
        * @property region
        * @type Object
        */
        region: null,
        /**
        * This flag is tripped when a drag element is over this target.
        * @property overTarget
        * @type Boolean
        */
        overTarget: null,
        /**
        * Check if this target is in one of the supplied groups.
        * @method inGroup
        * @param {Array} groups The groups to check against
        * @return Boolean
        */
        inGroup: function(groups) {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "inGroup", 272);
_yuitest_coverline("build/dd-drop/dd-drop.js", 273);
this._valid = false;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 274);
var ret = false;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 275);
Y.Array.each(groups, function(v) {
                _yuitest_coverfunc("build/dd-drop/dd-drop.js", "(anonymous 4)", 275);
_yuitest_coverline("build/dd-drop/dd-drop.js", 276);
if (this._groups[v]) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 277);
ret = true;
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 278);
this._valid = true;
                }
            }, this);
            _yuitest_coverline("build/dd-drop/dd-drop.js", 281);
return ret;
        },
        /**
        * Private lifecycle method
        * @private
        * @method initializer
        */
        initializer: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "initializer", 288);
_yuitest_coverline("build/dd-drop/dd-drop.js", 289);
Y.later(100, this, this._createEvents);

            _yuitest_coverline("build/dd-drop/dd-drop.js", 291);
var node = this.get(NODE), id;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 292);
if (!node.get('id')) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 293);
id = Y.stamp(node);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 294);
node.set('id', id);
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 296);
node.addClass(DDM.CSS_PREFIX + '-drop');
            //Shouldn't have to do this..
            _yuitest_coverline("build/dd-drop/dd-drop.js", 298);
this.set('groups', this.get('groups'));
        },
        /**
        * Lifecycle destructor, unreg the drag from the DDM and remove listeners
        * @private
        * @method destructor
        */
        destructor: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "destructor", 305);
_yuitest_coverline("build/dd-drop/dd-drop.js", 306);
DDM._unregTarget(this);
            _yuitest_coverline("build/dd-drop/dd-drop.js", 307);
if (this.shim && (this.shim !== this.get(NODE))) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 308);
this.shim.detachAll();
                _yuitest_coverline("build/dd-drop/dd-drop.js", 309);
this.shim.remove();
                _yuitest_coverline("build/dd-drop/dd-drop.js", 310);
this.shim = null;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 312);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop');
            _yuitest_coverline("build/dd-drop/dd-drop.js", 313);
this.detachAll();
        },
        /**
        * Removes classes from the target, resets some flags and sets the shims deactive position [-999, -999]
        * @private
        * @method _deactivateShim
        */
        _deactivateShim: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_deactivateShim", 320);
_yuitest_coverline("build/dd-drop/dd-drop.js", 321);
if (!this.shim) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 322);
return false;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 324);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
            _yuitest_coverline("build/dd-drop/dd-drop.js", 325);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            _yuitest_coverline("build/dd-drop/dd-drop.js", 326);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');

            _yuitest_coverline("build/dd-drop/dd-drop.js", 328);
if (this.get('useShim')) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 329);
this.shim.setStyles({
                    top: '-999px',
                    left: '-999px',
                    zIndex: '1'
                });
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 335);
this.overTarget = false;
        },
        /**
        * Activates the shim and adds some interaction CSS classes
        * @private
        * @method _activateShim
        */
        _activateShim: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_activateShim", 342);
_yuitest_coverline("build/dd-drop/dd-drop.js", 343);
if (!DDM.activeDrag) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 344);
return false; //Nothing is dragging, no reason to activate.
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 346);
if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 347);
return false;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 349);
if (this.get('lock')) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 350);
return false;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 352);
var node = this.get(NODE);
            //TODO Visibility Check..
            //if (this.inGroup(DDM.activeDrag.get('groups')) && this.get(NODE).isVisible()) {
            _yuitest_coverline("build/dd-drop/dd-drop.js", 355);
if (this.inGroup(DDM.activeDrag.get('groups'))) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 356);
node.removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
                _yuitest_coverline("build/dd-drop/dd-drop.js", 357);
node.addClass(DDM.CSS_PREFIX + '-drop-active-valid');
                _yuitest_coverline("build/dd-drop/dd-drop.js", 358);
DDM._addValid(this);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 359);
this.overTarget = false;
                _yuitest_coverline("build/dd-drop/dd-drop.js", 360);
if (!this.get('useShim')) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 361);
this.shim = this.get(NODE);
                }
                _yuitest_coverline("build/dd-drop/dd-drop.js", 363);
this.sizeShim();
            } else {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 365);
DDM._removeValid(this);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 366);
node.removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
                _yuitest_coverline("build/dd-drop/dd-drop.js", 367);
node.addClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            }
        },
        /**
        * Positions and sizes the shim with the raw data from the node,
        * this can be used to programatically adjust the Targets shim for Animation..
        * @method sizeShim
        */
        sizeShim: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "sizeShim", 375);
_yuitest_coverline("build/dd-drop/dd-drop.js", 376);
if (!DDM.activeDrag) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 377);
return false; //Nothing is dragging, no reason to activate.
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 379);
if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 380);
return false;
            }
            //if (this.get('lock') || !this.get('useShim')) {
            _yuitest_coverline("build/dd-drop/dd-drop.js", 383);
if (this.get('lock')) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 384);
return false;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 386);
if (!this.shim) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 387);
Y.later(100, this, this.sizeShim);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 388);
return false;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 390);
var node = this.get(NODE),
                nh = node.get(OFFSET_HEIGHT),
                nw = node.get(OFFSET_WIDTH),
                xy = node.getXY(),
                p = this.get('padding'),
                dd, dH, dW;


            //Apply padding
            _yuitest_coverline("build/dd-drop/dd-drop.js", 399);
nw = nw + p.left + p.right;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 400);
nh = nh + p.top + p.bottom;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 401);
xy[0] = xy[0] - p.left;
            _yuitest_coverline("build/dd-drop/dd-drop.js", 402);
xy[1] = xy[1] - p.top;


            _yuitest_coverline("build/dd-drop/dd-drop.js", 405);
if (DDM.activeDrag.get('dragMode') === DDM.INTERSECT) {
                //Intersect Mode, make the shim bigger
                _yuitest_coverline("build/dd-drop/dd-drop.js", 407);
dd = DDM.activeDrag;
                _yuitest_coverline("build/dd-drop/dd-drop.js", 408);
dH = dd.get(NODE).get(OFFSET_HEIGHT);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 409);
dW = dd.get(NODE).get(OFFSET_WIDTH);

                _yuitest_coverline("build/dd-drop/dd-drop.js", 411);
nh = (nh + dH);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 412);
nw = (nw + dW);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 413);
xy[0] = xy[0] - (dW - dd.deltaXY[0]);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 414);
xy[1] = xy[1] - (dH - dd.deltaXY[1]);

            }

            _yuitest_coverline("build/dd-drop/dd-drop.js", 418);
if (this.get('useShim')) {
                //Set the style on the shim
                _yuitest_coverline("build/dd-drop/dd-drop.js", 420);
this.shim.setStyles({
                    height: nh + 'px',
                    width: nw + 'px',
                    top: xy[1] + 'px',
                    left: xy[0] + 'px'
                });
            }

            //Create the region to be used by intersect when a drag node is over us.
            _yuitest_coverline("build/dd-drop/dd-drop.js", 429);
this.region = {
                '0': xy[0],
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + nw,
                bottom: xy[1] + nh,
                left: xy[0]
            };
        },
        /**
        * Creates the Target shim and adds it to the DDM's playground..
        * @private
        * @method _createShim
        */
        _createShim: function() {
            //No playground, defer
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_createShim", 444);
_yuitest_coverline("build/dd-drop/dd-drop.js", 446);
if (!DDM._pg) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 447);
Y.later(10, this, this._createShim);
                _yuitest_coverline("build/dd-drop/dd-drop.js", 448);
return;
            }
            //Shim already here, cancel
            _yuitest_coverline("build/dd-drop/dd-drop.js", 451);
if (this.shim) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 452);
return;
            }
            _yuitest_coverline("build/dd-drop/dd-drop.js", 454);
var s = this.get('node');

            _yuitest_coverline("build/dd-drop/dd-drop.js", 456);
if (this.get('useShim')) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 457);
s = Y.Node.create('<div id="' + this.get(NODE).get('id') + '_shim"></div>');
                _yuitest_coverline("build/dd-drop/dd-drop.js", 458);
s.setStyles({
                    height: this.get(NODE).get(OFFSET_HEIGHT) + 'px',
                    width: this.get(NODE).get(OFFSET_WIDTH) + 'px',
                    backgroundColor: 'yellow',
                    opacity: '.5',
                    zIndex: '1',
                    overflow: 'hidden',
                    top: '-900px',
                    left: '-900px',
                    position:  'absolute'
                });

                _yuitest_coverline("build/dd-drop/dd-drop.js", 470);
DDM._pg.appendChild(s);

                _yuitest_coverline("build/dd-drop/dd-drop.js", 472);
s.on('mouseover', Y.bind(this._handleOverEvent, this));
                _yuitest_coverline("build/dd-drop/dd-drop.js", 473);
s.on('mouseout', Y.bind(this._handleOutEvent, this));
            }


            _yuitest_coverline("build/dd-drop/dd-drop.js", 477);
this.shim = s;
        },
        /**
        * This handles the over target call made from this object or from the DDM
        * @private
        * @method _handleOverTarget
        */
        _handleTargetOver: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_handleTargetOver", 484);
_yuitest_coverline("build/dd-drop/dd-drop.js", 485);
if (DDM.isOverTarget(this)) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 486);
this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-over');
                _yuitest_coverline("build/dd-drop/dd-drop.js", 487);
DDM.activeDrop = this;
                _yuitest_coverline("build/dd-drop/dd-drop.js", 488);
DDM.otherDrops[this] = this;
                _yuitest_coverline("build/dd-drop/dd-drop.js", 489);
if (this.overTarget) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 490);
DDM.activeDrag.fire('drag:over', { drop: this, drag: DDM.activeDrag });
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 491);
this.fire(EV_DROP_OVER, { drop: this, drag: DDM.activeDrag });
                } else {
                    //Prevent an enter before a start..
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 494);
if (DDM.activeDrag.get('dragging')) {
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 495);
this.overTarget = true;
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 496);
this.fire(EV_DROP_ENTER, { drop: this, drag: DDM.activeDrag });
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 497);
DDM.activeDrag.fire('drag:enter', { drop: this, drag: DDM.activeDrag });
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 498);
DDM.activeDrag.get(NODE).addClass(DDM.CSS_PREFIX + '-drag-over');
                        //TODO - Is this needed??
                        //DDM._handleTargetOver();
                    }
                }
            } else {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 504);
this._handleOut();
            }
        },
        /**
        * Handles the mouseover DOM event on the Target Shim
        * @private
        * @method _handleOverEvent
        */
        _handleOverEvent: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_handleOverEvent", 512);
_yuitest_coverline("build/dd-drop/dd-drop.js", 513);
this.shim.setStyle('zIndex', '999');
            _yuitest_coverline("build/dd-drop/dd-drop.js", 514);
DDM._addActiveShim(this);
        },
        /**
        * Handles the mouseout DOM event on the Target Shim
        * @private
        * @method _handleOutEvent
        */
        _handleOutEvent: function() {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_handleOutEvent", 521);
_yuitest_coverline("build/dd-drop/dd-drop.js", 522);
this.shim.setStyle('zIndex', '1');
            _yuitest_coverline("build/dd-drop/dd-drop.js", 523);
DDM._removeActiveShim(this);
        },
        /**
        * Handles out of target calls/checks
        * @private
        * @method _handleOut
        */
        _handleOut: function(force) {
            _yuitest_coverfunc("build/dd-drop/dd-drop.js", "_handleOut", 530);
_yuitest_coverline("build/dd-drop/dd-drop.js", 531);
if (!DDM.isOverTarget(this) || force) {
                _yuitest_coverline("build/dd-drop/dd-drop.js", 532);
if (this.overTarget) {
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 533);
this.overTarget = false;
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 534);
if (!force) {
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 535);
DDM._removeActiveShim(this);
                    }
                    _yuitest_coverline("build/dd-drop/dd-drop.js", 537);
if (DDM.activeDrag) {
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 538);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 539);
DDM.activeDrag.get(NODE).removeClass(DDM.CSS_PREFIX + '-drag-over');
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 540);
this.fire(EV_DROP_EXIT, { drop: this, drag: DDM.activeDrag });
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 541);
DDM.activeDrag.fire('drag:exit', { drop: this, drag: DDM.activeDrag });
                        _yuitest_coverline("build/dd-drop/dd-drop.js", 542);
delete DDM.otherDrops[this];
                    }
                }
            }
        }
    });

    _yuitest_coverline("build/dd-drop/dd-drop.js", 549);
Y.DD.Drop = Drop;




}, '3.8.0', {"requires": ["dd-drag", "dd-ddm-drop"]});
