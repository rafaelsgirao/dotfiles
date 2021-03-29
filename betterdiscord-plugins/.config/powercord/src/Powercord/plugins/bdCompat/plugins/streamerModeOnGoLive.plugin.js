/**
 * @name streamerModeOnGoLive
 * @author mihabozic123
 * @description Enables streamer mode when you go live on discord.
 * @version 0.0.2
 * @authorId 679017850433699850
 * @source https://raw.githubusercontent.com/mihabozic123/BDplugins/master/streamerModeOnGoLive/streamerModeOnGoLive.plugin.js
 * @invite a3Xr8DQ2cC
 */

 module.exports = class StreamerModeOnGoLive {
    onStreamStarted() {
        BdApi.findModuleByProps("dispatch").dispatch({type: "STREAMER_MODE_UPDATE", key: "enabled", value: true});
    }
    onStreamStopped() {
        BdApi.findModuleByProps("dispatch").dispatch({type: "STREAMER_MODE_UPDATE", key: "enabled", value: false});
    }
    start() {
        const dispatcher = BdApi.findModuleByProps("dispatch");
        dispatcher.subscribe("STREAM_START", this.onStreamStarted);
        dispatcher.subscribe("STREAM_STOP", this.onStreamStopped);
    }
    stop() {
        const dispatcher = BdApi.findModuleByProps("dispatch");
        dispatcher.unsubscribe("STREAM_START", this.onStreamStarted);        
        dispatcher.unsubscribe("STREAM_STOP", this.onStreamStopped);
    }
}