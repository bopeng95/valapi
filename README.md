# valapi
## about
- API for Valorant patches
- scraped from Valorant's [news site](https://playvalorant.com/en-us/news/)
- link to api [here](https://valapi.vercel.app/)
## paths
```
/patches
```
- `/` root path redirects to here
- shows all the patches from recent to oldest from website
```
/patches/recent
```
- shows the most recent patch in full detail
## available params
```
?lang=
  - 'en-us' English (United States)
  - 'ko-kr' Korean (Korea)
  - 'ja-jp' Japanese (Japan)

default: en-us
```
- `lang` is based off on available languages Riot provides shown [here](https://developer.riotgames.com/docs/lol)
- Valorant does not support all of the available languages
- my api only has three as of right now
