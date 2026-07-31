import { definePatch } from "../modUtils.js"

export default definePatch(({ insertCode, replaceRawCode, matchCode }) => {

  matchCode(`ctx.drawImage(emojiHolder.emojiPicker.emojiTiles[pl - 1024 + emojiHolder.data.tileCount], 0, 0)`,
    { addToDictionary: ["emojiHolder", "emojiPicker", "emojiTiles"] })

  insertCode(
    `this.zw = 676; /* here */`,
    `__fx.quickEmojis = __fx.quickEmojis || {}; __fx.quickEmojis.emojiList = this.emojis; __fx.quickEmojis.emojiBaseCode = this.zw;`
  )

  insertCode(
    `var zx = ak.sI.zy(bN.zx); /* here */`,
    `__fx.quickEmojis = __fx.quickEmojis || {}; __fx.quickEmojis.realFlagCodes = zx.slice();`
  )

  replaceRawCode(
    `function zz(){var aC;var qj=bm.eU.data[120].value;var h=qj.split(",");if(h.length!==18){`,
    `function zz(){if(__fx.settings.customQuickEmojisEnabled&&__fx.settings.customQuickEmojis&&9===__fx.settings.customQuickEmojis.length){for(var q=0;q<9;q++){var qcode=parseInt(__fx.settings.customQuickEmojis[q],10);zk[q]={pl:isNaN(qcode)?1015+q:qcode,kZ:0};}return;}var aC;var qj=bm.eU.data[120].value;var h=qj.split(",");if(h.length!==18){`
  )

  // dont let sending emojis reshuffle the custom picks
  replaceRawCode(
    `function a01(pl){var aC;for(aC=0;aC<9;aC++){zk[aC].kZ=Math.floor(zk[aC].kZ*.99)}`,
    `function a01(pl){if(__fx.settings.customQuickEmojisEnabled)return;var aC;for(aC=0;aC<9;aC++){zk[aC].kZ=Math.floor(zk[aC].kZ*.99)}`
  )
})
