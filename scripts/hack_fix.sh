#!/bin/bash
basedir=$(cd `dirname $0`;pwd)
rootdir=$basedir/..
moduledir=$rootdir/node_modules

# Hack @lens-protocol\api-bindings\dist\index.js
file1=$moduledir/@lens-protocol/api-bindings/dist/index.js
sed -i "s/@apollo\/client\/link\/context\"/@apollo\/client\/link\/context\/index.js\"/g" $file1
sed -i "s/@apollo\/client\/link\/error\"/@apollo\/client\/link\/error\/index.js\"/g" $file1

# Hack @lens-protocol\react\dist\index.js
file2=$moduledir/@lens-protocol/react/dist/index.js
sed -i "s/profile.followPolicy?.type === FollowPolicyType3.UNKNOWN/profile.followPolicy?.type !== FollowPolicyType3.UNKNOWN/g" $file2
