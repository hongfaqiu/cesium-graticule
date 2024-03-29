# cesium-graticule

Lat/Lon Graticule for Cesium map

![](https://img.shields.io/bundlephobia/minzip/cesium-graticule) <a href="https://www.npmjs.com/package/cesium-graticule">![](https://img.shields.io/npm/v/cesium-graticule)</a> ![](https://img.shields.io/npm/types/cesium-graticule) ![](https://img.shields.io/npm/l/cesium-graticule)

## Install

```bash
npm install --save cesium-graticule

pnpm add cesium-graticule
```

## Usage

a ``cesiumGraticule`` global object is exported in borwser

```ts
import * as Cesium from "cesium";
import Graticule from 'cesium-graticule';

const cesiumViewer = new Cesium.Viewer("cesiumContainer");
const GraticuleObj = Graticule(cesiumViewer);
```

## API

```ts
class Graticules {
  /**
   * Create a Graticules Object
   * @param {Viewer} viewer cesium viewer
   * @param {GraticulesOptions} [options] - Object with the following properties:
   * @param {Color} [options.color = Color.WHITE.withAlpha(.5)] - The line color. Defaults to Color.WHITE.withAlpha(.5)
   * @param {Color} [options.meridiansColor = Color.YELLOW] - The meridians line color, show only meridians option is true. Defaults to Color.YELLOW
   * @param {number} [options.debounce = 500] - The render debounce value, defaults to 500ms
   * @param {number} [options.gridCount = 15] - Lines in screen, defaults to 15
   * @param {boolean} [options.meridians = true] - If show the colored meridians, defaults to true
   * @param {LabelOptions} [options.labelOptions] - The label style
   * @example
   * const GraticulesObj = new Graticules(MapObj.viewer, {
   *  meridians: false
   * });
   */
  constructor(viewer: Viewer, options?: GraticulesOptions);
  /**
   * Get or set graticules visible
   */
  get visible(): boolean;
  set visible(val: boolean);
  get isDestroyed(): boolean;
  /**
   * Show Lat/Lon Graticule
   */
  show(): void;
  /**
   * Hide Lat/Lon Graticule
   */
  hide(): void;
  /**
   * Destory class
   */
  destory(): void;
}

type GraticulesOptions = {
  /**
   * The line color. Defaults to Color.WHITE.withAlpha(.5)
   */
  color?: Color;
  /**
   * The meridians line color, show only meridians option is true. Defaults to Color.YELLOW
   */
  meridiansColor?: Color;
  /**
   * The render debounce value, defaults to 500ms
   */
  debounce?: number;
  /**
   * Lines in screen, defaults to 15
   */
  gridCount?: number;
  /**
   * If show the colored meridians, defaults to true
   */
  meridians?: boolean;
  /**
   * Label style
   */
  labelOptions?: LabelOptions;
};

type LabelOptions = {
  /**
   * font css, defaults to `bold 1rem Arial`
   */
  font?: string;
  /**
   * defaults to Color.WHITE
   */
  fillColor?: Color;
  /**
   * defaults to Color.BLACK
   */
  outlineColor?: Color;
  /**
   * defualts to 4
   */
  outlineWidth?: number;
  /**
   * Describes how to draw a label, defaults to LabelStyle.FILL_AND_OUTLINE
   */
  style?: LabelStyle;
};
```

## Demo

[online Demo](https://cesium-graticule.vercel.app/)

Launch the app in the demo folder, and then visit http://localhost:8080/

```node
pnpm i
npm start
```

| [![L6W1OK.md.png](https://s1.ax1x.com/2022/04/21/L6W1OK.md.png)](https://imgtu.com/i/L6W1OK) | [![L6WWpn.png](https://s1.ax1x.com/2022/04/21/L6WWpn.png)](https://imgtu.com/i/L6WWpn) |
| ------- | ------- |

## Credit

https://github.com/leforthomas/cesium-addons

[Mapshot.app - Graticule Fork](https://mapshot.app/#editorvisible=true&autorun=true&drawerposition=67.05&code=FAegVGwARlDCB7ADgTwE4EsDmALALlACLYZ4CGANgIJoDOApgHaUB0GCANFAJKMDGLKACYADEICM0WABkMfJgwAmUAK6NF9NFDw56UKkjJ9dUWfMYMuANU212jYSxFQAFDr0AiMwvoeAlADcUFJQKAgqUAC2ZChQjAgEKgzaOBi0UABmGBR69AAe8kgEGA58CJFIFBhk%2FHoA7qQ4KXreFvSCISEAmuFRMVAIAEbkJVBkUGWoAxnNpnI%2BY3gAXJ0wUPh4SEsgIHV7LGSGxu0IaFggVeYMtCDS3HAAogByAMoPALRCTquwAGKnAGt6MoMmhyis1hskLRtiAsI0VIMWGVIhd6BlTjpymQbvI7CpIu8yIpFAgLD8QMBgBgKpioABvaDwMhoPD0Ow1IQcJmICinblQKBWDD0OqaAVQACyZB0Y3ScHZGAJ0p0EoASvQ%2BORGFgchLpGRBvQKLyclr7BKAAoICgoKqMeimzV4C1Mp70Fm%2FFkvPiUFnAAC%2BmTBkSgAHI8UrImGAtTaay1jj4IqCcHyuHIwSY8AcgQAG4isVaAC8cVFQsLmhcHkzkUQjBGDrQ%2FljBdFmhYSXoACEwXUGGgNSjIkwNIoNbQbSoXWSoKW8GgVPRY9SMi4FfjIixfh68Co0PRCPQ2eaySxaCokEhMbRuNEsPQNepNCUsJaMHljTLgS4%2FH56TsgAkSoAtaaAPRmgBkKoA9KaAIDGgB%2FaoA8wqAEx2gDL5vBgAEvoAaMqACCagBgLkybZFiwB6ThQ072D6lB6KWDTqAgdQsBoBbyO%2Bn4UGqMrsLGAagCAgAA%2BoA9CqAOlGgD0qYA%2FvnAARHa0OY7QZHkZDjPOi7LhJlZoOeMksNetB4JaYJ4rQLzkA%2BtAsHJCksEwho5MoSlLiuuZQBogzhLUc5QAArCIIixo5FA4ngGqguyTSlj5wBlBYBD0toCDsYo1QWFweAIEeWAHuyUBBqWG5RiqOCxpFOkMlA0lMPQXC%2BiOaBkJVNR5km2VQJJaCFWSxUxZKVAABoAPpWFQ0gAKoPFwoLlHALIpelhypHwNA1bETVDtquoqUV0VQMaVTQggGDKE1ZUOiwupDOt7WbYatBcJEJQ3WQeSVfQ2RcJa3BcGCagHe5%2BUOceUQlOkpYANpMiITgiAAbAA7B5ErgyI4hCHDYNOMj8NOCjgrg%2BIGNcqjWNQOITgSl8IgSh5JNMuICPAAAuiw0RIG4cXEoltCBFSOb%2Fel%2B2IGoeDdjiVFEx5vk85gij8w27m81LrmC8L4sEDNjAqP5mB4LE86swlNS0C4ADMnPABkaing4D54A8eRsg2wqir%2BDJUoKjllGgTZA1AwN07Grv%2FTFDSKKq6zPbgBBNb6jANbQftQI5pDueIkNxxiWguI52tQD5oRQAAPKWpBBCgADUJd%2BM7gqCmnriOXk7k5%2FXBdQEXUB5GXFeMlXVfu57WlJDgLgOnUzKsoqnIuPXIAtwQsBByHsTT4nsC6Ng%2BB%2FnHgrcVvTJu4b7k%2B6npyuA1WglBo9dhUE5%2F5PnEynH3OQ6jo1%2FPu35eVz3hvAzfeR0%2B5VVNBkC0nIAEDwKA7UnPtFwvdbA%2FzfnTLg20MC7X2pzbuGAZgwO%2Fr%2Ff%2BxZ8GqGfFkB0ihO5Mm7gePcHsoArRqGtFgXU%2BoDWGg8TeWUmTbygJQ%2FcDhaE6hyGZEMk1WQIBmkgOaC0YguHIVtCBKCoGKGRFNcejBJEoAACoIGEdNGq4i5BqOwX4JknNuLcwIP5I0FAvbD1MIaY0ToLa%2FmVlAa8tp7SZVLDY60biSiOhtGaGcjAnHACOu0JAmBboujzOyA4JIM52KsZzUJWkImkAwNE0yxJFAuFcXaXxHNnF8H3AeBsNs7YEFLFbMpTA8AOzqME025tAmqCQIob8BpLHWjsIEg2ZDd7%2FXMGyEsyZNwsG0aI3Rc1BETWURyIJ0kMqMAVA2TQXS0lkl%2FOg5qLJ45MHchY40pkn5YBfkyGuLhT4twbtfO%2BT8ghlwwGQ7ulzBj7ISaZK2LhHlsLdlNBA7lcoEjGX8sRUzxp1lmYlFwSJtLrMYFswUmDXCDGBh4NIBo8AeDphXX0IiWB8h1KQFQGgAE1I7AS%2BEe4NBsMOXoXFKV8UcSpSLQZ5KmXEpUt3GFCBun2Hcsg1Bij6UTNmnITR2iVEwL%2BVs7ipizb8GaSUjQaAnZd12eY4Z%2FkdJBWIgVfpBB4gj08eWQg35fwnWPOomk9BgmIqwYaqA7x45aDzk5egLlzb0Artwj2cdLxtLZB040ayem2vVVtW2NTZbHmqfbQsYbHK0BwOECg450S6vcgueyTIkUwOKTU2NeAnlV0ckasYgwDb5HKSwMUxUnVFLQCU62kaGw1vZEWiU3cvZXRcFWmp55wiynrfm0pLa8ADunDgPwnaq4ix7X21tHo60TBHc26tS6O0yMFA4Us86x0sHiKyJow7G0Fv3YenQCLw2hjChDRGbDc0j1daGAAZC%2B0qd9X3vr0M%2BqAb64iforkmlNabgpJvchkSgDA46cNzQAQmA%2BrUDGb%2F0HKsfipgJyp1cOPDwuODam2Fv5WOuOigap1AAOKS17WOkxVJ5UWycuRqj0CF1Fs%2FvBtjFc2PRrXTUupYaeOlgAPKDAAFbOgOLQOwWAgn0gDEg2jcdS26OkDqdyX10S%2BMUHHXNbHLIBTvvp2t7G1WCjqKp9TpZGH9UGiNAzxUS7loNu8GzzD7MbsdRG9dAUZUrkFLk9xpkDyRAQNEqgECE3vKIvQUL4XIsm0FJcxQGL3K3QsMDEQiCZEpaswDDLWWZ2%2F381AHYUArazAdCydtsVZi%2BgoEU%2FybJlANVIvQM5x9pEYLftcmRv9P2Aww8%2FJo%2F6UsyjvjR6tF7j3ef7ZOSdFdp5y2lngB9b8y7GM%2FoKMbFT8u0HgRfX2HCXaZE631nrV9zsXwGxYIbWG%2F3vty1gCbLgLOHDU89%2FBpZNPEOBFAAA%2FLNxdhmlhQDe0gD7FcnXGfbYt8rksVtrYvhtwUxbtsfbS4DA7%2BQjs739gQVlwzAVbnGaCuQ0yIVjzmS4BZ9AmDLKGSG%2BwmzdNYMJ4yl0zKoAAD5YrxXZi4WGFcAA%2BwuJhkvUk1olJLXUpX5%2FrFw7whfFqDLSvrWCntQDgwQnbaOq6a9LDtzHQSdtcCe1ezhZXPrqBnkA5pVRInpBSnV8oSBpx%2Fbli3FZaBWv4R2eljHxYZGTf7SZu%2BIgt0A%2FF9kEPraw%2FT3N5H0HAA%2FZPsfx3x6cpDiusAntx0uQH8bQfu7p4nbKV1Efu6CkB%2FIGP%2Bn5uygTxioxVeoAp7T%2FXwdTQm8yj%2FGsHb%2Bf%2FcPUD8H%2FTnmK%2BR5r89CgpfPM96LUnqAqfZ%2BGfn333PGLB9aGiHkVLxeq6l%2Bm%2BHyf0eZ%2F6aP03nULeq%2Ft8P5ibvWer858f1gErZWF3KGd9EIEpV9z1DpWFpoKdloPEA4AeGBk0AgDMC6DkLQEyAHnljvi4Agc9k6kIP3h9lwO8G9FsjvoHvlsgcPupk5ugRvjqK9NwLgSUHvn0HkMgdQeNmgRgTKFgW9KVsILgcPkXgQXgeNiQRgeQVAGwdPEIIltsloE1jOhQDqCVpcu4lRqKnwLQKJmJu5DkjynCtdPfHyGgBXMWLzmZjhlQg4IYQFhoT0jOuZvtDoKDiwITN3NEEMtUBQKDsTgwt%2BJgKwOCuoigEgDah4LyKcB4FwKYT3DaKcKDmUDoZHgGNfnjllG%2FtPGhukLCj0n7hIeyhoOolWsbqlk5svoQbvowfls3uwUbiIc%2FgPvqtoPga9pZp9gQj9tplHngepqDuDpDiVm7ArPgeFB1unI5L1NIZ9iUTIVAEMeprLhjk6nnuMcMVACXIbpDlti3Fgq0c9rzm5nZg8A5qZpHvMaWPpr1J5k6i4BMagVKD1LZiwrsRbrIskKEQcXMTITIpwoKGVmRmQCPNVPtIlDIpcoYLKCDLjlXOck1rkTKEEOCc%2BlwatvHHwZUjVGrBrKQCgHrgFjKDgP3EmkPOWG4aTpMnIBnIIU1hvK8TIoCViW7jiTYviSCoSXwMSVgPdEUUWleslvQFgPgSlGlBlAbMMVeo5GyLbAAmSNEqyIQA8BRpooQJKC8C4BoFyTqCwClL8B%2BD%2BHLHpJqGkMzubtOpkFBl6j8gMuESWJHsKRUgQh4CIAAA0PAeBQCi7aA5FfZQAeDiAAActp9pke1eIyUYYyppLAXQDw0g0gwmAA6r6W3v6UCoEepBGQABLcDqI7ENA6ARbiJkAuB2FXq5oWla5Wmem2kRn%2BArFmE%2BIOiZJxLyEMnKHia9pyKCpKIiJk7zSNoxDiqQo1AGKUn6lRGnBkmt65plACwY4ACkHB5ZVc3%2B9AQaM%2BwxXAUuzK2RtsyUVaY0hpV68R3co5DYH2ZcbCnCpi7xSRMocBSWOyFK0u9Aq5FSMiKBCxS%2Baebg0xoxWAcOmuFRAhr%2BJ23RY53B4U1cnW4JpYhecJ0JtBm%2B8JBAixWeveKxHx5GLiLIlAOQVi%2FxOylJB8IJwFAxiB1BYx8xUxRFxBiJNQ6sLIqJ6JKFOg2Jg8tJKYJO9JihTJS5veFuFJmJ9FuJI8dJrZDJhRmBMFQ5VcHJXJ3BPJnJfJ8SRaxpBABZpYkU4peAkp0pqUcpCpnJGKKpCAapn42SmpB4fAOpGyuu%2BpWaRpMi3ROhmaLpVptpTwDpgO%2BJQZIZYZkZMZrlOhLASZKZaZjQmZOA2ZuZbCgW%2BSsS2StZih9ZYmjZkCe0QqLFei7Zi0XZVOiUvZmJ%2FZppoldqrge5eAqWk5oh05s585GcZIlKHKd57FeA65a52gyknFu5PRMoh5x23ELUGk5UqK5kZAWKEGhpsYDGzS5VCSbFMFDV9VLctAGKlUpp7kHgdQqQbIwRUQL4esFgQ1ViXqHGaxm17Meu%2BZ9lpY1pNpTlFcilbpDwAAjioDKEEQ%2BlgopQ5XaWWddR4HpNalKIdTUB4M9a4K9WdcWe9VdS6W6VQA2NapLIlADcdvjuLt7gCkxcCgJYoRThKtTrTvThLkzhsqJb8iIu5IxaMgSaxYuSJazq4OighcKvilVTeaSt7gzYSsynHLShMH8hzkzUpRLjzezdUakXyocU2Qoi2ToooelWyNTsKlsn5Akm8pYtWdkoYcLWSDOhaTOhiA2KDgAAYuSppEwhb6CeEUB63a3ZAmimmRGmkzqDruLxmuGo3xksDdjSBUBwAADS9t047iEZ1hOAoOAALDOjpHaPQM7aMvOUZBHduNwGGb1FQE8IQL1MJkNOoncE8KNBSeqRQMJhkBkAwMsGWHxd2YwEIF8nNeNoDs4CHVwLTQQIDu8JDDGSINOjIvQCgPQAXUXceFHQGVjYlIbCwAAFoPBqjCYzrJqYAABeZI5A%2BdmA8IjAoOjdJ%2BbhiZpwGA89DYlAwmy9JQYyzwqZaoi%2Bm929u9i9B9JAjAx9Twp9M6Klcg%2B9h9q9s1GKG9qNNgrIL9S9t9btwm6i6iwmko5939mgLo9WN9K9LAIDloYd9WkdRMiDlE3YKAxAOkNQ8goONi7ono3o9WLILguM2cLAHpcMUAHpTg9AkMXALAQuHC8tCSqKjdg1hc1dq2gY9GTSfKRl2pdgZlaUxauaigaU4eTg4g3quG1Chs1NCp4jFeLAUjRhPCwg8jYjnJd8KjPqDg4gccuj2cXEPDCqfKONSyeN5hzOxavy0cSYpYySUcMcymAyEuJNeJ5dldMi1u2STjOIyIVQNSAdwcD%2BohM6PjUqdjpkfAgTDYiZYc%2BA7BohxiW%2BXNGVNQACZA1UwCSAoC4CCV0ChOYh8G9KKiOK5dKNZN5dI94KvJdOBs5M2cXA7dBjMjpQ5dxjVIOwIDhAwmUA7tntXtUA6dmd3A2dUAqZ3U6ijSpjs4ylkDalMpmlipdVxalyV0U4bI7kPaipYh4lfJ7kqeGzpEbIqT6W7utATwCQ6ii4%2FA34tkXCrk2SLgxz7uXmipfJz%2BkM3kcONMZzJQFzhzye5zMtVzeANz5s9zqTDAkUigXsLg9BasoL1ztzvozWXmIL7IXz7dul%2BlP4ohXR%2F06WLwmoS18N%2BViLgLTpMLZIcLhZZ1CMIgZZxLpLcFmL6QTmHgYY5LqxrgNL6g6Q2uDLEMzLJQJLfACxDjmotLHL4YXLJWhjetAAJPSB8%2FUwGDaSqyywIIYIoEZFNC4FyOGCIGGH4AGCq%2BCYDlpRsWFFHh4E5TGR4C8GWaDoqTzra4Dh4PaY66WQGHrZ091cks5CoFgC8MmnUL8DVCOLQJaJoOK7S5mspK2GpEotk1pJoIMmQA%2BHAMFTqH9reiIHIxFBdI8%2B4yPBODvT3RWpoOKQizUpgFi3OAYUyEqlWCYpzGVsJowLaAMNWz7noO4KVNKzbi5HkMAGCCwEMAONEhcim5FI2JoJzIG5pIAjVMiLmw%2BIolkg8NEvuWkHbFWL2noc24KK2yqu28m%2B2OpPO2QL4upNu7u0Vfu%2BVCqh4MRJW%2BtWe5zGe04kAA)
