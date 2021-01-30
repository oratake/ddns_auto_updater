# DDNS Auto Updater

## Summary

DDNS client for home server
(Only for owlnet)

## Job Status

It will regist ip address.

## Usage

install
```
$ npm i
```

Create `./credential.js` on document root using the format below.
```
module.exports = {
    'email': <login ID>,
    'password': <login PW>,
    'ip': <current IP>,
    'domainId': <domain ID using admin console>
}
```

## What is the poor english?

Server won't show Japanese...