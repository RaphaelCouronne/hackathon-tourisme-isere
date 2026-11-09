#!/bin/bash
set -euo pipefail

get_free_port() {
    python3 -c '
import socket
s = socket.socket()
s.bind(("127.0.0.1", 0))
print(s.getsockname()[1])
s.close()
'
}

PORT=${PORT:-$(get_free_port)}

# <!> no need of 'user:email' scope on token
gh_token=$(gh auth token -u "$GH_AGENT")
gh_user=$(GH_TOKEN="$gh_token" gh api user --jq '{id, login, name, email}')
git_name=$(jq -r .name <<<"$gh_user")
git_email=$(jq -r '.email // "\(.id)+\(.login)@users.noreply.github.com"' <<<"$gh_user")

sbx env run -f \
    --env-arg ghUser="$GH_AGENT" \
    --env-arg gitName="$git_name" \
    --env-arg gitEmail="$git_email" \
    --env-arg hostPort="$PORT" \
    --env-arg opencodeApiKey="${OPENCODE_API_KEY:-}" \
    --name "oc-$PORT" --detach &&
    sbx exec -it "oc-$PORT" /bin/bash -c "opencode pair --url 'http://127.0.0.1:$PORT'"
