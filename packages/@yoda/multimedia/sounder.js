'use strict'

var native = require('./wavplayer.node')
var AudioManager = require('@yoda/audio').AudioManager
var EventEmitter = require('events').EventEmitter

/**
 * @class
 * @augument EventEmitter
 * @memberof module:@yoda/multimedia
 * @description The `Sounder` only supports for playing WAV audio.
 *
 * ```js
 * var AudioManager = require('@yoda/audio').AudioManager
 * var Sounder = require('@yoda/multimedia').Sounder
 *
 * Sounder.once('ready', () => {
 *   logger.info('wav audio loaded')
 * })
 * Sounder.once('error', (err) => {
 *   if (err) {
 *     logger.error(err && err.stack)
 *   }
 * })
 * Sounder.init([
 *   '/opt/media/volume.wav',
 *   '/opt/media/wakeup.wav'])
 * Sounder.play(absPath, AudioManager.STREAM_SYSTEM, false, (err)=>{
 *   logger.error(`playing ${absPath} occurs error ${err && err.stack}`)
 * })
 * ```
 */
var Sounder = new EventEmitter()

/**
 * @function init
 * @memberof module:@yoda/multimedia.Sounder
 * @static
 * @param {Array} filenames - the file names array which will be preloaded.
 * @throws {Error} the sounder player has been ready.
 */
Sounder.init = function init (filenames) {
  native.initPlayer(filenames, (err) => {
    if (err) {
      /**
       * When the sounder player occurs error.
       * @event module:@yoda/multimedia.Sounder#error
       */
      Sounder.emit('error', err)
    } else {
      /**
       * When the sounder player is ready.
       * @event module:@yoda/multimedia.Sounder#ready
       */
      Sounder.emit('ready')
    }
  })
}

function _playSound (filename, stream, holdconnection, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function.')
  }
  var streamType = stream || AudioManager.STREAM_SYSTEM
  var streamName = AudioManager.getStreamName(streamType)
  native.prepare(filename, streamName, holdconnection, (err) => {
    if (err) {
      return callback(err)
    }
    if (!holdconnection) {
      // FIXME(Yorkie): is this exactly needs?
      var vol = AudioManager.getVolume(streamType)
      AudioManager.setVolume(streamType, vol)
    }

    // start playing the actual playback
    native.start((err) => {
      if (err) {
        return callback(err)
      }
      return callback()
    })
  })
}

/**
 * Play the given WAV file.
 * @function play
 * @memberof module:@yoda/multimedia.Sounder
 * @param {string} filename - specify the file to be played.
 * @param {number} [stream=STREAM_PLAYBACK] - the stream type of the player.
 * @param {boolean}  [holdconnection=false] - whether the current player connection should be hold.
 * @param {callback} callback - playback callback
 * @throw {Error} player is not ready, please use `ready` event.
 */
Sounder.play = function play (filename, stream, holdconnection, callback) {
  _playSound(filename, stream, holdconnection, callback)
}

/**
 * Stop the current playing playback.
 * @function stop
 * @memberof module:@yoda/multimedia.Sounder
 * @throw {Error} player is not ready, please use `ready` event.
 */
Sounder.stop = function stop () {
  return native.stop()
}

module.exports = Sounder
