#!/usr/bin/env python

import urllib2

def writeToFile(file_name, text):
    f = open(file_name, 'w')
    f.write(text)
    f.close()

def download():
    for i in range(1, 962):
        if i != 404:
            try:
                u = urllib2.urlopen('http://xkcd.com/%s/info.0.json' % i)
                localFile = open('%s.info.0.json' % i, 'w')
                localFile.write(u.read())
                localFile.close()
            except Exception, e:
                print 'Died at %s' % i
                print e
    
if __name__ == "__main__":
    download()