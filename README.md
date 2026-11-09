# Hackathon

## Agentic setup with Docker sandboxes

1. [Install `sbx`](https://docs.docker.com/ai/sandboxes/install/) and `sbx login`

2. Install some skills with [`npx skills`](https://www.skills.sh/) and `sbx skills import` them

3. Store your secrets (API keys for models providers) with
[`sbx secret set[-custom]`](https://docs.docker.com/ai/sandboxes/configuration/credentials/).
Some nice providers are:
   - <https://lbrouter.com/#ref=GTXQQRLK> (nice free tier, per day)
   - <https://opencode.ai/console/login> (nice free tier, per day)
   - <https://tokenharbor.ai> (good free tier, 7d rolling)
   - <https://developer.amd.com.cn/radeon/tokenfactory> (free tier ~ OK, complex signup)
   - <https://openrouter.ai/> (free tier ~ OK)
   - <https://engy.ai/pricing> (very low cost)
   - <https://agentrouter.org> (175$ signup bonus, GPT 6.1 Sol)
   - <https://freepi.ai/?ref=q5jyhxvg> (free tier, complex setup)

4. [Authenticate with `gh` CLI](https://docs.github.com/github-cli/github-cli/quickstart)
for your human and agentic accounts and `export GH_AGENT=<agent-username>` in your ~/.bashrc
(nota: you MUST have a SSH key for both
[authentication](https://docs.github.com/authentication/connecting-to-github-with-ssh)
and [signing](https://docs.github.com/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key#telling-git-about-your-ssh-key), for both accounts)

5. `git submodule update --init`

6. Launch new OpenCode sandbox(es) with `./new_opencode_sandbox.sh`

7. Pair with your sandbox with your OpenCode {[desktop](https://opencode.ai/desktop), [mobile](https://getopencode.app/), web} apps, and start new _sessions_ there
**(beware to change working directory before starting _session_)**
