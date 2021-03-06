'use strict'

var test = require('tape')
var light = require('@yoda/light')
test('fill default buffer should be ok', t => {
  light.fill(255, 255, 255, 1)
  t.ok(light.write())
  setTimeout(() => {
    light.fill(255, 0, 0, 1)
    t.ok(light.write())
    t.end()
  }, 1500)
})

test('fill invalid alpha', t => {
  light.fill(255, 255, 255, '10')
  t.ok(light.write())
  setTimeout(() => {
    light.fill(255, 0, 0, -1)
    t.ok(light.write())
    t.end()
  }, 1500)
})

test('fill outside buffer should be ok', t => {
  var buf = Buffer.alloc(36)
  buf.fill(255)
  t.ok(light.write(buf))
  setTimeout(() => {
    buf.writeUInt8(0, 0)
    buf.writeUInt8(0, 1)
    buf.writeUInt8(255, 2)
    t.ok(light.write(buf))
    t.end()
  }, 1500)
})

test('the number of  outside buffer is bigger than 255,hould be ok', t => {
  var buf = Buffer.alloc(36)
  buf.fill(500)
  t.ok(light.write(buf))
  setTimeout(() => {
    buf.writeUInt8(0, 0)
    buf.writeUInt8(0, 1)
    buf.writeUInt8(255, 2)
    t.ok(light.write(buf))
    t.end()
  }, 1500)
})

test(' outside buffer is not  number like "a",hould be ignore', t => {
  var buf = Buffer.alloc(36)
  buf.fill('a')
  t.ok(light.write(buf))
  setTimeout(() => {
    buf.writeUInt8(0, 0)
    buf.writeUInt8(0, 1)
    buf.writeUInt8(255, 2)
    t.ok(light.write(buf))
    t.end()
  }, 1500)
})

test('fill outside buffer length is 10000 ,should be ok', t => {
  var buf = Buffer.alloc(10000)
  buf.fill(111)
  t.ok(light.write(buf))
  setTimeout(() => {
    buf.writeUInt8(0, 0)
    buf.writeUInt8(0, 1)
    buf.writeUInt8(255, 2)
    buf.writeUInt8(0, 3)
    buf.writeUInt8(0, 4)
    buf.writeUInt8(255, 5)
    buf.writeUInt8(0, 6)
    buf.writeUInt8(0, 7)
    buf.writeUInt8(255, 8)
    buf.writeUInt8(0, 9)
    buf.writeUInt8(0, 10)
    buf.writeUInt8(255, 11)
    buf.writeUInt8(0, 12)
    buf.writeUInt8(0, 13)
    buf.writeUInt8(255, 14)
    buf.writeUInt8(0, 15)
    buf.writeUInt8(0, 16)
    buf.writeUInt8(255, 17)
    buf.writeUInt8(0, 18)
    buf.writeUInt8(0, 19)
    buf.writeUInt8(255, 20)
    buf.writeUInt8(0, 21)
    buf.writeUInt8(0, 22)
    buf.writeUInt8(255, 23)
    buf.writeUInt8(0, 24)
    buf.writeUInt8(0, 25)
    buf.writeUInt8(255, 26)
    buf.writeUInt8(0, 27)
    buf.writeUInt8(0, 28)
    buf.writeUInt8(255, 29)
    buf.writeUInt8(0, 30)
    buf.writeUInt8(0, 31)
    buf.writeUInt8(255, 32)
    buf.writeUInt8(0, 33)
    buf.writeUInt8(0, 34)
    buf.writeUInt8(255, 35)
    buf.writeUInt8(0, 36)
    buf.writeUInt8(0, 37)
    buf.writeUInt8(0, 38)
    t.ok(light.write(buf))
    t.end()
  }, 1500)
})
