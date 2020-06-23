#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 ../id_rsa2_enc # Allow read access to the private key
ssh-add ..s/id_rsa2_enc # Add the private key to SSH

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

# Skip this command if you don't need to execute any additional commands after deploying.
# ssh apps@$IP -p $PORT <<EOF
#   cd $DEPLOY_DIR
#   crystal build --release --no-debug index.cr # Change to whatever commands you need!
EOF